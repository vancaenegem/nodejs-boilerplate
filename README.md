# Nodejs Boilerplate for RESTful API

## Install

```
git clone https://github.com/vancaenegem/nodejs-boilerplate.git new-project
cd new-project
npm install
```

## configure

### Run mode as an Electron app
By default this bpoilerplate is configured to run as an Electron app. Nothing to do so

### Run mode as a daemon
Change the start directive in the ```package.json``` file :

```
{
  "scripts": {
    "start_daemon": "node index.js",
    "start":"electron ."
}
```
You have to use replace ```start_daemon``` with the ```start``` directive to run your app as a daemon.


### global configuration

Change the project name in the following files
- ```config/config.js```
- ```package.json```
- For running app with pm2 ```ecosystem.config.js```

## Start the app

### NPM

NPM will read your ```package.json``` file and start the app : 
```npm start```

### Manually

The file line of ./index.js contains the path to the node executable
```
#!/usr/bin/env node
```

So under Linux environnement
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

# Package

## with pkg

Firsty install pkg

```npm install -g pkg```

```pkg .```

## Electron executable

https://github.com/electron/electron-packager

```npm install electron-packager```

```npx electron-packager . --out=dist (--asar)```
