import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Payment from '../components/Payment.jsx'
import { ProductContext } from '../context/ProductContext.jsx'

const Carrito = () => {
  const navigate = useNavigate()
  const { setTotal, total, cart, upCount, donwCount, eraseCart } =
    useContext(ProductContext)
  const totalCart = cart.reduce(
    (acum, actualValu) => acum + actualValu.precio * actualValu.count,
    0
  )
  setTotal(totalCart)

  return (
    <div className='w-100'>
      <h5 className='m-5'>Detalle del Pedido:</h5>
      <Container className='fluid m-3 text-center d-flex flex-row gap-5 justify-content-between'>
        <div className=' fluid w-100 shadow-lg p-5 mb-3 bg-body-tertiary rounded'>
          {cart.map((producto, index) => (
            <div key={producto.id} className='d-flex justify-content-around'>
              <div className='d-flex'>
                <img src={`http://localhost:3000${producto.img}`} alt={producto.nombre} width={300} className='p-3' />
                <p className='mt-3 text-capitalize'>
                  <strong>{producto.nombre}</strong>
                </p>
              </div>
              <div className='ms-5 m-3'>
                <p>Precio : {producto.precio}</p>
                <div className='d-flex gap-3'>
                  <button
                    className='btn btn-danger '
                    onClick={() => donwCount(index)}
                  >
                    -
                  </button>
                  <p size='5' aria-label='size 4 select example'>{producto.count}</p>
                  <button
                    className='btn btn-success'
                    onClick={() => upCount(index)}
                  >
                    +
                  </button>

                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>

        <div className='w-25'>
          <h2>Total: {total}</h2>
          <button className='btn btn-secondary' onClick={() => eraseCart()}>
            Limpiar
          </button>
          <button className='btn btn-info' onClick={() => navigate('/')}>
            Volver
          </button>
          <hr />
          <Payment eraseCart={eraseCart} />
        </div>
      </Container>
    </div>
  )
}

export default Carrito
