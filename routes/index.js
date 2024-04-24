var express = require('express');
var router = express.Router();
var loginController = require("../controllers/LoginController.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/menuAdmin', loginController.verifyLoginUser, function(req, res, next) {
  res.render('admin/menuAdmin'); 
});
module.exports = router;
