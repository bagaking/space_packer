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

//value types up to 32
function encode(position_list, pos_getter, value_getter, debug = false){
  for(let ind = 0; ind < position_list.length; ind++){
    //sort all position
    let data = position_list[ind].sort((a,b) => {
      let pos_a = pos_getter(a)
      let pos_b = pos_getter(b)
      return 1000000 * (pos_a.x - pos_b.x) + 1000 * (pos_a.y - pos_b.y) + (pos_a.z - pos_b.z)
    });
    console.log(JSON.stringify(data));
    
    //record space info
    let min = { x:99999, y:99999, z:99999};
    let max = { x:-99999, y:-99999, z:-99999};
    
    for(let i = 0; i < data.length; i ++){
      let pos = pos_getter(data[i])
      if(pos.x < min.x) min.x = pos.x;
      if(pos.y < min.y) min.y = pos.y;
      if(pos.z < min.z) min.z = pos.z;
      if(pos.x > max.x) max.x = pos.x;
      if(pos.y > max.y) max.y = pos.y;
      if(pos.z > max.z) max.z = pos.z; 
    } 

    // create ret data
    ret[ind] = {
      algorithm:"kh_masked",
      min:min,
      max:max,  
      data:"",
    }    

    //make all pair and create mask
    let _strs = []
    let str_mask_inds = {} 
    let mask = ""
    for(let i = 0, j = 0; i < data.length; i ++){ 
      let type_ind = value_getter(data[i]);
      let str = base64code[type_ind];
      let count = 0;
      while(count + 1 < base64code.length && i + 1 < data.length && value_getter(data[i]) == value_getter(data[i+1])) {
          i ++;
          count ++;
      } 
      str += base64code[count];
      _strs[j ++] = str
      if(str_mask_inds[str] == null) str_mask_inds[str] = -1;
      else if(str_mask_inds[str] < 0 && mask.length < 64) { //mask length up to 64 (32 pairs)
          str_mask_inds[str] = mask.length / 2;
          mask += str;
      }
    }

    //create masked data
    ret[ind].data += base64code[mask.length];
    ret[ind].data += mask;
    for(let i = 0; i < _strs.length; i ++){
        let word = _strs[i];
        var mask_ind = str_map[word];  
        if(mask_ind >= 0) {
            ret[ind].data += base64code[mask_ind + 32];
        } else{
            ret[ind].data += word;
        }
    }

    //output for debug
    if(debug){
      ret[ind].mask_length = base64code[mask.length];
      ret[ind].mask = mask;
    }
  }
  return ret;
}

function decode(encoded_list, position_setter, value_setter){
  let ret = [];
  for(let ind = 0; ind < encoded_list.length; ind ++){
    ret[ind] = []

    //get structure and data
    let structure = encoded_list[ind];
    let data = structure.data

    //get space info
    let width = structure.max.x - structure.min.x + 1;
    let height = structure.max.y - structure.min.y + 1;
    let depth = structure.max.z - structure.min.z + 1;

    //get mask info
    let mask_length = base64decode[data[0]];
    let mask = data.substring(1, mask_length + 1);
 
    let offset = 0;
    for(let i = mask_length + 1; i < data.length ; i ++){
        let key = data[i]
        let value = base64decode[key]
        let key_count = "";
        let count = 0;

        if(value >= 32){ //mask hit
            let mask_pos = (value - 32)
            key = mask[mask_pos];
            key_count = mask[mask_pos * 2 + 1];
            value = base64decode[key];
            count = base64decode[key_count];
        }else{ //normal pair
            key_count = data[++i];
            count = base64decode[key_count]; 
        }

        //insert point by position and value
        for(let j = 0; j <= count; j ++){
          let _index = j + offset;
          position_setter(ret[ind][_index], {
                x : Math.floor(_index / (height * depth)) + structure.min.x,
                y : Math.floor((_index / depth) / height) + structure.min.y,
                z : _index % (depth) + structure.min.z,
          });
          value_setter(ret[ind][_index], value) 
        }
        offset += count + 1;
    } 
  }
  return ret;
}

let space_packer = {
  algorithm : "kh_masked",
  encode : encode,
  decode : decode,
  base64code : base64code,
  base64decode : base64decode
};
export default space_packer;