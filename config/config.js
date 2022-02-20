// ----- getting the main working directory
let workingDirectory = require('path').dirname(process.argv[1]);

if (process.pkg !== undefined )             { workingDirectory = require('path').dirname(process.argv[0]); } // test si l'application a ete packagee avec l'outil "pkg"

if (process.env.pm_cwd !== undefined)       { workingDirectory = process.env.pm_cwd; } // test si l'application a ete lancee avec pm2

console.log ('workingDirectory ['+workingDirectory+']' );
// -----

global.__config = {
    appName : 'boilerplate',
    version : '1.0.0',
    debug   : true,
    env         : 'test',
    workingDirectory : workingDirectory,
    dataPath    : workingDirectory + '/data',
    logPath     : workingDirectory + '/logs',
    http        : {
        port    : 4001
    }  ,
    https       : {
        port        : 5001,
        keyfile     : __dirname+'/certificate/keytmp.pem',
        cert        : __dirname+'/certificate/cert.pem',
        passphrase  : 'pass'
    },
    swagger : true
};