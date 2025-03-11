const pm2_module = require('./pm2');
const cronJobs = require('./cron');
const filesWatch = require('./filesWatch');


module.exports = function() {
    return {
                config  : __config,
                pm2     : pm2_module.stringify(),
                cron    : cronJobs.stringify(),
                env     : process.env,
                mem     : process.memoryUsage(),
                filesWatch : filesWatch.stringify()
    };
};