import { jwtVerify } from '../utils/jwt/jwt.js'

export const authToken = (req, res, next) => {
  const authorization = req.header('Authorization')

  if (!authorization === undefined) {
    return res.status(404).json({ message: 'Authorization no proporcionado' })
  }

  const [Bearer, token] = authorization.split(' ')

  if (Bearer.toLowerCase() !== 'bearer') {
    res.status(401).json({ message: 'Bearer no proporcionado' })
  }
  if (token === undefined) {
    res.status(401).json({ message: 'Token no proporcionado' })
  }

  try {
    jwtVerify(token)
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' })
  }
}
