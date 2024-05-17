var express = require('express');
var router = express.Router();
var admin = require("../controllers/AdminController.js");
var loginController = require("../controllers/LoginController.js");

// Menu de gestão de administradores
router.get('/',loginController.verifyLoginUser, function(req, res) {
  admin.list(req, res);
});

// Menu de gestão de administradores
router.get('/l',loginController.verifyLoginUser, function(req, res) {
  admin.list2(req, res);
});

// Obter um administrador através do _id
router.get('/show/:id',loginController.verifyLoginUser, function(req, res) {
  admin.show(req, res);
});

// Obter um administrador através do _id
router.get('/show2/:id',loginController.verifyLoginUser, function(req, res) {
  admin.show2(req, res);
});

// Obter um administrador através do email
router.get('/searchByEmail', loginController.verifyLoginUser, function(req, res) {
  admin.searchByEmail(req, res);
});

// Obter um administrador através do email
router.get('/searchByEmail2', loginController.verifyLoginUser, function(req, res) {
  admin.searchByEmail2(req, res);
});

// Registar um novo administrador
router.get('/create',loginController.verifyLoginUser, function(req, res) {
  admin.create(req, res);
});

// Guardar administrador
router.post('/save', loginController.verifyLoginUser, function(req, res) {
  admin.save(req, res);
});

// Guardar administrador
router.post('/save2', loginController.verifyLoginUser, function(req, res) {
  admin.save2(req, res);
});

// Editar um administrador
router.get('/edit/:id', loginController.verifyLoginUser, function(req, res) {
  admin.edit(req, res);
});

// Editar um administrador
router.get('/edit2/:id', loginController.verifyLoginUser, function(req, res) {
  admin.edit2(req, res);
});

// Atualizar um administrador após edição
router.post('/update/:id', loginController.verifyLoginUser, function(req, res) {
  admin.update(req, res);
});

// Atualizar um administrador após edição
router.post('/update2/:id', loginController.verifyLoginUser, function(req, res) {
  admin.update2(req, res);
});

// Eliminar um administrador
router.post('/delete/:id', loginController.verifyLoginUser, function(req, res, next) {
  admin.delete(req, res);
});

// Eliminar um administrador
router.post('/delete2/:id', loginController.verifyLoginUser, function(req, res, next) {
  admin.delete2(req, res);
});

module.exports = router;
