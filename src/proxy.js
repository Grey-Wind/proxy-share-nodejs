const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy');

class ProxyServer {
    constructor(targetHost, targetPort, sslOptions = null) {
        this.targetHost = targetHost;
        this.targetPort = targetPort;
        this.sslOptions = sslOptions;
        this.proxy = httpProxy.createProxyServer({
            target: {
                host: this.targetHost,
                port: this.targetPort,
            },
            changeOrigin: true, // 修改请求的 origin 为目标代理
            secure: false, // 忽略 SSL 证书验证
        });

        this.httpServer = null;
        this.httpsServer = null;
    }

    // 启动代理服务器
    start(port) {
        // 如果提供了 SSL 配置，创建 HTTPS 服务器
        if (this.sslOptions) {
            this.httpsServer = https.createServer(this.sslOptions, (req, res) => {
                this.proxy.web(req, res);
            });
            this.httpsServer.listen(port, () => {
                console.log(`HTTPS proxy server is running on https://localhost:${port}`);
            });
        }
        else {
            // 创建 HTTP 服务器
            this.httpServer = http.createServer((req, res) => {
                this.proxy.web(req, res);
            });

            // 监听 HTTP 请求
            this.httpServer.listen(port, () => {
                console.log(`HTTP proxy server is running on http://localhost:${port}`);
            });
        }

        // 处理代理错误
        this.proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Proxy error occurred.');
        });
    }

    // 关闭代理服务器
    stop() {
        if (this.httpServer) {
            this.httpServer.close(() => {
                console.log('HTTP proxy server stopped.');
            });
        }
        if (this.httpsServer) {
            this.httpsServer.close(() => {
                console.log('HTTPS proxy server stopped.');
            });
        }
    }
}

module.exports = ProxyServer;
