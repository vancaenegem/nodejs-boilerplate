const router    = require('express').Router();
const pm2Module = require('../pm2');


/** 
 * @swagger 
 * /pm2/: 
 *   get: 
 *     summary: Process Monitoring
 *     description: Informations PM2
 *     tags:
 *       - Core Model
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */ 
router.get('/', (req, res) => {
    return res.json(pm2Module);
});

/** 
 * @swagger 
 * /pm2/out/{size}: 
 *   get: 
 *     summary: Sortie standard
 *     description: Consultations des messages de sortie standard de l'application
 *     parameters:
 *       - in: path
 *         name: size
 *         schema:
 *           type: integer
 *         required: false
 *         description: Nombre de ligne a afficher en commençant par la fin
 *     tags:
 *       - Core Model
 *     responses:  
 *       200: 
 *         description: Success 
 *         content:
 *           text/plain:
 *           schema:
 *             type: string
 *   
 */ 
 router.get('/out/:size?', (req, res) => {
    let size = 0;
    if (req.params.size !== undefined) { size = req.params.size;}
    
    res.set('Content-Type', 'text/plain');
    return res.send(pm2Module.log('out', size));
});

/** 
 * @swagger 
 * /pm2/err/{size}:  
 *   get: 
 *     summary: Sortie d'erreur
 *     description: Consultations des messages de sortie d'erreur de l'application
 *     parameters:
 *       - in: path
 *         name: size
 *         schema:
 *           type: integer
 *         required: false
 *         description: Nombre de ligne a afficher en commençant par la fin
 *     tags:
 *       - Core Model
 *     responses:  
 *       200: 
 *         description: Success 
 *         content:
 *           text/plain:
 *           schema:
 *             type: string
 *   
 */  
 router.get('/err/:size?', (req, res) => {
    let size = 0;
    if (req.params.size !== undefined) { size = req.params.size;}
    
    res.set('Content-Type', 'text/plain');
    return res.send(pm2Module.log('err', size));
});

/** 
 * @swagger 
 * /pm2/flush: 
 *   get: 
 *     summary: Nettoyage des logs
 *     description: Flush logs
 *     tags:
 *       - Core Model
 *     responses:  
 *       200: 
 *         description: Success 
 */ 
 router.get('/flush', (req, res) => {
    return res.json(pm2Module.flush());
});

module.exports = router;
