const ping = require('../ping');
const router  = require('express').Router();


/**
 * @swagger
 * tags:
 *   - name: Core Model
 *     description: Core functionalities and utility endpoints (health checks, process info, etc.)
 */


const basicAuth = require('../express').basicAuth;
router.use(basicAuth);

/** 
 * @swagger 
 * /common/ping: 
 *   get: 
 *     summary: Informations de paramétrage
 *     description: Renvoie les principales information concernant le processus
 *     tags:
 *       - Core Model
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */  

router.get('/ping', (req, res, next) =>{
    res.json( ping() );
});


module.exports = router;