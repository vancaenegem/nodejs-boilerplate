const cronJobs      = require('../cron');

const router  = require('express').Router();

/** 
 * @swagger 
 * /cron: 
 *   get: 
 *     description: Liste de tous les jobs
 *     tags:
 *       - cron
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */  

router.get('/', (req, res, next) =>{
    res.json(cronJobs.stringify());
});


module.exports = router;