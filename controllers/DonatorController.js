var mongoose = require("mongoose");
var Donator = require("../models/Donator");
var path = require('path');
var fs = require("fs");

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

      var fileDestination = path.join(__dirname, "..", "images", savedDonator._id.toString() + ".jpg");

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
          res.redirect("show/" + savedDonator._id);
        });
      });
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
  Donator.findOneAndDelete({ _id: req.params.id })
    .then(donator => {
      if (!donator) {
        return res.status(404).send('Entidade não encontrada');
      }

      var imagePath = path.join(__dirname, '..', 'images', donator._id.toString() + '.jpg');
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, function(err) {
          if (err) {
            console.error('Erro ao remover a imagem associada à entidade:', err);
          }
        });
      }

      console.log("Doador excluído!");
      res.redirect("/donators");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Erro interno do servidor');
    });
};

donatorController.returnDonators = function(req, res) {
  Donator.find()
    .then(donators => {
      res.json(donators);
    })
    .catch(err => {
      console.log("Erro:", err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    });
};

module.exports = donatorController;
