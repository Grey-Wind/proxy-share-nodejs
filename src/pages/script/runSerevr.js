const ProxyServer = require('../../proxy.js');
const fs = require('fs');

var proxyPort = document.getElementById('proxyPort').value;
var serverPort = document.getElementById('serverPort').value;

const httpsBtn = document.getElementById('httpsServerBtn');
const httpBtn = document.getElementById('httpServerBtn');

// 获取打包后的可执行文件路径
const execPath = process.execPath;

// 获取可执行文件所在的目录
const execDir = path.dirname(execPath);

alert(execDir)

var httpProxyServer;

function HttpServer() {
    if (httpsBtn.disabled == true) {
        // 关闭HTTP服务
        httpBtn.innerText = "Run";
        httpsBtn.disabled = false;
        httpProxyServer.stop();
    }
    else {
        // 开启HTTP服务
        httpsBtn.disabled = true; // 禁止HTTPS服务启动
        httpBtn.innerText = "Stop";
        alert("HTTP服务准备启动");
        // 创建代理服务器实例
        httpProxyServer = new ProxyServer('localhost', proxyPort);

        console.log("HTTP server running...");

        // 启动代理服务器
        httpProxyServer.start(serverPort);
        alert("HTTP服务已启动");
    }
}

function HttpsServer() {
    if (httpBtn.disabled == true) {
        httpBtn.disabled = false;
    }
    else {
        // 禁用HTTPS服务启动
        httpBtn.disabled = true;
        console.log("禁用HTTP服务启动");
        httpsBtn.innerText = "Stop";
    }
}