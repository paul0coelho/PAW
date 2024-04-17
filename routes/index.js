var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('admin/login');
});

router.get('/menuAdmin', function(req, res, next) {
  res.render('admin/menuAdmin');
});

module.exports = router;
