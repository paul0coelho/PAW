var express = require('express');
var router = express.Router();
var admin = require("../controllers/AdminController.js");
var loginController = require("../controllers/LoginController.js");

// Get all employees
router.get('/',loginController.verifyLoginUser, function(req, res) {
  admin.list(req, res);
});

// Get single employee by id
router.get('/show/:id', function(req, res) {
  admin.show(req, res);
});

router.get('/searchByEmail', function(req, res) {
  admin.searchByEmail(req, res);
});

// Create employee
router.get('/create',loginController.verifyLoginUser, function(req, res) {
  admin.create(req, res);
});

// Save employee
router.post('/save', function(req, res) {
  admin.save(req, res);
});

// Edit employee
router.get('/edit/:id', function(req, res) {
  admin.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  admin.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  admin.delete(req, res);
});

module.exports = router;
