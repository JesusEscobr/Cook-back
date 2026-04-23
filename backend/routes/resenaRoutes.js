const express = require('express')
const router = express.Router()
const {getResenas, getResena, crearResena, editarResena, eliminarResena,} = require('../controllers/resenaController')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
router.get(getResenas)
router.post(protect, crearResena)
router.route('/:id')
router.get(getResena)
router.put(protect, editarResena)
router.delete(protect, eliminarResena)

module.exports = router
