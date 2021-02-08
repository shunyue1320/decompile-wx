import path from 'path'
import { app, BrowserWindow, Menu, screen, globalShortcut, ipcMain, nativeImage } from 'electron'
import { doFile } from './decompiler/wxapkg'

const nodeEnv = process.env.NODE_ENV || 'development'

let mainWindow
function createWindow() {
  const area = screen.getPrimaryDisplay().workAreaSize
  const minWidth = 800
  const minHeight = 600
  mainWindow = new BrowserWindow({
    width: Math.max(parseInt(area.width * 0.5, 10), minWidth),
    height: Math.max(parseInt(area.height * 0.5, 10), minHeight),
    minWidth,
    minHeight,
    autoHideMenuBar: true,
    icon:  nativeImage.createFromPath(path.join(__dirname, 'logo.ico')),
    webPreferences: {
      nodeIntegration: true
    },
    title: '小程序反编译'
  })

  ipcMain.on('decompiler-start', (event, entryPath) => {
    doFile(entryPath, ()=>{}, [])
    const openPath = path.dirname(entryPath)
    setTimeout(()=>{
      event.sender.send('decompiler-success', { content: '反编译成功', path: openPath })
    }, 2000)
  })

  if (nodeEnv === 'production') {
    mainWindow.on('focus', (e) => {
      globalShortcut.registerAll(['CommandOrControl+R','F5'], () => {})
    })

    mainWindow.on('blur', (e) => {
      globalShortcut.unregisterAll()
    })
    mainWindow.loadFile('dist/index.html')
  } else {
    mainWindow.loadURL('http://localhost:8080/')
  }
}

if (nodeEnv === 'production') {
  Menu.setApplicationMenu(null)
}

app.on('ready', createWindow)