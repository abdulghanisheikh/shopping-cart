import React, { useState } from 'react'
import {Link} from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css";

const Navbar=({fetchCartItems,fetchOrders,placeOrder,handleLogout})=>{
  const [open, setOpen]=useState(false);
  return(
    <nav className='navbar'>
        <div className='logo'>
            <img src="trolley.png" alt=""/>
            <h1>Shopping Cart</h1>
        </div>
        <div className="hamburger" onClick={()=>setOpen(!open)}>
            <GiHamburgerMenu size={24} />
        </div>
        <div className={`links ${open ? "open" : ""}`}>
            <p onClick={placeOrder}>Checkout</p>
            <p onClick={fetchCartItems}>Cart</p>
            <p onClick={fetchOrders}>Orders</p>
            <p className="logout" onClick={()=>handleLogout()}>Logout</p>
        </div>
    </nav>
  )
}

export default Navbar;