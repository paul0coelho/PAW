
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController.js')

// Página de login
router.get('/', loginController.login );

router.post('/loginDonator', loginController.loginDonator);

// Efetuar login
router.post('/loginSubmitted', loginController.submittedLogin );

// Efetuar logout
router.get('/logout', loginController.logout );

router.get('/logoutDonator', loginController.logoutDonator);

router.get('/profileDonator', loginController.profileDonator);

router.post('/register', loginController.registerDonator);


module.exports = router;