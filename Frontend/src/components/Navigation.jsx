import { useNavigate, NavLink } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { ProductContext } from '../context/ProductContext'
import { useContext } from 'react'
import ModalLogin from './Login/ModalLogin'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Bicycle } from 'react-bootstrap-icons'

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
          <NavLink className={claseActive} to='/perfil'>
            Perfil
          </NavLink>
          <button onClick={logout} className='btn btn-danger'>
            Salir
          </button>
        </>
      )
    }
  }

  const claseActive = ({ isActive }) =>
    isActive ? 'nav-item nav-link active' : 'nav-item nav-link'

  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <NavLink className='navbar-brand' to='/'>
          <Bicycle color='gray' size={50} className='ms-5' />
          <h4>La Ruta</h4>
        </NavLink>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <NavLink className={claseActive} to='/'>
              Home
            </NavLink>
            <NavLink className={claseActive} to='/Productos'>
              Productos
            </NavLink>
            <NavLink className={claseActive} to='/Carrito'>
              Carrito: <strong>${total}</strong>
            </NavLink>
            <div style={{ marginLeft: '30px' }}>{isLogin()}</div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
