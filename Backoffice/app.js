const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

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

mongoose.connect('mongodb+srv://paul0:1234@cluster0.gat7grz.mongodb.net/PAW?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true })
    .catch((err) => console.error(err));

const indexRouter = require('./routes/index');
const adminsRouter = require('./routes/admins');
const entitiesRouter = require('./routes/entities');
const donatorsRouter = require('./routes/donators');
const donationsRouter = require('./routes/donations');
const pointsRouter = require('./routes/points');
const loginRouter = require('./routes/login');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/admins', adminsRouter);
app.use('/api/v1/entities', entitiesRouter);
app.use('/api/v1/donators', donatorsRouter);
app.use('/api/v1/donations', donationsRouter);
app.use('/api/v1/points', pointsRouter);
app.use('/', indexRouter);
app.use('/admins', adminsRouter);
app.use('/entities', entitiesRouter);
app.use('/donators', donatorsRouter);
app.use('/donations', donationsRouter);
app.use('/points', pointsRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
