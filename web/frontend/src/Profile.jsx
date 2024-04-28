import React from 'react'
import avatar from "./images/avatar-03.jpg"
import { Link } from 'react-router-dom'


const Profile = () => {
  return (
    <div className='bg-zinc-800 rounded-3xl px-8 py-8 h-auto
   flex flex-col space-y-8
   h-screen
   '>
          <h1 className='text-white text-3xl font-bold'><span className='text-pink-500'>Your</span> Profile</h1>
        <div className='bg-zinc-900 rounded-3xl p-4 flex flex-row'>
          
                <img src={avatar} className='w-1/6 h-1/5 rounded-3xl'/>

                <div className='flex flex-col'>
                    <h1 className='text-2xl text-white font-semibold mt-2 mx-12'>Name: </h1>
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
  )
}

export default Profile
