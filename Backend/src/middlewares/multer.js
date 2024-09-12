import multer from 'multer'

export const multerMidleware = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Un error específico de multer ha ocurrido
    return res.status(500).json({ message: 'Error de subida de archivo' })
  } else if (err) {
    // Otro tipo de error
    return res.status(500).json({ message: 'Error en el servidor' })
  }
  next()
}
