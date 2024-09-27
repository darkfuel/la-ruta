import { AllProducts, findById, deleteById, registrarProducto, updateFavorite, editarProducto } from '../../models/models.products.js'
import { jwtDecode } from '../../utils/jwt/jwt.js'

export const findAllProducts = async (req, res) => {
  try {
    const result = await AllProducts()
    res.status(200).json(result)
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).json({ status: false, message: 'Internal Server Error' })
  }
}

export const findByIdProduct = async (req, res) => {
  try {
    const result = await findById(req.params.id)
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).json({ status: false, message: 'Internal Server Error: (id)' })
  }
}

export const saveProducts = async (req, res) => {
  try {
    const { nombre, precio, stock, descripcion, img } = req.body
    const authorization = req.header('Authorization')
    const [, token] = authorization.split(' ')
    const { idUser, isAdmin } = jwtDecode(token)

    if (!isAdmin) {
      return res.status(401).json({ message: 'Usuario no autorizado para agregar productos' })
    }
    console.log({ nombre, precio, stock, descripcion, img })
    await registrarProducto({ nombre, precio, stock, descripcion, img, idUser })
    res.status(200).json({ status: true, message: 'Producto agregado con éxito' })
  } catch (error) {
    res.status(error.code || 500).json({ message: 'Error en la conexión', error })
  }
}

export const updateByIdProduct = async (req, res) => {
  try {
    const result = await updateFavorite(req.params.id)
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    console.error('Error al actualizar', error)
    res.status(500).json({ status: false, message: 'Internal Server Error: (id)' })
  }
}

export const updateProducts = async (req, res) => {
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
}

export const deleteByIdProduct = async (req, res) => {
  try {
    const result = await deleteById(req.params.id)
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message)
    res.status(500).json({ status: false, message: 'Internal Server Error: (id)' })
  }
}
