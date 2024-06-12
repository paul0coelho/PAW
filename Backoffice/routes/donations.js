var express = require('express');
var router = express.Router();
var donation = require("../controllers/DonationController.js");
var loginController = require("../controllers/LoginController.js");
const multer = require('multer');
const upload = multer({ dest: 'images/donations' });

// Menu de gestão de doações
router.get('/',loginController.verifyLoginUser, function(req, res) {
  donation.list(req, res);
});

// Menu de gestão de doações
router.get('/l',loginController.verifyLoginUser, function(req, res) {
  donation.list2(req, res);
});

// Obter uma doação pelo _id
router.get('/show/:id', loginController.verifyLoginUser, function(req, res) {
  donation.show(req, res);
});

// Obter uma doação pelo _id
router.get('/show2/:id', loginController.verifyLoginUser, function(req, res) {
  donation.show2(req, res);
});

// Obter uma doação pelo contacto do doador
router.get('/searchByPhone', loginController.verifyLoginUser, function(req, res) {
  donation.searchByPhone(req, res);
});

// Obter uma doação pelo contacto do doador
router.get('/searchByPhone2', loginController.verifyLoginUser, function(req, res) {
  donation.searchByPhone2(req, res);
});

// Registar uma doação
router.get('/create',loginController.verifyLoginUser, function(req, res) {
  donation.create(req, res);
});

// Guardar uma doação
router.post('/save', loginController.verifyLoginUser, function(req, res) {
  donation.save(req, res);
});

// Guardar uma doação
router.post('/save2', upload.single('file'), function(req, res) {
  donation.save2(req, res);
});

// Obter doações no formato JSON
router.get('/returnDonations', donation.returnDonations);

// Obter doações no formato JSON
router.get('/returnDonationsByDonatorId', loginController.verifyToken, donation.returnDonationsByDonatorId);

// Obter doações no formato JSON
router.get('/returnDonationsByEntityId', loginController.verifyToken, donation.returnDonationsByEntityId);

router.post('/exchangePoints',loginController.verifyToken,donation.exchangePointsForVoucher);

router.post('/acceptDonation/:id', loginController.verifyLoginUser, function(req, res) {
  donation.acceptDonation(req, res);
});
  
router.post('/delete/:id', loginController.verifyLoginUser, function(req, res, next) {
  donation.delete(req, res);
});
module.exports = router;
