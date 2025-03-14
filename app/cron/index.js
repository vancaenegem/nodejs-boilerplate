
const fs    = require('fs');
const path  = require('path');


let cronJobs = {};
fs.readdirSync(__dirname).forEach( (file) => {
    if (path.extname(file) === '.js' && file !== 'index.js')   {
        let jobs = require ('./'+file)
        cronJobs = {...cronJobs, ...jobs};
    }
});

cronJobs.stringify = function() {
    let reponse = {};
    cpt = 0;
    Object.keys(this).forEach( (key) => {        
        if (key === 'stringify')                        { return; }
        if (typeof (this[key].lastDate) !== 'function') {return;}
        reponse[key] = {
            lastDate : this[key].lastDate(),
            nextDates : this[key].nextDates(),
        };
        cpt++;
    });
    if (cpt > 0) return reponse;
    return null;
}
module.exports = cronJobs;
