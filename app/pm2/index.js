const fs                = require('fs');
const child_process     = require('child_process');

let pm2_env = [ 'PM2_USAGE', 
                'NODE_APP_INSTANCE', 
                'pm_id', 
                'name', 
                'pm_pid_path', 
                'pm_err_log_path', 
                'pm_out_log_path', 
                'pm_exec_path', 
                'node_args', 
                'pm_cwd', 
                'autorestart', 
                'status',
                'restart_time',
                'pm_uptime'];



let pm2_module = {};
pm2_env.forEach ((elt)=>{
    if (process.env[elt] !== undefined) pm2_module[elt] = process.env[elt];
});

pm2_module.log = function (what = 'out', size = 0) {
    let varname;
    switch (what) {
        case 'out'  : varname = 'pm_out_log_path'; break;
        default     : varname = 'pm_err_log_path'; break;
    }
    if (pm2_module[varname] === undefined || pm2_module[varname] === null)   return null;
    
    // Lecture du fichier de log
    let content = fs.readFileSync(pm2_module[varname]);
    if (size <= 0) { return content;}

    // au besoin, ne renvoie que les "size" dernieres lignes
    let lines = content.toString().split('\n');
    if (lines.length <= size) {return content;}

    lines.splice (0, lines.length - size);
    return lines.join ('\n');
}

// flush logs
pm2_module.flush = function () {    // This will empty the current application logs managed by PM2
    if (this.pm_id === undefined) return false;

    let commande = 'pm2 flush ' + this.pm_id;
    console.log ('exec', commande)
    let reponse = child_process.execSync (commande);
    console.log (reponse.toString());
    return reponse;
}

module.exports = pm2_module;