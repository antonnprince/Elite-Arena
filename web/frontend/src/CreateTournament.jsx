import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'firebase/auth';
import { app, auth } from './config';
import { useEffect } from "react";
import axios from "axios"

const CreateTournament = () => {
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

    const [gameName, setgameName] = useState("");
    const[eventName,setEventName]=useState("");
    const [poster, setPoster] = useState("")
    const [size, setSize] = useState(1);
    const [prizes, setPrizes] = useState({ "first": "", "second": "", "third": "" });
    const [limit, setLimit] = useState(1);
    const [regDate,setRegDate] = useState("");
    const [tourDate, setTourDate] = useState("");

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

    const handleFileChange = (event) => {
        // Get the selected file
        const file = event.target.files[0];

        // Create a new FileReader instance
        const reader = new FileReader();

        // Read the file as a Data URL (Base64)
        reader.readAsDataURL(file);

        // Set up a listener for when the file is loaded
        reader.onload = () => {
            // Set the Base64 string as the value of the state
            setPoster(reader.result);
        };
    };
    const handleSubmit=(e)=>{ 
        e.preventDefault()
            if(!eventName || !poster || !gameName|| !regDate || !tourDate)
             alert("Enter the requierd fields")
        
            else
            sendData()
            }
        
    

            const sendData = async () => {
    try {
        const Result = {
            "name": eventName,
            "team": true,
            "organizer": user.displayName,
            "image": poster,
            "game": gameName,
            "maxteams": size,
            "prizes": prizes,
            "ppt": limit,
            "reglastdate": regDate,
            "startdate": tourDate
        };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Specify that the body is JSON
            },
            body: JSON.stringify(Result) // Convert JavaScript object to JSON string
        };

        const response = await fetch('http://localhost:3000/create_game', requestOptions);
        console.log(response);
        console.log(Result);
        window.location.href = "/browse"
    } catch (error) {
        console.log(error);
    }
};

    return (
        
        <div className='bg-zinc-900 w-full h-full'>
            
            <h1 className='text-4xl text-white font-bold '>
            
                Create your <span className='text-pink-500'>Tournament</span> with the Arena of your choice
            
                <br />
            
            Enter the following details and lets get <span className='text-pink-500'>started</span>
            </h1>
            <form className='flex flex-col mx-56 text-pink-500 font-semibold text-2xl space-y-10 py-24'>
                <div className=' font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl font-normal text-white  ml-4'>Event Name <span className='text-pink-500'>*</span></h2>
                    <input type='text' className='px-8 py-2 rounded-full' onChange={(e) => setEventName(e.target.value)} />
                </div>

                <div className=' font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl font-normal text-white  ml-4'>Add poster <span className='text-pink-500'>*</span></h2>
                    <input type='file'
                    accept="image/jpeg, image/jpg"
                     className='px-8 py-2 rounded-full' onChange={handleFileChange} />
                </div>

                <div className=' font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl font-normal text-white  ml-4'>Game Used <span className='text-pink-500'>*</span></h2>
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
                    <h2 className='text-3xl text-white  ml-4'>Team Limit <span className='text-pink-500'>*(Max number of teams)</span></h2>
                    <input type='number' className='px-8 py-2 rounded-full' onChange={handleLimit} value={limit} />
                </div>
                <div className=' font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl text-white  ml-4'>Registration End Date <span className='text-pink-500'>*</span></h2>
                    <input type='date' className='px-8 py-2 rounded-full' onChange={(e)=>{setRegDate(e.target.value)}} />
                </div>
                <div className=' font-normal space-y-2 space-x-4'>
                    <h2 className='text-3xl text-white  ml-4'>Tournament Start Date <span className='text-pink-500'>*</span></h2>
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
