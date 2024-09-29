import React, { useState, useContext } from 'react'
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import Swal from 'sweetalert2'
// import axios from 'axios'
// import { ENDPOINT } from '../config/constantes'
import { ProductContext } from '../context/ProductContext'

export default function ModalEditProduct ({ id }) {
  const [staticModal, setStaticModal] = useState(false)
  const { productos, editarProducto } = useContext(ProductContext)
  const indice = Number(id)
  const producto = productos.find((prod) => prod.id === indice)
  const [productoEdit, setProductoEdit] = useState({
    id: indice,
    nombre: producto?.nombre || '',
    precio: producto?.precio || '',
    stock: producto?.stock || '',
    descripcion: producto?.descripcion || ''
  })

  console.log(producto)
  const toggleOpen = () => setStaticModal(!staticModal)

  const handleProduct = (e) => {
    const { name, value } = e.target
    setProductoEdit((prevProducto) => ({
      ...prevProducto,
      [name]: value
    }))
  }

  const editProduct = (e) => {
    e.preventDefault()

    const validadorNum = /^\d*$/

    if (
      !String(productoEdit?.nombre || '').trim() ||
      !String(productoEdit?.precio || '').trim() ||
      !String(productoEdit?.stock || '').trim() ||
      !String(productoEdit?.descripcion || '').trim()
    ) {
      return Swal.fire('Todos los campos son obligatorios')
    }

    if (
      !validadorNum.test(productoEdit.precio) ||
      !validadorNum.test(productoEdit.stock)
    ) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Precio y stock deben ser números'
      })
    }

    if (!id) {
      console.error('ID no encontrado') // Agregar una verificación de id
      return
    }

    editarProducto(productoEdit, id)
  }
  return (
    <>
      <MDBBtn onClick={toggleOpen}>Editar</MDBBtn>

      <MDBModal staticBackdrop tabIndex='-1' open={staticModal} onClose={() => setStaticModal(false)}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Editar producto</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen} />
            </MDBModalHeader>
            <MDBModalBody>

              <div className='w-100 mt-4 d-flex justify-content-center align-self-center'>
                <form className='w-75 p-3' onSubmit={editProduct}>

                  <MDBInput
                    type='text'
                    id='NombreProducto'
                    name='nombre'
                    wrapperClass='mb-4'
                    label='Nombre del producto'
                    value={productoEdit.nombre}
                    onChange={handleProduct}
                  />
                  <MDBRow className='mb-4'>
                    <MDBCol>
                      <MDBInput
                        type='number'
                        id='precioProducto'
                        name='precio'
                        wrapperClass='mb-4'
                        label='Precio'
                        value={productoEdit.precio}
                        onChange={handleProduct}
                      />
                    </MDBCol>

                    <MDBCol>
                      <MDBInput
                        type='number'
                        id='stock'
                        name='stock'
                        wrapperClass='mb-4'
                        label='Stock'
                        value={productoEdit.stock}
                        onChange={handleProduct}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput
                    wrapperClass='mb-4'
                    type='text'
                    className='descripcionProducto'
                    id='descripcionProducto'
                    name='descripcion'
                    rows={4}
                    label='Descripción'
                    value={productoEdit.descripcion}
                    onChange={handleProduct}
                  />

                  <MDBBtn type='submit'>Editar producto</MDBBtn>
                </form>
              </div>

            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Cerrar
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}
