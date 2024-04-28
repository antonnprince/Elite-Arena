import React from 'react'
import { useState } from 'react'



const CreateTournament = () => {

    const[teamName, setTeamName] = useState("")
    const[size,setSize] = useState(1)

    const handleNumber=(e)=>{
        if(e.target.value>0)
        setSize(e.target.value)
    }   

  return (
    <div className='bg-zinc-900 w-full h-full'>
      
      <h1 className='text-4xl text-white font-bold '>
      Create your <span className='text-pink-500'>Tournament</span> with the Arena of your choice
      <br />
      Enter the following details and lets get <span className='text-pink-500'>started</span>
      </h1>
        <form className='flex flex-col mt-24 mx-56 text-pink-500 font-semibold text-2xl space-y-10'>
            <div className=' font-normal space-y-2 flex space-x-4'>
                <h2 className='text-3xl font-normal text-white'
                onChange={(e)=>setTeamName(e.target.value)}
                >Game Used</h2>
                <input type='text ' className='px-8 py-2 rounded-full'/>
            </div>

            <div className='font-normal  space-x-4'>
                <h2 className='text-3xl text-white'>Team Size <span className='text-pink-500'>(Participants per team)</span></h2>
                <input type='number'
               onChange={handleNumber}
               value={size}
                 className='px-8 py-2 rounded-full'/>
            </div>

            <div className=' font-normal space-x-4'>
                <h2 className='text-3xl text-white'>First Prize</h2>
                <input type='text' className='px-8 py-2 rounded-full'/>
            </div>

            <div className=' font-normal  space-x-4'>
                <h2 className='text-3xl text-white'>Second Prize</h2>
                <input type='text' className='px-8 py-2 rounded-full'/>
            </div>

            <div className=' font-normal  space-x-4'>
                <h2 className='text-3xl text-white'>Third Prize</h2>
                <input type='text' className='px-8 py-2 rounded-full'/>
            </div>

            <div className=' font-normal  space-x-4'>
                <h2 className='text-3xl text-white'>Team Limit <span className='text-pink-500'>(Max number of teams)</span></h2>
                <input type='number' className='px-8 py-2 rounded-full' onChange={handleNumber} value={size}/>
            </div>

            <div className=' font-normal  space-x-4'>
                <h2 className='text-3xl text-white'>Registration End Date</h2>
                <input type='date' className='px-8 py-2 rounded-full'/>
            </div>

            <div className=' font-normal  space-x-4'>
                <h2 className='text-3xl text-white'>Tournament Start Date</h2>
                <input type='date' className='px-8 py-2 rounded-full'/>
            </div>
        </form>
    </div>
  )
}

export default CreateTournament
