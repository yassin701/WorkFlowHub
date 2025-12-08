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
   </Routes>
  </BrowserRouter>
  )

}
export default App
