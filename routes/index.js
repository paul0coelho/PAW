var express = require('express');
var router = express.Router();
var loginController = require("../controllers/LoginController.js");
var adminController = require("../controllers/AdminController.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Menu do administrador
router.get('/menuAdmin', loginController.verifyLoginUser, function(req, res, next) {
  res.render('admin/menuAdmin'); 
});

// Perfil do administrador autenticado
router.get('/profile', loginController.verifyLoginUser, function(req, res) {
  adminController.profile(req, res);
});
module.exports = router;
