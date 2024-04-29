import React from 'react'
import tourn from "./images/popular-07.jpg"
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import 'firebase/auth';
// import { app, auth } from './config';
// import { useEffect, useState } from "react";
const Browse = () => {
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
  const count=[1,2,3,4,5,6,7,8,9,10]

  return (
    <>
     <>
    <h1 className='text-4xl text-white font-bold'><span className='text-pink-500 text-center'>Live</span> Tournaments</h1>
    <div className='flex flex-row flex-wrap space-x-4 space-y-8 h-full mx-24'>
      <br/>
    {
      count.map((each)=>{
        return(
          <div className='flex-col'>
          <img src={tourn} className='w-42 h-56 rounded-xl my-4'/>
          <h6 className='text-white font-normal text-xl'>Name</h6>
          <h8 className="text-pink-500">More details</h8>
          </div>
        )
      })
    }
     
    </div>
    </></>
  )
}

export default Browse
