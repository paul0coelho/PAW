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

adminController.list2 = function(req, res) {
  Admin.find()
    .then(admins => {
      res.json(admins);
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

adminController.show = function(req, res) {
  Admin.findOne({_id: req.params.id})
    .then(admin => {
      if (!admin) {
        return res.status(404).send('Administrador não encontrado');
      }
      res.render("../views/admins/show", {admin: admin});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

adminController.show2 = function(req, res) {
  Admin.findOne({_id: req.params.id})
    .then(admin => {
      if (!admin) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }
      res.json(admin);
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

adminController.searchByEmail = function(req, res) {
  Admin.findOne({email: req.query.email})
    .then(admin => {
      if (!admin) {
        return res.status(404).send('Administrador não encontrado');
      }
      res.render("../views/admins/show", {admin: admin});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

adminController.searchByEmail2 = function(req, res) {
  Admin.findOne({email: req.query.email})
    .then(admin => {
      if (!admin) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }
      res.json(admin);
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
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

    var fileDestination = path.join(__dirname, "..", "images", "admins", savedAdmin._id.toString() + ".jpg");

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

adminController.save2 = async function(req, res) {
  if (!isValidEmail(req.body.email)) {
    console.log('Email inválido.');
    return res.status(400).json({ error: 'Email inválido' });
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

    var fileDestination = path.join(__dirname, "..", "images", "admins", savedAdmin._id.toString() + ".jpg");
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
      });
    });
    res.json(savedAdmin);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Erro ao criar o admin', details: err.message });
  }
};

adminController.edit = function(req, res) {
  Admin.findOne({_id: req.params.id})
    .then(admin => {
      if (!admin) {
        return res.status(404).send('Administrador não encontrado');
      }
      res.render("../views/admins/edit", {admin: admin});
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send('Internal Server Error');
    });
};

adminController.edit2 = function(req, res) {
  Admin.findOne({_id: req.params.id})
    .then(admin => {
      if (!admin) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }
      res.render("../views/admins/edit", {admin: admin});
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

adminController.update = function(req, res) {
  if (!isValidEmail(req.body.email)) {
    console.log('Email inválido.');
    return res.render('../views/admins/edit', { admin: req.body, error: 'Email inválido' });
  }

  Admin.findById(req.params.id)
    .then(admin => {
      if (!admin) {
        return res.status(404).send('Administrador não encontrado');
      }

      admin.name = req.body.name;
      admin.email = req.body.email;
      admin.phone = req.body.phone;

      if (req.file) {
        var fileDestination = path.join(__dirname, "..", "images","admins", admin._id.toString() + ".jpg");

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

            admin.save()
              .then(updatedAdmin => {
                console.log('Administrador atualizado com sucesso.');
                res.redirect("/admins/show/" + updatedAdmin._id);
              })
              .catch(err => {
                console.log(err);
                res.render("../views/admins/edit", { admin: req.body });
              });
          });
        });
      } else {
        admin.save()
          .then(updatedAdmin => {
            console.log('Administrador atualizado com sucesso.');
            res.redirect("/admins/show/" + updatedAdmin._id);
          })
          .catch(err => {
            console.log(err);
            res.render("../views/admins/edit", { admin: req.body });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.render("../views/admins/edit", { admin: req.body });
    });
};

adminController.update2 = function(req, res) {
  if (!isValidEmail(req.body.email)) {
    console.log('Email inválido.');
    return res.status(400).json({ error: 'Email inválido' });
  }

  Admin.findById(req.params.id)
    .then(admin => {
      if (!admin) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }

      admin.name = req.body.name;
      admin.email = req.body.email;
      admin.phone = req.body.phone;

      if (req.file) {
        var fileDestination = path.join(__dirname, "..", "images", "admins", admin._id.toString() + ".jpg");

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

            admin.save()
              .then(updatedAdmin => {
                console.log('Administrador atualizado com sucesso.');
                res.json(updatedAdmin);
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Erro ao atualizar o admin', details: err.message });
              });
          });
        });
      } else {
        admin.save()
          .then(updatedAdmin => {
            console.log('Administrador atualizado com sucesso.');
            res.json(updatedAdmin);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Erro ao atualizar o admin', details: err.message });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Erro ao atualizar o admin', details: err.message });
    });
};

adminController.delete = function(req, res) {
  Admin.findOneAndDelete({ _id: req.params.id })
    .then(admin => {
      if (!admin) {
        return res.status(404).send('Administrador não encontrado');
      }

      var imagePath = path.join(__dirname, '..', 'images', "admins", admin._id.toString() + '.jpg');
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, function(err) {
          if (err) {
            console.error('Erro ao remover a imagem associada ao administrador:', err);
          }
        });
      }

      console.log("Administrador excluído!");
      res.redirect("/admins");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

adminController.delete2 = function(req, res) {
  Admin.findOneAndDelete({ _id: req.params.id })
    .then(admin => {
      if (!admin) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }

      var imagePath = path.join(__dirname, '..', 'images', "admins", admin._id.toString() + '.jpg');
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, function(err) {
          if (err) {
            console.error('Erro ao remover a imagem associada ao administrador:', err);
          }
        });
      }

      console.log("Administrador excluído!");
      res.json({ message: 'Administrador excluído com sucesso' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Erro ao excluir o admin', details: err.message });
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
          res.render('admin/profile', { admin: admin });
      })
      .catch(err => {
          console.log("Error:", err);
          res.status(500).send('Internal Server Error');
      });
};

adminController.profile2 = function(req, res) {
  const userEmail = req.userEmail;
  Admin.findOne({ email: userEmail })
    .then(admin => {
      if (!admin) {
        return res.status(404).json({ error: "Administrador não encontrado" });
      }
      res.json(admin);
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    });
};

adminController.editPassword = async function(req, res) {
  const userEmail = req.userEmail;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
      const admin = await Admin.findOne({ email: userEmail }).exec();
      if (!admin) {
          return res.status(404).send("Administrador não encontrado");
      }

      
      const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
      if (!isPasswordValid) {
        return res.render("admins/editPassword", { error: "Password atual incorreta" });
      }

      
      if (newPassword !== confirmPassword) {
        return res.render("admins/editPassword", { error: "Password não coincide" });
      }

      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
      await admin.save();

      res.redirect('/profile'); 
  } catch (err) {
      console.error("Erro ao trocar a password:", err);
      res.status(500).send("Erro interno do servidor");
  }
};

adminController.editPassword2 = async function(req, res) {
  const userEmail = req.email;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email: userEmail }).exec();
    if (!admin) {
      return res.status(404).json({ error: "Administrador não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Password atual incorreta" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Password não coincide" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.json({ message: "Senha alterada com sucesso" });
  } catch (err) {
    console.error("Erro ao trocar a senha:", err);
    res.status(500).json({ error: "Erro interno do servidor", details: err.message });
  }
};

module.exports = adminController;