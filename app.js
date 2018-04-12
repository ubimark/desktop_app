let electron = require('electron');
const {app,BrowserWindow} = electron;
const path = require('path');
const nativeImage = electron.nativeImage;

let icon = nativeImage.createFromPath(path.join(__dirname,'build/ubi-icon_256x256.png'));

app.setName("Ubimark");

app.on('ready',() => {
    console.log(electron.screen.getPrimaryDisplay().workAreaSize);
    let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
    height += 40;
    console.log(width+' '+height);
    let mainWindow = new BrowserWindow({
        width,
        height, 
        show : false,
        icon : icon,
        webPreferences: {
            nodeIntegration: false
            //preload: './preload.js'
          }
    });
    mainWindow.loadURL(`https://127.0.0.1/ubimark/`);
    
    mainWindow.once('ready-to-show', () => {
        mainWindow.setMenu(null);
        mainWindow.maximize();
        mainWindow.show();
      });
    mainWindow.on('close',() => {
        mainWindow = null;
    });
});

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault();
    callback(true);
});

app.on('Window-all-closed',()=>{
    if(process.platfrom!=='drawin'){
        app.quit();
    }
});