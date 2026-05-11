const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/users',   require('./routes/usuarioRoutes'))
app.use('/api/resenas', require('./routes/resenaRoutes'))
app.use(errorHandler)

app.listen(port, () =>
  console.log(`Servidor iniciado en el puerto ${port}`.green.bold)
)