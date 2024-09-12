import { useState } from 'react'

const useUser = () => {
  const [user, setUser] = useState(null)

  const setNuevoUsuario = (nuevoUsuario) => setUser(nuevoUsuario)

  return {
    getNuevoUsuario:
      user,
    setNuevoUsuario
  }
}

export default useUser
