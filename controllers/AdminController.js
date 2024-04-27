var mongoose = require("mongoose");
var Admin = require("../models/Admin");
var bcrypt = require('bcryptjs');
var path = require('path');
var fs = require("fs");

var adminController = {};

mongoose.connect('mongodb+srv://paul0:1234@cluster0.gat7grz.mongodb.net/PAW?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('connection succesful'))
.catch((err)=>console.error(err));

adminController.list = function(req, res) {
  Admin.find()
    .then(admins => {
      res.render("../views/admins/showAll", {admins: admins});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

adminController.show = function(req, res) {
  Admin.findOne({_id: req.params.id})
    .then(admin => {
      if (!admin) {
        return res.status(404).send('Admin not found');
      }
      res.render("../views/admins/show", {admin: admin});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

adminController.searchByEmail = function(req, res) {
  Admin.findOne({email: req.query.email})
    .then(admin => {
      if (!admin) {
        return res.status(404).send('Admin not found');
      }
      res.render("../views/admins/show", {admin: admin});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

adminController.create = function(req, res) {
  res.render("../views/admins/create");
};

adminController.save =  async function(req, res) {
  if (!isValidEmail(req.body.email)) {
    console.log('Email inválido.');
    return res.render('../views/admins/create', { error: 'Email inválido' });
  }
  try {
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    
    const admin = new Admin({
      phone: req.body.phone,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    
    const savedAdmin = await admin.save();
    console.log('Admin criado com sucesso.');

    var fileDestination = path.join(__dirname, "..", "images", savedAdmin._id.toString() + ".jpg");

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
        });
      });
    res.redirect("show/" + savedAdmin._id);
  } catch (err) {
    console.log(err);
    res.render('../views/admins/create', { error: 'Erro ao criar o admin' });
  }
};

adminController.edit = function(req, res) {
  Admin.findOne({_id: req.params.id})
    .then(admin => {
      if (!admin) {
        return res.status(404).send('Admin not found');
      }
      res.render("../views/admins/edit", {admin: admin});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

adminController.update = function(req, res) {
  if (!isValidEmail(req.body.email)) {
    console.log('Email inválido.');
    return res.render('../views/admins/edit', { admin: req.body, error: 'Email inválido' });
  }

  Admin.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      }
    }, { new: true })
    .then(admin => {
      if (!admin) {
        return res.status(404).send('Admin não encontrado');
      }
      res.redirect("/admins/show/" + admin._id);
    })
    .catch(err => {
      console.log(err);
      res.render("../views/admins/edit", { admin: req.body, error: 'Erro ao atualizar o admin' });
    });
};

adminController.delete = function(req, res) {
  Admin.findOneAndDelete({ _id: req.params.id })
    .then(admin => {
      if (!admin) {
        return res.status(404).send('Entidade não encontrada');
      }

      var imagePath = path.join(__dirname, '..', 'images', admin._id.toString() + '.jpg');
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, function(err) {
          if (err) {
            console.error('Erro ao remover a imagem associada à entidade:', err);
          }
        });
      }

      console.log("Administrador excluído!");
      res.redirect("/admins");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Erro interno do servidor');
    });
};

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
adminController.profile = function(req, res) {
  const userEmail = req.userEmail;
  Admin.findOne({ email: userEmail })
      .then(admin => {
          if (!admin) {
              return res.status(404).send("Administrador não encontrado");
          }
          res.render('profile', { admin: admin });
      })
      .catch(err => {
          console.log('Erro ao buscar informações do administrador:', err);
          res.status(500).send("Erro interno do servidor");
      });
};


module.exports = adminController;