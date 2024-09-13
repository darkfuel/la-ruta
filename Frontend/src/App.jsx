import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserContext from './context/UserContext'
import { Navigation, Footer } from './components/Navigation'
import { Home, Productos, Carrito, NotFound, Details, Profile } from './views/Home'
// import Profile from './views/Profile/Profile'
import NuevoProducto from './views/nuevoProducto/NuevoProducto'
import useUser from './context/hooks/useUser'

function App () {
  const globalState = useUser()

  return (
    <UserContext.Provider value={globalState}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/productos/:id' element={<Details />} />
          <Route path='/Carrito' element={<Carrito />} />
          <Route path='/perfil' element={<Profile />} />
          <Route path='/nuevo-producto' element={<NuevoProducto />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </UserContext.Provider>
  )
}

export default App
