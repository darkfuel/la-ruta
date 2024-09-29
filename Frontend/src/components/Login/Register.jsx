import { useEffect, useState } from 'react'
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBIcon } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ENDPOINT } from '../../config/constantes'

const Register = ({ setBasicActive }) => {
  const navigate = useNavigate()
  const state = 'iniciar sesion'
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: '',
    password: '',
    confirmPassword: ''
  })

  const handleUser = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleForm = (e) => {
    e.preventDefault()

    const validadorPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/ // Expresión regular para la clave
    const validadorCaracteres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    const validadorTelefono = /^\+?\d{8,11}$/

    if (
      !user?.nombre?.trim() ||
      !user?.apellido?.trim() ||
      !user?.telefono?.trim() ||
      !user?.email?.trim() ||
      !user?.direccion?.trim() ||
      !user?.password?.trim() ||
      !user?.confirmPassword?.trim()
    ) {
      return window.alert('Todos los campos son obligatorios.')
    }

    if (!validadorCaracteres.test(user.nombre)) {
      return window.alert('El nombre solo puede contener letras')
    }

    if (!validadorCaracteres.test(user.apellido)) {
      return window.alert('El apellido solo puede contener letras')
    }

    if (!validadorTelefono.test(user.telefono)) {
      return window.alert('El telefono solo puede contener números')
    }

    if (!emailRegex.test(user.email)) { // validar el formato de email
      return window.alert('Por favor ingresa un email válido')
    }

    if (!validadorPassword.test(user.password)) {
      return window.alert('La clave debe tener al menos 6 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial')
    }

    if (user.confirmPassword !== user.password) {
      return window.alert('Las claves deben ser iguales')
    }

    const userToSend = {
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono,
      email: user.email,
      direccion: user.direccion,
      password: user.password
    }

    axios.post(ENDPOINT.users, userToSend)
      .then(() => {
        Swal.fire({
          title: 'Good job!',
          text: 'Usuario registrado con éxito!',
          icon: 'success'
        })
        state === 'iniciar sesion' ? setBasicActive(state) : console.error('Valor inválido para setBasicActive')
      })
      .catch(error => {
        if (error.response) {
          console.error('Error de respuesta:', error.response.data)
          window.alert(`Error: ${error.response.data.message || 'Ocurrió un error'}`)
        } else if (error.request) {
          console.error('Error de solicitud:', error.request)
          window.alert('Error: No se recibió respuesta del servidor')
        } else {
          console.error('Error:', error.message)
          window.alert(`Error: ${error.message}`)
        }
      })
  }
  // se realiza la petición al endpoint user y nos redirige a la ruta login

  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      navigate('/perfil')
    }
  }, [])

  return (
    <div className='w-100 mt-4 d-flex justify-content-center align-self-center'>
      <form className='w-75 p-3' onSubmit={handleForm}>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput id='nombre' autoComplete='nombre' type='text' name='nombre' label='Nombre' value={user.nombre} onChange={handleUser} />
          </MDBCol>

          <MDBCol>
            <MDBInput id='apellido' autoComplete='apellido' type='text' name='apellido' label='Apellido' value={user.apellido} onChange={handleUser} />
          </MDBCol>
        </MDBRow>

        <MDBInput className='mb-4' type='email' id='email' name='email' autoComplete='email' label='Email' value={user.email} onChange={handleUser} />

        <MDBInput className='mb-4' type='telefono' id='telefono' name='telefono' autoComplete='telefono' label='Teléfono' value={user.telefono} onChange={handleUser} />

        <MDBInput className='mb-4' type='direccion' id='direccion' name='direccion' autoComplete='direccion' label='Direccion' value={user.direccion} onChange={handleUser} />

        <MDBInput className='mb-4' type='password' id='password' name='password' autoComplete='new-password' label='Clave' value={user.password} onChange={handleUser} />

        <MDBInput className='mb-4' type='password' id='confirmPassword' name='confirmPassword' autoComplete='new-password' label='Confirma tu clave' value={user.confirmPassword} onChange={handleUser} />

        <MDBBtn type='submit' href='' className='mb-4' block>
          Registrar
        </MDBBtn>

        <div className='text-center'>

          <p>También puedes ingresar con:</p>

          <MDBBtn floating color='secondary' className='mx-1'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn floating color='secondary' className='mx-1'>
            <MDBIcon fab icon='google' />
          </MDBBtn>

          <MDBBtn floating color='secondary' className='mx-1'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn floating color='secondary' className='mx-1'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </div>
      </form>
    </div>
  )
}

export default Register
