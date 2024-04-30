var express = require('express');
var router = express.Router();
var donator = require("../controllers/DonatorController.js");
var loginController = require("../controllers/LoginController.js");

// Menu de gestão de doadores
router.get('/',loginController.verifyLoginUser, function(req, res) {
  donator.list(req, res);
});

// Obter um doador pelo _id
router.get('/show/:id', function(req, res) {
  donator.show(req, res);
});

// Obter um doador pelo contacto do doador
router.get('/searchByPhone', function(req, res) {
  donator.searchByPhone(req, res);
});

// Registar um doador
router.get('/create',loginController.verifyLoginUser, function(req, res) {
  donator.create(req, res);
});

// Guardar um doador
router.post('/save', function(req, res) {
  donator.save(req, res);
});

// Editar um doador
router.get('/edit/:id', function(req, res) {
  donator.edit(req, res);
});

// Atualizar um doador após edição
router.post('/update/:id', function(req, res) {
  donator.update(req, res);
});

// Eliminar um doador
router.post('/delete/:id', function(req, res, next) {
  donator.delete(req, res);
});

// Obter doadores no formato JSON
router.get('/returnDonators', function(req, res) {
  donator.returnDonators(req, res);
});

module.exports = router;
