var express = require('express');
var app = express();

//Rutas
app.get('/', (req, res, next) => { //next: cuando se ejecute, continue a la prox funcion (se usan mas en los middelware)
    res.status(200).json({  //en el json mando un objeto js
        ok: true,
        mensaje: 'todo ok'
    });
}); //esto es una peticion a la raiz del servivio (get);

module.exports = app;