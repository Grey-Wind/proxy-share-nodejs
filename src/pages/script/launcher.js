const ProxyServer = require('./proxy.js');
const fs = require('fs');

function RunHttpServer() {
    // 创建代理服务器实例
    const proxyServer = new ProxyServer('localhost', 7890);

    // 启动代理服务器
    proxyServer.start(1234);

    alert("http server start")
}

function RunHttpsServer() {
    // SSL 配置（如果需要 HTTPS）
    const sslOptions = {
        key: fs.readFileSync('openssl/private.key', 'utf8'),
        cert: fs.readFileSync('openssl/certificate.crt', 'utf8'),
    };

    // 创建代理服务器实例
    const proxyServer = new ProxyServer('localhost', 7890, sslOptions);

    // 启动代理服务器
    proxyServer.start(1234);
}
