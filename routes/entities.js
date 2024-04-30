var express = require('express');
var router = express.Router();
var entity = require("../controllers/EntityController.js");
var loginController = require("../controllers/LoginController.js");

// Menu de gestão de entidades
router.get('/',loginController.verifyLoginUser, function(req, res) {
  entity.list(req, res);
});

// Obter uma entidade através do _id
router.get('/show/:id', function(req, res) {
  entity.show(req, res);
});

// Obter uma entidade através do telefone
router.get('/searchByPhone', function(req, res) {
  entity.searchByPhone(req, res);
});

// Registar uma nova entidade
router.get('/create',loginController.verifyLoginUser, function(req, res) {
  entity.create(req, res);
});

// Guardar uma entidade
router.post('/save', function(req, res) {
  entity.save(req, res);
});

// Editar uma entidade
router.get('/edit/:id', function(req, res) {
  entity.edit(req, res);
});

// Atualizar uma entidade após edição
router.post('/update/:id', function(req, res) {
  entity.update(req, res);
});

// Eliminar uma entidade
router.post('/delete/:id', function(req, res, next) {
  entity.delete(req, res);
});

// Obter entidades no formato JSON
router.get('/returnEntities', function(req, res) {
  entity.returnEntities(req, res);
});

module.exports = router;
