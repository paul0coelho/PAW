var mongoose = require("mongoose");
var Donation = require("../models/Donation");
var Donator = require("../models/Donator");
var Points = require("../models/Points");
var Entity = require("../models/Entity");
var Admins = require("../models/Admin");
const transporter = require('./mailer')
var path = require('path');
var fs = require("fs");

var donationController = {};

mongoose.connect('mongodb+srv://paul0:1234@cluster0.gat7grz.mongodb.net/PAW?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

donationController.list = function(req, res) {
  Donation.find()
    .populate('donatorId', 'name')
    .populate('entityId', 'name')
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
  const donation = new Donation(req.body);
  donation.status = "em espera";

  Donator.findOne({ phone: req.body.phone })
    .then(donator => {
      if (!donator) {
        throw new Error('Doador não encontrado');
      }
      donation.donatorId = donator._id;

      console.log(donation)

      return Entity.findOne({ name: req.body.entityName });
    })
    .then(entity => {
      if (!entity) {
        throw new Error('Entidade não encontrada');
      }
      donation.entityId = entity._id;

      return calculateGainedPoints(
        req.body.topPiecesNumber, 
        req.body.bottomPiecesNumber, 
        req.body.underwearPiecesNumber, 
        req.body.moneyDonated
      );
    })
    .then(gainedPoints => {
      donation.gainedPoints = gainedPoints;
      return donation.save();
    })
    .then(savedDonation => {
      console.log('Doação registada com sucesso.');

      if (req.file) {
        const fileDestination = path.join(__dirname, '..', 'images', 'donations', savedDonation._id.toString() + ".jpg");

        fs.rename(req.file.path, fileDestination, function(err) {
            if (err) {
                console.error('Error moving file:', err);
                return res.status(500).send('Error moving file');
            }
        });
    }

      return Donation.findById(savedDonation._id)
        .populate('donatorId', 'name')
        .populate('entityId', 'name');
    })
    .then(populatedDonation => {
      const donatorName = populatedDonation.donatorId.name;
      const entityName = populatedDonation.entityId.name;

      return Admins.find()
        .then(admins => {
          const adminEmails = admins.map(admin => admin.email);

          const mailOptions = {
            from: 'recilatextil5@gmail.com',
            to: adminEmails,
            subject: 'Nova Doação Registada',
            text: `A doação do doador ${donatorName} para a entidade ${entityName} está à espera para ser aceite.`
          };

          return transporter.sendMail(mailOptions);
        })
        .then(info => {
          console.log('Email enviado: ' + info.response);
          res.json(populatedDonation);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

donationController.delete = function(req, res) {
  Donation.findOneAndDelete({ _id: req.params.id })
    .then(donation => {
      if (!donation) {
        return res.status(404).send('Doação não encontrada');
      }

      var donationPath = path.join(__dirname, '..', 'images', "donations", donation._id.toString() + '.jpg');
      if (fs.existsSync(donationPath)) {
        fs.unlink(donationPath, function(err) {
          if (err) {
            console.error('Erro ao remover a imagem associada à doação:', err);
          }
        });
      }

      console.log("Doação excluída!");
      res.redirect("/donations");
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};


function addPointsGainedByDonation(pointsGained, phone) {
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
          
          return donator.save();
        });
    });
}

function calculateGainedPoints(topPiecesNumber, bottomPiecesNumber, underwearPiecesNumber, moneyDonated) {
  return Points.findOne({_id:'661ff5afe10497c901313a23'})
    .then(points => {
      if (!points) {
        throw new Error('Pontos não encontrados');
      }
      
      var gainedPoints = 0;
      gainedPoints += topPiecesNumber * points.topPiecesPoints;
      gainedPoints += bottomPiecesNumber * points.bottomPiecesPoints;
      gainedPoints += underwearPiecesNumber * points.underwearPiecesPoints;
      gainedPoints += moneyDonated * points.pointsPerEuroDonated

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

donationController.returnDonationsByDonatorId= function(req, res) {
  Donation.find({donatorId: req.id })
  .populate('entityId', 'name')
    .then(donations => {
      res.json({donations : donations});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

donationController.returnDonationsByEntityId = function(req, res) {
  Donation.find({ entityId: req.id })
    .populate('donatorId', 'name')
    .then(donations => {
      res.json({ donations });
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

donationController.exchangePointsForVoucher = function(req, res) {
  Donator.findById(req.id)
    .then(donator => {
      if (!donator) {
        return res.status(404).json({ error: 'Doador não encontrado' });
      }

      return Points.findOne({_id:'661ff5afe10497c901313a23'}).then(points => {
        if (!points) {
          throw new Error('Pontos não encontrados');
        }

        if (donator.gainedPoints < points.pointsPerVoucher) {
          return res.status(400).json({ error: 'Pontos insuficientes para trocar por um voucher' });
        }

        donator.gainedPoints -= points.pointsPerVoucher;

        donator.vouchers++;

        return donator.save().then(() => {
          res.json({ message: 'Pontos trocados por voucher com sucesso!' });
        });
      });
    })
    .catch(err => {
      console.error("Erro ao trocar pontos por voucher:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Erro ao trocar pontos por voucher', details: err.message });
      }
    });
};

donationController.acceptDonation = function(req, res) {
  Donation.findOne({ _id: req.params.id })
    .then(donation => {
      if (!donation) {
        return res.status(404).send('Doação não encontrada');
      }

      donation.status = 'aceite';

      return calculateGainedPoints(donation.topPiecesNumber, donation.bottomPiecesNumber, donation.underwearPiecesNumber, donation.moneyDonated)
        .then(gainedPoints => {
          return addPointsGainedByDonation(gainedPoints, donation.phone);
        })
        .then(() => {
          return donation.save();
        });
    })
    .then(() => {
      res.redirect("/donations");
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports = donationController;