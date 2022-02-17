const fs    = require('fs');
const path  = require('path');

let clients = [];

// Liste de tous les modules websockets
let myModules = [];
fs.readdirSync(__dirname).forEach( (file) => {
    if (path.extname(file) === '.js' && file !== 'index.js')   myModules.push ('.' + path.sep + file);
});

module.exports = function (app, socketio) {
    socketio.on('connection',  (socket) => {
        clients[socket.id] = socket;
        socket.on('disconnect',  () => {
            delete (clients[socket.id]);
        });
        
        // ----- Chargement de tous les modules disponibles
        myModules.forEach(filename=> {   
            //console.log ('adding websocket', filename) ;
            require(filename)(app, socket);
        });
    });
};