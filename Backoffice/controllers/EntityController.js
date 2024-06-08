var mongoose = require("mongoose");
var Entity = require("../models/Entity");
var path = require('path');
var fs = require("fs");

var entityController = {};

mongoose.connect('mongodb+srv://paul0:1234@cluster0.gat7grz.mongodb.net/PAW?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('connection successful'))
.catch((err) => console.error(err));

entityController.list = function(req, res) {
  Entity.find()
    .then(entities => {
      res.render("../views/entities/showAll", {entities: entities});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

entityController.list2 = function(req, res) {
  Entity.find()
    .then(entities => {
      res.json(entities);
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

entityController.show = function(req, res) {
  Entity.findOne({_id: req.params.id})
    .then(entity => {
      if (!entity) {
        return res.status(404).send('Entidade não encontrada');
      }
      res.render("../views/entities/show", {entity: entity});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

entityController.show2 = function(req, res) {
  Entity.findOne({_id: req.params.id})
    .then(entity => {
      if (!entity) {
        return res.status(404).json({ error: 'Entidade não encontrada' });
      }
      res.json(entity);
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

entityController.searchByPhone = function(req, res) {
  Entity.findOne({phone: req.query.phone})
    .then(entity => {
      if (!entity) {
        return res.status(404).send('Entidade não encontrada');
      }
      res.render("../views/entities/show", {entity: entity});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

entityController.searchByPhone2 = function(req, res) {
  Entity.findOne({phone: req.query.phone})
    .then(entity => {
      if (!entity) {
        return res.status(404).json({ error: 'Entidade não encontrada' });
      }
      res.json(entity);
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

entityController.create = function(req, res) {
  res.render("../views/entities/create");
};

entityController.save = function(req, res) {
  if (!isValidEmail(req.body.email)) {
    console.log('Email inválido.');
    return res.render('../views/entities/create', { error: 'Email inválido' });
  }
  
  var entity = new Entity(req.body);

  entity.save()
    .then(savedEntity => {
      console.log('Entidade registada com sucesso.');

      var fileDestination = path.join(__dirname, "..", "images", "entities", savedEntity._id.toString() + ".jpg");

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
          res.redirect("show/" + savedEntity._id);
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.render('../views/entities/create');
    });
};

entityController.save2 = function(req, res) {
  if (!isValidEmail(req.body.email)) {
    console.log('Email inválido.');
    return res.status(400).json({ error: 'Email inválido' });
  }
  
  var entity = new Entity(req.body);

  entity.save()
    .then(savedEntity => {
      console.log('Entidade registada com sucesso.');

      var fileDestination = path.join(__dirname, "..", "images", "entities", savedEntity._id.toString() + ".jpg");

      fs.readFile(req.file.path, function(err, data) {
        if (err) {
          console.error("Erro ao ler o arquivo:", err);
          return res.status(500).json({ error: 'Erro ao ler o arquivo' });
        }

        fs.writeFile(fileDestination, data, function(err) {
          if (err) {
            console.error("Erro ao escrever o arquivo na pasta 'images':", err);
            return res.status(500).json({ error: 'Erro ao escrever o arquivo na pasta "images"' });
          }

          fs.unlink(req.file.path, function(err) {
            if (err) {
              console.error("Erro ao remover o arquivo da pasta 'tmp':", err);
            }
          });
          res.status(201).json(savedEntity);
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Erro ao salvar a entidade', details: err.message });
    });
};

entityController.edit = function(req, res) {
  Entity.findOne({_id: req.params.id})
    .then(entity => {
      if (!entity) {
        return res.status(404).send('Entidade não encontrada');
      }
      res.render("../views/entities/edit", {entity: entity});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

entityController.acceptEntity = function(req, res) {
  Entity.findOne({_id: req.params.id})
    .then(entity => {
      if (!entity) {
        return res.status(404).send('Entidade não encontrada');
      }
      entity.accepted = 'aceite';
      return entity.save();
    })
    .then(() => {
      res.redirect("/entities");
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

entityController.edit2 = function(req, res) {
  Entity.findOne({_id: req.params.id})
    .then(entity => {
      if (!entity) {
        return res.status(404).json({ error: 'Entidade não encontrada' });
      }
      res.json(entity);
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

entityController.update = function(req, res) {
  if (!isValidEmail(req.body.email)) {
    console.log('Email inválido.');
    return res.render('../views/entities/edit', { entity: req.body, error: 'Email inválido' });
  }

  Entity.findById(req.params.id)
    .then(entity => {
      if (!entity) {
        return res.status(404).send('Entidade não encontrada');
      }

      entity.name = req.body.name;
      entity.description = req.body.description;
      entity.address = req.body.address;
      entity.email = req.body.email;
      entity.phone = req.body.phone;

      if (req.file) {
        var fileDestination = path.join(__dirname, "..", "images", "entities", entity._id.toString() + ".jpg");

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

            entity.save()
              .then(updatedEntity => {
                console.log('Entidade atualizada com sucesso.');
                res.redirect("/entities/show/" + updatedEntity._id);
              })
              .catch(err => {
                console.log(err);
                res.render("../views/entities/edit", { entity: req.body });
              });
          });
        });
      } else {
        
        entity.save()
          .then(updatedEntity => {
            console.log('Entidade atualizada com sucesso.');
            res.redirect("/entities/show/" + updatedEntity._id);
          })
          .catch(err => {
            console.log(err);
            res.render("../views/entities/edit", { entity: req.body });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.render("../views/entities/edit", { entity: req.body });
    });
};

entityController.update2 = function(req, res) {
  if (!isValidEmail(req.body.email)) {
    console.log('Email inválido.');
    return res.status(400).json({ error: 'Email inválido' });
  }

  Entity.findById(req.id)
    .then(entity => {
      if (!entity) {
        return res.status(404).json({ error: 'Entidade não encontrada' });
      }

      entity.name = req.body.name;
      entity.description = req.body.description;
      entity.address = req.body.address;
      entity.email = req.body.email;
      entity.phone = req.body.phone;

      if (req.file) {
        var fileDestination = path.join(__dirname, "..", "images", "entities", entity._id.toString() + ".jpg");

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

            entity.save()
              .then(updatedEntity => {
                console.log('Entidade atualizada com sucesso.');
                res.json(updatedEntity);
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Erro ao atualizar a entidade', details: err.message });
              });
          });
        });
      } else {
        
        entity.save()
          .then(updatedEntity => {
            console.log('Entidade atualizada com sucesso.');
            res.json(updatedEntity);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Erro ao atualizar a entidade', details: err.message });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Erro ao atualizar a entidade', details: err.message });
    });
};

entityController.delete = function(req, res) {
  Entity.findOneAndDelete({ _id: req.params.id })
    .then(entity => {
      if (!entity) {
        return res.status(404).send('Entidade não encontrada');
      }

      var imagePath = path.join(__dirname, '..', 'images', "entities", entity._id.toString() + '.jpg');
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, function(err) {
          if (err) {
            console.error('Erro ao remover a imagem associada à entidade:', err);
          }
        });
      }

      console.log("Entidade excluída!");
      res.redirect("/entities");
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

entityController.delete2 = function(req, res) {
  Entity.findOneAndDelete({ _id: req.params.id })
    .then(entity => {
      if (!entity) {
        return res.status(404).json({ error: 'Entidade não encontrada' });
      }

      var imagePath = path.join(__dirname, '..', 'images', "entities", entity._id.toString() + '.jpg');
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, function(err) {
          if (err) {
            console.error('Erro ao remover a imagem associada à entidade:', err);
          }
        });
      }

      console.log("Entidade excluída!");
      res.json({ message: 'Entidade excluída com sucesso' });
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Erro ao excluir a entidade', details: err.message });
    });
};

entityController.returnEntities = function(req, res) {
  Entity.find({ accepted: 'aceite' })
    .then(entities => {
      res.json({entities : entities});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};


function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = entityController;
