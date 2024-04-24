var mongoose = require("mongoose");
var Admin = require("../models/Admin");
var bcrypt = require('bcryptjs');

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
      userName: req.body.userName,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    
    const savedAdmin = await admin.save();
    console.log('Admin criado com sucesso.');
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
        userName: req.body.userName,
        password:req.body.password
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
  Admin.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Admin deleted!");
      res.redirect("/admins");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = adminController;