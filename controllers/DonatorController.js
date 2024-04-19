var mongoose = require("mongoose");
var Donator = require("../models/Donator");

var donatorController = {};

mongoose.connect('mongodb+srv://paul0:1234@cluster0.gat7grz.mongodb.net/PAW?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('connection successful'))
.catch((err) => console.error(err));

donatorController.list = function(req, res) {
  Donator.find()
    .then(donators => {
      res.render("../views/donators/showAll", {donators: donators});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donatorController.show = function(req, res) {
  Donator.findOne({_id: req.params.id})
    .then(donator => {
      if (!donator) {
        return res.status(404).send('Donator not found');
      }
      res.render("../views/donators/show", {donator: donator});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donatorController.searchByPhone = function(req, res) {
  Donator.findOne({phone: req.query.phone})
    .then(donator => {
      if (!donator) {
        return res.status(404).send('Donator not found');
      }
      res.render("../views/donators/show", {donator: donator});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donatorController.create = function(req, res) {
  res.render("../views/donators/create");
};

donatorController.save = function(req, res) {
  var donator = new Donator(req.body);

  donator.save()
    .then(savedDonator => {
      console.log('Successfully created a donator.');
      res.redirect("show/" + savedDonator._id);
    })
    .catch(err => {
      console.log(err);
      res.render('../views/donators/create');
    });
};

donatorController.edit = function(req, res) {
  Donator.findOne({_id: req.params.id})
    .then(donator => {
      if (!donator) {
        return res.status(404).send('Donator not found');
      }
      res.render("../views/donators/edit", {donator: donator});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donatorController.update = function(req, res) {
  Donator.findByIdAndUpdate(req.params.id,{ 
    $set: { 
      name: req.body.name, 
      phone: req.body.phone, 
      address: req.body.address
    }
  },{ new: true })
    .then(donator => {
      if (!donator) {
        return res.status(404).send('Donator not found');
      }
      res.redirect("/donators/show/" + donator._id);
    })
    .catch(err => {
      console.log(err);
      res.render("../views/donators/edit", { donator: req.body });
    });
};

donatorController.delete = function(req, res) {
  Donator.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Donator deleted!");
      res.redirect("/donators");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports = donatorController;
