const electron = require('electron')
const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')
const fs = require("fs");
const package = require("../../package.json");
const bn = require('bytenode');
const path = require('path');
const userDataPath = app.getPath('userData');

let mainWindow;

//窗口对象
var windowobj;
var defaultSize = { width: 300, height: 300 };
// if (process.platform == 'darwin') app.dock.hide();


ipcMain.on("openDevTools", openDevTools);

function createMainWindow(loadpath) {
  const {
    width,
    height
  } = electron.screen.getPrimaryDisplay().workAreaSize
  windowobj = {
    width: defaultSize.width,
    height: defaultSize.height,
    maximizable: false,
    minimizable: false,
    resizable: false,
    fullscreenable: false,
    frame: false,
    transparent: true,
    focusable: true,
    hasShadow: false,
    skipTaskbar: true,
    backgroundColor: "#00ffffff",
    // opacity:!config.get("transparent")?1:config.get("transparent"),
    // movable:false,
    show: false,
    alwaysOnTop: true,
    titleBarStyle: 'xxx',
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true,
      backgroundThrottling: false
    }
  }

  // let lastBounds = config.get('winBounds');
  // if(lastBounds)Object.assign(windowobj, {x:lastBounds.x,y:lastBounds.y});
  mainWindow = new BrowserWindow(windowobj);
  // mainWindow.webContents.openDevTools({mode:'detach',activate:true})
  // mainWindow.loadURL(path.posix.join("file:",__dirname, loadpath?('engine3.html?model='+loadpath):'engine3.html'));
  mainWindow.loadFile('index.html');
  mainWindow.once("ready-to-show", function () {
    mainWindow.show();
  });
  mainWindow.on('close', function () {});

  mainWindow.on('closed', function () {
    mainWindow = null;
  })

  globalShortcut.register('CommandOrControl+`', () => {});
}

function openDevTools() {
  if (mainWindow) mainWindow.webContents.openDevTools({ mode: 'detach', activate: true })
}

// 限制只可以打开一个应用, 当运行第二个实例时退出第一个实例
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  //app.quit()
}
app.on('second-instance', (event, commandLine, workingDirectory) => {
  app.quit();
})

app.on('ready', function () {
  createMainWindow();
})
app.on('window-all-closed', function () { })
app.on('activate', function () { })
app.on('browser-window-focus', function () { });
app.on('browser-window-blur', function () { });