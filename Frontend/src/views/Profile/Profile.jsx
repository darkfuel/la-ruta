import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../../context/UserContext'
import axios from 'axios'
import './profile.css'
import { MDBCard, MDBCardHeader, MDBCardSubTitle, MDBCardBody, MDBCardFooter, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit'
import { ENDPOINT } from '../../config/constantes'
import ModalEditUser from '../../components/Login/ModalEditUser'

const Profile = () => {
  const navigate = useNavigate()
  const { getNuevoUsuario, setNuevoUsuario } = useContext(Context)

  const getNuevoUsuarioData = () => {
    const token = window.sessionStorage.getItem('token')
    axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data: [user] }) => {
        setNuevoUsuario({ ...user }) // Si `data` es un objeto
      })
      // console.log('data perfil', user)
      .catch(({ response: { data } }) => {
        console.error(data)
        window.sessionStorage.removeItem('token')
        setNuevoUsuario(null)
        navigate('/')
      })
  }

  useEffect(getNuevoUsuarioData, [])

  return (
    <div className='miPerfil'>
      <h1 className='d-flex justify-content-center pt-4'>Bienvenido a La Ruta!</h1>

      <div className='contenidoMiPerfil'>
        <MDBCard className='w-50 p-3 m-5'>
          <MDBCardHeader><MDBCardTitle>Mis Datos Personales:</MDBCardTitle></MDBCardHeader>
          <MDBCardBody>
            <div className='containerDatosPerfil'>
              <div>
                <MDBCardSubTitle className='subtituloPerfil fw-bold'>Nombre:</MDBCardSubTitle>
                <MDBCardText>{getNuevoUsuario?.nombre}</MDBCardText>
              </div>
              <div>
                <MDBCardSubTitle className='subtituloPerfil fw-bold'>Apellido:</MDBCardSubTitle>
                <MDBCardText>{getNuevoUsuario?.apellido}</MDBCardText>
              </div>
            </div>

            <div className='containerDatosPerfil'>
              <div className='mt-3'>
                <MDBCardSubTitle className='subtituloPerfil fw-bold'>Email:</MDBCardSubTitle>
                <MDBCardText>{getNuevoUsuario?.email}</MDBCardText>
              </div>
              <div className='mt-3'>
                <MDBCardSubTitle className='subtituloPerfil fw-bold'>Teléfono:</MDBCardSubTitle>
                <MDBCardText>{getNuevoUsuario?.telefono}</MDBCardText>
              </div>
            </div>

            <div className='mt-3'>
              <MDBCardSubTitle className='subtituloPerfil fw-bold'>Dirección:</MDBCardSubTitle>
              <MDBCardText>{getNuevoUsuario?.direccion}</MDBCardText>
            </div>
          </MDBCardBody>
          <MDBCardFooter className='text-muted'> <ModalEditUser getNuevoUsuarioData={getNuevoUsuarioData} /> </MDBCardFooter>
        </MDBCard>

        <img
          src='/img/mapa.png'
          className='imgPerfil img-fluid rounded'
          alt='example'
        />

      </div>
    </div>
  )
}

export default Profile
