const cronJobs      = require('../cron');

const router  = require('express').Router();

/**
 * @swagger
 * /cron/{jobName}/fire:
 *   get:
 *     summary: Exécution d'un job à la demande
 *     description: Lance un job cron spécifique
 *     parameters:
 *       - in: path
 *         name: jobName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom du job à démarrer
 *     tags:
 *       - Core Model
 *     responses:
 *       200:
 *         description: Tous les jobs ont été démarrés
 */
router.get('/:jobName/fire', (req, res) => {
    const jobName = req.params.jobName;
    if (cronJobs[jobName] && typeof cronJobs[jobName].fireOnTick === 'function') {
        cronJobs[jobName].fireOnTick();
        res.status(200).json({ message: `Le job [${jobName}] a été démarré.` });
    } else {
        res.status(404).json({ error: `Job [${jobName}] non trouvé ou start() non disponible.` });
    }
});

/** 
 * @swagger 
 * /cron: 
 *   get: 
 *     description: Liste de tous les jobs
 *     summary: Taches planifiées
 *     tags:
 *       - Core Model
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */  

router.get('/', (req, res, next) =>{
    res.json(cronJobs.stringify());
});


module.exports = router;