var express = require('express');
var router = express.Router();
var entity = require("../controllers/EntityController.js");
var loginController = require("../controllers/LoginController.js");

// Menu de gestão de entidades
router.get('/',loginController.verifyLoginUser, function(req, res) {
  entity.list(req, res);
});

// Menu de gestão de entidades
router.get('/l', function(req, res) {
  entity.list2(req, res);
});

// Obter uma entidade através do _id
router.get('/show/:id', loginController.verifyLoginUser, function(req, res) {
  entity.show(req, res);
});

// Obter uma entidade através do _id
router.get('/show2/:id', function(req, res) {
  entity.show2(req, res);
});

// Obter uma entidade através do telefone
router.get('/searchByPhone', loginController.verifyLoginUser, function(req, res) {
  entity.searchByPhone(req, res);
});

// Obter uma entidade através do telefone
router.get('/searchByPhone2', function(req, res) {
  entity.searchByPhone2(req, res);
});

// Registar uma nova entidade
router.get('/create',loginController.verifyLoginUser, function(req, res) {
  entity.create(req, res);
});

// Guardar uma entidade
router.post('/save', loginController.verifyLoginUser, function(req, res) {
  entity.save(req, res);
});

// Guardar uma entidade
router.post('/save2', function(req, res) {
  entity.save2(req, res);
});

// Editar uma entidade
router.get('/edit/:id', loginController.verifyLoginUser, function(req, res) {
  entity.edit(req, res);
});

// Editar uma entidade
router.get('/edit2/:id', function(req, res) {
  entity.edit2(req, res);
});

// Atualizar uma entidade após edição
router.post('/update/:id', loginController.verifyLoginUser, function(req, res) {
  entity.update(req, res);
});

// Atualizar uma entidade após edição
router.post('/update2/:id', function(req, res) {
  entity.update2(req, res);
});

// Eliminar uma entidade
router.post('/delete/:id', loginController.verifyLoginUser, function(req, res, next) {
  entity.delete(req, res);
});

// Eliminar uma entidade
router.post('/delete2/:id', function(req, res, next) {
  entity.delete2(req, res);
});

// Obter entidades no formato JSON
router.get('/returnEntities', function(req, res) {
  entity.returnEntities(req, res);
});

module.exports = router;
