
var express = require('express');
var router = express.Router();
const loginController = require('../controllers/LoginController.js')

// Página de login
router.get('/', loginController.login );

// Efetuar login
router.post('/loginSubmitted', loginController.submittedLogin );

// Efetuar logout
router.get('/logout', loginController.logout );


module.exports = router;