#! /usr/bin/env node

let fs = require("fs")

dir_name = process.argv[2]

if (fs.existsSync("./" + dir_name)) {
    console.log("ERR: file exists")
    process.exit(1)
} else {
    fs.mkdirSync(dir_name)
    fs.mkdirSync(dir_name + "/css")
    fs.mkdirSync(dir_name + "/js")

    var html_str = "<!DOCTYPE>\n<title>Hello</title>\n<h1>Hi</h1>"
    var css_str = "h1{color: red;}"
    var js_str = "var string = 'Hello World'\nalert(string)"

    fs.writeFileSync(dir_name + "/index.html", html_str)
    fs.writeFileSync(dir_name + "/css/style.css", css_str)
    fs.writeFileSync(dir_name + "/js/main.js", js_str)
}
