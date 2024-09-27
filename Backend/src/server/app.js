import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import * as routes from './routes/index.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(routes.products)
app.use(routes.users)

app.listen(PORT, () => console.log('SERVER UP!'))

export default app