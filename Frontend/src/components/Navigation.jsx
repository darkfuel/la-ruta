import { useNavigate, NavLink } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { ProductContext } from '../context/ProductContext'
import { useContext } from 'react'
import ModalLogin from './Login/ModalLogin'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Bicycle, List } from 'react-bootstrap-icons'

const Navigation = () => {
  const navigate = useNavigate()
  const { getNuevoUsuario, setNuevoUsuario } = useContext(UserContext)
  const { cart } = useContext(ProductContext)
  const total = cart.reduce(
    (acum, actualValu) => acum + actualValu.precio * actualValu.count,
    0
  )

  const logout = () => {
    setNuevoUsuario()
    window.sessionStorage.removeItem('token')
    navigate('/')
  }

  const isLogin = () => {
    if (!getNuevoUsuario) {
      return <ModalLogin />
    }

    if (getNuevoUsuario.is_admin) {
      return (
        <>
          <NavLink className={claseActive} to='/nuevo-producto'>
            Agregar producto
          </NavLink>
          <NavLink to='/perfil' className={claseActive}>
            Mi Perfil Administrador
          </NavLink>
          <button onClick={logout} className='btn btn-danger'>
            Salir
          </button>
        </>
      )
    } else {
      return (
        <>
          <div className='d-flex justify-content-end align-items-center border-top pt-2'>
            <NavLink className={claseActive} to='/perfil'>
              <span className='me-2'>Perfil</span>
            </NavLink>
            <button onClick={logout} className='btn btn-danger'>
              Salir
            </button>
          </div>

        </>
      )
    }
  }

  const claseActive = ({ isActive }) =>
    isActive ? 'nav-item nav-link active' : 'nav-item nav-link'

  return (
    <Navbar expand='lg' className='bg-secondary'>
      <Container>
        <NavLink className='navbar-brand' to='/'>
          <Bicycle color='gray' size={50} className='ms-5' />
          <h4>La Ruta</h4>
        </NavLink>

        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          className='bg-dark'
        >
          <List color='white' size={24} />
        </Navbar.Toggle>

        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <NavLink className={claseActive} to='/'>
              Home
            </NavLink>
            <NavLink className={claseActive} to='/Productos'>
              Productos
            </NavLink>
            <NavLink className={claseActive} to='/Carrito'>
              Carrito: <strong className='me-4'>${total}</strong>
            </NavLink>
            <div style={{ }}>{isLogin()}</div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
