const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const usuarioSchema = mongoose.Schema(
  {
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
      required: [true, 'Ingrese contrasena'],
    },
    rol: {
      type: String,
      enum: ['usuario', 'admin'],
      default: 'usuario',
    },
  },
  { timestamps: true }
)


usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

usuarioSchema.methods.compararPassword = async function (passwordIngresado) {
  return await bcrypt.compare(passwordIngresado, this.password)
}

module.exports = mongoose.model('Usuario', usuarioSchema)
