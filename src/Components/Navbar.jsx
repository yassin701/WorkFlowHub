import React from "react"
import './Navbar.css'
import { Link } from "react-router-dom"
import Avatar from 'react-avatar';

export default function Navbar() {

  const name = localStorage.getItem('name');

  return (
    <div className="navbar">
      <h1 className="logo">W-F-Hub</h1>
      <div className="div-link">
           <div className="home-link"><Link className="to-home" to={"/home"}>Home</Link></div>

            <div className="trash-link"><Link className="to-corb" to={"/Corbeille"}>Trash</Link></div>
            

       
      </div>
       
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
    </div>
  )
}