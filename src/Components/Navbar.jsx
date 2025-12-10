import React from "react"
import './Navbar.css'
import { Link } from "react-router-dom"

export default function Navbar() {

  return (
    <div className="navbar">
      <h1 className="logo">WorkFlowHub</h1>
      <div className="div-link">
           <div className="home-link"><Link className="to-home" to={"/home"}>Home</Link></div>

            <div className="trash-link"><Link className="to-corb" to={"/Corbeille"}>Trash</Link></div>

       
      </div>
       
      
    </div>
  )
}