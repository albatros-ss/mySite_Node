const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const index = express();
const server = http.createServer(index);
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const jsonfile = require('jsonfile');
const fileVersionControl = 'package.json';
const currentStatic = require('./gulp/config').root;
const config = require('./config');

// absolute path to upload folder
const uploadDir = path.join(__dirname, config.upload);

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, {
    useNewUrlParser: true,
  })
  .catch(e => {
    console.error(e);
    throw e;
  });

require('./models/db-close');
require('./models/blog');
require('./models/site');
require('./models/user');
require('./models/skills');

// view engine setup
index.set('views', path.join(__dirname, 'views'));
index.set('view engine', 'pug');

const LOCALS = './views/data/content.json';
index.locals = Object.assign(index.locals, JSON.parse(fs.readFileSync(LOCALS, 'utf-8')));

index.disable('x-powered-by');
index.use(logger('dev'));
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({extended: false}));
index.use(session({
  secret: 'secret',
  key: 'keys',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 600000
  },
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
index.use(express.static(path.join(__dirname, currentStatic)));

index.use('/', require('./routes/index'));
index.use('/about', require('./routes/about'));
index.use('/admin', require('./routes/admin'));
index.use('/blog', require('./routes/blog'));
index.use('/works', require('./routes/works'));

// 404 catch-all handler (middleware)
index.use(function (req, res) {
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
index.use(function (err, req, res) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
server.listen(process.env.PORT || config.http.port, function () {
  console.log("Express server listening on port %d", this.address().port);
});

let suffix;
if (process.env.NODE_ENV === 'development') {
  suffix = '';
} else {
  suffix = '.min';
}
server.on('listening', function () {
  jsonfile
    .readFile(fileVersionControl, function (err, obj, process) {
      if (err) {
        console.log('Data for hashing resources from package.json not read');
        console.log('Server stopped');
        process.exit(1);
      } else {
        index.locals.settings = {
          suffix: suffix,
          version: obj.version
        };
        console.log('Data for hashing resources from package.json read');

        //если такой папки нет - создаем ее
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }

        console.log('Express server started on port %s at %s', server.address().port, server.address().address);
      }
    });
});
