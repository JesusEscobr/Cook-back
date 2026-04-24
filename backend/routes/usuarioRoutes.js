const express = require('express')
const router = express.Router()
const {register, login, data, eliminarUser} = require('../controllers/usuarioController')
const {protect} = require('../middleware/authMiddleware')

router.post('/register', register)
router.post('/login', login)
router.post('/delete', eliminarUser)

//router.get('/data', protect, data)


module.exports = router
