var express = require('express');
var router = express.Router();
var loginController = require("../controllers/LoginController.js");
var adminController = require("../controllers/AdminController.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

// Menu do administrador
router.get('/menuAdmin', loginController.verifyLoginUser, function(req, res, next) {
  res.render('admin/menuAdmin'); 
});

// Perfil do administrador autenticado
router.get('/admin/profile', loginController.verifyLoginUser, function(req, res) {
  adminController.profile(req, res);
});

// Editar a palavra passe do administrador autenticado
router.get('/editPassword', loginController.verifyLoginUser, function(req, res) {
  res.render("admins/editPassword");
});

// Editar a palavra passe do administrador autenticado
router.post('/editPassword', loginController.verifyLoginUser, adminController.editPassword);

module.exports = router;
