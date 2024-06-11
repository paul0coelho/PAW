const mongoose = require('mongoose')
const mongoUser = require('../models/Admin')
const jwt = require('jsonwebtoken')
const config = require('../jwt_secret/config')
const bcrypt = require('bcryptjs')
const Donator = require('../models/Donator')
const Entity = require('../models/Entity')
const Points = require('../models/Points')
var fs = require("fs")
const transporter = require('./mailer')
var path = require('path')

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

loginController.login2 = function(req, res, next) {
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
loginController.login = function(req, res) {
    // Primeiro tenta encontrar o usuário no modelo Donator
    Donator.findOne({ email: req.body.email }).then(donator => {
        if (donator) {
            return checkUserAndPassword(donator, 'donator');
        } else {
            // Se não encontrado como Donator, tenta encontrar como Entity
            return Entity.findOne({ email: req.body.email }).then(entity => {
                if (entity) {
                    return checkUserAndPassword(entity, 'entity');
                } else {
                    // Se nenhum usuário foi encontrado como Entity
                    return res.status(404).json({ error: 'User not found' });
                }
            });
        }
    }).catch(err => {
        console.error(err);
        return res.status(500).json({ error: 'Error on the server.' });
    });

    function checkUserAndPassword(user, userType) {
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ auth: false, token: null });
        }

        var token = jwt.sign({id:user._id, email: user.email, userType: userType }, config.secret, { expiresIn: 86400 });
        return res.status(200).json({ auth: true, token: token, userType: userType });
    }
};
loginController.logoutDonator = function (req,res){
    res.status(200).json({auth: false, token: null});
}

loginController.registerDonator = async function(req, res) {
    try {
        const emailExistsEntity = await Entity.findOne({ email: req.body.email });
        if (emailExistsEntity) {
            return res.status(400).json({ error: 'Email já está em uso por outra entidade.' });
        }
      
        var hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const donator = new Donator({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            password: hashedPassword,
            canvasserCode: req.body.email
        });

        if (req.body.canvasserCode) {
            const canvasser = await Donator.findOne({ email: req.body.canvasserCode });
            if (canvasser) {
                const points = await Points.findOne({_id:'661ff5afe10497c901313a23'});
                if (points) {
                    const mailOptions = {
                        from: 'recilatextil5@gmail.com',
                        to: req.body.canvasserCode,
                        subject: 'Novo doador Angariado',
                        text: `O doador ${req.body.name} utilizou o seu código no registo. Com isso, ganhou ${points.pointsPerNewUser} pontos.`
                    };
    
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email enviado: ' + info.response);
                        }
                    });
                    canvasser.gainedPoints += points.pointsPerNewUser;
                    await canvasser.save();
                }
            }
        }

        const savedDonator = await donator.save();
        var token = jwt.sign({id: savedDonator._id, email: savedDonator.email }, config.secret, { expiresIn: 86400 });

        if (req.file) {
            const fileDestination = path.join(__dirname, '..', 'images', 'donators', savedDonator._id.toString() + ".jpg");

            fs.rename(req.file.path, fileDestination, function(err) {
                if (err) {
                    console.error('Error moving file:', err);
                    return res.status(500).send('Error moving file');
                }
            });
        }

        res.status(200).json({ auth: true, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao registrar o doador' });
    }
}

loginController.registerEntity = async function(req, res) {
    try {
        const emailExistsDonator = await Donator.findOne({ email: req.body.email });
        if (emailExistsDonator) {
            return res.status(400).json({ error: 'Email já está em uso por um doador.' });
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const entity = new Entity({
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            accepted: 'em espera'
        });

        const savedEntity = await entity.save();
        const token = jwt.sign({ id: savedEntity._id, email: savedEntity.email }, config.secret, { expiresIn: 86400 });

        if (req.file) {
            const fileDestination = path.join(__dirname, '..', 'images', 'entities', savedEntity._id.toString() + ".jpg");

            fs.rename(req.file.path, fileDestination, function(err) {
                if (err) {
                    console.error('Error moving file:', err);
                    return res.status(500).send('Error moving file');
                }
            });
        }

        const admins = await mongoUser.find();
        const adminEmails = admins.map(admin => admin.email);

        const mailOptions = {
            from: 'recilatextil5@gmail.com',
            to: adminEmails,
            subject: 'Nova Entidade Registada',
            text: `A entidade ${savedEntity.name} registou-se e está à espera para ser aceita.`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });

        res.status(200).json({ auth: true, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao registrar entidade' });
    }
}

loginController.profileDonator = function(req,res, next){
    const donatorEmail = req.email;
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

loginController.profileEntity = function(req,res, next){
    const entityEmail = req.email;
    Entity.findOne({ email: entityEmail })
      .then(entity => {
        if (!entity) {
          return res.status(404).json({ error: "Entidade não encontrado" });
        }
        res.json(entity);
      })
      .catch(err => {
        console.log("Error:", err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
      });
}

loginController.verifyToken = function(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) {
        console.log("Token not provided");
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    token = token.split(' ')[1];

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            console.log("Token verification failed", err);
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        console.log("Token verified, email:", decoded.email);
        console.log("Token verified, id:", decoded.id);

        req.email = decoded.email;
        req.id = decoded.id;
        next();
    });
}


module.exports = loginController;
