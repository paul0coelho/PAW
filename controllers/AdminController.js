var mongoose = require("mongoose");
var Admin = require("../models/Admin");

var adminController = {};

mongoose.connect('mongodb+srv://paul0:1234@cluster0.gat7grz.mongodb.net/PAW?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('connection succesful'))
.catch((err)=>console.error(err));

adminController.list = function(req, res) {
  Admin.find().exec()
    .then(admins => {
      res.render("../views/admins/showAll", {admins: admins});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

adminController.show = function(req, res) {
  Admin.findOne({_id: req.params.id}).exec()
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

adminController.save = function(req, res) {
  var admin = new Admin(req.body);

  admin.save()
    .then(savedAdmin => {
      console.log('Successfully created an admin.');
      res.redirect("show/" + savedAdmin._id);
    })
    .catch(err => {
      console.log(err);
      res.render('../views/admins/create');
    });
};

adminController.edit = function(req, res) {
  Admin.findOne({_id: req.params.id}).exec()
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
        return res.status(404).send('Admin not found');
      }
      res.redirect("/admins/show/" + admin._id);
    })
    .catch(err => {
      console.log(err);
      res.render("../views/admins/edit", { admin: req.body });
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


module.exports = adminController;