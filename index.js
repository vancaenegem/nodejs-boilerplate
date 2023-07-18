#!/usr/bin/env node

const electron = require('electron');
require ('./config/config');
require ('./app/logger');
require ('./app/app');



__app.once ('ready', ()=>{  
    __logger.info ('app ready');

    if (electron.BrowserWindow) {
        if (__config.electron !== undefined && __config.electron !== null) {
            if (__config.electron.options.removeMenu === true) {
                electron.app.on("browser-window-created", (e, win) => {
                    win.removeMenu();
                });
            }
            
            let mainWindow = new electron.BrowserWindow(__config.electron.options);
            
            mainWindow.on('closed', function() {
                mainWindow = null;
            });
            
            mainWindow.loadURL(__config.electron.url);

            if (__config.electron.devTools === true) {
                mainWindow.webContents.openDevTools(); // open devtools
            }
        }   
    }
});   
