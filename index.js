#!/usr/bin/env node

const electron = require('electron');
require ('./config/config');
require ('./app/logger');
require ('./app/app');



__app.once ('ready', ()=>{  
    console.log('app ready'); 

    if (electron.BrowserWindow) {
        let mainWindow = new electron.BrowserWindow({width: 800, height: 600});
        mainWindow.loadURL(__config.electron.url);
        mainWindow.on('closed', function() {
            mainWindow = null;
        });
    }


});   
