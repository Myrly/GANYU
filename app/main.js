const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");

// Keep a global reference of the dist path
let distPath = path.join(__dirname, "/dist/browser/");

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // load the dist folder from Angular
  win.loadURL(path.join(distPath, "index.html"));

  win.on("closed", () => {
    win = null;
  });

}

app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// function to open a new window that is an overlay showing above every app, click through, no focus, no taskbar, no dock, no menubar, no titlebar, path is /overlay/overlay.component.html
//ipcMain.on("open-overlay", () => {
function openOverlay() {
  const overlay = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  overlay.loadURL(path.join(distPath, "index.html"));

  win.on("closed", () => {
    win = null;
  });

}
//});



document.querySelector('#openOverlayButton').addEventListener('click', () => {
    openOverlay();
  });
