import { useState } from "react";


const JoinTeam =()=>{
    
    const [team,setTeam]=useState("")
    
    return(
        <div className='bg-zinc-900 w-full h-full'>
            
            <h1 className='text-4xl text-white font-bold '>
            
                Create your <span className='text-pink-500'>Tournament</span> with the Arena of your choice
            
                <br />
            
            Enter the following details and lets get <span className='text-pink-500'>started</span>
            </h1>
            <form className='flex flex-col text-pink-500 font-semibold  py-24  bg-zinc-800'>
                
                <div className='font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl font-normal text-white  ml-4'>Event Name <span className='text-pink-500'>*</span></h2>
                    <input type='text' className='px-8 py-2 rounded-full' onChange={(e) => setTeam(e.target.value)} />
                </div>

                
            </form>

            
        </div>
    )
}

export default JoinTeam