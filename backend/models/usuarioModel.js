const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    nombre: {
      type: String,
      required: [true, 'Ingrese su nombre'],
    },
    email: {
      type: String,
      required: [true, 'Ingrese su email'],
    },
    password: {
      type: String,
      required: [true, 'Ingrese su contrasena'],
    },
    esAdmin: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
)


module.exports = mongoose.model('User', userSchema)
