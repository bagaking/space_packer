let Space = require("./space")

exports.encode = function (color_table, code) {
  let data = Space.create(0, 0, 0);
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


  draw = function (x, y, v) { newdata[x * data._size._height + y] = (color_table[v]) }
  for (let x = 0; x < data._size._width; x++) {
    for (let y = 0; y < data._size._height; y++) {
      let i = x * data._size._height + y
      draw(x, y, 0)
      for (let z = 0; z < data._size._depth; z++) {
        let value = data.get(x, y, z)
        if (value > 0) {
          draw(x, y, value)
          break;
        }
      }
    }
  }

  console.log("newdata")
  console.log(newdata)

  var canvas = document.createElement('canvas');
  canvas.id = "CursorLayer";
  canvas.style.zIndex = 8;
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";
  let size = 15
  canvas.width = data._size._width * size;
  canvas.height = data._size._height * size;
  var ctx = canvas.getContext("2d");

  for (let x = 0; x < data._size._width; x++)
    for (let y = 0; y < data._size._height; y++) {
      let i = x * data._size._height + y
      ctx.fillStyle = newdata[i];
      ctx.fillRect(x * size + 1, y * size + 1, size - 1, size - 1);
      if (newdata[i] != "rgba(254, 254, 254, 0.5)") {
        ctx.fillStyle = "rgba(20, 20, 20, 1)";
        ctx.strokeRect(x * size, y * size, size, size);
        ctx.strokeRect(x * size + 1, y * size + 1, size - 2, size - 2);
      }
    }
  return jpegDataUri = canvas.toDataURL();
} 