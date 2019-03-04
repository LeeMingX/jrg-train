#! /bin/bash

pwd
if [ -d $1 ]; then
    echo "ERR: path exists"
    exit 1
else
    mkdir $1
    cd $1
    echo "<!DOCTYPE>\n<title>Hello</title>\n<h1>Hi</h1>" > index.html
    mkdir css js
    echo "h1{ color: red; }" > css/style.css
    echo "var string=\"Hello World\"\nalert(string)" > js/main.js
    exit 0
fi
