var mongoose = require("mongoose");
var Points = require("../models/Points");

var pointsController = {};

mongoose.connect('mongodb+srv://paul0:1234@cluster0.gat7grz.mongodb.net/PAW?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('connection successful'))
.catch((err) => console.error(err));

pointsController.list = function(req, res) {
  Points.find()
    .then(points => {
      res.render("../views/points/showAll", {points: points});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

pointsController.show = function(req, res) {
    Points.findOne({ _id: "661ff5afe10497c901313a23" })
      .then(points => {
        if (!points) {
          return res.status(404).send('');
        }
        res.render("../views/points/show", { points: points });
      })
      .catch(err => {
        console.log("Error:", err);
        res.status(500).send('Internal Server Error');
    });
};

pointsController.save = function(req, res) {
    var points = new Points(req.body);
  
    points.save()
      .then(savedPoints => {
        console.log('Successfully created a donator.');
        res.redirect("show/" + savedPoints._id);
      })
      .catch(err => {
        console.log(err);
        res.render('../views/points/create');
      });
  };
  
  pointsController.edit = function(req, res) {
    Points.findOne({_id: "661ff5afe10497c901313a23"})
      .then(points => {
        if (!points) {
          return res.status(404).send('');
        }
        res.render("../views/points/edit", {points: points});
      })
      .catch(err => {
        console.log("Error:", err);
        res.status(500).send('Internal Server Error');
      });
  };
  
  pointsController.update = function(req, res) {
    Points.findByIdAndUpdate("661ff5afe10497c901313a23",{ 
      $set: { 
        topPiecesPoints: req.body.topPiecesPoints, 
        bottomPiecesPoints: req.body.bottomPiecesPoints, 
        underwearPiecesPoints: req.body.underwearPiecesPoints
      }
    },{ new: true })
      .then(points => {
        if (!points) {
          return res.status(404).send('');
        }
        res.redirect("/points/show/" + "661ff5afe10497c901313a23");
      })
      .catch(err => {
        console.log(err);
        res.render("../views/points/edit", { points: req.body });
      });
  };

  module.exports = pointsController;