var mongoose = require("mongoose");
var Donator = require("../models/Donator");
var path = require('path');
var bcrypt = require('bcryptjs');
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

donatorController.list2 = function(req, res) {
  Donator.find()
    .then(donators => {
      res.json(donators);
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

donatorController.show = function(req, res) {
  Donator.findOne({_id: req.params.id})
    .then(donator => {
      if (!donator) {
        return res.status(404).send('Doador não encontrado');
      }
      res.render("../views/donators/show", {donator: donator});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donatorController.show2 = function(req, res) {
  Donator.findOne({_id: req.id})
    .then(donator => {
      if (!donator) {
        return res.status(404).json({ error: 'Doador não encontrado' });
      }
      res.json(donator);
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

donatorController.searchByPhone = function(req, res) {
  Donator.findOne({phone: req.query.phone})
    .then(donator => {
      if (!donator) {
        return res.status(404).send('Doador não encontrado');
      }
      res.render("../views/donators/show", {donator: donator});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donatorController.searchByPhone2 = function(req, res) {
  Donator.findOne({phone: req.query.phone})
    .then(donator => {
      if (!donator) {
        return res.status(404).json({ error: 'Doador não encontrado' });
      }
      res.json(donator);
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

donatorController.create = function(req, res) {
  res.render("../views/donators/create");
};

donatorController.save = function(req, res) {
  var donator = new Donator(req.body);

  donator.save()
    .then(savedDonator => {
      console.log('Doador registado com sucesso.');

      var fileDestination = path.join(__dirname, "..", "images", "donators",savedDonator._id.toString() + ".jpg");

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

donatorController.save2 = function(req, res) {
  var donator = new Donator(req.body);

  donator.save()
    .then(savedDonator => {
      console.log('Doador registado com sucesso.');

      var fileDestination = path.join(__dirname, "..", "images", "donators", savedDonator._id.toString() + ".jpg");

      fs.readFile(req.file.path, function(err, data) {
        if (err) {
          console.error("Erro ao ler o arquivo:", err);
          return res.status(500).json({ error: "Erro ao ler o arquivo" });
        }

        fs.writeFile(fileDestination, data, function(err) {
          if (err) {
            console.error("Erro ao escrever o arquivo na pasta 'images':", err);
            return res.status(500).json({ error: "Erro ao escrever o arquivo na pasta 'images'" });
          }

          fs.unlink(req.file.path, function(err) {
            if (err) {
              console.error("Erro ao remover o arquivo da pasta 'tmp':", err);
            }
          });
          res.json(savedDonator);
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Erro ao criar o doador', details: err.message });
    });
};

donatorController.edit = function(req, res) {
  Donator.findOne({_id: req.params.id})
    .then(donator => {
      if (!donator) {
        return res.status(404).send('Doador não encontrado');
      }
      res.render("../views/donators/edit", {donator: donator});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donatorController.edit2 = function(req, res) {
  Donator.findOne({_id: req.id})
    .then(donator => {
      if (!donator) {
        return res.status(404).json({ error: 'Doador não encontrado' });
      }
      res.json(donator);
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

donatorController.update = function(req, res) {
  Donator.findById(req.params.id)
    .then(donator => {
      if (!donator) {
        return res.status(404).send('Doador não encontrado');
      }

      donator.name = req.body.name;
      donator.phone = req.body.phone;
      donator.address = req.body.address;

      if (req.file) {
        var fileDestination = path.join(__dirname, "..", "images", "donators", donator._id.toString() + ".jpg");

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
            donator.save()
              .then(updatedDonator => {
                console.log('Doador atualizado com sucesso.');
                res.redirect("/donators/show/" + updatedDonator._id);
              })
              .catch(err => {
                console.log(err);
                res.render("../views/donators/edit", { donator: req.body });
              });
          });
        });
      } else {
        donator.save()
          .then(updatedDonator => {
            console.log('Doador atualizado com sucesso.');
            res.redirect("/donators/show/" + updatedDonator._id);
          })
          .catch(err => {
            console.log(err);
            res.render("../views/donators/edit", { donator: req.body });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.render("../views/donators/edit", { donator: req.body });
    });
};

donatorController.update2 = function(req, res) {
  Donator.findById(req.id)
    .then(donator => {
      if (!donator) {
        return res.status(404).json({ error: 'Doador não encontrado' });
      }

      donator.name = req.body.name;
      donator.email = req.body.email;
      donator.phone = req.body.phone;
      donator.address = req.body.address;

      if (req.file) {
        var fileDestination = path.join(__dirname, "..", "images", "donators", donator._id.toString() + ".jpg");

        fs.readFile(req.file.path, function(err, data) {
          if (err) {
            console.error("Erro ao ler o arquivo:", err);
            return res.status(500).json({ error: "Erro ao ler o arquivo" });
          }

          fs.writeFile(fileDestination, data, function(err) {
            if (err) {
              console.error("Erro ao escrever o arquivo na pasta 'images':", err);
              return res.status(500).json({ error: "Erro ao escrever o arquivo na pasta 'images'" });
            }

            fs.unlink(req.file.path, function(err) {
              if (err) {
                console.error("Erro ao remover o arquivo da pasta 'tmp':", err);
              }
            });
            donator.save()
              .then(updatedDonator => {
                console.log('Doador atualizado com sucesso.');
                res.json(updatedDonator);
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Erro ao atualizar o doador', details: err.message });
              });
          });
        });
      } else {
        donator.save()
          .then(updatedDonator => {
            console.log('Doador atualizado com sucesso.');
            res.json(updatedDonator);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Erro ao atualizar o doador', details: err.message });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Erro ao atualizar o doador', details: err.message });
    });
};

donatorController.delete = function(req, res) {
  Donator.findOneAndDelete({ _id: req.params.id })
    .then(donator => {
      if (!donator) {
        return res.status(404).send('Entidade não encontrada');
      }

      var imagePath = path.join(__dirname, '..', 'images', "donators", donator._id.toString() + '.jpg');
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
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donatorController.delete2 = function(req, res) {
  Donator.findOneAndDelete({ _id: req.params.id })
    .then(donator => {
      if (!donator) {
        return res.status(404).json({ error: 'Entidade não encontrada' });
      }

      var imagePath = path.join(__dirname, '..', 'images', "donators", donator._id.toString() + '.jpg');
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, function(err) {
          if (err) {
            console.error('Erro ao remover a imagem associada à entidade:', err);
          }
        });
      }

      console.log("Doador excluído!");
      res.json({ message: 'Doador excluído com sucesso' });
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Erro ao excluir o doador', details: err.message });
    });
};

donatorController.returnDonators = function(req, res) {
  Donator.find()
    .then(donators => {
      res.json(donators);
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

donatorController.changePasswordDonator = async function(req, res) {
  try {
    const donator = await Donator.findById(req.id);
    if (!donator) {
      return res.status(404).json({ error: 'Doador não encontrado' });
    }

    const isMatch = await bcrypt.compare(req.body.currentPassword, donator.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Senha atual incorreta' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    donator.password = hashedPassword;
    await donator.save();

    res.json({ message: 'Senha alterada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao alterar a senha', details: err.message });
  }
};

module.exports = donatorController;
