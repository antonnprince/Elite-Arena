import React from 'react'
import logo from './images/mainlogo.png'
import {Outlet, Link} from "react-router-dom"

const Nav = () => {

  // handleColor=()=>{

  // }
  return (
    <>
       <nav className='flex flex-row justify-between py-4'>
      <img src={logo} alt='Elite Arena logo' 
        className='w-42 h-16 '
      />

      <div className='text-pink-500 text-lg '>
        <ul className='flex flex-row space-x-16'>
            <li className='text-gray-600 hover:text-pink-500 delay-200 hover:cursor-pointer'>
            <Link to="/">Home</Link>
            </li>
          <li className='text-gray-600 hover:text-pink-500 delay-200 hover:cursor-pointer'>
            <Link to="/browse">
            Browse
            </Link>
          </li>
          <li className='text-gray-600 hover:text-pink-500 delay-200 hover:cursor-pointer'>
            <Link to="/login">
              Login
            </Link>
          </li>
          <li className='text-gray-600 hover:text-pink-500 delay-200 hover:cursor-pointer'>
            <Link to="/profile">
            Profile
            </Link>
          </li>
         
        </ul>
      </div>
   </nav>

   <Outlet/>
</>

  )
}

export default Nav
