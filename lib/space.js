
 
let base64code = [
  '_', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
  'v', 'w', 'x', 'y', 'z', '~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '+', '/',
];
let base64decode = {}
for (let i = 0; i < base64code.length; i++) {
  base64decode[base64code[i]] = i;
}

function vector3(x = 0, y = 0, z = 0) {
  this.x = x;
  this.y = y;
  this.z = z;
}  

function khspace(width = 0, height = 0, depth = 0) {
  this.init(width, height, depth);
}

khspace.prototype = {
  get algorithm() { return "kh_masked" },
  get width() { return this._width },
  get height() { return this._height },
  get depth() { return this._depth },
  get existed() { return this._existed },
  get plat_total() { return this.width * this.depth; },
  get total() { return this.plat_total * this.height; }, 
  get str_size() { return this.width + "," + this.height + "," + this.depth; },

  
  clear: function () {
    let _total = this.total;
    for (let i = 0; i < _total; i++) this._values[i] = 0
    this._existed = 0
  }, 
  init: function(width = 1, height = 1, depth = 1){
    this._width = width;
    this._height = height;
    this._depth = depth;
    this._values = [];
    this.clear();
  },
  print: function () {
    console.log(JSON.stringify(this))
  },
  pos_in_box(x, y, z) {
    return new vector3(
      Math.min(this.width - 1, Math.max(0, parseInt(x))),
      Math.min(this.height - 1, Math.max(0, parseInt(y))),
      Math.min(this.depth - 1, Math.max(0, parseInt(z)))
    )
  },
  pos_to_ind(pos){
    return pos.y * this.plat_total + pos.x * this.depth + pos.z; 
  },
  int_to_pos: function (ind) {
    return pos_in_box(
      Math.floor(ind / this._size._depth) % this._size._width,
      Math.floor(ind / this._size._plat_total),
      ind % this._size._depth
    )
  },
  set_by_ind: function (ind, v) {
    if (this._values[ind] == 0 && v != 0) this._existed += 1;
    else if (this._values[ind] != 0 && v == 0) this._existed -= 1;
    this._values[ind] = v;
    return this
  },
  get_by_ind: function (ind) {
    return this._values[ind];
  },
  set_by_pos: function (pos, v) {
    let ind = this.pos_to_ind(pos);
    return this.set_by_ind(ind, v);
  },
  get_by_pos: function (pos) {
    let ind = this.pos_to_ind(pos);
    return this.get_by_ind(ind);
  }, 
  ind(x, y, z){
    let pos = this.pos_in_box(x, y, z);
    return this.pos_to_ind(pos);
  },
  set(x, y, z, value){
    let ind = this.ind(x, y, z);
    return this.set_by_ind(ind, value)
  },
  get(x, y, z) {
    let ind = this.ind(x, y, z);
    return this.get_by_ind(ind);
  },
  serialize: function () {
      let data = ""
      let _total = this.total
      for (let ind = 0; ind < _total; ind++) {
        let v = this.get_by_ind(ind);
        let count = 0;
        while (count + 1 && ind + 1 < _total && v == this.get_by_ind(ind + 1)) {
          ind++;
          count++;
        }
        data += base64code[v];
        if (count != 0) data += count;
      }
      data = this.str_size + "," + data
      return data;
  },
  deserialize: function (data) {
      let total_setted = 0;
      let raw_lst = data.split(",");
      this.init(raw_lst[0], raw_lst[1], raw_lst[2]);
      let content = raw_lst[3]  
      let ret_ind_poses = [] 
      for (let i = 0; i < content.length; i++) {
        let c = content[i];
        let value = base64decode[c];
        let count = 0;
        for (let k = 1; k + i < content.length;) {
          let next_c = content[i + k]
          if (next_c < '0' || next_c > '9') break;
          count = count * 10 + parseInt(next_c);
          i++;
        }
        for (let k = 0; k <= count; k++) {
          this._values[total_setted + k] = value;
          if (value != 0) {
            ret_ind_poses[this._existed] = total_setted + k
            this._existed += 1;
          }
        }
        total_setted += count + 1;
      }
      return ret_ind_poses;
  }, 
}

exports.space = khspace;

exports.parse = function(code) {
  let data = new khspace(0, 0, 0);
  return {
    poses : data.deserialize(code),
    space : data
  }
}

exports.from_general_data =function (node_lst, pos_getter, value_getter) {
  let min = { x: 99999, y: 99999, z: 99999 };
  let max = { x: -99999, y: -99999, z: -99999 };

  for (let i = 0; i < node_lst.length; i++) {
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

  let new_space = new khspace(width, height, depth)

  for (let i = 0; i < node_lst.length; i++) {
    let pos = pos_getter(node_lst[i]);
    let value = value_getter(node_lst[i]);
    new_space.set_by_pos(pos, value);
  }
  return new_space;
}

exports.to_general_data = function (fn_data_node_creator) {
  let node_lst = []
  for (let x = 0; x < this.width; x++) {
    for (let y = 0; y < this.height; y++) {
      for (let z = 0; z < this.depth; z++) {
        let value = this.get(x, y, z)
        if (value <= 0) continue;
        fn_data_node_creator(node_lst, x, y, z, value) 
      }
    }
  }
  return node_lst
}
 


exports.code_to_img = function (color_table, code) {
  let data = new khspace(0, 0, 0);
  let poses = data.deserialize(code);
  newdata = new Array()

  if (color_table == null) {
    color_table = [
      "rgba(254, 254, 254, 0.5)",
      "rgba(151, 40, 44, 1)",
      "rgba(197, 137, 41, 1)",
      "rgba(208, 176, 25, 1)",
      "rgba(119, 95, 96, 1)",
      "rgba(63, 120, 163, 1)",
      "rgba(70, 64, 99, 1)",
      "rgba(45, 45, 45, 1)",
      "rgba(236, 235, 251, 1)",
    ]
  }


  draw = function (x, y, v) { newdata[x * space.height + y] = (color_table[v]) }
  for (let x = 0; x < space.width; x++) {
    for (let y = 0; y < space.height; y++) {
      let i = x * space.height + y
      draw(x, y, 0)
      for (let z = 0; z < space.depth; z++) {
        let value = space.get(x, y, z)
        if (value > 0) {
          draw(x, y, value)
          break;
        }
      }
    }
  }

  var canvas = document.createElement('canvas');
  canvas.id = "CursorLayer";
  canvas.style.zIndex = 8;
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";
  let size = 15
  canvas.width = space.width * size;
  canvas.height = space.height * size;
  var ctx = canvas.getContext("2d");

  for (let x = 0; x < space.width; x++){
    for (let y = 0; y < space.height; y++) {
      let i = x * space.height + y
      ctx.fillStyle = newdata[i];
      ctx.fillRect(x * size + 1, y * size + 1, size - 1, size - 1);
      if (newdata[i] != "rgba(254, 254, 254, 0.5)") {
        ctx.fillStyle = "rgba(20, 20, 20, 1)";
        ctx.strokeRect(x * size, y * size, size, size);
        ctx.strokeRect(x * size + 1, y * size + 1, size - 2, size - 2);
      }
    }
  }
  return jpegDataUri = canvas.toDataURL();
} 