import React from 'react'
import { Link } from 'react-router-dom'
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import 'firebase/auth';
// import { app, auth } from './config';
import { useEffect, useState } from "react";
const Home = () => {
  // const [user, setUser] = useState(null);
  
  // useEffect(() => {
  //   const auth = getAuth();

  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       console.log(currentUser)
  //       setUser(currentUser);
  //     } else {
  //       window.location.href = "/login"
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <>
   <div className='bg-zinc-800 rounded-3xl px-8 py-4 h-auto
   flex flex-col space-y-8
   '>
   
      <div className='bg-[url("src/images/banner-bg.jpg")]
      bg-no-repeat bg-contain
      h-3/4
      w-[1500px]
      ml-[170px]
      '>
          <div className='my-12 ml-4'>
            <h6 className='text-white font-normal text-2xl text-left mx-20'>Welcome to Elite Arena</h6>
            <h1 className='mt-14 font-bold text-white text-5xl text-left mx-20'>BROWSE AND ORGANISE<br/> TOURNAMENTS</h1>
          
            <button className='bg-pink-500 rounded-full font-bold text-white ml-20 my-8 px-4 py-2'>
            <Link to="/browse">
            Browse now
            </Link>
            </button>
          </div>
      </div> 

      {/* Tournaments */}

    <div className='bg-zinc-900 px-24 py-4 rounded-3xl'>
        <h1 className='text-white font-bold text-4xl'>My <span className='text-pink-400'>Tournaments</span></h1>
        <p className='text-white text-lg'>You currently have no tournaments going on</p>
        <button className='bg-pink-500 text-white text-center px-4 py-2 font-bold rounded-full mx-[600px]'>
          <Link to="/create">
            Start Tournament
          </Link>
        </button>
    </div>

    {/* Most Popular Right Now */}
    <div className='bg-zinc-900 px-24 py-4 rounded-3xl'>
        <h1 className='text-white font-bold text-4xl'>Featured <span className='text-pink-400'>Games</span></h1>
        <p className='text-white text-lg'>You currently have no tournaments going on</p>
        <button className='bg-pink-500 text-white text-center px-4 py-2 font-bold rounded-full mx-[600px]'>Start Tournament</button>
    </div>
   </div>
   </>
  )
}

export default Home
