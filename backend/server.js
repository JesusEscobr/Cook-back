const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db')
const {errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())

app.use('/api/usuarios', require('./routes/usuarioRoutes'))
app.use('/api/resenas', require('./routes/resenaRoutes'))

// Ruta raíz
//*app.get('/', (req, res) => {
//  res.json({
//    message: 'API corriendo...',
//    endpoints: {
//      usuarios: '/api/usuarios',
//      resenas: '/api/resenas',
//    },
//  })
//})

app.use(errorHandler)

app.listen(port, () => console.log(`servidor iniciado en el puerto ${port}`))