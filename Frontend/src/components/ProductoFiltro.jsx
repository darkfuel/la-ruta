import React, { useState } from 'react'

const ProductoFiltro = ({ onFiltroChange }) => {
  const [busqueda, setBusqueda] = useState('')

  const handleChange = (event) => {
    const valor = event.target.value
    setBusqueda(valor)
    onFiltroChange(valor)
  }

  return (
    <div className='mb-3'>
      <input
        type='text'
        className='form-control'
        placeholder='Buscar productos...'
        value={busqueda}
        onChange={handleChange}
      />
    </div>
  )
}

export default ProductoFiltro
