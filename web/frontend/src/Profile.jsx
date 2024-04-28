import React from 'react'
import avatar from "./images/avatar-03.jpg"
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'firebase/auth';
import { app, auth } from './config';
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser)
        setUser(currentUser);
      } else {
        window.location.href = "/login"
      }
    });

    return () => unsubscribe();
  }, []);


  return (<>{user && 
    <div className='bg-zinc-800 rounded-3xl px-8 py-8 h-auto
   flex flex-col space-y-8
   h-screen
   '>
          <h1 className='text-white text-3xl font-bold'><span className='text-pink-500'>Your</span> Profile</h1>
        <div className='bg-zinc-900 rounded-3xl p-4 flex flex-row'>
          
                <img src={user.photoURL} className='w-1/6 h-1/5 rounded-3xl'/>

                <div className='flex flex-col'>
                    <h1 className='text-2xl text-white font-semibold mt-2 mx-12'>Name: {user.displayName}</h1>
                    <br />

                    <h2 className='text-2xl text-white font-semibold my-2 mx-12'><span className='text-pink-500'>
                    Registered Tournaments:
                    </span>
                    0
                    </h2>

                    <h2 className='text-2xl text-white font-semibold my-2 mx-12'><span className='text-pink-500'>
                    Organized Tournaments:
                    </span>
                    0
                    </h2>
                </div> 
        </div>  

        <div className='bg-zinc-900 px-24 py-4 rounded-3xl'>
        <h1 className='text-white font-bold text-4xl'>Tournaments <span className='text-pink-400'>Organized</span></h1>
        <p className='text-white text-lg'>You currently have no tournaments going on</p>
        <button className='bg-pink-500 text-white text-center px-4 py-2 font-bold rounded-full mx-[600px]'>
          <Link to="/create">
            Start Tournament
          </Link>
        </button>
    </div>

    {/* Most Popular Right Now */}
    <div className='bg-zinc-900 px-24 py-4 rounded-3xl'>
        <h1 className='text-white font-bold text-4xl'>Tournaments <span className='text-pink-400'>Registered</span></h1>
        <p className='text-white text-lg'>You currently have no tournaments going on</p>
        <button className='bg-pink-500 text-white text-center px-4 py-2 font-bold rounded-full mx-[600px]'>
        <Link to="/browse">Join Tournament</Link>
        
        </button>
    </div>
      
    </div>
}</> 
  )
}

export default Profile
