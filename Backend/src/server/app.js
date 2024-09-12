import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { registrarUsuario, validarUsuario, getUsuario, editarUsuario } from '../models/models.user.js'
import { jwtSign, jwtDecode } from '../utils/jwt/jwt.js'
import { authToken } from '../middlewares/authToken.js'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { multerMidleware } from '../middlewares/multer.js'

import { AllProducts, findById, deleteById, registrarProducto, updateFavorite, editarProducto } from '../models/models.products.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// Sirve archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.post('/users', async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, direccion, password } = req.body
    console.log(nombre, apellido, telefono, email, direccion, password)

    await registrarUsuario({ nombre, apellido, telefono, email, direccion, password })
    res.status(201).json({ status: true, message: 'Usuario registrado con éxito' })
  } catch (error) {
    res.status(error.code || 500).json({ message: 'Error en la conexión', error })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(email, password)

    const datosUser = await validarUsuario(email, password)

    const token = jwtSign(datosUser)

    res.status(200).json({ token })
  } catch (error) {
    console.error('Error en el login:', JSON.stringify(error, null, 2))
    res.status(error.code || 500).send(error)
  }
})

app.get('/users', authToken, async (req, res) => {
  try {
    const authorization = req.header('Authorization')
    console.log('authorization GET/users:', authorization)

    const [, token] = authorization.split(' ')
    const { email } = jwtDecode(token)

    const user = await getUsuario(email)
    console.log('user desde get', user)

    res.status(200).json(user)
  } catch (error) {
    res.status(error.code || 500).send(error)
  }
})

app.put('/editarUsuario', authToken, async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, direccion } = req.body
    console.log(nombre, apellido, telefono, email, direccion)
    const authorization = req.header('Authorization')
    const [, token] = authorization.split(' ')
    const { idUser } = jwtDecode(token)
    console.log(idUser)

    await editarUsuario({ nombre, apellido, telefono, email, direccion, idUser })
    res.status(200).json({ message: 'Tus datos han sido actualizados con éxito!' })
  } catch (error) {
    res.status(error.code || 500).json({ message: 'No se puede actualizar tu usuario, por favor intenta más tarde', error })
  }
})

// Crea la carpeta "uploads" si no existe para guardar las imagenes
const uploadsDir = path.resolve(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configuración del almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Asegúrate de que la ruta es correcta
    const uploadsDir = path.resolve(__dirname, '..', 'uploads')
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    // Genera un nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage })

app.post('/nuevo-producto', authToken, multerMidleware, upload.single('img'), async (req, res) => {
  try {
    const { nombre, precio, stock, descripcion } = req.body
    const imgPath = req.file ? `/uploads/${req.file.filename}` : null
    const authorization = req.header('Authorization')
    const [, token] = authorization.split(' ')
    const { idUser, isAdmin } = jwtDecode(token)

    if (!isAdmin) {
      return res.status(401).json({ message: 'Usuario no autorizado para agregar productos' })
    }

    await registrarProducto({ nombre, precio, stock, descripcion, imgPath, idUser })
    res.status(200).json({ status: true, message: 'Producto agregado con éxito' })
  } catch (error) {
    res.status(error.code || 500).json({ message: 'Error en la conexión', error })
  }
})

app.get('/productos', async (req, res) => {
  try {
    const result = await AllProducts(req.query)
    res.status(200).json(result)
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).json({ status: false, message: 'Internal Server Error' })
  }
})

app.get('/productos/:id', async (req, res) => {
  try {
    const result = await findById(req.params.id)
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).json({ status: false, message: 'Internal Server Error: (id)' })
  }
})

app.put('/productos/:id', async (req, res) => {
  try {
    const result = await updateFavorite(req.params.id)
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    console.error('Error al actualizar', error)
    res.status(500).json({ status: false, message: 'Internal Server Error: (id)' })
  }
})

app.put('/productosEdit', authToken, async (req, res) => {
  try {
    const { id, nombre, precio, stock, descripcion } = req.body
    console.log(id, nombre, precio, stock, descripcion)
    const authorization = req.header('Authorization')
    const [, token] = authorization.split(' ')
    const { idUser } = jwtDecode(token)
    console.log(idUser)

    await editarProducto({ id, nombre, precio, stock, descripcion, idUser })
    res.status(200).json({ message: 'El producto ha sido actualizado con éxito!' })
  } catch (error) {
    res.status(error.code || 500).json({ message: 'No se puede actualizar el producto, por favor intenta más tarde', error })
  }
})

app.delete('/productos/:id', async (req, res) => {
  try {
    const result = await deleteById(req.params.id)
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).json({ status: false, message: 'Internal Server Error: (id)' })
  }
})

app.listen(PORT, () => console.log('SERVER UP!'))

export default app
