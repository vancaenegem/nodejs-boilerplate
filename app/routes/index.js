const fs    = require('fs');
const path  = require('path');


__logger.debug ('Integration de la liste des routes depuis le dossier ['+__dirname+']...');
// Liste de tous les modules
let myModules = {};
fs.readdirSync(__dirname).forEach(file => {
    if (path.extname(file) === '.js' && file !== 'index.js')  {
        let basename = path.basename(file, '.js');
        __logger.debug ('Loading ['+__dirname+'/'+file+']');
        myModules[basename] = require (__dirname+'/'+file);
    }
});

if (Object.keys(myModules).length > 0)    module.exports = myModules;