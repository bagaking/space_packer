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

//create an new space
exports.create = function (width, height, depth){
  let values = []
  let plat_total = width * depth;
  let total = plat_total * height;
  for(let i = 0; i < total; i ++) values[i] = 0
  return {
    _size : {
      _height : height  ,
      _width  : width   ,
      _depth  : depth   ,
      _plat_total  : plat_total   ,
      _total  : total   ,
    },
    _info : {
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
      if(this._values[ind] == 0 && v != 0) this._info._existed += 1;
      else if(this._values[ind] != 0 && v == 0) this._info._existed -= 1;
      this._values[ind] = v;
      return this
    },
    get : function(x, y, z){
      let ind = this.ind(x, y, z);
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
      return data;
    },
    deserialize : function(data){
      let total_setted = 0;
      for(let i = 0; i < data.length; i ++){
        let c = data[i];
        let value = base64decode[c];
        let count = 0;
        for(let k = 1; k + i < data.length;){
          let next_c = data[i + k]
          if(next_c < '0' || next_c > '9') break;
          count = count * 10 + parseInt(next_c);
          i ++;
        }
        this._info._existed = 0;
        for(let k = 0; k <= count; k ++){
          this._values[total_setted + k] = value;
          if(value != 0){
             this._info._existed += 1;
          }
        }
        total_setted += count + 1;
      }
      return total_setted;
    },
    clear : function(){
        for(let i = 0; i < total; i ++) this._values[i] = 0
        this._info._existed = 0
    },
    print : function(){
      console.log(JSON.stringify(this))
    } 
  }
}
 