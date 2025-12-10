import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaPlus , FaTrash} from "react-icons/fa";
import Ajouter from '../Components/Ajouter';
import AllColone from '../Components/AllColone'
import Modifier from '../Components/Modifier';

export default function Home() {
  const [showpopup, setShowpopup]= useState(false)
  const [reload, setReload]= useState(false)
  const [taskToEdit , setTaskToEdit] =useState(null)
  const Navigate = useNavigate();



   const handleShow = () =>{
    setShowpopup(true);
   }

  const handleClosePopup = () => {
    setShowpopup(false);
    setReload(prev => !prev); 
  };

  const handleCloseEdit = () =>{
     setTaskToEdit(null);
     setReload(prev => !prev);
  };
  
  return (
    <>
    <div className='All-btn'>
        <button onClick={handleShow} className='btn-1'>
        <FaPlus className="icon" />
          Add Task
        </button>
    </div>

    <br /><br /><br /><br />

    {showpopup && <Ajouter onClose={handleClosePopup}/>}

    {taskToEdit &&(
    <Modifier task={taskToEdit} onClose={handleCloseEdit}/>
    )}
    
    <div>
      <AllColone reload={reload} onEdit={(task) => setTaskToEdit(task)}/>
      
    </div>
    </>
  )
}
