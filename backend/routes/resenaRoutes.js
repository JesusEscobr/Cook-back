const express = require('express')
const router = express.Router()
const {getResena, crearResena, editarResena, eliminarResena,} = require('../controllers/resenaController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', getResena)
router.post('/', protect, crearResena)
router.put('/:id', protect, editarResena)
router.delete('/:email', protect, eliminarResena)

module.exports = router
