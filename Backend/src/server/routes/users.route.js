import express from 'express'
import { authToken } from '../../middlewares/authToken.js'
import * as userController from '../controllers/user.controller.js'

const router = express.Router()

router.post('/users', userController.saveUsers)
router.post('/login', userController.loginUsers)
router.get('/users', authToken, userController.findByUser)
router.put('/editarUsuario', authToken, userController.updateByIdUser)

export default router
