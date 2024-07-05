import React from 'react'
import avatar from "./images/avatar-03.jpg"
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'firebase/auth';
import { app, auth } from './config';
import { useEffect, useState } from "react";
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [part, setPart] = useState([]);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [focus, setFocus] = useState(null)
  const [elength, setElength] = useState(0);
  const [plength, setPlength] = useState(0);
  const [teams, setTeams] = useState([])
  const [p, setP] = useState(false);

  const getParticipants = async (displayName) => {
  try {
    
    const response = await axios.post('http://localhost:3000/get_my_participations', { username:displayName });
     setPart(response.data)
     setPlength(part.length)
    return response.data;
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw error;
  }
};

const handleSignOut = () => {
  auth.signOut().then(() => {
    window.location.href = "/login";
  });
};


const getTournaments = async (displayName) => {
  try {
    const response = await axios.post('http://localhost:3000/get_my_tournaments', { username: displayName }); // Corrected field name
    console.log(response)
    setEvents(response.data);
    setElength(response.data.length); // Update length based on response data
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      console.log(currentUser);
      setUser(currentUser);
      try {
        const participantsData = await getParticipants(currentUser.displayName);
        console.log(currentUser.displayName)
        const tournamentData = await getTournaments(currentUser.displayName);
        console.log("Participated",participantsData);
        console.log("Organized",tournamentData)
      } catch (error) {
       console.log(error)
      }
    } else {
      window.location.href = "/login";
    }
  });
  
  return () => unsubscribe();
}, []);

  return (<>
  {user && 
    <div className='bg-zinc-800 rounded-3xl px-8 py-8 h-auto
   flex flex-col space-y-8
   h-screen
   '>
          <h1 className='text-white text-3xl font-bold'><span className='text-pink-500'>Your</span> Profile</h1>
        <div className='bg-zinc-900 rounded-3xl p-4 flex flex-row'>
                <img src={user.photoURL} className='w-1/6 h-1/5 rounded-3xl'/>

                <div className='flex flex-col my-4'>
                    <h1 className='text-2xl text-white font-semibold mt-2 mx-12'>
                      <span className='text-pink-500 font-bold'>Name:</span> {user.displayName}</h1>
                   

                    <h2 className='text-2xl text-white font-semibold my-2 mx-12'><span className='font-bold text-pink-500'>
                   Total Registered Tournaments:
                    </span>
                    {part.length}
                    </h2>

                    <h2 className='text-2xl text-white font-semibold my-2 mx-12'><span className='font-bold text-pink-500'>
                    Total Organized Tournaments:
                    </span>
                    {events.length}
                    </h2>
                </div> 
        </div> 

        <div className='bg-zinc-900 px-24 py-4 rounded-3xl '>
        <h1 className='text-white font-bold text-4xl'>Tournaments <span className='text-pink-400'>Organized</span></h1>
        {
          events.length===0?
          <p className='text-white text-lg'>You currently have no tournaments going on</p>
          :(
            <>
              {
                events.map((tournament)=>{  
                  return(
                    <>
                    <p className='text-white text-lg my-4'>
                    Welcome to your hub for all the tournaments you have organized. Here, you can track and manage your past and upcoming events, ensuring every detail is at your fingertips. Whether it's a small community gathering or a large-scale competitive event, this section will keep you updated and in control.
                    Given below are the tournaments you've organized.
                    </p>
                      <button
                      key={tournament._id}
                      onClick={() => {
                      setShowModal(true),
                      setFocus(tournament)
                      }}
                      className="bg-pink-500 text-white
                      my-2 
                      bg-pink-600 font-bold uppercase text-sm px-4 py-2 rounded-full
                        "
                      >{tournament.name}</button>
                    </>
                    )
                })
              }
              
        {
          showModal && focus &&(
            <>
              <div className="jflex bg-zinc-800 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl bg-zinc-800">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg bg-zinc-800 relative flex flex-col w-full bg-zinc-800 outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between">
                      <div className='flex flex-col items-start mx-auto'>
                      <img src={focus.image} className='w-3/4 h-42 bg-zinc-800 p-4 rounded-3xl mx-auto'/>
                      <h3 className="text-3xl font-bold text-pink-500 mx-auto">
                        {focus.name}
                      </h3>
                      </div>
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
                     <div className="relative bg-zinc-800 text-white mx-4 rounded-3xl">
                      <p className="my-4 text-blueGray-500 text-lg flex flex-col">
                        {focus.description}
                      </p>
                        <h4 className='text-white font-semibold'><span className='text-pink-500'>Max teams allowed:</span>{focus.maxteams} </h4>
                        <h4 className='text-white font-semibold'><span className='text-pink-500'>Game used:</span>{focus.game} </h4>
                        <h4 className='text-white font-semibold'><span className='text-pink-500'>Total participants:</span>{focus.participants.length}</h4>
                        <button className='text-white font-semibold' 
                        onClick={()=>{
                        focus &&
                        setTeams(focus.participants),
                        setP(!p)
                        }}>
                      <span className='text-pink-500'>
                      Get All Participants <span className='font-bold text-xl'>+</span> 
                      </span>
                      </button>
                       
                      {p && (
                      <>
                        {Object.entries(
                            teams.reduce((acc, team) => {
                                if (!acc[team.team]) {
                                    acc[team.team] = [];
                                }
                                acc[team.team].push(team.name);
                                return acc;
                            }, {})
                            ).map(([teamName, teamMembers], index) => (
                                <div key={index}>
                                    <p>Team Name: {teamName}</p>
                                    <p>Name: {teamMembers.join(', ')}</p>
                                </div>
                              ))}
                        </>
                  )}

                      


                      
                      <h4 className='text-white font-semibold'><span className='text-pink-500'>Participants per Team:</span>{focus.ppt} </h4>
                      <h4 className='text-white font-semibold'><span className='text-pink-500'>First Prize:</span>{focus.prizes["first"]} </h4>
                      <h4 className='text-white font-semibold'><span className='text-pink-500'>Second Prize:</span>{focus.prizes["second"]} </h4>
                      <h4 className='text-white font-semibold'><span className='text-pink-500'>Third Prize:</span>{focus.prizes["third"]} </h4>
                      <h4 className='text-white font-semibold'><span className='text-pink-500'>Registration fees:</span>{focus.fee} </h4>
                      <h4 className='text-white font-semibold'><span className='text-pink-500'>Last Date to Register:</span>{focus.reglastdate.substring(0,10)} </h4>
                      <h4 className='text-white font-semibold'><span className='text-pink-500'>Tournament Begins At:</span>{focus.startdate.substring(0,10)} </h4>
                      </div> 
                      
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6">
                      <button
                        className="text-red-500 bg-zinc-900 rounded-full font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>

                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-zinc-900"></div>
            </>
          )
         }
            </>
          )
        }
        <button className='bg-pink-500 rounded-xl font-bold text-center px-4 py-2 text-white mx-[400px]'>
          <Link to="/create">
            Start Tournament
          </Link>
        </button>
    </div>

    {/*  EDIT FROM HERE */}
    <div className='bg-zinc-900 px-24 py-4 rounded-3xl'>
        <h1 className='text-white font-bold text-4xl'>Tournaments <span className='text-pink-400'>Registered</span></h1>
        {
          part.length===0?
          <p className='text-white text-lg'>You currently have no tournaments going on</p>
          :(
            <div className='mx-2 font-light text-sm my-4'>
              <p className='text-white text-lg my-4'>
              Welcome to your personal dashboard for all the tournaments you have registered for. Stay up-to-date with all the important details and manage your participation effortlessly. Whether you’re gearing up for your next big match or checking on your past performances, this section has everything you need.
              </p>
              {
                part.map((each,index)=>{
                  return(
                    <>
                     <h1 className='text-white font-semibold text-2xl'><span className='font-extrabold mr-2'>{index+1}.</span>{each.name}</h1>
                    </>
                  )
                })
              }
            </div>
          )
        }
        <button className='bg-pink-500 rounded-xl font-bold text-center px-4 py-2 text-white mx-[400px]'>
        <Link to="/browse">Join Tournament</Link>
        
        </button>
    </div>
    {
      user && (
              <button className='mx-[550px] bg-pink-500 font-bold text-xl text-white w-fit px-6 py-2 rounded-full'>
                <Link onClick={handleSignOut}><h1>Logout</h1></Link>
              </button>
            )}
    </div>
}
</> 
  )
}

export default Profile
