var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const childProcess = require('child_process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use('/', indexRouter);
app.use('/users', usersRouter);*/

app.get(`/api/process/:pname`, (req, res) => {
  const processName = req.params.pname;

  // Ajoutez le code pour vérifier le processus ici
  childProcess.exec('tasklist', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    const isAlive = stdout.includes(processName);
    const reponse = {
      isAlive
    };
    res.json(reponse);
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
