var express = require('express');
var router = express.Router();
var entity = require("../controllers/EntityController.js");

// Get all entities
router.get('/', function(req, res) {
  entity.list(req, res);
});

// Get single entity by id
router.get('/show/:id', function(req, res) {
  entity.show(req, res);
});

// Create entity
router.get('/create', function(req, res) {
  entity.create(req, res);
});

// Save entity
router.post('/save', function(req, res) {
  entity.save(req, res);
});

// Edit entity
router.get('/edit/:id', function(req, res) {
  entity.edit(req, res);
});

// Update entity
router.post('/update/:id', function(req, res) {
  entity.update(req, res);
});

// Delete entity
router.post('/delete/:id', function(req, res, next) {
  entity.delete(req, res);
});

module.exports = router;
