import { useState, useContext, useEffect } from 'react'
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import userContext from '../../context/UserContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ENDPOINT } from '../../config/constantes'

export default function ModalEditUser () {
  const { getNuevoUsuario, setNuevoUsuario } = useContext(userContext)
  const [staticModal, setStaticModal] = useState(false)
  const [userEdit, setUserEdit] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: ''
  })
  console.log(getNuevoUsuario)

  const userData = () => {
    if (getNuevoUsuario) {
      setUserEdit({
        nombre: getNuevoUsuario.nombre,
        apellido: getNuevoUsuario.apellido,
        telefono: getNuevoUsuario.telefono,
        email: getNuevoUsuario.email,
        direccion: getNuevoUsuario.direccion,
        is_admin: getNuevoUsuario.is_admin
      })
    }
  }

  useEffect(() => {
    userData()
  }, [getNuevoUsuario]
  )
  const toggleOpen = () => setStaticModal(!staticModal)

  const handleUser = (e) => {
    const { name, value } = e.target
    setUserEdit((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleForm = (e) => {
    e.preventDefault()

    const validadorCaracteres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    const validadorTelefono = /^\+\d{11}$/

    if (
      !userEdit?.nombre?.trim() ||
      !userEdit?.apellido?.trim() ||
      !userEdit?.telefono?.trim() ||
      !userEdit?.email?.trim() ||
      !userEdit?.direccion?.trim()
    ) {
      return window.alert('Todos los campos son obligatorios.')
    }

    if (!validadorCaracteres.test(userEdit.nombre)) {
      return window.alert('El nombre solo puede contener letras.')
    }

    if (!validadorCaracteres.test(userEdit.apellido)) {
      return window.alert('El apellido solo puede contener letras.')
    }

    if (!validadorTelefono.test(userEdit.telefono)) {
      return window.alert('El número de teléfono debe tener 9 dígitos, y puede comenzar con un "+56".')
    }

    if (!emailRegex.test(userEdit.email)) {
      return window.alert('Por favor ingresa un email válido')
    }
    const token = window.sessionStorage.getItem('token')
    axios.put(ENDPOINT.editarUsuario, userEdit, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        Swal.fire({
          title: 'Good job!',
          text: 'Usuario editado con éxito!',
          icon: 'success'
        })
        setNuevoUsuario(userEdit)
        setStaticModal(!staticModal)
      })
      .catch(error => {
      // Manejo de error
        if (error.response) {
        // La solicitud se realizó y el servidor respondió con un código de estado
        // que no está en el rango de 2xx
          console.error('Error de respuesta:', error.response.data)
          window.alert(`Error: ${error.response.data.message || 'Ocurrió un error'}`)
        } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
          console.error('Error de solicitud:', error.request)
          window.alert('Error: No se recibió respuesta del servidor')
        } else {
        // Algo ocurrió al configurar la solicitud
          console.error('Error:', error.message)
          window.alert(`Error: ${error.message}`)
        }
      })
  }

  return (
    <>
      <MDBBtn onClick={toggleOpen}>Editar perfil</MDBBtn>

      <MDBModal staticBackdrop tabIndex='-1' open={staticModal} onClose={() => setStaticModal(false)}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Editar perfil</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen} />
            </MDBModalHeader>
            <MDBModalBody>

              <div className='w-100 mt-4 d-flex justify-content-center align-self-center'>
                <form className='w-75 p-3' onSubmit={handleForm}>
                  <MDBRow className='mb-4'>
                    <MDBCol>
                      <MDBInput id='nombre' autoComplete='nombre' type='text' name='nombre' label='Nombre' value={userEdit.nombre} onChange={handleUser} />
                    </MDBCol>

                    <MDBCol>
                      <MDBInput id='apellido' autoComplete='apellido' type='text' name='apellido' label='Apellido' value={userEdit.apellido} onChange={handleUser} />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput className='mb-4' type='email' id='email' name='email' autoComplete='email' label='Email' value={userEdit.email} onChange={handleUser} />

                  <MDBInput className='mb-4' type='telefono' id='telefono' name='telefono' autoComplete='telefono' label='Teléfono' value={userEdit.telefono} onChange={handleUser} />

                  <MDBInput className='mb-4' type='direccion' id='direccion' name='direccion' autoComplete='direccion' label='Direccion' value={userEdit.direccion} onChange={handleUser} />

                  <MDBBtn type='submit'>Editar Usuario</MDBBtn>
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
