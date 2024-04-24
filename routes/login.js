
var express = require('express');
var router = express.Router();
const loginController = require('../controllers/LoginController.js')


router.get('/', loginController.login );

router.post('/loginSubmitted', loginController.submittedLogin );

router.get('/logout', loginController.logout );


module.exports = router;