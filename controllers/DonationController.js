var mongoose = require("mongoose");
var Donation = require("../models/Donation");
var Donator = require("../models/Donator");
var Points = require("../models/Points");
var path = require('path');
var fs = require("fs");

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
        return res.status(404).send('Doação não encontrada');
      }
      res.render("../views/donations/show", { donation: donation });
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donationController.searchByPhone = function(req, res) {
  Donation.find({phone: req.query.phone})
    .then(donations => {
      if (!donations) {
        return res.status(404).send('Doação não encontrada');
      }
      res.render("../views/donations/donationHistory", {donations: donations});
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
      return addPointsAndVouchersGainedByDonation(gainedPoints, req.body.phone);
    })
    .then(() => {
      return donation.save();
    })
    .then(savedDonation => {
      console.log('Doação registada com sucesso.');

      var fileDestination = path.join(__dirname, "..", "images", savedDonation._id.toString() + ".jpg");

      fs.readFile(req.file.path, function(err, data) {
        if (err) {
          console.error("Erro ao ler o arquivo:", err);
          return res.status(500).send("Erro ao ler o arquivo");
        }

        fs.writeFile(fileDestination, data, function(err) {
          if (err) {
            console.error("Erro ao escrever o arquivo na pasta 'images':", err);
            return res.status(500).send("Erro ao escrever o arquivo na pasta 'images'");
          }

          fs.unlink(req.file.path, function(err) {
            if (err) {
              console.error("Erro ao remover o arquivo da pasta 'tmp':", err);
            }
          });
          res.redirect("show/" + savedDonation._id);
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.render('../views/donations/create');
    });
};

function addPointsAndVouchersGainedByDonation(pointsGained, phone) {
  return Donator.findOne({ phone: phone })
    .then(donator => {
      if (!donator) {
        throw new Error('Doador não encontrado');
      }
      donator.gainedPoints += parseInt(pointsGained);

      while(donator.gainedPoints >= 100){
        donator.vouchers++;
        donator.gainedPoints = (donator.gainedPoints - 100);
      }
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

donationController.returnDonations = function(req, res) {
  Donation.find()
    .then(donations => {
      res.json(donations);
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports = donationController;