var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json')

function imagesFoldersExists() {
  const imageFolders = [
    './images/admins',
    './images/donators',
    './images/donations',
    './images/entities'
  ];

  imageFolders.forEach(folderPath => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`Pasta "${folderPath}" criada com sucesso.`);
    } else {
      console.log(`Pasta "${folderPath}" já existe.`);
    }
  });
}

function tmpExists() {
  const tmpFolderPath = './tmp';

  if (!fs.existsSync(tmpFolderPath)) {
    fs.mkdirSync(tmpFolderPath);
    console.log('Pasta "tmp" criada com sucesso.');
  } else {
    console.log('Pasta "tmp" já existe.');
  }
}

imagesFoldersExists();
tmpExists();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://paul0:1234@cluster0.gat7grz.mongodb.net/PAW?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true })
  .catch((err) => console.error(err));

var index = require('./routes/index');
var admins = require('./routes/admins');
var entities = require('./routes/entities');
var donators = require('./routes/donators');
var donations = require('./routes/donations');
var points = require('./routes/points');
var login = require('./routes/login');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp');
  },
  filename: function (req, file, cb) {
    cb(null, req.body.phone.toString() + ".jpg");
  }
});

var upload = multer({ storage: storage });

var app = express();

app.use(upload.single('image'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/admins', admins);
app.use('/api/v1/entities', entities);
app.use('/api/v1/donators', donators);
app.use('/api/v1/donations', donations);
app.use('/api/v1/points', points);
app.use('/', index);
app.use('/admins', admins);
app.use('/entities', entities);
app.use('/donators', donators);
app.use('/donations', donations);
app.use('/points', points);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;