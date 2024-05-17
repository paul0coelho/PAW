var express = require('express');
var router = express.Router();
var donation = require("../controllers/DonationController.js");
var loginController = require("../controllers/LoginController.js");

// Menu de gestão de doações
router.get('/',loginController.verifyLoginUser, function(req, res) {
  donation.list(req, res);
});

// Obter uma doação pelo _id
router.get('/show/:id', loginController.verifyLoginUser, function(req, res) {
  donation.show(req, res);
});

// Obter uma doação pelo contacto do doador
router.get('/searchByPhone', loginController.verifyLoginUser, function(req, res) {
  donation.searchByPhone(req, res);
});

// Registar uma doação
router.get('/create',loginController.verifyLoginUser, function(req, res) {
  donation.create(req, res);
});

// Guardar uma doação
router.post('/save', loginController.verifyLoginUser, function(req, res) {
  donation.save(req, res);
});

// Obter doações no formato JSON
router.get('/returnDonations', loginController.verifyLoginUser, function(req, res) {
  donation.returnDonations(req, res);
});

module.exports = router;
