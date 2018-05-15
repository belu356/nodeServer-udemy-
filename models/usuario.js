// los modelos se suelen relacionar a un dato en particular

var mongoose = require('mongoose');
var uniqueValidator = require ('mongoose-unique-validator');


var Schema = mongoose.Schema;

var rolesValid = {
        values: ['admin_role', 'user_role'],
        message: '{VALUE} no es un role valido'
};

var usuarioSchema = new Schema({     //aca va la estructura de datos menos el id

        nombre: { type: String, required: [true, 'El nombre es necesario']},
        email: { type: String, unique: true,  required: [true, 'El correo es necesario']},
        password: { type: String,  required: [true, 'La contraseña es necesaria']},
        img: { type: String, required: false},
        role: { type: String, required: true, default: 'user_role', enum: rolesValid},
});
usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'}); //valida mail. {path} lee la propiedad del campo. En este caso email


module.exports = mongoose.model('usuario', usuarioSchema); //hay que exportarlo para usar este esquema fuera de este archivo
//  el nombre que quiero que tenga ('usuario') y el objeto que quiero que relacione (usuarioSchema)
