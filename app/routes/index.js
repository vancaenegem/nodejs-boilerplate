const fs    = require('fs');
const path  = require('path');

let dossier = path.join(__config.workingDirectory, 'app', 'routes');
__logger.debug (`Integration de la liste des routes depuis le dossier [${dossier}]...`);
// Liste de tous les modules
let myModules = {};
let bytenodeRegistered = false;
const routesFiles = fs.readdirSync(dossier);
const routeCandidates = {};

routesFiles.forEach(file => {
    if (file === 'index.js') return;

    if (file.endsWith('.js')) {
        const routeName = file.slice(0, -'.js'.length);
        routeCandidates[routeName] = routeCandidates[routeName] || {};
        routeCandidates[routeName].source = path.join(dossier, file);
    }

    if (file.endsWith('.jsc')) {
        const routeName = file.slice(0, -'.jsc'.length);
        routeCandidates[routeName] = routeCandidates[routeName] || {};
        routeCandidates[routeName].compiled = path.join(dossier, file);
        return;
    }

    
});

Object.entries(routeCandidates).forEach(([routeName, paths]) => {
    const { compiled, source } = paths;
    let loaded = false;

    if (compiled) {
        if (!bytenodeRegistered) {
            try {
                require('bytenode');
                bytenodeRegistered = true;
            } catch (err) {
                __logger.warn('bytenode not installed: cannot load .jsc files');
            }
        }

        if (bytenodeRegistered) {
            try {
                __logger.debug(`Loading compiled route [${compiled}]`);
                myModules[routeName] = require(compiled);
                loaded = true;
            } catch (err) {
                __logger.warn(`Failed to load compiled route ${compiled}: ${err.message}`);
                if (err.message && err.message.includes('cachedDataRejected')) {
                    __logger.warn(`Falling back to source route for [${routeName}]`);
                } else {
                    throw err;
                }
            }
        }
    }

    if (!loaded) {
        if (source) {
            __logger.debug(`Loading source route [${source}]`);
            myModules[routeName] = require(source);
        } else if (compiled) {
            throw new Error(`Compiled route ${compiled} failed to load and no source fallback is available`);
        }
    }
});

if (Object.keys(myModules).length > 0) module.exports = myModules;