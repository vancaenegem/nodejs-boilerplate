/*const chokidar = require('chokidar');


let exampleWatcher = chokidar.watch (__config.dataPath, {
    persistent: true,
    //awaitWriteFinish: true, // emit single event when chunked writes are completed
    //atomic: true, // emit proper events when "atomic writes" (mv _tmp file) are used
    // The options also allow specifying custom intervals in ms
     awaitWriteFinish: {
       stabilityThreshold: 2000, // Amount of time in milliseconds for a file size to remain constant before emitting its event.
       pollInterval: 100 // File size polling interval, in milliseconds.
     },
     atomic: 100,
});

exampleWatcher.on('all', (event, path) => {
    console.log('chokidar',event, path);
    __app.socketio.emit('filesWatch', {event:event, path:path});
});

module.exports = {
    exampleWatcher : exampleWatcher
}
    
*/