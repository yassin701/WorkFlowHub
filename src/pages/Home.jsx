import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { FaPlus , FaTrash} from "react-icons/fa";


export default function Home() {
  const Navigate = useNavigate();

  return (
    <div className='All-btn'>
    <button className='btn-1'>
    <FaPlus className="icon" />
      Add Task
    </button>

    <button onClick={() => Navigate("/Corbeille")}
     className='btn-2'>
    <FaTrash className='icon'/>
       Trash
    </button>
    </div>
  )
}
