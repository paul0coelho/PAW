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

entityController.show = function(req, res) {
  Entity.findOne({_id: req.params.id})
    .then(entity => {
      if (!entity) {
        return res.status(404).send('Entity not found');
      }
      res.render("../views/entities/show", {entity: entity});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

entityController.searchByPhone = function(req, res) {
  Entity.findOne({phone: req.query.phone})
    .then(entity => {
      if (!entity) {
        return res.status(404).send('Entity not found');
      }
      res.render("../views/entities/show", {entity: entity});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
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
      console.log('Entidade criada com sucesso.');

      var fileDestination = path.join(__dirname, "..", "images", savedEntity._id.toString() + ".jpg");

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

entityController.edit = function(req, res) {
  Entity.findOne({_id: req.params.id})
    .then(entity => {
      if (!entity) {
        return res.status(404).send('Entity not found');
      }
      res.render("../views/entities/edit", {entity: entity});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

entityController.update = function(req, res) {
  if (!isValidEmail(req.body.email)) {
    console.log('Email inválido.');
    return res.render('../views/entities/edit', { entity: req.body, error: 'Email inválido' });
  }
  
  Entity.findByIdAndUpdate(req.params.id,{ 
    $set: { 
      name: req.body.name, 
      description: req.body.description, 
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone
    }
  },{ new: true })
    .then(entity => {
      if (!entity) {
        return res.status(404).send('Entity not found');
      }
      res.redirect("/entities/show/" + entity._id);
    })
    .catch(err => {
      console.log(err);
      res.render("../views/entities/edit", { entity: req.body });
    });
};

entityController.delete = function(req, res) {
  Entity.findOneAndDelete({ _id: req.params.id })
    .then(entity => {
      if (!entity) {
        return res.status(404).send('Entidade não encontrada');
      }

      var imagePath = path.join(__dirname, '..', 'images', entity._id.toString() + '.jpg');
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
      console.log(err);
      res.status(500).send('Erro interno do servidor');
    });
};

entityController.returnEntities = function(req, res) {
  Entity.find()
    .then(entities => {
      res.json(entities);
    })
    .catch(err => {
      console.log("Erro:", err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    });
};

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = entityController;
