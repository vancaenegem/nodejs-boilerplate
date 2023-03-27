#!/usr/bin/env node

const electron = require('electron');
require ('./config/config');
require ('./app/logger');
require ('./app/app');



__app.once ('ready', ()=>{  
    __logger.info ('app ready');

    if (electron.BrowserWindow) {
        let mainWindow = new electron.BrowserWindow(__config.electron.options);
        mainWindow.loadURL(__config.electron.url);
        mainWindow.on('closed', function() {
            mainWindow = null;
        });
        //mainWindow.webContents.openDevTools(); // open devtools
    }


});   
