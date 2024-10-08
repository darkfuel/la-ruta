import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Payment from '../components/Payment.jsx'
import { ProductContext } from '../context/ProductContext.jsx'

const Carrito = () => {
  const navigate = useNavigate()
  const { setTotal, total, cart, upCount, donwCount, eraseCart, imgSrc } =
    useContext(ProductContext)
  const totalCart = cart.reduce(
    (acum, actualValu) => acum + actualValu.precio * actualValu.count,
    0
  )
  setTotal(totalCart)

  const displayClass = totalCart === 0 ? 'd-none' : 'd-block col-md-6 text-center mb-3';
  const displayClassNone = totalCart === 0 ? 'd-block col-md-12 text-center mb-3' : 'd-none';

  return (
    <Container>
      <Row>
        <Col><h3 className='m-5 text-center'>Detalle del Pedido:</h3></Col>
      </Row>
      <Row>
        <div className={displayClass}>
          <div className='w-100 shadow-lg p-5 mb-3 bg-body-tertiary rounded mb-5'>

          {cart.map((producto, index) => (
            <div key={producto.id} className='bg-light mb-3 text-center'>
  <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
    <div className='col-md-6'>
      <h5 className='mt-3'>
        <strong>{producto.nombre}</strong>
      </h5>
      <img src={producto.img === '' ? imgSrc : producto.img} alt={producto.nombre} width="70%" className='p-2 shadow border' />
    </div>
    <div className='col-md-6'>
      <p>Precio: {producto.precio}</p>
      <div className='d-flex justify-content-center align-items-center gap-3 text-center'>
        <button className='btn btn-danger' onClick={() => donwCount(index)}>
          -
        </button>
        <p size='5' aria-label='size 4 select example'>{producto.count}</p>
        <button className='btn btn-success' onClick={() => upCount(index)}>
          +
        </button>
      </div>
    </div>
  </div>
  <hr />
</div>

          ))}
          </div>
        </div>
        <div className={displayClass}>
          <h2 className='mb-3'>Total: {total}</h2>
          <button className='btn btn-secondary me-3' onClick={() => eraseCart()}>
            Limpiar
          </button>
          <button className='btn btn-info' onClick={() => navigate('/')}>
            Volver
          </button>
          <hr />
          <Payment eraseCart={eraseCart} />
        </div>
        <div className={`${displayClassNone} border p-3 bg-warning`}>
          <h5> No hay productos agregados</h5>
        </div>
    </Row>
    </Container>
  )
}

export default Carrito