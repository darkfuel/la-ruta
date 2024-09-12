import { db } from '../database/conectionDB.js'
import bcrypt from 'bcrypt'

export const registrarUsuario = async ({ nombre, apellido, telefono, email, direccion, password }) => {
  const passwordEncriptada = bcrypt.hashSync(password, 10)

  const query = 'INSERT INTO usuarios (nombre, apellido, telefono, email, direccion, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;'
  const values = [nombre, apellido, telefono, email, direccion, passwordEncriptada]

  const { rowCount } = await db(query, values)

  if (!rowCount) {
    const newError = { code: 500, message: 'Error al crear el usuario, por favor intente más tarde' }
    throw newError
  }
}

export const validarUsuario = async (email, password) => {
  const query = 'SELECT * FROM usuarios WHERE email = $1;'
  const values = [email]

  const { rows: [usuario], rowCount } = await db(query, values)

  console.log('usuario desde models:', usuario)

  if (rowCount === 0) {
    const newError = { code: 401, message: 'Email o clave incorrecta' }
    throw newError
  }

  const passwordEncriptada = usuario.password
  const passwordOk = await bcrypt.compare(password, passwordEncriptada)
  console.log('passwordOK', passwordOk)

  if (!passwordOk) {
    const newError = { code: 401, message: 'Email o clave incorrecta' }
    throw newError
  }

  console.log(usuario.id, 'id de usuario desde models')

  const dataUser = {
    idUser: usuario.id,
    isAdmin: usuario.is_admin,
    email: usuario.email
  }

  return dataUser
}

export const getUsuario = async (email) => {
  try {
    const query = 'SELECT id, nombre, apellido, telefono, email, direccion, is_admin FROM usuarios WHERE email = $1;'
    const values = [email]

    const { rows } = await db(query, values)
    return rows
  } catch (error) {
    const newError = { code: 500, message: error }
    throw newError
  }
}

export const editarUsuario = async ({ nombre, apellido, telefono, email, direccion, idUser }) => {
  console.log(nombre, apellido, telefono, email, direccion, idUser)
  const query = 'UPDATE usuarios SET nombre = $1, apellido = $2, telefono = $3, email = $4, direccion = $5 WHERE id = $6;'
  const values = [nombre, apellido, telefono, email, direccion, idUser]
  const { rows } = await db(query, values)
  return rows
}
