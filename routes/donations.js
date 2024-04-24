var express = require('express');
var router = express.Router();
var donation = require("../controllers/DonationController.js");

// Obter todas as doações
router.get('/', function(req, res) {
  donation.list(req, res);
});

// Obter uma única doação pelo ID
router.get('/show/:id', function(req, res) {
  donation.show(req, res);
});

router.get('/searchByPhone', function(req, res) {
  donation.searchByPhone(req, res);
});

// Criar uma doação
router.get('/create', function(req, res) {
  donation.create(req, res);
});

// Salvar uma doação
router.post('/save', function(req, res) {
  donation.save(req, res);
});

router.get('/returnDonations', function(req, res) {
  donation.returnDonations(req, res);
});

module.exports = router;
