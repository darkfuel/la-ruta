import { registrarUsuario, validarUsuario, getUsuario, editarUsuario } from '../../models/models.user.js'
import { jwtSign, jwtDecode } from '../../utils/jwt/jwt.js'

export const saveUsers = async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, direccion, password } = req.body
    await registrarUsuario({ nombre, apellido, telefono, email, direccion, password })
    res.status(201).json({ status: true, message: 'Usuario registrado con éxito' })
  } catch (error) {
    res.status(error.code || 500).json({ message: 'Error en la conexión', error })
  }
}

export const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body
    const datosUser = await validarUsuario(email, password)
    const token = jwtSign(datosUser)
    res.status(200).json({ token })
  } catch (error) {
    console.error('Error en el login:', JSON.stringify(error, null, 2))
    res.status(error.code || 500).send(error)
  }
}

export const findByUser = async (req, res) => {
  try {
    const authorization = req.header('Authorization')
    const [, token] = authorization.split(' ')
    const { email } = jwtDecode(token)
    const user = await getUsuario(email)
    res.status(200).json(user)
  } catch (error) {
    res.status(error.code || 500).send(error)
  }
}

export const updateByIdUser = async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, direccion } = req.body
    const authorization = req.header('Authorization')
    const [, token] = authorization.split(' ')
    const { idUser } = jwtDecode(token)
    await editarUsuario({ nombre, apellido, telefono, email, direccion, idUser })
    res.status(200).json({ message: 'Tus datos han sido actualizados con éxito!' })
  } catch (error) {
    res.status(error.code || 500).json({ message: 'No se puede actualizar tu usuario, por favor intenta más tarde', error })
  }
}
