import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { ENDPOINT } from '../config/constantes.jsx'
import Swal from 'sweetalert2'

export const ProductContext = createContext()

const ProductProvider = ({ children }) => {
  const defaultFile = '/img/imgNuevoProducto.png'
  const [total, setTotal] = useState(0)
  const [productos, setProductos] = useState([])
  const [productDetails, setProductDetails] = useState({})
  const [cart, setCart] = useState([])
  const [filtro, setFiltro] = useState('')
  const [imgSrc, setImgSrc] = useState(defaultFile)
  const [staticModal, setStaticModal] = useState(false)

  const getData = async () => {
    const res = await fetch(`${ENDPOINT.productos}`)
    const rows = await res.json()
    setProductos(rows)
  }

  useEffect(() => {
    getData()
  }, [])

  const addProduct = ({ id, precio, nombre, img, descripcion }) => {
    const productAdded = cart.find((product) => product.id === id)
    const newAdded = { id, precio, nombre, img, descripcion, count: 1 }
    if (productAdded !== undefined) {
      cart[cart.findIndex((product) => product.id === newAdded.id)].count++
      setCart([...cart])
    } else {
      setCart([...cart, newAdded])
    }
  }

  const addFavorite = (id) => {
    axios.put(`${ENDPOINT.productos}/${id}`)
      .then(({ data }) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto actualizado',
          showConfirmButton: false,
          timer: 1500
        })
        getData()
      })
      .catch(({ response: { data } }) => {
        console.error(data)
      })
  }

  const agregarProducto = (producto, imgSrc) => {
    const token = window.sessionStorage.getItem('token')
    axios.post(ENDPOINT.nuevoProducto, { ...producto, img: imgSrc }, { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto creado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        setProductos((prevProductos) => [
          ...prevProductos,
          { ...producto, img: imgSrc }
        ])
      })
      .catch(({ response: { data } }) => {
        console.error(data)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${data.message}`
        })
      })
  }

  const editarProducto = (productoEdit, id) => {
    const token = window.sessionStorage.getItem('token')
    axios
      .put(ENDPOINT.productosEdit, productoEdit, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        Swal.fire({
          title: 'Buen trabajo!',
          text: 'Producto editado con éxito!',
          icon: 'success'
        })

        setProductos((prevProductos) => {
          return prevProductos.map((prod) =>
            prod.id === id ? { ...prod, ...productoEdit } : prod
          )
        })

        setStaticModal(!staticModal)
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error de respuesta:', error.response.data)
          window.alert(
            `Error: ${error.response.data.message || 'Ocurrió un error'}`
          )
        } else if (error.request) {
          console.error('Error de solicitud:', error.request)
          window.alert('Error: No se recibió respuesta del servidor')
        } else {
          console.error('Error:', error.message)
          window.alert(`Error: ${error.message}`)
        }
      })
  }

  const borrarProduct = (id) => {
    axios.delete(`${ENDPOINT.productos}/${id}`)
      .then(({ data }) => {
        Swal.fire({
          title: 'Estás seguro?',
          text: 'El producto se eliminará permanentemente',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Eliminado!',
              text: 'Se ha elimanado el producto',
              icon: 'success'
            })
          }
        })
        getData()
      })
      .catch(({ response: { data } }) => {
        console.error(data)
      })
  }

  const upCount = (index) => {
    cart[index].count++
    setCart([...cart])
  }

  const donwCount = (index) => {
    if (cart[index].count > 1) {
      cart[index].count--
      setCart([...cart])
    } else {
      cart.splice(index, 1)
      setCart([...cart])
    }
  }

  const eraseCart = () => {
    setCart([])
  }

  const globalStateProduct = {
    total,
    productos,
    setProductos,
    productDetails,
    cart,
    filtro,
    setTotal,
    setProductDetails,
    setFiltro,
    setImgSrc,
    addProduct,
    addFavorite,
    upCount,
    donwCount,
    eraseCart,
    borrarProduct,
    getData,
    imgSrc,
    editarProducto,
    agregarProducto
  }

  return (
    <ProductContext.Provider value={globalStateProduct}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
