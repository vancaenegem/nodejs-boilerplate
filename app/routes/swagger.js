const router = require('express').Router();

/** 
 * @swagger 
 * /swagger/enable: 
 *   get: 
 *     summary: Activer la documentation Swagger
 *     description: Active l'interface Swagger UI (/api-docs) sans redémarrer l'application
 *     tags:
 *       - Core Model
 *     responses:  
 *       200: 
 *         description: Swagger activé  
 */ 
router.get('/enable', (req, res) => {
    if (!req.app.swagger || !req.app.swagger.enable) {
        return res.status(500).json({ error: 'Swagger is not configured on this application.' });
    }

    req.app.swagger.enable();
    return res.json({ swagger: 'enabled' });
});

/** 
 * @swagger 
 * /swagger/disable: 
 *   get: 
 *     summary: Désactiver la documentation Swagger
 *     description: Désactive l'interface Swagger UI (/api-docs) sans redémarrer l'application
 *     tags:
 *       - Core Model
 *     responses:  
 *       200: 
 *         description: Swagger désactivé  
 */ 
router.get('/disable', (req, res) => {
    if (!req.app.swagger || !req.app.swagger.disable) {
        return res.status(500).json({ error: 'Swagger is not configured on this application.' });
    }

    req.app.swagger.disable();
    return res.json({ swagger: 'disabled' });
});

/** 
 * @swagger 
 * /swagger/status: 
 *   get: 
 *     summary: Etat de Swagger
 *     description: Retourne l'état courant d'activation de Swagger UI
 *     tags:
 *       - Core Model
 *     responses:  
 *       200: 
 *         description: Etat courant de Swagger  
 */ 
router.get('/status', (req, res) => {
    if (!req.app.swagger || !req.app.swagger.isEnabled) {
        return res.status(500).json({ error: 'Swagger is not configured on this application.' });
    }

    return res.json({ enabled: req.app.swagger.isEnabled() });
});

module.exports = router;
