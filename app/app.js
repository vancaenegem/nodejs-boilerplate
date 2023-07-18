const EventEmitter = require('events');

let config  = __config;

global.__app = new EventEmitter();;
let app = global.__app;

function init_electron() {
    return new Promise ( (resolve, reject) => {
        const electron      = require('electron');
        if (electron.app === undefined) {
            resolve();
            return;
        }

        electron.app.on('window-all-closed', function() {
            electron.app.quit();
        });
        electron.app.on('ready', ()=>{
            __logger.info ('Electron ready.');
            resolve() ;
        });
    });
}

function init_express() {
    return new Promise ( (resolve, reject) => {
        if (config.express === undefined || config.express === null) {
            resolve (null);
            return null;
        }

        if (config.express.enabled === false) {
            resolve (null);
            return null;
        }

        const fs            = require('fs');
        const routes        = require('./routes');
        const express       = require('express');
        const cors          = require('cors');
        const ipfilter      = require('express-ipfilter').IpFilter;

        const swaggerJSDoc  = require('swagger-jsdoc');  
        const swaggerUI     = require('swagger-ui-express');  

        let socketio        = require('socket.io')();

        global.__app        = express();
        app     = __app;

        // ----- Activation de CORS
        app.use(cors());

        // ----- filtre des IP
        if (config.ipfilter !== undefined) {
            app.use(ipfilter(config.ipfilter.ips, config.ipfilter.options));
        }

        // ----- Activation du raw (json)
        app.use(express.json())                        

        // ----- Ajout du partage de  documents 'public'
        if (fs.existsSync(__dirname + '/../public')) {
            app.use(express.static(__dirname + '/../public', {index:['index.html'], extensions:['html']}) );
            __logger.info ('public available at /');
        }

        let swaggerAPIS = [];
        Object.keys(routes).forEach( (key) => {
            swaggerAPIS.push (`app/routes/${key}.js`);
            app.use(`/${key}`, routes[key]);
        });

        // ----- Swagger Configuration  --------------------------------------
        if (config.express.swagger !== undefined && config.express.swagger === true ) {
            const swaggerOptions = {  
                swaggerDefinition: {  
                    info: {  
                        title:config.appName,  
                        version:config.version  
                    }  
                },  
                apis : swaggerAPIS,  
            }  

            const swaggerDocs = swaggerJSDoc(swaggerOptions);  
            app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

            __logger.info('swagger available at /api-docs');
        }
        // -------------------------------------------------------------------


        // Communications par sockets
        require('./sockets/index')(app, socketio);

        let promesses = [];

        if (config.express.http !== undefined && config.express.http !== null) {
            let httpServer = require('http').createServer(app);
            socketio.attach(httpServer);
            promesses.push (httpServer.listen(config.express.http.port,  function () {
                __logger.info('HTTP Server listening on port ['+ config.express.http.port+']');
            }));
        }

        if (config.express.https !== undefined && config.express.https !== null) {
            let opts = {    key         : fs.readFileSync(config.express.https.keyfile),
                            cert        : fs.readFileSync(config.express.https.cert),
                            passphrase  : config.express.https.passphrase
                        };
            let httpsServer = require('https').createServer(opts, app);
            socketio.attach(httpsServer);
            promesses.push (httpsServer.listen(config.express.https.port,  function () {
                __logger.info('HTTPS Server listening on port ['+ config.express.https.port+']');
            }));
        }

        app.socketio = socketio;

        Promise.all (promesses).then (()=>{
            resolve(app);
        });
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
