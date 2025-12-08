import Home from './pages/Home'
import Corbeille from './pages/Corbeille'
import Login from './pages/login'
import './App.css'
import { BrowserRouter ,Routes, Route } from 'react-router-dom'


function App() {
  return(
  <BrowserRouter>
   <Routes>

        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Corbeille" element={<Corbeille />} />
             <Toaster position="top-center" richColors />
               <Ajouter/>
   </Routes>
  </BrowserRouter>
  )

export default App
