import { useState, useContext } from 'react'
import './nuevoProducto.css'
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit'
import Swal from 'sweetalert2'
import { ProductContext } from '../../context/ProductContext'

const NuevoProducto = () => {
  const { imgSrc, setImgSrc, agregarProducto } = useContext(ProductContext)

  const defaultFile = '/img/imgNuevoProducto.png'
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    descripcion: '',
    img: ''
  })

  const handleProduct = (e) => {
    const { name, value } = e.target
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value
    }))
  }

  const handleChange = (event) => {
    const valor = event.target.value
    setImgSrc(valor)
  }

  const handleForm = (e) => {
    e.preventDefault()
    const validadorNum = /^\d*$/

    if (
      !producto?.nombre?.trim() ||
      !producto?.precio?.trim() ||
      !producto?.stock?.trim() ||
      !producto?.descripcion?.trim()
    ) {
      return Swal.fire('Todos lo campos son obligatorios')
    }

    if (
      !validadorNum.test(producto.precio) ||
      !validadorNum.test(producto.stock)
    ) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Precio y stock deben ser números'
      })
    }

    const formData = new FormData()
    formData.append('nombre', producto.nombre)
    formData.append('precio', producto.precio)
    formData.append('stock', producto.stock)
    formData.append('descripcion', producto.descripcion)
    formData.append('img', imgSrc) // Añade el archivo al formulario

    agregarProducto(producto, imgSrc)
    setProducto({
      nombre: '',
      precio: '',
      stock: '',
      descripcion: ''
    })
    setImgSrc(defaultFile)
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <h2 className='text-center mt-2'>Agrega un nuevo producto:</h2>
        </div>

        <form className='formNuevoProducto' onSubmit={handleForm}>
          <div className='form-row'>

            <div className='form-group col mb-4'>
              <img
                id='imgNuevoProducto'
                className='img-fluid'
                src={imgSrc}
                alt='agregar nuevo producto'
              />
              <input
                type='text'
                className='form-control mt-3'
                placeholder='Buscar productos...'
                value={imgSrc}
                onChange={handleChange}
              />
            </div>

            <div className='form-group col'>
              <MDBInput
                type='text'
                id='NombreProducto'
                name='nombre'
                wrapperClass='mb-4'
                label='Nombre del producto'
                value={producto.nombre}
                onChange={handleProduct}
              />
              <div className='d-flex gap-3'>
                <MDBInput
                  type='number'
                  id='precioProducto'
                  name='precio'
                  wrapperClass='mb-4'
                  label='Precio'
                  value={producto.precio}
                  onChange={handleProduct}
                />
                <MDBInput
                  type='number'
                  id='stock'
                  name='stock'
                  wrapperClass='mb-4'
                  label='Stock'
                  value={producto.stock}
                  onChange={handleProduct}
                />
              </div>

              <MDBInput
                wrapperClass='mb-4'
                type='text'
                className='descripcionProducto'
                id='descripcionProducto'
                name='descripcion'
                rows={4}
                label='Descripción'
                value={producto.descripcion}
                onChange={handleProduct}
              />

              <MDBBtn type='submit' className='mb-4' block>
                Agregar Producto
              </MDBBtn>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default NuevoProducto
