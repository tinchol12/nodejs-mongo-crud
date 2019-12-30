//servidor
const path = require('path'); //para reconocer la / en linux, la \ en windows
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();


//conectando la base de datos
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('DB Connected'))
    .catch(err => console.log(err));

//importing routes
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //no hace falta el require porque nodejs ya lo reconoce

//middlewares -- es una funcion que se ejecuta antes de que lleguen a las rutas
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //es necesario enteder datos de un formulario y para poder guardar datos

//routes
app.use('/',indexRoutes);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on Port ${app.get('port')}`);
});