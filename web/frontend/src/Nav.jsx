import React, { useState, useEffect } from 'react';
import logo from './images/mainlogo.png';
import { Outlet, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './config';

const Nav = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      window.location.href = "/login";
    });
  };

  return (
    <>
      <nav className='flex flex-row justify-between py-4'>
        <img src={logo} alt='Elite Arena logo' className='w-42 h-16' />

        <div className='text-pink-500 text-lg '>
          <ul className='flex flex-row space-x-16'>
            <li className='text-gray-600 hover:text-pink-500 delay-200 hover:cursor-pointer'>
              <Link to="/">Home</Link>
            </li>
            <li className='text-gray-600 hover:text-pink-500 delay-200 hover:cursor-pointer'>
              <Link to="/browse">Browse</Link>
            </li>
            {!user && (
              <li className='text-gray-600 hover:text-pink-500 delay-200 hover:cursor-pointer'>
                <Link to="/login">Login</Link>
              </li>
            )}
            {user && (
              <li className='text-gray-600 hover:text-pink-500 delay-200 hover:cursor-pointer'>
                <Link onClick={handleSignOut}>Logout</Link>
              </li>
            )}
            <li className='text-gray-600 hover:text-pink-500 delay-200 hover:cursor-pointer'>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Nav;
