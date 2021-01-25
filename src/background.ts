import * as electron from 'electron'
import { IScaling, IBounds } from './types/electron.types'

let mainWindow: any
const wait = 1000

const isDevelopment: boolean = process.env.NODE_ENV !== 'production'

if (isDevelopment) {
  require('module').globalPaths.push(process.env.NODE_MODULES_PATH)
}

electron.app.on('ready', async () => {
  const bounds = electron.screen.getPrimaryDisplay().workArea

  const scaling: IScaling = {
    splashScreen: { width: 350, height: 600 },
    app: { x: 1600, y: 900 },
    dividedBy: 2
  }
  const boundsCalc: IBounds = {
    splashScreen: {
      x: bounds.x + ((bounds.width - scaling.splashScreen.width) / scaling.dividedBy),
      y: bounds.y + ((bounds.height - scaling.splashScreen.height) / scaling.dividedBy)
    },
    app: {
      x: bounds.x + ((bounds.width - scaling.app.x) / scaling.dividedBy),
      y: bounds.y + ((bounds.height - scaling.app.y) / scaling.dividedBy)
    }
  }

  const loading = new electron.BrowserWindow({
    width: scaling.splashScreen.width,
    height: scaling.splashScreen.height,
    x: boundsCalc.splashScreen.x,
    y: boundsCalc.splashScreen.y,
    backgroundColor: '#36393E',
    show: false,
    frame: false
  })

  loading.once('show', () => {
    mainWindow = new electron.BrowserWindow({
      width: scaling.app.x,
      height: scaling.app.y,
      x: boundsCalc.app.x,
      y: boundsCalc.app.y,
      useContentSize: true,
      backgroundColor: '#36393E',
      show: false,
      frame: false
    })

    mainWindow.webContents.once('dom-ready', () => {
      mainWindow.show()
      loading.hide()
      loading.close()
    })

    setTimeout(() => {
      mainWindow.webContents.openDevTools()
      mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    }, wait)
  })

  await loading.loadURL('http://localhost:8080/splash-screen')
  loading.show()
})

electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.app.quit()
  }
})

electron.app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
  }
})
