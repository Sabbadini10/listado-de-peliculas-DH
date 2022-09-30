require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override');
var createError = require('http-errors');

const indexRouter = require('./src/routes/index');

const moviesRoutes = require('./src/routes/moviesRoutes');
const genresRoutes = require('./src/routes/genresRoutes');
const actorsRoutes = require('./src/routes/actorsRoutes');
const app = express();



// view engine setup
app.set('views', path.resolve(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, '../my-app/public')));
app.use(express.urlencoded({ extended: false })); 
app.use(methodOverride('_method'));

// routes
app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);
app.use(actorsRoutes);

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
  

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));

module.exports = app;
