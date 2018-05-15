var express = require('express');
var app = express();
var bcrypt = require('bcrypt');
var jwt = require ('jsonwebtoken');
var SEED = require('../config/config');

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
            });

    //middelware //verifica si el token es valido. Despues de esto (get) todo necesita autenticacion

    app.use('/', (req, res, next) => {  //cualquier ruta que este debajo de esto, pasa por aca
        var token = req.query.token;
        jwt.verify(token, SEED, (err, decoded)=>{
            if (err){
                return res.status(401).json({
                    ok:false,
                    message:'token inválido',
                    errors: err
                });
            }
        });



    });


    //acutalizar usuario (put)
    app.put('/:id', (req, res) => {
        var id = req.params.id;
        var body = req.body;

        Usuario.findById(id, (err, usuario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el ' + id + 'no existe',
                    errors: { message: 'No existe ese id amewo' }
                });
            }
            // si no entra ninguno de los dos errores de arriba, entonces:

            usuario.nombre = body.nombre;
            usuario.email = body.email;
            usuario.role = body.role;

            usuario.save((err, usuarioGuardado) => {  //<-- this, a callback, una funcion que regresa cuando se guarda el usuario
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar usuario',
                        errors: err
                    });

                }
                usuarioGuardado.password = ':)'

                res.status(200).json({
                    ok: true,
                    usuario: usuarioGuardado
                });
            });
        });


        app.post('/', (req, res) => {
            var body = req.body; //lo que se manda en el post, es lo que recibo en el objeto body
            var usuario = new Usuario({//este usuario hace referencia  al modelo (../models/usuario)
                nombre: body.nombre,
                email: body.email,
                password: bcrypt.hashSync(body.password, 10),
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

    });
});

module.exports = app;