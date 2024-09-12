import { useNavigate } from 'react-router-dom'
import { Container, Row, Button } from 'react-bootstrap/'
import { ENDPOINT } from '../config/constantes.jsx'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Container className='container-fluid text-center'>
      <Row>
        <h1 className='text-center'>- ERROR DE NAVEGACIÓN -</h1>
      </Row>
      <img className='img-fluid' src='https://img.freepik.com/vector-premium/divertido-diseno-404-ciclista-cayendo-bicicleta_556049-34.jpg?w=1480' />
      <Row className='container-fluid justify-content-center'>
        <Button variant='info' className='m-4 col-md-1' onClick={() => navigate('/productos')}>Volver</Button>
      </Row>
    </Container>
  )
}

export default NotFound
