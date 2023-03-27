
const ping = require('../ping');

module.exports = function (app, socket) {
    __logger.info ('connection client [' + socket.id + ']');
    socket.on('disconnect',  () => {
        //console.log ('disconnect ici');
    });

    socket.on('ping',  (callback) => {
        if (typeof (callback) === 'function') callback(ping());
    });

};


