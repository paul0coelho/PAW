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

pointsController.list2 = function(req, res) {
  Points.findById('661ff5afe10497c901313a23')
    .then(points => {
      res.json(points);
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
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

pointsController.show2 = function(req, res) {
  Points.findOne({ _id: "661ff5afe10497c901313a23" })
    .then(points => {
      if (!points) {
        return res.status(404).json({ error: 'Pontos não encontrados' });
      }
      res.json(points);
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

pointsController.save = function(req, res) {
    var points = new Points(req.body);
  
    points.save()
      .then(savedPoints => {
        res.redirect("show/" + savedPoints._id);
      })
      .catch(err => {
        console.log(err);
        res.render('../views/points/create');
      });
  };
  
  pointsController.save2 = function(req, res) {
    var points = new Points(req.body);
  
    points.save()
      .then(savedPoints => {
        res.status(201).json(savedPoints);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao guardar os pontos', details: err.message });
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
  
  pointsController.edit2 = function(req, res) {
    Points.findOne({_id: req.params.id})
      .then(point => {
        if (!point) {
          return res.status(404).json({ error: 'Pontos não encontrados' });
        }
        res.json(point);
      })
      .catch(err => {
        console.error("Error:", err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
      });
  };

  pointsController.update = function(req, res) {
    Points.findByIdAndUpdate("661ff5afe10497c901313a23", { 
      $set: { 
        topPiecesPoints: req.body.topPiecesPoints, 
        bottomPiecesPoints: req.body.bottomPiecesPoints, 
        underwearPiecesPoints: req.body.underwearPiecesPoints,
        pointsPerVoucher: req.body.pointsPerVoucher,
        pointsPerEuroDonated: req.body.pointsPerEuroDonated,
        pointsPerNewUser: req.body.pointsPerNewUser
      }
    }, { new: true })
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


  pointsController.update2 = function(req, res) {
    Points.findByIdAndUpdate("661ff5afe10497c901313a23", { 
      $set: { 
        topPiecesPoints: req.body.topPiecesPoints, 
        bottomPiecesPoints: req.body.bottomPiecesPoints, 
        underwearPiecesPoints: req.body.underwearPiecesPoints,
        pointsPerVoucher: req.body.pointsPerVoucher
      }
    }, { new: true })
      .then(points => {
        if (!points) {
          return res.status(404).json({ error: 'Pontos não encontrados' });
        }
        res.json(points);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao atualizar os pontos', details: err.message });
      });
  };

  module.exports = pointsController;