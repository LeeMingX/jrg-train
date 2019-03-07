// 用户请求 / 时，返回 html 内容
// 该 html 内容里面由一个 css link 和一个 script
// css link 会请求 /style.css，返回 css 内容
// script 会请求 /main.js，返回 js 内容
// 请求 / /style.css /main.js 以外的路径，则一律返回 404 状态码

html = "<!DOCTYPE html><html>" +
    "<head><link rel='stylesheet' href='/style'></head>" + 
    "<body>Hello World!!/ 你好，世界！<script src='/script'></script></body>" + 
    "</html>"
css = "body { color: red; }"
js = "alert('这是javascript显示的内容')"

var http = require("http")
var url = require("url")

var port = process.argv[2]
if (!port) {
    console.log("没有输入端口号，eg. node server 8889")
    process.exit(1)
}

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ""
    if (pathWithQuery.indexOf("?") >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"))
    }

    var path = parsedUrl.pathname
    var method = parsedUrl.method

    console.log("带参数的请求路径：", pathWithQuery)
    console.log("请求参数：", queryString)
    console.log("不带请求参数的路径：", path)

    if (path === "/index") {
        response.statusCode = 200
        response.setHeader("Content-type", "text/html; charset=utf-8")
        response.write(html)
        response.end()
    } else if (path === "/style") {
        response.statusCode = 200
        response.setHeader("Content-type", "text/css; charset=utf-8")
        response.write(css)
        response.end()
    } else if (path === "/script") {
        response.statusCode = 200
        response.setHeader("Content-type", "text/javascript; charset=utf-8")
        response.write(js)
        response.end()
    } else {
        response.statusCode = 404
        response.end()
    }
})

server.listen(port)
console.log("服务器已经启动，正在监听%s...", port)