var express = require('express');
var app = express();
 var bcrypt = require('bcrypt');

var Usuario = require('../models/usuario');

//Rutas
app.get('/', (req, res, next) => { //next: cuando se ejecute, continue a la prox funcion (se usan mas en los middelware)
    Usuario.find({}, 'nombre email img role') //con esto busca todos los campos menos el pass
        .exec(  // lo ejecuta

            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errors: err
                    })
                }
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            })


}); //esto es una peticion a la raiz del servivio (get);

app.post('/', (req, res) => {
    var body = req.body; //lo que se manda en el post, es lo que recibo en el objeto body
    var usuario = new Usuario({//este usuario hace referencia  al modelo (../models/usuario)
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {  //<-- this, a callback, una funcion que regresa cuando se guarda el usuario
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado //el nombre de la propiedad que quiero devolver
        });

    });

});


module.exports = app;