import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { ENDPOINT } from '../config/constantes.jsx'
// import { updateFavorite } from '../../../Backend/src/models/models.products.js'
export const ProductContext = createContext()

const ProductProvider = ({ children }) => {
  const [total, setTotal] = useState(0)
  const [productos, setProductos] = useState([])
  const [productDetails, setProductDetails] = useState({})
  const [cart, setCart] = useState([])
  const [filtro, setFiltro] = useState('')

  const getData = async () => {
    const res = await fetch(`${ENDPOINT.productos}`)
    const { rows } = await res.json()
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
        console.log('producto actualizado', data)
        getData()
      })
      .catch(({ response: { data } }) => {
        console.error(data)
      })
  }

  const borrarProduct = (id) => {
    axios.delete(`${ENDPOINT.productos}/${id}`)
      .then(({ data }) => {
        console.log('producto eliminado', data)
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
    addProduct,
    addFavorite,
    upCount,
    donwCount,
    eraseCart,
    borrarProduct,
    getData
  }

  return (
    <ProductContext.Provider value={globalStateProduct}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
