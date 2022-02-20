
const routes        = require('./routes');


const express       = require('express');
const cors          = require('cors')

const fs            = require('fs');

const swaggerJSDoc  = require('swagger-jsdoc');  
const swaggerUI     = require('swagger-ui-express');  

let socketio        = require('socket.io')();

global.__app        = express();
let config  = __config;
let app     = __app;

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
if (config.swagger !== undefined && config.swagger === true ) {
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

if (config.http !== undefined && config.http !== null) {
    let httpServer = require('http').createServer(app);
    socketio.attach(httpServer);
    promesses.push (httpServer.listen(config.http.port,  function () {
        __logger.info('HTTP Server listening on port ['+ config.http.port+']');
    }));
}

if (config.https !== undefined && config.https !== null) {
    let opts = {    key         : fs.readFileSync(config.https.keyfile),
                    cert        : fs.readFileSync(config.https.cert),
                    passphrase  : config.https.passphrase
                };
    let httpsServer = require('https').createServer(opts, app);
    socketio.attach(httpsServer);
    promesses.push (httpsServer.listen(config.https.port,  function () {
        __logger.info('HTTPS Server listening on port ['+ config.https.port+']');
    }));
}

Promise.all (promesses).then (()=>{
    app.emit ('ready');
});

app.socketio = socketio;

module.exports = app;