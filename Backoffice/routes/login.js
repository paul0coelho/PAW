const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController.js');
const multer = require('multer');
const uploadEntity = multer({ dest: 'images/entities' });
const uploadDonator = multer({ dest: 'images/donations' });

// Página de login
router.get('/', loginController.login2 );

router.post('/login', loginController.login);

// Efetuar login
router.post('/loginSubmitted', loginController.submittedLogin );

// Efetuar logout
router.get('/logout', loginController.logout );

// Efetuar logout do doador
router.get('/logoutDonator', loginController.logoutDonator);

// Perfil do doador autenticado
router.get('/profileDonator', loginController.verifyToken, loginController.profileDonator);

// Perfil da entidade autenticada
router.get('/profileEntity', loginController.verifyToken, loginController.profileEntity);

// Registo de novo doador
router.post('/registerDonator', uploadDonator.single('file'), loginController.registerDonator);

// Registo de nova entidade
router.post('/registerEntity', uploadEntity.single('file'), loginController.registerEntity);

module.exports = router;