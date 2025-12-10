import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaTrash, } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import Ajouter from '../Components/Ajouter';
import AllColone from '../Components/AllColone'
import Modifier from '../Components/Modifier';
import Avatar from 'react-avatar';
import { useLocation } from 'react-router-dom';





export default function Home() {
  const [showpopup, setShowpopup] = useState(false)
  const [reload, setReload] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const Navigate = useNavigate();
  const location = useLocation();
  const email = location.state;


  const handleShow = () => {
    setShowpopup(true);
  }

  const handleClosePopup = () => {
    setShowpopup(false);
    setReload(prev => !prev);
  };

  const handleCloseEdit = () => {
    setTaskToEdit(null);
    setReload(prev => !prev);
  };

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

        <button onClick={() => (Navigate('/'))} className='logout-btn'>
          <CiLogout className="logout-icon" />
          Log out
        </button>
      </div>

      <br /><br /><br /><br />

      {showpopup && <Ajouter onClose={handleClosePopup} />}

      {taskToEdit && (
        <Modifier task={taskToEdit} onClose={handleCloseEdit} />
      )}

      <div>
        <AllColone reload={reload} onEdit={(task) => setTaskToEdit(task)} />

      </div>
    </>
  );
}
