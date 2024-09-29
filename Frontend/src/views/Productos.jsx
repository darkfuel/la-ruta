import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Star, StarFill } from 'react-bootstrap-icons'
// import { ENDPOINT } from '../config/constantes.jsx'
import ProductoFiltro from '../components/ProductoFiltro.jsx'
import { ProductContext } from '../context/ProductContext.jsx'
import UserContext from '../context/UserContext.jsx'
import ModalEditProduct from '../components/ModalEditProduct.jsx'
// import { registrarUsuario } from '../../../Backend/src/models/models.user.js'
import Alert from 'react-bootstrap/Alert'



const Productos = () => {
  const { addProduct, addFavorite, borrarProduct, productos, getData, filtro, setFiltro, imgSrc } = useContext(ProductContext)
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const { getNuevoUsuario } = useContext(UserContext)

  const handleFiltroChange = (texto) => {
    setFiltro(texto)
  }

  const productosFiltrados = productos.filter(card =>
    card.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    card.descripcion.toLowerCase().includes(filtro.toLowerCase())
  )


  const handleAddProduct = (card) => {
    addProduct(card)
    setShowAlert(true)
    setTimeout(() => {
        setShowAlert(false)
    }, 1500)
}


  console.log('data', productosFiltrados)

  const botones = (card) => {
    if (!getNuevoUsuario || !getNuevoUsuario.is_admin) {
      return (
        <>
          <Button className='me-3' variant='info' onClick={() => navigate(`/productos/${card.id}`)}>Ver Detalle</Button>
          <Button variant='secondary mt-3' onClick={() => handleAddProduct(card)}>Agregar</Button>
        </>
      )
    } else {
      return (
        <>
        <Container>
          <ModalEditProduct id={card.id} />
          <Row>
            <Col>
              <Button className='btn btn-block mt-3' variant='info' onClick={() => navigate(`/productos/${card.id}`)}>Detalle</Button>
            </Col>
            <Col>
              <Button className='btn btn-block mt-3' variant='danger' onClick={() => borrarProduct(card.id)}>borrar</Button>
            </Col>
          </Row>
        </Container>
          
 

        </>
      )
    }
  }

  const favoritos = (card) => {
    if (!getNuevoUsuario || !getNuevoUsuario.is_admin) {
      return (
        <>
          {!card.favoritos ? <Star color='gray' size={30} /> : <StarFill color='gray' size={30} />}
        </>
      )
    } else {
      return (
        <>
        <div className="text-center p-3">
        {!card.favoritos ? <Star color='gray' size={30} onClick={() => addFavorite(card.id)} /> : <StarFill color='gray' size={30} onClick={() => addFavorite(card.id)} />} <p>Agregar a destacado</p>
        </div>

        </>
      )
    }
  }

  return (
    <Container fluid className='mb-5'>
      <Row className='fluid text-center mt-2 mb-2 justify-content-center'>
        <h1>- BICICLETAS -</h1>
      </Row>
      <ProductoFiltro onFiltroChange={handleFiltroChange} />
      <Row>
        {productosFiltrados.map((card) => (
          <Container className='col-md-3 p-3' key={card.id}>
            <Card>
              <div className='mt-3 mb-3 text-center'>{favoritos(card)}</div>
              <Card.Img variant='top' className='img-fluid' src={card.img === '' ? imgSrc : card.img} alt={card.nombre} />
              <Card.Body>
                <Card.Title>{card.nombre}</Card.Title>
                <hr />
                <Card.Text>{card.descripcion}</Card.Text>
                <Card.Text>Precio: {card.precio}</Card.Text>
                  <div>
                  {showAlert && (
                <Alert variant="success" style={{ position: 'fixed', top: '20vh', right: '10px', zIndex: 1000 }}>
                    Producto agregado
                </Alert>
            )}
                  
                  
                  
                  </div>
                <div>{botones(card)}</div>

              </Card.Body>
            </Card>
          </Container>
        ))}
      </Row>
    </Container>
  )
}

export default Productos
