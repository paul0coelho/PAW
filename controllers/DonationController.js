var mongoose = require("mongoose");
var Donation = require("../models/Donation");
var Donator = require("../models/Donator");
var Points = require("../models/Points");

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

donationController.searchByPhone = function(req, res) {
  Donation.findOne({donatorPhone: req.query.phone})
    .then(donation => {
      if (!donation) {
        return res.status(404).send('Donation not found');
      }
      res.render("../views/donations/show", {donation: donation});
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

  calculateGainedPoints(req.body.topPiecesNumber, req.body.bottomPiecesNumber, req.body.underwearPiecesNumber)
    .then(gainedPoints => {
      donation.gainedPoints = gainedPoints;
      return addPointsGainedByDonation(gainedPoints, req.body.donatorPhone);
    })
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

function addPointsGainedByDonation(pointsGained, donatorPhone) {
  return Donator.findOne({ phone: donatorPhone })
    .then(donator => {
      if (!donator) {
        throw new Error('Donator not found');
      }
      donator.gainedPoints += parseInt(pointsGained);
      return donator.save();
    });
}

function calculateGainedPoints(topPiecesNumber, bottomPiecesNumber, underwearPiecesNumber) {
  return Points.findOne({_id:'661ff5afe10497c901313a23'})
    .then(points => {
      if (!points) {
        throw new Error('Pontos não encontrados');
      }
      
      var gainedPoints = 0;
      gainedPoints += topPiecesNumber * points.topPiecesPoints;
      gainedPoints += bottomPiecesNumber * points.bottomPiecesPoints;
      gainedPoints += underwearPiecesNumber * points.underwearPiecesPoints;

      return parseInt(gainedPoints);
    });
}

module.exports = donationController;