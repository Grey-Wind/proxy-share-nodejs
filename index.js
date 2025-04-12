const ProxyServer = require('./src/proxy.js');
const fs = require('fs');

// SSL 配置（如果需要 HTTPS）
const sslOptions = {
    key: fs.readFileSync('openssl/private.key', 'utf8'),
    cert: fs.readFileSync('openssl/certificate.crt', 'utf8'),
};

// 创建代理服务器实例
const proxyServer = new ProxyServer('localhost', 7890, sslOptions);

// 启动代理服务器
proxyServer.start(1234);
