var mongoose = require("mongoose");
var Donation = require("../models/Donation");
var Donator = require("../models/Donator");
var Points = require("../models/Points");
var Entity = require("../models/Entity");
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

donationController.list2 = function(req, res) {
  Donation.find()
    .then(donations => {
      res.json(donations);
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
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

donationController.show2 = function(req, res) {
  Donation.findOne({ _id: req.params.id })
    .then(donation => {
      if (!donation) {
        return res.status(404).json({ error: 'Doação não encontrada' });
      }
      res.json(donation);
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
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

donationController.searchByPhone2 = function(req, res) {
  Donation.find({phone: req.query.phone})
    .then(donations => {
      if (!donations) {
        return res.status(404).json({ error: 'Doações não encontradas' });
      }
      res.json(donations);
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

donationController.create = function(req, res) {
  res.render("../views/donations/create");
};

donationController.save = function(req, res) {
  var donation = new Donation(req.body);

  Donator.findOne({ phone: 987654312 })
    .then(donator => {
      if (!donator) {
        throw new Error('Doador não encontrado');
      }
      donation.donatorId = donator._id;

      return Entity.findOne({ email: req.body.entityEmail });
    })
    .then(entity => {
      if (!entity) {
        throw new Error('Entidade não encontrada' + req.body.entityEmail);
      }
      donation.entityId = entity._id;

      return calculateGainedPoints(req.body.topPiecesNumber, req.body.bottomPiecesNumber, req.body.underwearPiecesNumber);
    })
    .then(gainedPoints => {
      donation.gainedPoints = gainedPoints;
      return addPointsAndVouchersGainedByDonation(gainedPoints, req.body.phone);
    })
    .then(() => {
      return donation.save();
    })
    .then(savedDonation => {
      console.log('Doação registada com sucesso.');

      var fileDestination = path.join(__dirname, "..", "images", "donations", savedDonation._id.toString() + ".jpg");

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
      res.status(500).send('Internal Server Error');
    });
};

donationController.save2 = function(req, res) {
  var donation = new Donation(req.body);

  donation.status = "entregue";
  
  Donator.findOne({ phone: req.body.phone })
    .then(donator => {
      if (!donator) {
        throw new Error('Doador não encontrado');
      }
      donation.donatorId = donator._id;

      return Entity.findOne({ email: req.body.entityEmail });
    })
    .then(entity => {
      
      donation.entityId = entity._id;

      return calculateGainedPoints(req.body.topPiecesNumber, req.body.bottomPiecesNumber, req.body.underwearPiecesNumber);
    })
    .then(gainedPoints => {
      donation.gainedPoints = gainedPoints;
      return addPointsAndVouchersGainedByDonation(gainedPoints, req.body.phone);
    })
    .then(() => {
      return donation.save();
    })
    .then(savedDonation => {
      console.log('Doação registada com sucesso.');
      res.json(savedDonation);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};


function addPointsAndVouchersGainedByDonation(pointsGained, phone) {
  return Donator.findOne({ phone: phone })
    .then(donator => {
      if (!donator) {
        throw new Error('Doador não encontrado');
      }

      return Points.findOne({_id:'661ff5afe10497c901313a23'})
        .then(points => {
          if (!points) {
            throw new Error('Pontos não encontrados');
          }
          
          donator.gainedPoints += pointsGained;

          var gainedVouchers = 0;

          while(donator.gainedPoints >= points.pointsPerVoucher){
            gainedVouchers++;
            donator.gainedPoints -= points.pointsPerVoucher;
          }

          donator.vouchers += gainedVouchers;
          
          return donator.save();
        });
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

donationController.returnDonationsByDonatorId = function(req, res) {
  var donatorId = req.params.id;
  
  Donation.find({ donatorId: donatorId })
    .then(donations => {
      res.json(donations);
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

donationController.returnDonationsByEntityId = function(req, res) {
  var entityId = req.params.id;
  
  Donation.find({ entityId: entityId })
    .then(donations => {
      res.json(donations);
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};


module.exports = donationController;