var express = require('express');
var router = express.Router();
var points = require("../controllers/PointsController.js");
var loginController = require("../controllers/LoginController.js");

// Get all employees
router.get('/',loginController.verifyLoginUser, function(req, res) {
  points.list(req, res);
});

// Get single employee by id
router.get('/show/:id', function(req, res) {
  points.show(req, res);
});

// Save employee
router.post('/save', function(req, res) {
  points.save(req, res);
});

// Edit employee
router.get('/edit/:id', function(req, res) {
  points.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  points.update(req, res);
});

module.exports = router;