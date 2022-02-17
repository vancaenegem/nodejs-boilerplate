const fs    = require('fs');
const path  = require('path');


// Liste de tous les modules
let myModules = {};
fs.readdirSync(__dirname).forEach(file => {
    if (path.extname(file) === '.js' && file !== 'index.js')  {
        let basename = path.basename(file, '.js');
        //console.log ('Adding route', basename, file);
        myModules[basename] = require ('./'+file);
    }
});

if (Object.keys(myModules).length > 0)    module.exports = myModules;