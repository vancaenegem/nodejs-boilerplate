const ping = require('../ping');
const router  = require('express').Router();

/*
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});*/

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