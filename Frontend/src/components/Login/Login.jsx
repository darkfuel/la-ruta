import { useContext, useState } from 'react'
import { MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import Context from '../../context/UserContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ENDPOINT } from '../../config/constantes'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const Login = ({ setBasicActive }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { setNuevoUsuario } = useContext(Context)

  const handleUser = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleClick = (valor) => {
    if (valor === 'registrate') {
      setBasicActive(valor)
    } else {
      console.error('Valor inválido')
    }
  }

  const handleForm = (e) => {
    e.preventDefault()

    if (!user?.email?.trim() || !user?.password?.trim()) {
      return window.alert('Email y password obligatorias.')
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('Por favor ingresa un email válido')
    }

    axios.post(ENDPOINT.login, user)
      .then(({ data }) => {
        window.sessionStorage.setItem('token', data.token)
        Swal.fire({
          title: 'Genial!',
          text: 'Usuario identificado con éxito.',
          icon: 'success'
        })
        setNuevoUsuario({})
        navigate('/perfil')
      })
      .catch(({ response: { data } }) => {
        console.error(data)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${data.message}`
        })
      })

    setUser('')
  }

  return (
    <div className='w-100 mt-4 d-flex justify-content-center align-self-center'>
      <form className='w-75 p-3' onSubmit={handleForm}>
        <MDBInput
          className='mb-4'
          type='email'
          id='email'
          name='email'
          autoComplete='email'
          label='Email'
          value={user.email}
          onChange={handleUser}
        />
        <MDBInput
          className='mb-4'
          type='password'
          id='password'
          name='password'
          autoComplete='new-password'
          label='Clave'
          value={user.password}
          onChange={handleUser}
        />

        <MDBBtn type='submit' className='mb-4' block>
          Ingresar
        </MDBBtn>

        <div className='text-center'>
          <p>
            ¿No estás registrado?
            <a href='#' onClick={() => handleClick('registrate')}>
              Regístrate
            </a>
          </p>

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

export default Login
