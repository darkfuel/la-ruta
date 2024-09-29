import express from 'express'
import cors from 'cors'
console.log('Cargando .env')
import 'dotenv/config';
console.log('DB_PASSWORD:', process.env.DB_PASSWORD)

import { registrarUsuario, validarUsuario, getUsuario, editarUsuario } from '../models/models.user.js'
import { jwtSign, jwtDecode } from '../utils/jwt/jwt.js'
import { authToken } from '../middlewares/authToken.js'

import { AllProducts, findById, deleteById, registrarProducto, updateFavorite, editarProducto } from '../models/models.products.js'
import morgan from 'morgan'
import * as routes from './routes/index.js'

const app = express()
const PORT = process.env.PORT ?? 3000

console.log('DB_PASSWORD:', process.env.DB_PASSWORD)
console.log('DB_PUERTO:', process.env.PORT)

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(routes.products)
app.use(routes.users)

app.listen(PORT, () => console.log('SERVER UP!'))

export default app