const router    = require('express').Router();
const pm2Module = require('../pm2');


/** 
 * @swagger 
 * /pm2/: 
 *   get: 
 *     description: Informations PM2
 *     tags:
 *       - pm2
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
 *     description: Sortie standard de l'application
 *     parameters:
 *       - in: path
 *         name: size
 *         schema:
 *           type: integer
 *         required: false
 *         description: Nombre de ligne a afficher en commençant par la fin
 *     tags:
 *       - pm2
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
 *     description: Sortie d'erreur de l'application
 *     parameters:
 *       - in: path
 *         name: size
 *         schema:
 *           type: integer
 *         required: false
 *         description: Nombre de ligne a afficher en commençant par la fin
 *     tags:
 *       - pm2
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
 *     description: Flush logs
 *     tags:
 *       - pm2
 *     responses:  
 *       200: 
 *         description: Success 
 *         content:
 *           text/plain:
 *           schema:
 *             type: string 
 */ 
 router.get('/flush', (req, res) => {
    return res.json(pm2Module.flush());
});

module.exports = router;
