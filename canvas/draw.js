var tools = {
  cur_tool: ""
};

function setPageSize(ele) {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  ele.width = pageWidth;
  ele.height = pageHeight;
}

function drawLine(ctx, x1, y1, x2, y2, color, width) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

function drawCircle(ctx, x, y, radius, color, deg) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, deg);
  ctx.fillStyle = color;
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
        drawCircle(ctx, x, y, 6, "lightblue", Math.PI * 2);
      } else if (tools.cur_tool === "erasor" && turnon) {
        ctx.clearRect(x - 5, y - 5, 10, 10);
      }
    };

    canvas.ontouchmove = function(event) {
      var x = event.touches[0].clientX;
      var y = event.touches[0].clientY;
      if (tools.cur_tool === "brush" && turnon) {
        drawCircle(ctx, x, y, 6, "lightblue", Math.PI * 2);
        drawLine(ctx, x, y, draw_start.x, draw_start.y, "lightblue", 12);
        draw_start.x = x;
        draw_start.y = y;
      } else if (tools.cur_tool === "erasor" && turnon) {
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
        drawCircle(ctx, x, y, 6, "lightblue", Math.PI * 2);
      } else if (tools.cur_tool === "erasor" && turnon) {
        ctx.clearRect(x - 5, y - 5, 10, 10);
      }
    };

    canvas.onmousemove = function(event) {
      var x = event.clientX;
      var y = event.clientY;
      if (tools.cur_tool === "brush" && turnon) {
        drawCircle(ctx, x, y, 6, "lightblue", Math.PI * 2);
        drawLine(ctx, x, y, draw_start.x, draw_start.y, "lightblue", 12);
        draw_start.x = x;
        draw_start.y = y;
      } else if (tools.cur_tool === "erasor" && turnon) {
        ctx.clearRect(x - 5, y - 5, 10, 10);
      }
    };
    canvas.onmouseup = function(event) {
      turnon = false;
    };
  }

  clear.onclick = function() {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    ctx.clearRect(0, 0, width, height);
  };
}

var canvas = document.getElementById("sample");
var ctx = canvas.getContext("2d");
var turnon = false;
var draw_start = null;
var clear = document.getElementById("clear");

setPageSize(canvas);

window.onresize = function() {
  setPageSize(canvas);
};

var buttons = document.getElementById("tools").getElementsByTagName("button");
for (var i = 0; i < buttons.length; ++i) {
  buttons[i].onclick = function() {
    tools.cur_tool = this.id;
  };
}

listenUser(canvas);
