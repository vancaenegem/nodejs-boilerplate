const bytenode  = require('bytenode');
const path      = require('path');
const fs        = require('fs');

let dossier = path.join(__dirname, '..', 'app', 'routes');
console.log (`Integration de la liste des routes depuis le dossier [${dossier}]...`);


exclude = ['common', 'cron', 'pm2', 'socket', 'swagger'];
exclude = exclude.map (file=>`${file}.js`);

const files = fs.readdirSync(dossier);

files.forEach(file => {
    if (file === 'index.js')        return;
    if (exclude.includes (file))    return;
    if (file.endsWith('.js')) {
        let input = path.join(dossier, file);
        let output = input + 'c';

        console.log(`Compiling:[${input}] to [${output}]` );
        // TODO : ajuster automatiquement la variable 'electronMain'
        bytenode.compileFile({ filename: input, output, electronMain: false });
        console.log('OK');
    }
});


