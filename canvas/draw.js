// var div = document.getElementById("canvas");
// var is_paint = false;
// div.onmousedown = function(event) {
//   var x = event.clientX;
//   var y = event.clientY;
//   console.log("x:" + x + " y:" + y);
//   var divA = document.createElement("div");
//   is_paint = true;
//   divA.style =
//     "width: 6px; height: 6px;" +
//     "background: black;" +
//     "border-radius: 3px;" +
//     "position: absolute;" +
//     "left: " +
//     (x - 3) +
//     "px; top: " +
//     (y - 3) +
//     "px;";
//   div.appendChild(divA);
// };

// div.onmousemove = function(event) {
//   if (is_paint) {
//     var x = event.clientX;
//     var y = event.clientY;
//     console.log("x:" + x + " y:" + y);
//     var divA = document.createElement("div");
//     is_paint = true;
//     divA.style =
//       "width: 6px; height: 6px;" +
//       "background: black;" +
//       "border-radius: 3px;" +
//       "position: absolute;" +
//       "left: " +
//       (x - 3) +
//       "px; top: " +
//       (y - 3) +
//       "px;";
//     div.appendChild(divA);
//   }
// };

// div.onmouseup = function() {
//   is_paint = false;
// };

// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, 100, 100);
// ctx.strokeStyle = "blue";
// ctx.strokeRect(0, 0, 100, 100);
// ctx.clearRect(50, 50, 10, 10);

// ctx.beginPath();
// ctx.fillStyle = "lightgreen";
// ctx.moveTo(120, 120);
// ctx.lineTo(100, 150);
// ctx.lineTo(140, 120);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "lightpink";
// ctx.arc(200, 50, 40, 0, Math.PI / 2);
// ctx.stroke();

function setPageSize(ele) {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  ele.width = pageWidth;
  ele.height = pageHeight;
}

var canvas = document.getElementById("sample");

var ctx = canvas.getContext("2d");
setPageSize(canvas);
window.onresize = function() {
  setPageSize(canvas);
};

function drawCircle(ctx, x, y, radius, color, deg) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, deg);
  ctx.fillStyle = color;
  ctx.fill();
}

var is_paint = false;
var last_point = null;

canvas.onmousedown = function(event) {
  is_paint = true;
  var x = event.clientX;
  var y = event.clientY;
  console.log("x:" + x + " y:" + y);
  last_point = { x: x, y: y };
  drawCircle(ctx, x, y, 6, "lightblue", Math.PI * 2);
};

canvas.onmousemove = function(event) {
  if (is_paint) {
    var x = event.clientX;
    var y = event.clientY;
    drawCircle(ctx, x, y, 6, "lightblue", Math.PI * 2);
    drawLine(ctx, last_point.x, last_point.y, x, y, "lightblue", 12);
    last_point.x = x;
    last_point.y = y;
  }
};

canvas.onmouseup = function(event) {
  is_paint = false;
};

function drawLine(ctx, x1, y1, x2, y2, color, width) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}
