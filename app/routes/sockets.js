const router  = require('express').Router();

/*
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});*/

/** 
 * @swagger 
 * /sockets: 
 *   get: 
 *     summary: Connexions actives
 *     description: Renvoie la liste des clients connectes
 *     tags:
 *       - Core Model
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */  

router.get('/', async (req, res, next) =>{
    let app = require('../app');
    let clients = [];
    app.socketio.sockets.sockets.forEach(function(value, key) {
        clients.push (key);
    });    
    res.json( clients );
});


module.exports = router;