const asyncHandler = require('express-async-handler')
const Resena = require('../models/resenaModel')

// @desc    Obtener una reseña por ID
// @route   GET /api/resenas/:id
// @access  Public
const getResena = asyncHandler(async (req, res) => {
  const resena = await Resena.findById(req.params.id).populate('autor', 'nombre email')

  if (!resena) {
    res.status(404)
    throw new Error('Reseña no encontrada')
  }

  res.json(resena)
})

// @desc    Crear reseña
// @route   POST /api/resenas
// @access  Private
const crearResena = asyncHandler(async (req, res) => {
  const { titulo, contenido, calificacion } = req.body

  const resena = await Resena.create({
    titulo,
    contenido,
    calificacion,
    autor: req.usuario._id,
  })

  const resenaPopulada = await resena.populate('autor', 'nombre email')
  res.status(201).json(resenaPopulada)
})

// @desc    Editar reseña
// @route   PUT /api/resenas/:id
// @access  Private (solo el autor)
const editarResena = asyncHandler(async (req, res) => {
  const resena = await Resena.findById(req.params.id)

  if (!resena) {
    res.status(404)
    throw new Error('Reseña no encontrada')
  }

  if (resena.autor.toString() !== req.usuario._id.toString()) {
    res.status(403)
    throw new Error('No tienes permiso para editar esta reseña')
  }

  const { titulo, contenido, calificacion } = req.body
  if (titulo) resena.titulo = titulo
  if (contenido) resena.contenido = contenido
  if (calificacion) resena.calificacion = calificacion

  await resena.save()
  await resena.populate('autor', 'nombre email')

  res.json(resena)
})

// @desc    Eliminar reseña
// @route   DELETE /api/resenas/:id
// @access  Private (autor o admin)
const eliminarResena = asyncHandler(async (req, res) => {
  const resena = await Resena.findById(req.params.id)

  if (!resena) {
    res.status(404)
    throw new Error('Reseña no encontrada')
  }

  const esAutor = resena.autor.toString() === req.usuario._id.toString()
  const esAdmin = req.usuario.rol === 'admin'

  if (!esAutor && !esAdmin) {
    res.status(403)
    throw new Error('No tienes permiso para eliminar esta reseña')
  }

  await resena.deleteOne()
  res.json({ message: 'Reseña eliminada correctamente' })
})

module.exports = {getResena, crearResena, editarResena, eliminarResena}
