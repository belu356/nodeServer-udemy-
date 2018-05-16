var jwt = require('jsonwebtoken');
var SEED = require('../config/config');

//middelware //verifica si el token es valido. Despues de esto (get) todo necesita autenticacion

exports.verificaToken = function(req, res, next) {

    var token = req.query.token;
    
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: 'token inválido',
                errors: err
            });
        }

        req.usuario = decoded.usuario;
        next();
     
    });

}
