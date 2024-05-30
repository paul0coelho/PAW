const mongoose = require('mongoose')
const mongoUser = require('../models/Admin')
const jwt = require('jsonwebtoken')
const config = require('../jwt_secret/config')
const bcrypt = require('bcryptjs')
const Donator = require('../models/Donator')
var fs = require("fs")

mongoose.connect('mongodb+srv://paul0:1234@cluster0.gat7grz.mongodb.net/PAW?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('connection succesful'))
.catch((err)=>console.error(err));

let loginController = {}

loginController.submittedLogin = function(req, res, next) {
    const emailInput = req.body.email
    const passwordInput = req.body.password

    mongoUser.findOne({email:emailInput})
        .then(function(admin){
            if(!admin) {
                return res.redirect('/login');
            }
            bcrypt.compare(passwordInput, admin.password)
                .then(function(result){
                    if (result ===true){
                        const loginToken = jwt.sign({ email: admin.email }, config.secret, { expiresIn: 86400 });
                        res.cookie('login-token', loginToken, {maxAge: 82000})
                        res.redirect('/menuAdmin')
                    } else {
                        res.redirect('/login')
                    }
                })
        })
        .catch(function(err){
            next(err)
        })
};

loginController.login = function(req, res, next) {
    res.render('login')
};

loginController.logout = function(req, res, next) {
    res.clearCookie('login-token')
    res.redirect('/login')
};

loginController.verifyLoginUser = function(req, res, next) {
    const loginToken = req.cookies['login-token']
    if (loginToken){
        jwt.verify(loginToken, config.secret, function(err, decoded) {
            if (err) {
                return res.redirect('/login');
            }
            req.userEmail = decoded.email;
            next();
        })
    } else {
        res.redirect('/login')
    }
}

loginController.loginDonator = function(req, res) {
    Donator.findOne({ email: req.body.email }).then(donator => {
        if (!donator) {
            return res.status(404).json({ error: 'User not found' });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, donator.password);
        if (!passwordIsValid) {
            return res.status(401).json({ auth: false, token: null });
        }

        var token = jwt.sign({ email: donator.email }, config.secret, { expiresIn: 86400 });

        res.status(200).json({ auth: true, token: token });
    }).catch(err => {
        return res.status(500).json({ error: 'Error on the server.' });
    });
}

loginController.logoutDonator = function (req,res){
    res.status(200).json({auth: false, token: null});
}

loginController.registerDonator = function(req,res){

    try{
        var hashedPassword = bcrypt.hashSync(req.body.password,10);

        const donator = new Donator({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            password: hashedPassword
        });
        const savedDonator = donator.save();

        var token = jwt.sign({ email: savedDonator.email }, config.secret, { expiresIn: 86400 });

       
        res.status(200).json({ auth: true, token: token });

    }catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao registrar o doador'});
    }
}

loginController.profileDonator = function(req,res, next){
    const donatorEmail = req.donatorEmail;
    Donator.findOne({ email: donatorEmail })
      .then(donator => {
        if (!donator) {
          return res.status(404).json({ error: "Doador não encontrado" });
        }
        res.json(donator);
      })
      .catch(err => {
        console.log("Error:", err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
      });
}

loginController.verifyTokenDonator = function(req, res, next){

    var token = req.headers['x-access-token'];

    if(!token)
        return res.status(403).json({auth: false, message: 'No token provided.'});

    jwt.verify(token, config.secret, function(err,decoded){
        if(err)
            return res.status(500).json({auth: false, message: 'Failed to authenticate token.'});

        req.donatorEmail = decoded.email;
        next();
    });
}


module.exports = loginController;
