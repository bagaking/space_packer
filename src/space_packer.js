let base64code = [
  '0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
  'Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
  'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v',
  'w','x','y','z','+','/'
];
let base64decode = {}
for(let i = 0; i < base64code.length; i ++){
  base64decode[base64code[i]] = i;
}


function pos_to_ind(pos, width, height, depth, min_pos){
    let offsetx = pos.x - min_pos.x;
    let offsety = pos.y - min_pos.y;
    let offsetz = pos.z - min_pos.z;
    return offsety * width * depth + offsetx * depth + offsetz
}

function ind_to_pos(_index, width, height, depth, min_pos){
    return {
        x : Math.floor(_index / depth) % width + min_pos.x,
        y : Math.floor(_index / depth / width)  + min_pos.y,
        z : _index % (depth) + min_pos.z,
    };
}

function fill_position(list, pos_getter, pos_setter, value_getter, value_setter, width, height, depth, min){
  let total = width * height * depth;
  let ret = []
  for(let i = 0; i < total; i ++) ret[i] = 0;
  for(let i = 0; i < list.length; i ++){
      let pos = pos_getter(list[i]);
      let value = value_getter(list[i]);
      ret[pos_to_ind(pos, width, height, depth, min)] = value;
  }
  return ret;
}


function fill(position_lists, pos_getter, pos_setter, value_getter, value_setter){
    let ret = []
    for(let ind = 0; ind < position_lists.length; ind++){
        let min = { x:99999, y:99999, z:99999};
        let max = { x:-99999, y:-99999, z:-99999};

        for(let i = 0; i < position_lists[ind].length; i ++){
            let pos = pos_getter(position_lists[ind][i])
            if(pos.x < min.x) min.x = pos.x;
            if(pos.y < min.y) min.y = pos.y;
            if(pos.z < min.z) min.z = pos.z;
            if(pos.x > max.x) max.x = pos.x;
            if(pos.y > max.y) max.y = pos.y;
            if(pos.z > max.z) max.z = pos.z;
        }

        //get space info
        let width = max.x - min.x + 1;
        let height = max.y - min.y + 1;
        let depth = max.z - min.z + 1;

        ret[ind] = {
          min : min, max : max, width : width, height : height, depth : depth,
          data : fill_position(position_lists[ind], pos_getter, pos_setter, value_getter, value_setter, width, height, depth, min)
        }
    }
    return ret;
}

//value types up to 32
function encode(position_lists, pos_getter, pos_setter, value_getter, value_setter, debug = false){
  let ret = []

  let filled_lsts = fill(position_lists, pos_getter, pos_setter, value_getter, value_setter);

  for(let ind = 0; ind < filled_lsts.length; ind++){
      let filled = filled_lsts[ind].data;

      // create ret data
      ret[ind] = {
          algorithm:"kh_masked",
          data:"",
          minv:filled_lsts[ind].min,
          width:filled_lsts[ind].width,
          height:filled_lsts[ind].height,
          depth:filled_lsts[ind].depth,
      }

      //make all pair and create mask
      let _strs = []
      let str_mask_inds = {}
      let mask = ""
      for(let i = 0, j = 0; i < filled.length ; i ++){
          let type_ind = filled[i];
          let str = base64code[type_ind];
          let count = 0;
          while(count + 1 < base64code.length && i + 1 < filled.length && filled[i] == filled[i+1]) {
              i ++;
              count ++;
          }
          str += base64code[count];
          _strs[j ++] = str
          if(str_mask_inds[str] == null) str_mask_inds[str] = -1;
          else if(str_mask_inds[str] < 0 && mask.length < 62) { //mask length up to 62 (31 pairs)
              str_mask_inds[str] = mask.length / 2;
              mask += str;
          }
      }

        //create masked data
        ret[ind].data += base64code[mask.length];
        ret[ind].data += mask;
        for(let i = 0; i < _strs.length; i ++){
            let word = _strs[i];
            var mask_ind = str_mask_inds[word];
            if(mask_ind >= 0) {
                ret[ind].data += base64code[mask_ind + 33];
            } else{
                ret[ind].data += word;
            }
        }

        ret[ind].min = filled.min;
        ret[ind].max = filled.max;
        //output for debug
        if(debug){
          ret[ind].mask_length = mask.length;
          ret[ind].mask = mask;
        }
  }
  return ret;
}

function split_data(data){
  let _mask_length = base64decode[data[0]];
  let _mask = data.substring(1, _mask_length + 1);
  let _data = data.substring(_mask_length + 1);
  let set = {
    mask_length : _mask_length, 
    mask : _mask, 
    data : _data
  }
  return set
}

function decode(encoded_list, position_setter, value_setter){
  let ret = [];
  for(let ind = 0; ind < encoded_list.length; ind ++){
    ret[ind] = []

    //get structure and data
    let structure = encoded_list[ind];
    let data = structure.data

    //get mask info
    let set = split_data(data); 
 
    let offset = 0;
    for(let i = 0; i < set.data.length ; i ++){
        let key = set.data[i]
        let value = base64decode[key]
        let key_count = "";
        let count = 0;

        if(value > 32){ //mask hit
            let mask_pos = (value - 33)
            key = set.mask[mask_pos* 2];
            key_count = set.mask[mask_pos * 2 + 1];
            value = base64decode[key];
            count = base64decode[key_count];
        }else{ //normal pair
            key_count = set.data[++i];
            count = base64decode[key_count];
        }

        //insert point by position and value
        for(let j = 0; j <= count; j ++){
          let _index = j + offset;
          ret[ind][_index] = {}

          position_setter(ret[ind][_index], ind_to_pos(_index, structure.width, structure.height, structure.depth, structure.minv));
          value_setter(ret[ind][_index], value) 
        }
        offset += count + 1;
    } 
  }
  return ret;
}

module.exports = {
    algorithm : "kh_masked",
    encode : encode,
    decode : decode,
    split_data : split_data,
    fill : fill,
    pos_to_ind : pos_to_ind,
    ind_to_pos : ind_to_pos,
    base64code : base64code,
    base64decode : base64decode,
    printMsg : () => {
        let str = "This is a message from the space packer";
        console.log(str);
        return str;
    }
};

 