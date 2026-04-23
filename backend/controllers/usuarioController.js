const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuarioModel')

// Helper: generar JWT
const generarToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

// @desc    Registrar usuario
// @route   POST /api/usuarios/registro
// @access  Public
const registrarUsuario = asyncHandler(async (req, res) => {
  const { nombre, email, password, rol } = req.body

  const existente = await Usuario.findOne({ email })
  if (existente) {
    res.status(400)
    throw new Error('El email ya está registrado')
  }

  const usuario = await Usuario.create({ nombre, email, password, rol })
  const token = generarToken(usuario._id)

  res.status(201).json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
    token,
  })
})

// @desc    Login usuario
// @route   POST /api/usuarios/login
// @access  Public
const loginUsuario = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Email y contraseña son obligatorios')
  }

  const usuario = await Usuario.findOne({ email })
  if (!usuario || !(await usuario.compararPassword(password))) {
    res.status(401)
    throw new Error('Credenciales inválidas')
  }

  const token = generarToken(usuario._id)

  res.json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
    token,
  })
})

// @desc    Obtener todos los usuarios
// @route   GET /api/usuarios
// @access  Private/Admin
const getUsuarios = asyncHandler(async (req, res) => {
  const usuarios = await Usuario.find().select('-password').sort({ createdAt: -1 })
  res.json(usuarios)
})

// @desc    Eliminar usuario
// @route   DELETE /api/usuarios/:id
// @access  Private/Admin
const eliminarUsuario = asyncHandler(async (req, res) => {
  const usuario = await Usuario.findById(req.params.id)

  if (!usuario) {
    res.status(404)
    throw new Error('Usuario no encontrado')
  }

  await usuario.deleteOne()
  res.json({ message: 'Usuario eliminado correctamente' })
})

module.exports = {
  registrarUsuario,
  loginUsuario,
  getUsuarios,
  eliminarUsuario,
}
