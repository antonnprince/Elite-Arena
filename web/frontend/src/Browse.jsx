import React from 'react'
import tourn from "./images/popular-07.jpg"
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import 'firebase/auth';
// import { app, auth } from './config';
// import { useEffect, useState } from "react";
const Browse = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const getdata = async () =>{
    const response = await fetch("http://localhost:3000/get_all_events", {
      method: "GET",
    });

    const datak = await response.json()
    setData(datak.data)
    console.log(datak.data)
  }
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser)
        getdata()
        setUser(currentUser);
      } else {
        window.location.href = "/login"
      }
    });



    return () => unsubscribe();
  }, []);
  

  return (
    <>
    {user && data && <>
    <h1 className='text-4xl text-white font-bold'><span className='text-pink-500 text-center'>Live</span> Tournaments</h1>
    <div className='flex flex-row flex-wrap space-x-4 space-y-8 h-full mx-24'>
      <br/>
    {
      data.map((each)=>{
        return(
          <div className='flex-col'>
          <img src={each.image} className='w-42 h-56 rounded-xl my-4'/>
          <h6 className='text-white font-normal text-xl'>{each.name}</h6>
          <h8 className="text-pink-500">More details</h8>
          </div>
        )
      })
    }
     
    </div>
    </>}</>
  )
}

export default Browse
