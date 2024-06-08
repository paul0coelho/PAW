const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController.js')
const multer = require('multer');
const upload = multer({ dest: 'images/entities' });

// Página de login
router.get('/', loginController.login2 );

router.post('/login', loginController.login);

// Efetuar login
router.post('/loginSubmitted', loginController.submittedLogin );

// Efetuar logout
router.get('/logout', loginController.logout );

router.get('/logoutDonator', loginController.logoutDonator);

router.get('/profileDonator', loginController.verifyToken, loginController.profileDonator);

router.get('/profileEntity', loginController.verifyToken, loginController.profileEntity);

router.post('/registerDonator', loginController.registerDonator);

router.post('/login/registerEntity', upload.single('file'), loginController.registerEntity);


module.exports = router;