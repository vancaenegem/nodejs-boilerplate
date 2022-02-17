#!/usr/bin/env node

require ('./config/config');
require ('./app/logger');
require ('./app/app');


__app.once ('ready', ()=>{
    __logger.log('info', 'app ready');
    
});
