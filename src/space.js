let base64code = [
    '_','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O',
    'P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e',
    'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u',
    'v','w','x','y','z','~','`','!','@','#','$','%','^','&','*','+','/',
];
let base64decode = {}
for(let i = 0; i < base64code.length; i ++){
  base64decode[base64code[i]] = i;
}

function new_size(width, height, depth){
  let plat_total = width * depth;
  let total = plat_total * height;
  return {
    _height : height  ,
    _width  : width   ,
    _depth  : depth   ,
    _plat_total  : plat_total   ,
    _total  : total   ,
  }
}

//create an new space
exports.create = function (width, height, depth){
  let values = [] 
  let _size = new_size(width, height, depth)
  for(let i = 0; i < _size._total; i ++) values[i] = 0
  return {
    _size : _size,
    _info : {
      algorithm : "kh_masked",
      _existed : 0,
    },
    _values : values,
    
    pos_in_box : function (x, y, z) {
      return {
        x : Math.min(this._size._width - 1,   Math.max(0,parseInt(x))),
        y : Math.min(this._size._height - 1,  Math.max(0,parseInt(y))),
        z : Math.min(this._size._depth - 1,   Math.max(0,parseInt(z))),
      }
    },
    ind : function (x, y, z) {
      let pos = this.pos_in_box(x, y, z)
      return pos.y * this._size._plat_total + pos.x * this._size._depth + pos.z;
    },
    pos : function (ind) {
      return {
        x : Math.floor(ind / this._size._depth) % this._size.width ,
        y : Math.floor(ind / this._size._plat_total),
        z : ind % this._size._depth,
      }
      let pos = this.pos_in_box(x, y, z)
      return pos;
    },
    set : function(x, y, z, v){ 
      let ind = this.ind(x, y, z);
      return this.setByInd(ind, v)
    },
    get : function(x, y, z){ 
      let ind = this.ind(x, y, z);
      return this.getByInd(ind);
    },
    setByInd : function(ind, v){ 
      if(this._values[ind] == 0 && v != 0) this._info._existed += 1;
      else if(this._values[ind] != 0 && v == 0) this._info._existed -= 1;
      this._values[ind] = v;
      return this
    },
    getByInd : function(ind){ 
      return this._values[ind];
    },
    serialize : function(){
      let data = ""
      for(let ind = 0; ind < this._size._total; ind ++){ 
        let v = this._values[ind];
        let count = 0;
        while(count + 1 && ind + 1 < this._values.length && this._values[ind] == this._values[ind+1]) {
            ind ++;
          count ++;
        }
        data += base64code[v];
        if(count != 0) data += count;
      }
      data = this._size._width + "," + this._size._height + "," + this._size._depth + "," + data
      return data;
    },
    deserialize : function(data){
      let total_setted = 0;
      let raw_lst = data.split(",")
      let width = parseInt(raw_lst[0])
      let height = parseInt(raw_lst[1])
      let depth = parseInt(raw_lst[2])
      let content = raw_lst[3]
      this._size = new_size(width, height, depth)
      this._values = []
      for(let i = 0; i < this._size._total; i ++) this._values[i] = 0;

      let ind_poses = []
      this._info._existed = 0;
      for(let i = 0; i < content.length; i ++){
        let c = content[i];
        let value = base64decode[c];
        let count = 0;
        for(let k = 1; k + i < content.length;){
          let next_c = content[i + k]
          if(next_c < '0' || next_c > '9') break;
          count = count * 10 + parseInt(next_c);
          i ++;
        }
        for(let k = 0; k <= count; k ++){
          this._values[total_setted + k] = value;
          if(value != 0) {
            ind_poses[this._info._existed] = total_setted + k
            this._info._existed += 1;
          }
        }
        total_setted += count + 1;
      }
      return total_setted;
    },
    parse_general_data : function(node_lst, pos_getter, pos_setter, value_getter, value_setter){ 
      let min = { x:99999, y:99999, z:99999};
      let max = { x:-99999, y:-99999, z:-99999};
  
      for(let i = 0; i < node_lst.length; i ++){
          let pos = pos_getter(node_lst[i])
          min.x = Math.min(min.x, pos.x);
          min.y = Math.min(min.y, pos.y);
          min.z = Math.min(min.z, pos.z);
          max.x = Math.max(max.x, pos.x);
          max.y = Math.max(max.y, pos.y);
          max.z = Math.max(max.z, pos.z); 
      } 

      //get space info
      let width = max.x - min.x + 1;
      let height = max.y - min.y + 1;
      let depth = max.z - min.z + 1;
  
      let new_space = create(width, height, depth)
  
      for(let i = 0; i < node_lst.length; i ++){
          let pos = pos_getter(node_lst[i]);
          let value = value_getter(node_lst[i]);
          new_space.set(pos.x, pos.y, pos.z, value); 
      }
      return new_space;
    },
    clear : function(){
        for(let i = 0; i < this._size._total; i ++) this._values[i] = 0
        this._info._existed = 0
    },
    print : function(){
      console.log(JSON.stringify(this))
    } 
  }
}
 