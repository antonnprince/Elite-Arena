import React from 'react'
import tourn from "./images/popular-07.jpg"
 import { getAuth, onAuthStateChanged } from 'firebase/auth';
 import 'firebase/auth';
import { app, auth } from './config';
 import { useEffect, useState } from "react";
 import useRazorpay from "react-razorpay";
import  axios from "axios"
import CreateTeam from './CreateTeam';

const Browse = () => {
  const [Razorpay] = useRazorpay();
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [focus, setFocus] = useState(null)
  const [teamname, setTeamname] = useState("")
  const [members, setMembers] = useState([])
  const [mygames, setMygames] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState("")

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const getdata = async (user) =>{
    const response = await fetch("http://localhost:3000/get_all_events", {
      method: "GET",
    });

    const datak = await response.json()
    console.log(datak.data)
    console.log(user)
    setData(datak.data)
    let sample= [];
    for (var i in datak.data){
      for (var j in datak.data[i].participants){
        if (user.displayName===datak.data[i].participants[j].name){
          sample.push(datak.data[i].name)
          continue
        }
      }
    }
    setMygames(sample)
    //console.log(datak.data)
  }
  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser)
        setUser(currentUser);

        getdata(currentUser)
      } else {
        window.location.href = "/login"
      }
      
    });



    return () => unsubscribe();
  }, []);

  const handlejoin = async (event)=>{
 await  axios.post("http://localhost:3000/join_team",{username:user.displayName,eventName:event.name,teamName:teamname}).then(x=>{window.location.href="/browse"})
  
  }

  const t = new Date()


  const handlecreate = async (event)=>{
    console.log(members)
    let response;
    try{
          response = await axios.post("http://localhost:3000/create_team",{username:user.displayName,eventName:event.name,teamName:teamname, members:members})
          const order = response.data
      console.log(order.amount)
      var options = { 
        "key": event.key,  
        "amount": parseInt(order.amount),  
        "currency": "INR", 
        "name": event.name, 
        "description": "Pay & Checkout this Course, Upgrade your DSA Skill", 
         "image": "https://media.geeksforgeeks.org/wp-content/uploads/20210806114908/dummy-200x200.png", 
        "order_id": order.id,   
        "handler": function (response){ 
            alert("Successfully registered")
            window.location.href="/browse" 
            
        }, 
        "prefill": { 
           //Here we are prefilling random contact 
          "contact":"9876543210",  
            //name and email id, so while checkout 
          "name": "Twinkle Sharma",   
          "email": "smtwinkle@gmail.com"
        }, 
       "notes" : { 
          "description":"Best Course for SDE placements", 
          "language":"Available in 4 major Languages JAVA, C/C++, Python, Javascript", 
          "access":"This course have Lifetime Access" 
        },  
        "theme": { 
            "color": "#2300a3" 
        } 
      }; 

      const rzpay = new Razorpay(options);
      rzpay.open();
    }
    catch(e){
      alert("team exists already")
      return;
    }
  }
  

  return (
    <>
    {
      user && data && <>
      
      <h1 className='text-5xl text-white font-bold ml-16 my-4'><span className='text-pink-500 text-center'>Current</span> Tournaments</h1>
      
      <div className='my-2 rounded-full text-black text-sm w-full'>
        <input type='text' value={search} 
        placeholder='Enter Tournament Name'
        onChange={e=>setSearch(e.target.value)} 
        className='w-[30%] rounded-full bg-white h-8 focus:outline-none pl-5 ml-[35%] pr-5'/>
      </div>

    <div className='flex flex-row flex-wrap space-x-4 space-y-8 h-full mx-12'
    style={{ overflowX: 'hidden', overflowY: 'auto' }}
    >
      <br/>
    {
      filteredData.map((each)=>{

        return(
          <div className='flex-col' key={data._id}>
          <img src={each.image} key={each._id} className='w-42 h-56 rounded-xl mb-2 w-max-56'/>
          <h4 className='text-white font-bold text-xl mb-2 '>{each.name}</h4>
          <> 
            <button
            className="bg-pink-500 text-[#dae0db] active:bg-pink-600 font-semibold uppercase text-xs px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {setShowModal(true);
            setFocus(each);
            setSelected(each)
            console.log(mygames)
            console.log(each)
            }}
          >
            More details
          </button>

      {
        showModal && focus &&(
        <>
          <div className="
          flex bg-zinc-800 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            
            <div className="relative my-6 mx-auto max-w-3xl bg-zinc-800">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg bg-zinc-800 relative flex flex-col 
              bg-zinc-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex mx-auto  ">
                  <div className='flex flex-col items-start mx-auto'>
                  <img src={focus.image} className='w-3/4 h-auto  bg-zinc-800 p-2 rounded-3xl'/>
                  <h3 className="text-4xl font-extrabold text-pink-500">
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
                  <p className="my-4 text-blueGray-500 text-md font-semibold leading-relaxed flex flex-col">
                    {focus.description}
                  </p>
                  <h4 className='text-white font-semibold text-md'><span className='text-pink-500 font-bold'>Max teams allowed:</span>{focus.maxteams} </h4>
                  <h4 className='text-white font-semibold text-md'><span className='text-pink-500 font-bold'>Game used:</span>{focus.game} </h4>
                  <h4 className='text-white font-semibold text-md'><span className='text-pink-500 font-bold'>Total participants:</span>{focus.participants.length} </h4>
                  <h4 className='text-white font-semibold text-md'><span className='text-pink-500 font-bold'>Participants per Team:</span>{focus.ppt} </h4>
                  <h4 className='text-white font-semibold text-md'><span className='text-pink-500 font-bold'>First Prize:</span>{focus.prizes["first"]} </h4>
                  <h4 className='text-white font-semibold text-md'><span className='text-pink-500 font-bold'>Second Prize:</span>{focus.prizes["second"]} </h4>
                  <h4 className='text-white font-semibold text-md'><span className='text-pink-500 font-bold'>Third Prize:</span>{focus.prizes["third"]} </h4>
                  <h4 className='text-white font-semibold text-md'><span className='text-pink-500 font-bold'>Registration fees:</span>{focus.fee} </h4>
                  <h4 className='text-white font-semibold text-md'><span className='text-pink-500 font-bold'>Last Date to Register:</span>{focus.reglastdate.substring(0,10)} </h4>
                  <h4 className='text-white font-semibold text-md'><span className='text-pink-500 font-bold'>Tournament Begins At:</span>{focus.startdate.substring(0,10)} </h4>
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
                  {
                  !mygames.includes(selected.name) ? 
                  <>
                  {/* <input placeholder='Team name' value={teamname} onChange={(e)=>setTeamname(e.target.value)}></input> */}
                  
                  <button
                    className="bg-pink-500 text-white rounded-full active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>{new Date(focus.reglastdate) > t ?setShowCreate(true) : setShowCreate(false)}}
                  >
                    {
                      new Date(focus.reglastdate) > t ? "Create Team" : "Registrations closed"
                    }
                  </button>
                  {/* <button
                    className="bg-pink-500 text-white rounded-full active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    join Team
                  </button> */}
                  {
                    showCreate &&
                    <>
                      <div className="justify-center items-center flex bg-zinc-800 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl bg-zinc-800">
                          
                               <div className="border-0 rounded-lg shadow-lg bg-zinc-800 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className=' font-normal p-10 space-y-2 space-x-4'>
                                 <h2 className='text-3xl font-normal text-  ml-4'>Team Name<span className='text-pink-500'>*</span></h2>
                                  <input required type='text' className='px-8 py-2 border border-black-500 focus:border-black focus:outline-none rounded-full' onChange={(e) => {setTeamname(e.target.value);console.log(each.ppt)}} />
                                  {Array.from({ length: parseInt(selected.ppt)-1 }, (_, index) => (
                                    <>
                                  <h2 className='text-3xl font-normal text-black  ml-4'>Team Member <span className='text-pink-500'>*</span></h2>
                                  <input required type='text' className='px-8 border border-black-500 focus:border-black focus:outline-none py-2 rounded-full' onChange={(e) => setMembers([...members.slice(0, index), e.target.value, ...members.slice(index + 1)]) } />
                                  </>
                                ))}
                                </div>
                                <div className='flex flex-row mx-auto'>
                                <button
                            className="text-red-500 bg-zinc-800 rounded-full font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowCreate(false)}
                            >
                              Close
                            </button>
                  
                            <button
                            className="text-red-500 bg-zinc-800 rounded-full font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                            onClick={() =>{ handlecreate(selected), console.log(selected)}}
                            >
                              Submit
                            </button>
                            </div>
                              </div>
                            
                            
                          </div>
                        </div> <div className="opacity-25 fixed inset-0 z-40 bg-zinc-900"></div>

                    </>
                  }
                  </>
                  :
                  <>
                  <button
                    className="bg-pink-500 text-white rounded-full active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    disabled
                  >
                    Already Joined
                  </button>
                  </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-zinc-900"></div>
        </>
         )}
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

