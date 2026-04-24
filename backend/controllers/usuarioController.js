const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const User = require('../models/usuarioModel')

//jwt token
const generarToken = (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '10d'})
}

const data =(req,res)=> {
  res.status(200).json(req.user)
}
//registrar
const register = asyncHandler(async (req, res) => {
    const {nombre, email, password, password2} = req.body

    if(password !== password2){
      res.status(400)
      throw new Error('Las contrasenas no coinciden')
    }

    if(!nombre || !email || !password || !password2){
        res.status(400)
        throw new Error('No todos los datos fueron ingresados')
    }

    const userExiste = await User.findOne({email})
    if(userExiste){
        res.status(400)
        throw new Error('Usuario ya existe')
    }
    else{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            nombre,
            email,
            password : hashedPassword
        })

        if (user){
            res.status(201).json({
                __id: user.id,
                nombre: user.nombre,
                email: user.email,
                password: user.password
            })
        }
        else{
            res.status(400)
            throw new Error('No se guardaron los datos')
        }
    }

})

//login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({email})

  if (!email || !password) {
    res.status(400)
    throw new Error('Email y contraseña son obligatorios')
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      nombre: user.nombre,
      token: generarToken(user.id)
    })
  } else {
    res.status(401)
      throw new Error('Contraseña o email incorrectos')
  }

  })

//eliminar
const eliminarUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(404)
    throw new Error('Usuario no encontrado')
  }

  await User.findByIdAndDelete(req.user.id)
  res.status(200).json({message: 'Usuario eliminado'})
})

module.exports = {
register, login, data, eliminarUser
}
