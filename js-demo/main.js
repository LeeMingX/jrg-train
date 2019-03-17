// 初始化数据
var data = init();
var keys = data["keys"];
var rel = data["rels"];
// 创建键盘
create_keyboard(keys, rel);
// 监听按键
listen_keyboard();
// 工具函数
function update_rel(rel) {
  var hashStorage = JSON.parse(localStorage.getItem("rel") || null);
  if (hashStorage) {
    rel = hashStorage;
  }

  return rel;
}

function init() {
  var keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ];
  var rel = {
    q: "qq.com"
  };

  rel = update_rel(rel);
  return {
    keys: keys,
    rels: rel
  };
}

function ele(ele_name, ele_attr) {
  var element = document.createElement(ele_name);
  for (var attr in ele_attr) {
    element[attr] = ele_attr[attr];
  }
  return element;
}

function add_img_src(img, rel, key) {
  if (rel[key]) {
    img.src = "http://www." + rel[key] + "/favicon.ico";
  } else {
    img.src = "";
  }
  load_img_error(img);
}

function load_img_error(img) {
  img.onerror = function(event) {
    event.target.src = "https://sm.ms/favicon.ico";
  };
}

function add_btn_click(btn, rel) {
  btn.onclick = function(event) {
    modify = prompt(
      "请修改" + event.target.id + "键对应的网址",
      "当前网址是：" + rel[event.target.id]
    );
    var previous = event.target.previousSibling;
    previous.src = "http://www." + modify + "/favicon.ico";
    load_img_error(previous);
    rel[event.target.id] = modify;
    localStorage.setItem("rel", JSON.stringify(rel));
  };
}

function create_keyboard(keys, rel) {
  for (var i = 0; i < keys.length; ++i) {
    tmp_div = ele("div");
    for (var j = 0; j < keys[i].length; ++j) {
      var span = ele("span", { className: "text", textContent: keys[i][j] });

      var img = ele("img");
      add_img_src(img, rel, keys[i][j]);

      var btn = ele("button", { textContent: "编辑", id: keys[i][j] });
      add_btn_click(btn, rel);

      var k = ele("kbd", { id: "key" + keys[i][j] });
      k.appendChild(span);
      k.appendChild(img);
      k.appendChild(btn);

      tmp_div.appendChild(k);
    }
    x.appendChild(tmp_div);
  }
}

function listen_keyboard() {
  document.onkeyup = function(event) {
    var key = event["key"];
    var selected = document.getElementById("key" + key);
    selected.style.boxShadow = "";
  };

  document.onkeypress = function(event) {
    var key = event["key"];
    var selected = document.getElementById("key" + key);
    selected.style.boxShadow = "0px -1px 8px 0px rgba(0, 0, 0, 0.55)";
    is_contain = false;
    for (var k in rel) {
      if (k == key) {
        is_contain = true;
      }
    }
    if (is_contain) {
      website = rel[key];
      //location.href = 'http://' + website
      selected.style.boxShadow = "";
      window.open("http://" + website, "_blank");
    }
  };
}
