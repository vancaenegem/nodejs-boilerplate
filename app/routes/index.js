const fs    = require('fs');
const path  = require('path');

let dossier = path.join(__config.workingDirectory, 'app', 'routes');
__logger.debug (`Integration de la liste des routes depuis le dossier [${dossier}]...`);
// Liste de tous les modules
let myModules = {};
fs.readdirSync(dossier).forEach(file => {
    if (path.extname(file) === '.js' && file !== 'index.js')  {
        let basename = path.basename(file, '.js');
        let chemin = path.join (dossier, file);
        __logger.debug (`Loading [${chemin}]`);
        myModules[basename] = require (chemin);
    }
});

if (Object.keys(myModules).length > 0)    module.exports = myModules;