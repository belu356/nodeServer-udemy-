// Requires (importacion de librerias)

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Inicializar variables

var app = express();

// el body parser (otro middleware, cuando se hace una peticion, primero pasa por aca)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//Importar rutas

var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');


//conexion a la db
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res ) =>{
    if (err) throw err; //si la db no funciona o tira error, lo demas no se ejecuta
    console.log('db online');

});


//Rutas (middleware: algo que se ejecuta antes de que se ejecuten ciertas rutas)

app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);



//Escucha peticiones

 app.listen(3000, () => {
    console.log('Corriendo en puerto 3000');
});

