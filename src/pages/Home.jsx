import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaPlus , FaTrash} from "react-icons/fa";
import Ajouter from '../Components/Ajouter';
import AllColone from '../Components/AllColone'
import { useLocation } from 'react-router-dom';
import Avatar from 'react-avatar';
export default function Home() {
  const [showpopup, setShowpopup]= useState(false)
  const [reload, setReload]= useState(false)
  // const Navigate = useNavigate();
  const location = useLocation();
  const email = location.state;
  
   const handleShow = () =>{
    setShowpopup(true);
   }

  const handleClosePopup = () => {
    setShowpopup(false);
    setReload(prev => !prev); 
  };

  console.log(email)
  return (
    <>
    <div className='All-btn'>
       <Avatar
         
           name={email}
           round={true}
           size="35"
           color="#ffffffff"
           textSizeRatio={2}
            fgColor="#000000ff"
           
           className='avatar'
           
        />
        <button onClick={handleShow} className='btn-1'>
        <FaPlus className="icon" />
          Add Task
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
