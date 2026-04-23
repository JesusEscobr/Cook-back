const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Usuario = require('../models/usuarioModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    res.status(401)
    throw new Error('No autorizado, token requerido')
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.usuario = await Usuario.findById(decoded.id).select('-password')

  if (!req.usuario) {
    res.status(401)
    throw new Error('Usuario no encontrado')
  }

  next()
})

const soloAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'admin') {
    next()
  } else {
    res.status(403)
    throw new Error('Acceso denegado, se requiere rol admin')
  }
}

module.exports = { protect, soloAdmin }
