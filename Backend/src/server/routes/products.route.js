import express from 'express'
import { authToken } from '../../middlewares/authToken.js'
import * as productController from '../controllers/products.controller.js'

const router = express.Router()

router.get('/productos', productController.findAllProducts)
router.get('/productos/:id', productController.findByIdProduct)
router.post('/nuevo-producto', authToken, productController.saveProducts)
router.put('/productos/:id', productController.updateByIdProduct)
router.put('/productosEdit', authToken, productController.updateProducts)
router.delete('/productos/:id', productController.deleteByIdProduct)
// falta agregar el token de delete en el front
export default router
