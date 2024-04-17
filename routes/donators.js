var express = require('express');
var router = express.Router();
var donator = require("../controllers/DonatorController.js");

// Get all donators
router.get('/', function(req, res) {
  donator.list(req, res);
});

// Get single donator by id
router.get('/show/:phone', function(req, res) {
  donator.show(req, res);
});

// Create donator
router.get('/create', function(req, res) {
  donator.create(req, res);
});

// Save donator
router.post('/save', function(req, res) {
  donator.save(req, res);
});

// Edit donator
router.get('/edit/:id', function(req, res) {
  donator.edit(req, res);
});

// Update donator
router.post('/update/:id', function(req, res) {
  donator.update(req, res);
});

// Delete donator
router.post('/delete/:id', function(req, res, next) {
  donator.delete(req, res);
});

module.exports = router;
