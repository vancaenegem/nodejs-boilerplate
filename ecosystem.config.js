// Fichier de deploiement pm2

module.exports = {
  apps : [{
    name   : 'boilerplate',
    script : "./index.js",
    time: true,  
    watch: false,
    log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
    autorestart : true,
    //log_type : 'json',
    //merge_logs: true,
    out_file : './logs/out.log',
    error_file : './logs/err.log'

  }]
}
