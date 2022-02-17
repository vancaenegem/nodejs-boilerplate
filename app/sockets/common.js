
const ping = require('../ping');

module.exports = function (app, socket) {
    console.log ('connection client', socket.id);
    socket.on('disconnect',  () => {
        //console.log ('disconnect ici');
    });

    socket.on('ping',  (callback) => {
        if (typeof (callback) === 'function') callback(ping());
    });

};


