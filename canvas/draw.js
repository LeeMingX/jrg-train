var tools = {
  cur_tool: ""
};

function setPageSize(ele) {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  ele.width = pageWidth;
  ele.height = pageHeight;
}

function drawLine(ctx, x1, y1, x2, y2, width) {
  ctx.beginPath();
  ctx.strokeStyle = ctx.strokeStyle ? ctx.strokeStyle : color;
  ctx.lineWidth = width;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

function drawCircle(ctx, x, y, radius, deg) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, deg);
  ctx.fillStyle = ctx.fillStyle ? ctx.fillStyle : color;
  ctx.fill();
}

function listenUser(canvas) {
  if ("ontouchstart" in document.documentElement) {
    canvas.ontouchstart = function(event) {
      var x = event.touches[0].clientX;
      var y = event.touches[0].clientY;
      console.log("x:" + x + "y:" + y);
      turnon = true;
      if (tools.cur_tool === "brush" && turnon) {
        draw_start = { x: x, y: y };
        drawCircle(ctx, x, y, 6, Math.PI * 2);
      } else if (tools.cur_tool === "eraser" && turnon) {
        ctx.clearRect(x - 5, y - 5, 10, 10);
      }
    };

    canvas.ontouchmove = function(event) {
      var x = event.touches[0].clientX;
      var y = event.touches[0].clientY;
      if (tools.cur_tool === "brush" && turnon) {
        drawCircle(ctx, x, y, 6, Math.PI * 2);
        drawLine(ctx, x, y, draw_start.x, draw_start.y, 12);
        draw_start.x = x;
        draw_start.y = y;
      } else if (tools.cur_tool === "eraser" && turnon) {
        ctx.clearRect(x - 5, y - 5, 10, 10);
      }
    };

    canvas.ontouchend = function(event) {
      turnon = false;
    };
  } else {
    canvas.onmousedown = function(event) {
      var x = event.clientX;
      var y = event.clientY;
      turnon = true;
      if (tools.cur_tool === "brush" && turnon) {
        draw_start = { x: x, y: y };
        drawCircle(ctx, x, y, 6, Math.PI * 2);
      } else if (tools.cur_tool === "eraser" && turnon) {
        ctx.clearRect(x - 5, y - 5, 10, 10);
      }
    };

    canvas.onmousemove = function(event) {
      var x = event.clientX;
      var y = event.clientY;
      if (tools.cur_tool === "brush" && turnon) {
        drawCircle(ctx, x, y, 6, Math.PI * 2);
        drawLine(ctx, x, y, draw_start.x, draw_start.y, 12);
        draw_start.x = x;
        draw_start.y = y;
      } else if (tools.cur_tool === "eraser" && turnon) {
        ctx.clearRect(x - 5, y - 5, 10, 10);
      }
    };
    canvas.onmouseup = function(event) {
      turnon = false;
    };
  }
}

var canvas = document.getElementById("sample");
var ctx = canvas.getContext("2d");
var turnon = false;
var draw_start = null;
var brush = document.getElementById("brush");
var eraser = document.getElementById("eraser");
var clear = document.getElementById("clear");
var colorpicker = document.getElementById("colorpicker");

var red = document.getElementById("red");
var lightyellow = document.getElementById("lightyellow");
var lightgrey = document.getElementById("lightgrey");

setPageSize(canvas);

window.onresize = function() {
  setPageSize(canvas);
};

listenUser(canvas);

brush.onclick = function() {
  tools.cur_tool = this.id;
  if (!("active" in this.classList)) {
    this.classList.add("active");
    eraser.classList.remove("active");
    clear.classList.remove("active");
    colorpicker.style.display = "block";
  }
};

eraser.onclick = function() {
  tools.cur_tool = this.id;
  if (!("active" in this.classList)) {
    this.classList.add("active");
    brush.classList.remove("active");
    clear.classList.remove("active");
    colorpicker.style.display = "none";
  }
};

clear.onclick = function() {
  tools.cur_tool = this.id;
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  ctx.clearRect(0, 0, width, height);
  if (!("active" in this.classList)) {
    this.classList.add("active");
    brush.classList.remove("active");
    eraser.classList.remove("active");
    colorpicker.style.display = "none";
  }
};

red.onclick = function() {
  console.log("haha");
  red.classList.add("active");
  ctx.strokeStyle = "red";
  ctx.fillStyle = "red";
  console.log(ctx.strokeStyle);

  lightyellow.classList.remove("active");
  lightgrey.classList.remove("active");
};

lightyellow.onclick = function() {
  lightyellow.classList.add("active");
  ctx.strokeStyle = "lightyellow";
  ctx.fillStyle = "lightyellow";

  red.classList.remove("active");
  lightgrey.classList.remove("active");
};

lightgrey.onclick = function() {
  lightgrey.classList.add("active");
  ctx.strokeStyle = "lightgrey";
  ctx.fillStyle = "lightgrey";

  red.classList.remove("active");
  lightyellow.classList.remove("active");
};
