var express = require('express');
var router = express.Router();
var donator = require("../controllers/DonatorController.js");
var loginController = require("../controllers/LoginController.js");
const multer = require('multer');
const uploadDonator = multer({ dest: 'images/donations' });

// Menu de gestão de doadores
router.get('/',loginController.verifyLoginUser, function(req, res) {
  donator.list(req, res);
});

// Menu de gestão de doadores
router.get('/l', function(req, res) {
  donator.list2(req, res);
});

// Obter um doador pelo _id
router.get('/show/:id', loginController.verifyLoginUser, function(req, res) {
  donator.show(req, res);
});


router.get('/show2', loginController.verifyToken, donator.show2);

// Obter um doador pelo contacto do doador
router.get('/searchByPhone', loginController.verifyLoginUser, function(req, res) {
  donator.searchByPhone(req, res);
});

// Obter um doador pelo contacto do doador
router.get('/searchByPhone2', function(req, res) {
  donator.searchByPhone2(req, res);
});

// Registar um doador
router.get('/create',loginController.verifyLoginUser, function(req, res) {
  donator.create(req, res);
});

// Guardar um doador
router.post('/save', loginController.verifyLoginUser, function(req, res) {
  donator.save(req, res);
});

// Guardar um doador
router.post('/save2', function(req, res) {
  donator.save2(req, res);
});

// Editar um doador
router.get('/edit/:id', loginController.verifyLoginUser, function(req, res) {
  donator.edit(req, res);
});

// Editar um doador
router.get('/edit2/:id', loginController.verifyToken, donator.edit2);

// Atualizar um doador após edição
router.post('/update/:id', loginController.verifyLoginUser, function(req, res) {
  donator.update(req, res);
});

// Atualização dos dados de um doador
router.post('/update2', loginController.verifyToken, uploadDonator.single('profileImage'), donator.update2);

// Eliminar um doador
router.post('/delete/:id', loginController.verifyToken, donator.update2);

// Eliminar um doador
router.post('/delete2/:id',  function(req, res, next) {
  donator.delete2(req, res);
});

// Obter doadores no formato JSON
router.get('/returnDonators', function(req, res) {
  donator.returnDonators(req, res);
});

// Alteração de palavra-passe por parte do doador
router.post('/changePasswordDonator', loginController.verifyToken, donator.changePasswordDonator);

module.exports = router;
