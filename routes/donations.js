var express = require('express');
var router = express.Router();
var donationController = require("../controllers/DonationController.js");

// Obter todas as doações
router.get('/', function(req, res) {
  donationController.list(req, res);
});

// Obter uma única doação pelo ID
router.get('/show/:id', function(req, res) {
  donationController.show(req, res);
});

// Criar uma doação
router.get('/create', function(req, res) {
  donationController.create(req, res);
});

// Salvar uma doação
router.post('/save', function(req, res) {
  donationController.save(req, res);
});

module.exports = router;
