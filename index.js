#!/usr/bin/env node

require ('./config/config');
require ('./app/logger');
require ('./app/app');

__app.once ('ready', ()=>{  
    __logger.info ('app ready');

    if (__config.electron !== undefined && __config.electron !== null) {
        const electron = require('electron');
        if (electron.BrowserWindow) {
            let mainWindow = new electron.BrowserWindow(__config.electron.options);
            mainWindow.on('closed', ()=> {
                mainWindow = null;
            });

            mainWindow.loadURL(__config.electron.url);
            if (__config.electron.options.devTools === true) {
                mainWindow.webContents.openDevTools(); // open devtools
            }
        }
    }   
});   
