var mongoose = require("mongoose");
var Donation = require("../models/Donation");
var Donator = require("../models/Donator");

var donationController = {};

mongoose.connect('mongodb+srv://paul0:1234@cluster0.gat7grz.mongodb.net/PAW?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

donationController.list = function(req, res) {
  Donation.find()
    .then(donations => {
      res.render("../views/donations/showAll", { donations: donations });
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donationController.show = function(req, res) {
  Donation.findOne({ _id: req.params.id })
    .then(donation => {
      if (!donation) {
        return res.status(404).send('Donation not found');
      }
      res.render("../views/donations/show", { donation: donation });
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donationController.create = function(req, res) {
  res.render("../views/donations/create");
};

donationController.save = function(req, res) {
  var donation = new Donation(req.body);

  var gainedPoints = calculateGainedPoints(req.body.topPiecesNumber, req.body.bottomPiecesNumber, req.body.underwearPiecesNumber);

  donation.gainedPoints = gainedPoints;

  addPointsGainedByDonation(gainedPoints, req.body.donator)
    .then(() => {
      return donation.save();
    })
    .then(savedDonation => {
      console.log('Successfully created a donation.');
      res.redirect("show/" + savedDonation._id);
    })
    .catch(err => {
      console.log(err);
      res.render('../views/donations/create');
    });
};

donationController.edit = function(req, res) {
  Donation.findOne({ _id: req.params.id })
    .then(donation => {
      if (!donation) {
        return res.status(404).send('Donation not found');
      }
      res.render("../views/donations/edit", { donation: donation });
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donationController.update = function(req, res) {
  Donation.findByIdAndUpdate(req.params.id, {
      $set: {
        donator: req.body.donator,
        topPiecesNumber: req.body.topPiecesNumber,
        bottomPiecesNumber: req.body.bottomPiecesNumber,
        underwearPiecesNumber: req.body.underwearPiecesNumber,
        gainedPoints: calculateGainedPoints(req.body.topPiecesNumber, req.body.bottomPiecesNumber, req.body.underwearPiecesNumber)
      }
    }, { new: true })
    .then(donation => {
      if (!donation) {
        return res.status(404).send('Donation not found');
      }
      res.redirect("/donations/show/" + donation._id);
    })
    .catch(err => {
      console.log(err);
      res.render("../views/donations/edit", { donation: req.body });
    });
};

donationController.delete = function(req, res) {
  Donation.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Donation deleted!");
      res.redirect("/donations");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

function addPointsGainedByDonation(pointsGained, donatorName) {
  return Donator.findOne({ name: donatorName })
    .then(donator => {
      if (!donator) {
        throw new Error('Donator not found');
      }
      donator.gainedPoints += pointsGained;
      return donator.save();
    });
}

function calculateGainedPoints(topPiecesNumber, bottomPiecesNumber, underwearPiecesNumber) {
  var gainedPoints = 0;
  gainedPoints += topPiecesNumber * 5;
  gainedPoints += bottomPiecesNumber * 5;
  gainedPoints += underwearPiecesNumber * 10;
  return gainedPoints;
}

module.exports = donationController;
