import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { CarruselUno } from '../components/carrusel/carrusel.jsx'
import ProDestacados from '../components/Destacados.jsx'

import { AwardFill, Backpack3, Bicycle, ClockFill } from 'react-bootstrap-icons'
import axios from 'axios'
import Context from '../context/UserContext.jsx'
import { useContext, useEffect } from 'react'
import { ENDPOINT } from '../config/constantes.jsx'

const Home = () => {
  const { setNuevoUsuario } = useContext(Context)

  const getUserData = () => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data: [user] }) => setNuevoUsuario({ ...user }))
        .catch(() => {
          window.sessionStorage.removeItem('token')
          setNuevoUsuario(null)
        })
    }
  }

  useEffect(getUserData, [])

  return (
    <Container fluid>
      <CarruselUno />
      <Row className='pt-5'>
        <Col className='text-center'>
          <AwardFill color='royalblue' size={96} />
          <p className='mt-3'>Pedalea hacia el éxito, cada viaje es un logro.</p>
        </Col>
        <Col className='text-center'>
          <Backpack3 color='royalblue' size={96} />
          <p className='mt-3'>Donde el corazón se encuentra con la aventura, ahí está tu bicicleta ideal.</p>
        </Col>
        <Col className='text-center'>
          <Bicycle color='royalblue' size={96} />
          <p className='mt-3'>Sube a la bicicleta de tus sueños y conquista el camino.</p>
        </Col>
        <Col className='text-center'>
          <ClockFill color='royalblue' size={96} />
          <p className='mt-3'>El mejor momento para montar es ahora. ¡Haz que cada segundo cuente!</p>
        </Col>

      </Row>
      <Row>
        <Col className='text-center mt-5 mb-5'>
          <h1>Productos destacados</h1>
        </Col>
      </Row>
      <ProDestacados />
    </Container>
  )
}

export default Home
