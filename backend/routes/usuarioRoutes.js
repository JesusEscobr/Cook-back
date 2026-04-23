const express = require('express')
const router = express.Router()
const {
  registrarUsuario,
  loginUsuario,
  getUsuarios,
  eliminarUsuario,
} = require('../controllers/usuarioController')
const { protect, soloAdmin } = require('../middleware/authMiddleware')

router.post('/registro', registrarUsuario)
router.post('/login', loginUsuario)
router.get('/', protect, soloAdmin, getUsuarios)
router.delete('/:id', protect, soloAdmin, eliminarUsuario)

module.exports = router
