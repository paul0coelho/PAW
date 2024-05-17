var express = require('express');
var router = express.Router();
var points = require("../controllers/PointsController.js");
var loginController = require("../controllers/LoginController.js");

// Menu de gestão de pontos
router.get('/',loginController.verifyLoginUser, function(req, res) {
  points.list(req, res);
});

// Menu de gestão de pontos
router.get('/l',loginController.verifyLoginUser, function(req, res) {
  points.list2(req, res);
});

// Obter os pontos através do _id
router.get('/show/:id', loginController.verifyLoginUser, function(req, res) {
  points.show(req, res);
});

// Obter os pontos através do _id
router.get('/show2/:id', loginController.verifyLoginUser, function(req, res) {
  points.show2(req, res);
});

// Guardar os valores dos pontos
router.post('/save', loginController.verifyLoginUser, function(req, res) {
  points.save(req, res);
});

// Guardar os valores dos pontos
router.post('/save2', loginController.verifyLoginUser, function(req, res) {
  points.save2(req, res);
});

// Editar os valores dos pontos
router.get('/edit/:id', loginController.verifyLoginUser, function(req, res) {
  points.edit(req, res);
});

// Editar os valores dos pontos
router.get('/edit2/:id', loginController.verifyLoginUser, function(req, res) {
  points.edit2(req, res);
});

// Atualizar os valores dos pontos após edição
router.post('/update/:id', loginController.verifyLoginUser, function(req, res) {
  points.update(req, res);
});

// Atualizar os valores dos pontos após edição
router.post('/update2/:id', loginController.verifyLoginUser, function(req, res) {
  points.update2(req, res);
});

module.exports = router;