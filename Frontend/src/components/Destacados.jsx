import { useContext } from 'react'
import { ProductContext } from '../context/ProductContext.jsx'
import { Container, Row, Card, Button } from 'react-bootstrap'
import { Star, StarFill } from 'react-bootstrap-icons'

const Destacados = () => {
  const { productos, addProduct, imgSrc } = useContext(ProductContext)
  const producFiltered = productos.filter((product) => product.favoritos === true)

  return (
    <Container fluid className='mb-5'>
      <Row className='fluid text-center mt-2 mb-2 justify-content-center' />
      <Row>
        {producFiltered.map(card => (
          <Container className='col-md-3 p-3' key={card.id}>
            <Card>
              {!card.favoritos ? <Star color='gray' size={30} /> : <StarFill color='gray' size={30} />}
              <Card.Img variant='top' className='img-fluid' src={card.img === '' ? imgSrc : card.img} alt={card.nombre} />
              <Card.Body>
                <Card.Title>{card.nombre}</Card.Title>
                <hr />
                <Card.Text>{card.descripcion}</Card.Text>
                <Card.Text>Precio: {card.precio}</Card.Text>
                <Button variant='secondary' onClick={() => addProduct(card)}>Agregar al Carrito</Button>
              </Card.Body>
            </Card>
          </Container>
        ))}
      </Row>
    </Container>

  )
}

export default Destacados
