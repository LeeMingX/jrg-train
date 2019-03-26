var tools = {
  cur_tool: ""
};

function setPageSize(ele) {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  ele.width = pageWidth;
  ele.height = pageHeight;
}

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.strokeStyle = ctx.strokeStyle ? ctx.strokeStyle : color;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

function drawCircle(ctx, x, y, deg) {
  ctx.beginPath();
  ctx.arc(x, y, ctx.lineWidth / 2, 0, deg);
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
      event.preventDefault();
      var x = event.touches[0].clientX;
      var y = event.touches[0].clientY;
      if (tools.cur_tool === "brush" && turnon) {
        drawCircle(ctx, x, y, Math.PI * 2);
        drawLine(ctx, x, y, draw_start.x, draw_start.y);
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
        drawCircle(ctx, x, y, Math.PI * 2);
      } else if (tools.cur_tool === "eraser" && turnon) {
        ctx.clearRect(x - 5, y - 5, 10, 10);
      }
    };

    canvas.onmousemove = function(event) {
      var x = event.clientX;
      var y = event.clientY;
      if (tools.cur_tool === "brush" && turnon) {
        drawCircle(ctx, x, y, Math.PI * 2);
        drawLine(ctx, x, y, draw_start.x, draw_start.y);
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
var save = document.getElementById("save");

var colorpicker = document.getElementById("colorpicker");
var red = document.getElementById("red");
var lightyellow = document.getElementById("lightyellow");
var lightgrey = document.getElementById("lightgrey");

var sizes = document.getElementById("sizes");
var thin = document.getElementById("thin");
var thick = document.getElementById("thick");
var bold = document.getElementById("bold");

setPageSize(canvas);

window.onresize = function() {
  setPageSize(canvas);
};

listenUser(canvas);

brush.onclick = function() {
  tools.cur_tool = this.id;
  if (!("active" in this.classList)) {
    this.classList.add("active");
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    eraser.classList.remove("active");
    clear.classList.remove("active");
    colorpicker.style.display = "block";
    sizes.style.display = "block";
    thin.className = "afterclickthin";
    thick.className = "";
    bold.className = "";
  }
};

eraser.onclick = function() {
  tools.cur_tool = this.id;
  if (!("active" in this.classList)) {
    this.classList.add("active");
    brush.classList.remove("active");
    clear.classList.remove("active");
    colorpicker.style.display = "none";
    sizes.style.display = "none";
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
    sizes.style.display = "none";
  }
};

save.onclick = function() {
  var url = canvas.toDataURL();
  var a = document.createElement("a");
  a.download = "demo";
  a.href = url;
  a.click();
};

red.onclick = function() {
  if (this.classList.contains("active")) {
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    this.classList.remove("active");
  } else {
    red.classList.add("active");
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    lightyellow.classList.remove("active");
    lightgrey.classList.remove("active");
  }
};

lightyellow.onclick = function() {
  if (this.classList.contains("active")) {
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    this.classList.remove("active");
  } else {
    lightyellow.classList.add("active");
    ctx.strokeStyle = "lightyellow";
    ctx.fillStyle = "lightyellow";

    red.classList.remove("active");
    lightgrey.classList.remove("active");
  }
};

lightgrey.onclick = function() {
  if (this.classList.contains("active")) {
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    this.classList.remove("active");
  } else {
    lightgrey.classList.add("active");
    ctx.strokeStyle = "lightgrey";
    ctx.fillStyle = "lightgrey";

    red.classList.remove("active");
    lightyellow.classList.remove("active");
  }
};

thin.onclick = function() {
  this.className = "afterclickthin";
  thick.className = "";
  bold.className = "";
  ctx.lineWidth = 3;
};

thick.onclick = function() {
  this.className = "afterclickthick";
  thin.className = "";
  bold.className = "";
  ctx.lineWidth = 6;
};

bold.onclick = function() {
  this.className = "afterclickbold";
  thick.className = "";
  thin.className = "";
  ctx.lineWidth = 9;
};
