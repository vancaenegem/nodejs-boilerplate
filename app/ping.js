const pm2_module = require('./pm2');
const cronJobs = require('./cron');

module.exports = function() {
    return {
                config  : __config,
                pm2     : pm2_module,
                cron    : cronJobs.stringify(),
                env     : process.env
    };
};