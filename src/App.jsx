// import './index.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import PaginaPrincipal from './pages/PaginaPrincipal'
import InfoJuego from './pages/InfoJuego'
import VerMas from './pages/VerMas'
import Login from './pages/Login'
import CrearCuenta from './pages/CrearCuenta'
import OlvidePassword from './pages/OlvidePassword'
import { AuthProvider } from './context/AuthProvider'
import ListaDeseos from './pages/ListaDeseos'
import { JuegosProvider } from './context/JuegosProvider'
import Carrito from './pages/Carrito'
import RutaProtegida from './pages/RutaProtegida'
import Desarrollador from './pages/Desarrollador'
import Admin from './pages/Admin'
import Perfil from './pages/Perfil'
import { DesarrolladorProvider } from './context/DesarrolladorProvider'
import EditarJuego from './pages/EditarJuego'
import AgregarJuego from './pages/AgregarJuego'
import Biblioteca from './pages/Biblioteca'


function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <JuegosProvider>
          <DesarrolladorProvider>
            <Routes>
              {/* Rutas públicas */}
              <Route path='/login' element={<Login/>} />
              <Route path='/crear_cuenta' element={<CrearCuenta/>} />
              <Route path='/olvide-password' element={<OlvidePassword/>} />

              <Route path='/' element={<PaginaPrincipal/>}/>
              <Route path='/juegos/:id' element={<InfoJuego/>}/>
              <Route path='/genero/:genero' element={<VerMas/>}/>

              {/* Rutas Protegidas */}
              <Route path='/' element={<RutaProtegida/>}>
                <Route path='/admin' element={<Admin/>}>
                  <Route index element={<Navigate to='/admin/perfil' replace />} />
                  <Route path='/admin/perfil' element={<Perfil/>}/>
                  <Route path='/admin/desarrollador' element={<Desarrollador/>}/>
                  <Route path='/admin/desarrollador/:id' element={<EditarJuego/>}/>
                  <Route path='/admin/desarrollador/agregar-juego' element={<AgregarJuego/>}/>
                </Route>
                <Route path='/biblioteca' element={<Biblioteca/>}/>
                <Route path='/lista_deseos' element={<ListaDeseos/>}/>
                <Route path='/carrito' element={<Carrito/>}></Route>
              </Route> 
              
              {/* Redirección rutas no encontradas */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </DesarrolladorProvider>
        </JuegosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
