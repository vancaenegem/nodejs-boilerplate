let config  = __config;

const tx2           = require('./tx2')();
const cronJobs      = require('./cron');

let app = {};

if (config.express !== undefined && config.express !== null) {
    const fs            = require('fs');
    const routes        = require('./routes');
    const express       = require('express');
    const cors          = require('cors')

    const swaggerJSDoc  = require('swagger-jsdoc');  
    const swaggerUI     = require('swagger-ui-express');  

    let socketio        = require('socket.io')();

    global.__app        = express();
    app     = __app;

    // ----- Activation de CORS
    app.use(cors());

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

    Promise.all (promesses).then (()=>{
        app.emit ('ready');
    });

    app.socketio = socketio;
}else { // Si le module 'express' non utilise
    const EventEmitter = require('events');
    global.__app = new EventEmitter();
    app = global.__app;

    app.emit ('ready');
}


module.exports = app;