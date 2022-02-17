module.exports = function() {
    process.stdin.resume();//so the program will not close instantly

    /*process.on ('uncaughtException', (err, src)=>{
        console.log ('uncaughtException', err, src); 
    });

    process.on ('uncaughtExceptionMonitor', (err, src)=>{
        console.log ('Monitor', err, src); 
    });

    process.on ('unhandledRejection', (reason, promise)=>{
        console.log ('unhandled', reason); 
    });

    process.on ('warning', (warning)=>{
        console.log ('Warning', warning); 
    });*/

    process.on ('exit', (code)=>{
        console.log ('Exit app', code);
    });


    //catches ctrl+c event
    process.on('SIGINT', (name, num)=>{
        console.log('Signal', name, num);
        process.exitCode = num;
        process.exit();
    });
    
    // catches "kill pid" (for example: nodemon restart)
    //process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
    //process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

    //catches uncaught exceptions
    //process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
};

