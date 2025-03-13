const fs    = require('fs');
const path  = require('path');



let filesWatch = {};
fs.readdirSync(__dirname).forEach( (file) => {
    if (path.extname(file) === '.js' && file !== 'index.js')   {
        let filename = path.join (__dirname, file)
        let watcher = require(filename);
        filesWatch = {...filesWatch, ...watcher};
    }
});

filesWatch.stringify = function() {
    let reponse = {};
    let cpt = 0;
    Object.keys(this).forEach( (key) => {        
        if (key === 'stringify') { return;}
        reponse[key] = this[key].getWatched();
        cpt++;
    });

    if (cpt > 0) return reponse;
    return null;
}

module.exports = filesWatch;