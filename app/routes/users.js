
const router    = require('express').Router();
//const jwt       = require('jsonwebtoken');


// Formulaire de connexion 
router.post('/login', (req, res) => {
    console.log ('login', req.body);
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter the correct username and password' })
    }

    //const token = jwt.sign({
    //    id: 1,
    //    username: 'toto'
    //}, 'SECRET', { expiresIn: '3 hours' })

    return res.json({ access_token: 'ok' })
});


module.exports = router;