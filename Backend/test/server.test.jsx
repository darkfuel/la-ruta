import { expect, test } from 'vitest'
import app from '../src/server/app'
import request from 'supertest'

describe('Operaciones CRUD de productos', () => {
  test('REQ 1:  GET/productos | retorna statuscode 200', async () => {
    const response = await request(app).get('/productos').send()
    expect(response.status).toBe(200)
  })

  test('REQ 2:  DELETE /productos/:id | retornar 500 cuando el id no existe', async () => {
    const response = await request(app).delete('/productos/fake_id').set('Authorization', 'fake_token').send()
    expect(response.status).toBe(500)
  })

  test('REQ 3:  put /productos/:id | retornar 500 cuando el id no existe', async () => {
    const response = await request(app).put('/productos/fake_id').set('Authorization', 'fake_token').send()
    expect(response.status).toBe(500)
  })
})

describe('Operaciones CRUD de usuarios', () => {
  test('REQ 4: PUT /editarUsuario | retorna 401 cuando el encabezado Authorization no usa Bearer', async () => {
    const validToken = 'valid_token'

    const userData = {
      nombre: 'Juan',
      apellido: 'Pérez',
      telefono: '1234567890',
      email: 'juan.perez@example.com',
      direccion: 'Calle Falsa 123'
    }

    const response = await request(app)
      .put('/editarUsuario')
      .set('Authorization', `Basic ${validToken}`) // Incorrecto: debe ser Bearer
      .send(userData)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message', 'Bearer no proporcionado')
  })
})
