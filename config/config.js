global.__config = {
    appName : 'boilerplate',
    version : '1.0.0',
    debug   : true,
    env     : 'test',
    http    : {
        port    : 4001
    }  ,
    https    : {
        port        : 5001,
        keyfile     : 'config/certificate/keytmp.pem',
        cert        : 'config/certificate/cert.pem',
        passphrase  : 'pass'
    },
    swagger : true,
    appPath  : '.',
    dataPath : './data',
    
};