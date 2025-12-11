import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaTrash, } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import Ajouter from '../Components/Ajouter';
import AllColone from '../Components/AllColone'
import Modifier from '../Components/Modifier';
import Avatar from 'react-avatar';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';





export default function Home() {
  const [showpopup, setShowpopup] = useState(false)
  const [reload, setReload] = useState(false)
  const [ShowLogoutPopup, setShowLogoutPopup]= useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const Navigate = useNavigate();
  const location = useLocation();
  const name = location.state;


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

          name={name}
          round={true}
          size="35"
          color="#ffffffff"
          textSizeRatio={2}
          fgColor="#000000ff"
          className='avatar'

        />
        <div className='bnj'>
          Welcome {name} to your workspace 
       </div>
        <button onClick={handleShow} className='btn-1'>
          <FaPlus className="icon" />
          Add Task
        </button>

        <button onClick={() =>setShowLogoutPopup(true)} className='logout-btn'>
          <CiLogout className="logout-icon" />
          Log out
        </button>
      </div>


      {ShowLogoutPopup && (
  <div className="popup-overlay">
    <div className="popup-box">
      <h3>Are you sure you want to log out?</h3>

      <div className="popup-actions">
        <button
          className="confirm-btn"
          onClick={() => {
       
            toast.success("User logged out");
            setShowLogoutPopup(false);
             (Navigate('/'))
          }}
        >
          Confirm
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowLogoutPopup(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


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
