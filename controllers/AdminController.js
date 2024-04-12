var mongoose = require("mongoose");
var Admin = require("../models/Admin");

var adminController = {};

mongoose.connect('mongodb+srv://paul0:1234@cluster0.gat7grz.mongodb.net/PAW?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('connection succesful'))
.catch((err)=>console.error(err));

adminController.list = function(req, res) {
 Admin.find().exec (function(err,admin){
  if(err){
    console.log("Error:",err);
  }else{
    res.render("../views/admins/showAll",{admins:admin});
  }
});
};

adminController.show = function(req, res) {
  Admin.findOne({_id:req.params.id}).exec (function(err,admin){
    if(err){
      console.log("Error:",err);
    }else{
      res.render("../views/admins/show",{admin:admin});
    }
  });
};

adminController.create = function(req, res) {
  res.render("../views/admins/create");
};

adminController.save = function(req, res) {
  var admin = new Admin(req.body);

  admin.save(function(err){
    if(err){
      console.log(err);
      res.render('../views/admins/create');
    }else{
      console.log('Successfully created an admin.');
      res.redirect("show/"+employee._id)
    }
  });
};

adminController.edit = function(req, res) {
  Admin.findOne({_id:req.params.id}).exec(function (err,admin){
   if(err){
    console.log("Error:",err); 
   }else{
    res.render("../views/admins/edit",{admin:admin});
   }
  });
};

adminController.update = function(req, res) {
  Admin.findByIdAndUpdate(req.params.id,{$set:{name:req.body.name,email:req.body.email,userName:req.body.userName,password:req.body.password }},{new:true},function(err,admin){
    if(err){
      console.log(err);
      res.render("../views/admins/edit",{employee:req.body});
    }
    res.redirect("/admins/show/"+employee._id);
  });
};

adminController.delete = function(req, res) {
  Admin.remove({_id:req.params.id},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Admin detected!");
      res.redirect("/admins");
    }
  });
};

module.exports = adminController;