import Home from './pages/Home'
import Corbeille from './pages/Corbeille'
import Login from './pages/login'
import './App.css'
import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner';
import Ajouter from './Components/Ajouter'

function App() {
  return(
  <BrowserRouter>
  <Toaster position="top-center" richColors />
   <Routes>

        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Corbeille" element={<Corbeille />} />
             
              
   </Routes>
  </BrowserRouter>
  // <Ajouter/>
  )
}
export default App
