import './App.css'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import NavBar from './components/NavBar'

function App() {
  const {user} = useContext(AuthContext)
  return (
    <div className='app-container'>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={ user ? <Homepage /> : <Navigate to="/login"/>} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
