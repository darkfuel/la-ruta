import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { ProductContext } from '../context/ProductContext'

const Payment = ({ eraseCart }) => {
  const [show, setShow] = useState(false)
  const { total } = useContext(ProductContext)

  const handleClose = () => {
    setShow(false)
    eraseCart()
  }
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant='success' onClick={handleShow}>
        Realizar pago
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {total > 0 ? 'PAGO PROCESADO!!!' : ' AVISO...'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {total > 0 ? 'Gracias por su compra!!!' : 'Por favor agregue productos'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Payment
