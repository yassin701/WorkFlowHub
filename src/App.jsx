import Home from './pages/Home'
import Corbeille from './pages/Corbeille'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import { Toaster, toast } from 'sonner'
import './index.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import NavbarLayout from './Components/NavbarLayout'

function AppRoutes() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('name');
    toast.success("Success", { description: "You have been logged out.", duration: 3000 });
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<NavbarLayout onLogout={handleLogout}><Home /></NavbarLayout>} />
      <Route path="/Tasks" element={<NavbarLayout onLogout={handleLogout}><Tasks /></NavbarLayout>} />
      <Route path="/Corbeille" element={<NavbarLayout onLogout={handleLogout}><Corbeille /></NavbarLayout>} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors theme="dark" closeButton />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App;
