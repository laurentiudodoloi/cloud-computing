var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.post('/search', (req, res) => {
  const search = req.body.search;

  const place = placeService.search(search, (result) => {
    if (result) {
      datastore.storeSearchRecord({
        search_key: search,
        place_result: result.name,
        place_address: result.formatted_address
      });
    }

    res.render("statistics", { place: result });
  });
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


  //res.status(err.status || 500);
  //res.render('error');

//  app.listen(8080,(req, res) => {
//    console.log('Test');
//  });

module.exports = app;
