import { useState } from 'react'
import './App.css'
import Ajouter from './Components/Ajouter'
import { Toaster } from 'sonner'

function App() {
  return(
    <>
      <Toaster position="top-center" richColors />
    <Ajouter/>
    </>
    
  )
}
export default App
