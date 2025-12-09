import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaPlus , FaTrash} from "react-icons/fa";
import Ajouter from '../Components/Ajouter';
import AllColone from '../Components/AllColone'

export default function Home() {
  const [showpopup, setShowpopup]= useState(false)
  const [reload, setReload]= useState(false)
  const Navigate = useNavigate();

   const handleShow = () =>{
    setShowpopup(true);
   }

  const handleClosePopup = () => {
    setShowpopup(false);
    setReload(prev => !prev); 
  };

  
  return (
    <>
    <div className='All-btn'>
        <button onClick={handleShow} className='btn-1'>
        <FaPlus className="icon" />
          Add Task
        </button>

        <button onClick={() => Navigate("/Corbeille")}
        className='btn-2'>
        <FaTrash className='icon'/>
          Trash
        </button>

    </div>

    <br /><br /><br /><br />

    {showpopup && <Ajouter onClose={handleClosePopup}/>}
    
    <div>
      <AllColone reload={reload}/>
    </div>
    </>
  )
}
