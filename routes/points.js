var express = require('express');
var router = express.Router();
var points = require("../controllers/PointsController.js");
var loginController = require("../controllers/LoginController.js");

// Menu de gestão de pontos
router.get('/',loginController.verifyLoginUser, function(req, res) {
  points.list(req, res);
});

// Obter os pontos através do _id
router.get('/show/:id', function(req, res) {
  points.show(req, res);
});

// Guardar os valores dos pontos
router.post('/save', function(req, res) {
  points.save(req, res);
});

// Editar os valores dos pontos
router.get('/edit/:id', function(req, res) {
  points.edit(req, res);
});

// Atualizar os valores dos pontos após edição
router.post('/update/:id', function(req, res) {
  points.update(req, res);
});

module.exports = router;