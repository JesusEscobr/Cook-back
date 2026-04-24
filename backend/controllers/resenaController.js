const asyncHandler = require('express-async-handler')
const Resena = require('../models/resenaModel')

//encontar
const getResena = asyncHandler(async (req, res) => {
  const resena = await Resena.find().populate('user', 'email')

  if (!resena) {
    res.status(404)
    throw new Error('Reseña no encontrada')
  }
  else{
  res.status(200).json(resena)
  }
})

//crear
const crearResena = asyncHandler(async (req, res) => {
  //const { titulo, contenido, calificacion } = req.body
  const resena = await Resena.create({
    titulo: req.body.titulo,
    contenido: req.body.contenido,
    calificacion: req.body.calificacion,
    user: req.user.id,
  })
  if (resena) {
    res.status(201).json(resena)
  } else {
    res.status(500)
    throw new Error("no se pudo crear la reseña")
  }

})

//editar
const editarResena = asyncHandler(async (req, res) => {
  const resena = await Resena.findById(req.params.id)

  if (!resena) {
    res.status(404)
    throw new Error('Reseña no encontrada')
  }

  if (resena.user.toString() !== req.usuario._id.toString()) {
    res.status(403)
    throw new Error('Usuario no autorizado')
  }

  const resenaEditada = await Resena.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json(resenaEditada)
})

//eliminar
const eliminarResena = asyncHandler( async (req, res) => {
  const resena = await Resena.findById(req.params.id)

  if(resena.user.toString() !== req.user.id){
    res.status(401)
    throw new Error("Usuario no autorizado")
  }
  else{
    await resena.deleteOne()
    res.status(200).json({id: req.params.id})
  }
})

module.exports = {getResena, crearResena, editarResena, eliminarResena}
