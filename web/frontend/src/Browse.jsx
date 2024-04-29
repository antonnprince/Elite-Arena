import React from 'react'
import tourn from "./images/popular-07.jpg"
 import { getAuth, onAuthStateChanged } from 'firebase/auth';
 import 'firebase/auth';
 import { app, auth } from './config';
 import { useEffect, useState } from "react";
// import Details from './Details';


const Browse = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  
  const getdata = async () =>{
    const response = await fetch("http://localhost:3000/get_all_events", {
      method: "GET",
    });

    const datak = await response.json()
    setData(datak)
    console.log(datak)
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
          <img src={each.image} key={each._id} className='w-42 h-56 rounded-xl my-4'/>
          <h6 className='text-white font-normal text-xl'>{each.name}</h6>
          <>
        <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => {setShowModal(true)
        }}
      >
        More details
      </button>

      {
        showModal ? (
        <>
          <div className="justify-center items-center flex bg-zinc-800 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl bg-zinc-800">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg bg-zinc-800 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {data[0].game}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-black border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-black text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto bg-zinc-800 text-white mx-2 rounded-3xl">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 bg-zinc-800 rounded-full font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-pink-500 text-white rounded-full active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-zinc-900"></div>
        </>
         ) : null}
        </>
          </div>
        )
      })
    }
    
     
    </div>
    </>}</>
  )
}

export default Browse
