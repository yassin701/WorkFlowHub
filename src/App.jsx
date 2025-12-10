import Home from './pages/Home'
import Corbeille from './pages/Corbeille'
import Login from './pages/login'
import { Toaster } from 'sonner'
import './App.css'
import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import NavbarLayout from './Components/NavbarLayout'

function App() {
  return(
  
  <BrowserRouter>
   <Toaster position="top-center" richColors />
  
   <Routes>

        <Route path="/" element={ <Login/>} />
        <Route path="/Home" element={< NavbarLayout><Home /></NavbarLayout> } />
        <Route path="/Corbeille" element={<NavbarLayout><Corbeille /></NavbarLayout>} />
   </Routes>
  </BrowserRouter>
  )
}

export default App
