import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap' // Spinner
import { ProductContext } from '../context/ProductContext'
// import React, { useEffect, useState } from 'react'

const DetalleProducto = () => {
  const { id } = useParams()
  const indice = Number(id)
  const navigate = useNavigate()
  const { productos, addProduct } = useContext(ProductContext)
  const details = productos.find((prod) => prod.id === indice)

  if (!details) {
    return (
      <Container fluid className='mt-5'>
        <div>Product not found</div>
      </Container>
    )
  }

  return (
    <Container fluid className='mt-5 '>
      <Card className='d-flex flex-row gap-5 justify-content-center align-self-center'>
        <Card.Img variant='top' src={`http://localhost:3000${details.img}`} alt={details.nombre} className='w-25 m-5' />
        {/* <Card.Img variant='top' src={details.img || 'placeholder-image-url.jpg'} alt={details.nombre} /> */}
        <Card.Body className=''>
          <Card.Title>{details.nombre}</Card.Title>
          <Card.Text>{details.descripcion}</Card.Text>
          <Card.Text>Precio: ${details.precio}</Card.Text>
          <Button variant='secondary' className='m-2' onClick={() => addProduct(details)}>Agregar</Button>
          <Button variant='info' className='m-2' onClick={() => navigate('/productos')}>Volver</Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default DetalleProducto
