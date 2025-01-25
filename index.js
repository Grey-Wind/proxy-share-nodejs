const { app, BrowserWindow, ipcMain } = require('electron');
const ProxyServer = require('./src/proxy.js');
const fs = require('fs');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'src', 'preload.js') // 确保正确载入 preload 文件
  }
  });

  // 加载本地的 HTML 文件
  win.loadFile('./src/pages/index.html');

  win.menuBarVisible = false;

  // 打开开发者工具
  // win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
