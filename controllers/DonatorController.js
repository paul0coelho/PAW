var mongoose = require("mongoose");
var Donator = require("../models/Donator");

var donatorController = {};

mongoose.connect('mongodb+srv://paul0:1234@cluster0.gat7grz.mongodb.net/PAW?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('connection successful'))
.catch((err) => console.error(err));

donatorController.list = function(req, res) {
  Donator.find().exec(function(err, donators) {
    if(err) {
      console.log("Error:", err);
    } else {
      res.render("../views/donators/showAll", { donators: donators });
    }
  });
};

donatorController.show = function(req, res) {
  Donator.findOne({ _id: req.params.id }).exec(function(err, donator) {
    if(err) {
      console.log("Error:", err);
    } else {
      res.render("../views/donators/show", { donator: donator });
    }
  });
};

donatorController.create = function(req, res) {
  res.render("../views/donators/create");
};

donatorController.save = function(req, res) {
  var donator = new Donator(req.body);

  donator.save(function(err) {
    if(err) {
      console.log(err);
      res.render('../views/donators/create');
    } else {
      console.log('Successfully created a donator.');
      res.redirect("show/" + donator._id);
    }
  });
};

donatorController.edit = function(req, res) {
  Donator.findOne({ _id: req.params.id }).exec(function(err, donator) {
    if(err) {
      console.log("Error:", err);
    } else {
      res.render("../views/donators/edit", { donator: donator });
    }
  });
};

donatorController.update = function(req, res) {
  Donator.findByIdAndUpdate(req.params.id,
    { $set: { name: req.body.name, phone: req.body.phone, address: req.body.address}},
    { new: true },
    function(err, donator) {
      if(err) {
        console.log(err);
        res.render("../views/donators/edit", { donator: req.body });
      }
      res.redirect("/donators/show/" + donator._id);
    }
  );
};

donatorController.delete = function(req, res) {
  Donator.remove({ _id: req.params.id }, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Donator deleted!");
      res.redirect("/donators");
    }
  });
};

module.exports = donatorController;
