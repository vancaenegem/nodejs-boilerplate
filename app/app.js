const { init_express } = require('./express');
const EventEmitter = require('events');

global.__app = new EventEmitter();

function init_electron() {
    return new Promise ( (resolve, reject) => {
        const electron      = require('electron');
        if (electron.app === undefined) {
            resolve();
            return;
        }

        electron.app.on('window-all-closed', ()=> {
            electron.app.quit();
        });
        electron.app.on('ready', ()=>{
            __logger.info ('Electron ready.');
            resolve() ;
        });

        if (__config.electron.options.removeMenu === true) {
            electron.app.on("browser-window-created", (e, win) => {
                win.removeMenu();
            });
        }
        
    });
}

init_express().then((app)=>{
    if (app === null) {
        app = global.__app;
    }

    init_electron().then(()=>{
        app.emit ('ready');
    });
});
