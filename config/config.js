const { json, text } = require('stream/consumers');
const pjson = require('../package.json');
const path  = require('path');

// Determine le dossier de travail en fonction de l'environnement d'execution (PM2 ou autre)
// ----- getting the main working directory
let workingDirectory = process.cwd();
if (require.main.path !== undefined)        { workingDirectory = require.main.path;};
if (process.pkg !== undefined )             { workingDirectory = path.dirname(process.pkg.entrypoint); } // test si l'application a ete packagee avec l'outil "pkg"
if (process.env.pm_cwd !== undefined)       { workingDirectory = process.env.pm_cwd; } // test si l'application a ete lancee avec pm2

console.log ('workingDirectory ['+workingDirectory+']' );

global.__config = {
    appName : pjson.name,
    version : pjson.version,
    description : pjson.description,
    author : pjson.author,
    debug   : true,
    env     : 'test',
    workingDirectory : workingDirectory,
    dataPath    : path.join (workingDirectory, 'data'), // Attention : modifier ce chemin si utilisation sous forme d'un executable pkg
    logPath     : path.join (workingDirectory, 'logs'), // Attention : modifier ce chemin si utilisation sous forme d'un executable pkg
    express     :{
                    enabled     : true,
                    http        : {
                        port    : 4001
                    }  ,
                    https       : {
                        port        : 5001,
                        keyfile     : path.join(workingDirectory, 'config', 'certificate', 'keytmp.pem'),
                        cert        : path.join(workingDirectory, 'config', 'certificate', 'cert.pem'),
                        passphrase  : 'pass'
                    },
                    swagger : true,
                    cors : true,
                    json : {limit:'10Mb'},
                    urlencoded : {limit:'10Mb', extended:true},
                    text : {limit:'10Mb'}
    },
    electron    :{
                    url : 'http://localhost:4001',
                    options : {
                            width: 800, height: 600,
                            title : pjson.name,
                            devTools : true,
                            removeMenu : false,
                            webPreferences: {
                                preload: path.join(workingDirectory, 'preload.js'),
                                webSecurity: true,
                                contextIsolation: true,
                                nodeIntegration: true 
                            }
                    }
    }
};
