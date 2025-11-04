const path = require('path');

function basicAuth(req, res, next) {
    const config = global.__config;

    const auth = req.headers.authorization;
    if (!auth) {
        res.set('WWW-Authenticate', 'Basic realm="Restricted Area"');
        return res.status(401).json({ error: 'Authentication required' });
    }

    const [scheme, encoded] = auth.split(' ');
    if (scheme !== 'Basic' || !encoded) {
        res.set('WWW-Authenticate', 'Basic realm="Restricted Area"');
        return res.status(401).json({ error: 'Invalid authorization header' });
    }

    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const idx = decoded.indexOf(':');
    if (idx === -1) {
        res.set('WWW-Authenticate', 'Basic realm="Restricted Area"');
        return res.status(401).json({ error: 'Invalid authorization value' });
    }

    const user = decoded.slice(0, idx);
    const pass = decoded.slice(idx + 1);

    // Verification des identifiants
    if (config.express.basicAuth && Array.isArray(config.express.basicAuth.users)) {
        const validUser = config.express.basicAuth.users.find( u => u.login === user && u.password === pass);       
        if (validUser) return next();
    }
    
    res.set('WWW-Authenticate', 'Basic realm="Restricted Area"');
    return res.status(401).json({ error: 'Invalid credentials' });
}


function init_express() {
    return new Promise ( (resolve, reject) => {
        const config = global.__config;
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

        const swaggerJSDoc  = require('swagger-jsdoc');  
        const swaggerUI     = require('swagger-ui-express');  

        let socketio        = require('socket.io')();

        global.__app        = express();
        let app     = global.__app;

        // ----- Activation de CORS
        if (config.express.cors === true )  app.use(cors());        
        if (config.express.json)            app.use(express.json(config.express.json));    // ----- Activation du raw (json)
        if (config.express.text)            app.use(express.text(config.express.text));    // ----- Activation du mode text
        if (config.express.urlencoded)      app.use(express.urlencoded(config.express.urlencoded)); // ----- Activation du mode urlencoded

        // ----- Ajout du partage de  documents 'public'
        let publicPath = path.join(global.__config.workingDirectory, 'public');
        if (fs.existsSync(publicPath) ) {
            app.use(express.static(publicPath, {index:['index.html'], extensions:['html']}) );
            global.__logger.info ('public available at /');
        }

        let swaggerAPIS = [];
        Object.keys(routes).forEach( (key) => {
            swaggerAPIS.push (path.join(global.__config.workingDirectory, 'app', 'routes', `${key}.js`));
            app.use(`/${key}`, routes[key]);
        });

        // ----- Swagger Configuration  --------------------------------------
        if (config.express.swagger === true ) {
            const swaggerOptions = {  
                definition: {  
                    openapi: '3.0.0', // Specify the OpenAPI version 
                    info: {  
                        title:config.appName,  
                        version:`${config.version} - ${config.env}`,
                        description:config.description,
                        contact:config.author
                    },
                    tags: [
                        {
                            name: 'Core Model',
                            description: 'Core functionalities.'
                        }
                    ]
                },  
                apis : swaggerAPIS,  
            }  

            const swaggerDocs = swaggerJSDoc(swaggerOptions);  
            app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, {explorer:false}));

            global.__logger.info('swagger available at /api-docs');
        }
        // -------------------------------------------------------------------


        // Communications par sockets
        require(path.join(global.__config.workingDirectory, 'app', 'sockets', 'index'))(app, socketio);

        let promesses = [];

        if (config.express.http !== undefined && config.express.http !== null) {
            let httpServer = require('http').createServer(app);
            socketio.attach(httpServer);
            promesses.push (httpServer.listen(config.express.http.port,  function () {
                global.__logger.info('HTTP Server listening on port ['+ config.express.http.port+']');
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
                global.__logger.info('HTTPS Server listening on port ['+ config.express.https.port+']');
            }));
        }

        app.socketio = socketio;

        Promise.all (promesses).then (()=>{
            resolve(app);
        });
    });
}

module.exports = {
    basicAuth,
    init_express
};