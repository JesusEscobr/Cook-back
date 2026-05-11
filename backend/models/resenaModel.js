const mongoose = require('mongoose')

const resenaSchema = mongoose.Schema({
    titulo: {
      type: String,
      required: [true, 'Introduce un titulo'],
    },
    contenido: {
      type: String,
    },
    calificacion: {
      type: Number,
      required: [true, 'Introduce una calificacion'],
      min: [1, 'La calificación mínima es 1'],
      max: [5, 'La calificación máxima es 5'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },

  { timestamps: true }

)

module.exports = mongoose.model('Resena', resenaSchema)
