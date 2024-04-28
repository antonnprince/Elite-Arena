import React, { useState } from 'react';

const CreateTournament = () => {
    const [gameName, setgameName] = useState("");
    const [size, setSize] = useState(1);
    const [prizes, setPrizes] = useState({ first: "", second: "", third: "" });
    const [limit, setLimit] = useState(1);
    const [regDate,setRegDate] = useState('');
    const [tourDate, setTourDate] = useState('');

    const handleNumber = (e) => {
        if (e.target.value > 0) {
            setSize(e.target.value);
        }
    };

    const handleLimit = (e) => {
        if (e.target.value > 0) {
            setLimit(e.target.value);
        }
    };

    const handleFirstPrize = (e) => {
        setPrizes({ ...prizes, first: e.target.value });
    };

    const handleSecondPrize = (e) => {
        setPrizes({ ...prizes, second: e.target.value });
    };

    const handleThirdPrize = (e) => {
        setPrizes({ ...prizes, third: e.target.value });
    };

    const handleSubmit=(e)=>{
        const Result = {
            gameName,
            size,
            prizes,
            limit,
            regDate,
            tourDate
        }
        e.preventDefault()
        console.log(Result)
    }

    return (
        <div className='bg-zinc-900 w-full h-full'>
            
            <h1 className='text-4xl text-white font-bold '>
            
                Create your <span className='text-pink-500'>Tournament</span> with the Arena of your choice
            
                <br />
            
            Enter the following details and lets get <span className='text-pink-500'>started</span>
            </h1>
            <form className='flex flex-col mx-56 text-pink-500 font-semibold text-2xl space-y-10 py-24'>
                <div className=' font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl font-normal text-white  ml-4'>Game Used</h2>
                    <input type='text' className='px-8 py-2 rounded-full' onChange={(e) => setgameName(e.target.value)} />
                </div>
                <div className='font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl text-white  ml-4'>Team Size <span className='text-pink-500'>(Participants per team)</span></h2>
                    <input type='number' onChange={handleNumber} value={size} className='px-8 py-2 rounded-full' />
                </div>
                <div className=' font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl text-white  ml-4'>First Prize</h2>
                    <input type='text' className='px-8 py-2 rounded-full' onChange={handleFirstPrize} />
                </div>
                <div className=' font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl text-white  ml-4'>Second Prize</h2>
                    <input type='text' className='px-8 py-2 rounded-full' onChange={handleSecondPrize} />
                </div>
                <div className=' font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl text-white  ml-4'>Third Prize</h2>
                    <input type='text' className='px-8 py-2 rounded-full' onChange={handleThirdPrize} />
                </div>
                <div className=' font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl text-white  ml-4'>Team Limit <span className='text-pink-500'>(Max number of teams)</span></h2>
                    <input type='number' className='px-8 py-2 rounded-full' onChange={handleLimit} value={limit} />
                </div>
                <div className=' font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl text-white  ml-4'>Registration End Date</h2>
                    <input type='date' className='px-8 py-2 rounded-full' onChange={(e)=>{setRegDate(e.target.value)}} />
                </div>
                <div className=' font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl text-white  ml-4'>Tournament Start Date</h2>
                    <input type='date' className='px-8 py-2 rounded-full'
                    onChange={(e)=>{setTourDate(e.target.value)}} />
                </div>

                <button className='bg-pink-500 text-white text-center px-2 w-42 py-2 font-bold rounded-full'
               type="submit"
                onClick={handleSubmit}
                >
                Submit
                </button>
            </form>

            
        </div>
    );
}

export default CreateTournament;
