import { useRef, useState } from 'react'
import './nuevoProducto.css'
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit'
import Swal from 'sweetalert2'
import { ENDPOINT } from '../../config/constantes'
import axios from 'axios'

const NuevoProducto = () => {
  const token = window.sessionStorage.getItem('token')

  console.log('token desde nuevo producto:', token)

  const defaultFile = '/img/imgNuevoProducto.png'
  const [imgSrc, setImgSrc] = useState(defaultFile)
  const fileInputRef = useRef(null)
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    descripcion: ''
  })
  const [file, setFile] = useState(null) // Para manejar el archivo

  const handleProduct = (e) => {
    const { name, value } = e.target
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile) // Guarda el archivo seleccionado
      const reader = new FileReader()
      reader.onload = function (e) {
        setImgSrc(e.target.result)
      }
      reader.readAsDataURL(selectedFile)
    }
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
    formData.append('img', file) // Añade el archivo al formulario
    console.log(file)
    console.log(formData)

    axios
      .post(ENDPOINT.nuevoProducto, formData, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto creado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(({ response: { data } }) => {
        console.error(data)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${data.message}`
        })
      })

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
      <h2 className='tituloNuevoProducto'>Agrega un nuevo producto:</h2>
      <form className='formNuevoProducto' onSubmit={handleForm}>
        <div className='producto d-flex flex-column'>
          <img
            id='imgNuevoProducto'
            className='imgNuevoProducto'
            src={imgSrc}
            alt='agregar nuevo producto'
          />
          <input
            type='file'
            name='nuevoProducto'
            id='cargarNuevoProducto'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <label htmlFor='cargarNuevoProducto' className='btn btn-primary'>
            Agregar imagen
          </label>
        </div>

        <div className='detalleProducto'>
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
      </form>
    </>
  )
}

export default NuevoProducto
