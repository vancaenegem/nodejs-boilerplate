# Nodejs Boilerplate for RESTful API

## Install

## Start the app



### Manually

The file line of ./index.js contains the path to the node executable
```
#!/usr/bin/env node
```

Linux environnement
- Typing ```./index.js``` or ```node index.js``` starts the app.

Windows environnement
- Typing ```node index.js``` starts the app

### With pm2

First check the file ```ecosystem.config.js``` then ```run pm2 start ecosystem.config.js```

### Debug with vsCode

The file ```.vscode/launch.json``` describes debug - there's nothing to do -

## Logs

Winston is the logger used in this boilerplate.<br />
They are actually configuraed in the file ```./app/logger.js```.<br/>
Multiple loggers can be defined in the global object ```__loggers``` . The default logger is  ```__logger```.


## Cron
Module used as deal with cron jobs :
https://github.com/kelektiv/node-cron. <br />
An example is given in the ```./app/cron``` directory
