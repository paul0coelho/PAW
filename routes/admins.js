var express = require('express');
var router = express.Router();
var admin = require("../controllers/AdminController.js");
var loginController = require("../controllers/LoginController.js");

// Menu de gestão de administradores
router.get('/',loginController.verifyLoginUser, function(req, res) {
  admin.list(req, res);
});

// Obter um administrador através do _id
router.get('/show/:id', function(req, res) {
  admin.show(req, res);
});

// Obter um administrador através do email
router.get('/searchByEmail', function(req, res) {
  admin.searchByEmail(req, res);
});

// Registar um novo administrador
router.get('/create',loginController.verifyLoginUser, function(req, res) {
  admin.create(req, res);
});

// Guardar administrador
router.post('/save', function(req, res) {
  admin.save(req, res);
});

// Editar um administrador
router.get('/edit/:id', function(req, res) {
  admin.edit(req, res);
});

// Atualizar um administrador após edição
router.post('/update/:id', function(req, res) {
  admin.update(req, res);
});

// Eliminar um administrador
router.post('/delete/:id', function(req, res, next) {
  admin.delete(req, res);
});

module.exports = router;
