const pm2_module = require('./pm2');
const cronJobs = require('./cron');
const filesWatch = require('./filesWatch');



function hidePasswords(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (key.match(/^pass|^pwd$/i)) {
                // Si la clé correspond à un mot de passe, on la masque
                obj[key] = '********';
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                // Si la valeur est un objet ou un tableau, on appelle récursivement la fonction
                hidePasswords(obj[key]);
            }
        }
    }
    return obj;
}



module.exports = function() {
    let cfg =  hidePasswords(JSON.parse(JSON.stringify(__config)));

    return {
                config  : cfg,
                pm2     : pm2_module.stringify(),
                cron    : cronJobs.stringify(),
                env     : process.env,
                mem     : process.memoryUsage(),
                filesWatch : filesWatch.stringify()
    };
};