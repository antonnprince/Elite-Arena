import React from 'react'
import tourn from "./images/popular-07.jpg"
 import { getAuth, onAuthStateChanged } from 'firebase/auth';
 import 'firebase/auth';
import { app, auth } from './config';
 import { useEffect, useState } from "react";
 import useRazorpay from "react-razorpay";
import  axios from "axios"

const Browse = () => {
  const [Razorpay] = useRazorpay();
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [focus, setFocus] = useState(null)
  const [teamname, setTeamname] = useState("")
  const [mygames, setMygames] = useState([])
  
  const getdata = async (user) =>{
    const response = await fetch("http://localhost:3000/get_all_events", {
      method: "GET",
    });

    const datak = await response.json()
    setData(datak.data)
    for (var i in datak.data){
      for (var j in datak.data[i].participants){
        if (user.displayName==datak.data[i].participants[j].name){
          console.log(datak.data[i].name)
          setMygames(...mygames, datak.data[i].name)
          continue
        }
      }
    }
    console.log(datak.data)
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

  const handlecreate = async (event)=>{
    const response = await axios.post("http://localhost:3000/create_team",{username:user.displayName,eventName:event.name,teamName:teamname})
    console.log(response)
      const order = response.data
      console.log(order.amount)
      var options = { 
        "key": event.key,  
        "amount": "40",  
        "currency": "INR", 
        "name": event.name, 
        "description": "Pay & Checkout this Course, Upgrade your DSA Skill", 
         "image": "https://media.geeksforgeeks.org/wp-content/uploads/20210806114908/dummy-200x200.png", 
        "order_id": order.id,   
        "handler": function (response){ 
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
  

  return (
    <>
    {user && data && <>
    <h1 className='text-4xl text-white font-bold'><span className='text-pink-500 text-center'>Current</span> Tournaments</h1>
    <div className='flex flex-row flex-wrap space-x-4 space-y-8 h-full mx-24'>
      <br/>
    {
      data.map((each)=>{
        return(
          <div className='flex-col' key={data._id}>
          <img src={each.image} key={each._id} className='w-42 h-56 rounded-xl my-4 w-max-56'/>
          <h4 className='text-white font-normal text-xl'>{each.name}</h4>
          <>
        <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => {setShowModal(true);
        setFocus(each);
        }}
      >
        More details
      </button>

      {
        showModal && focus &&(
        <>
          <div className="justify-center items-center flex bg-zinc-800 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl bg-zinc-800">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg bg-zinc-800 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 ">
                  <div className='flex flex-col items-start mx-auto'>
                  <img src={focus.image} className='w-3/4 h-42 bg-zinc-800 p-4 rounded-3xl'/>
                  <h3 className="text-3xl font-bold text-pink-500">
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
                <div className="relative p-6 flex-auto bg-zinc-800 text-white mx-4 rounded-3xl">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed flex flex-col">
                    {focus.description}
                  </p>
                  <h4 className='text-white font-semibold'><span className='text-pink-500'>Max teams allowed:</span>{focus.maxteams} </h4>
                  <h4 className='text-white font-semibold'><span className='text-pink-500'>Game used:</span>{focus.game} </h4>
                  <h4 className='text-white font-semibold'><span className='text-pink-500'>Total participants:</span>{focus.participants.length} </h4>
                  <h4 className='text-white font-semibold'><span className='text-pink-500'>Participants per Team:</span>{focus.ppt} </h4>
                  <h4 className='text-white font-semibold'><span className='text-pink-500'>First Prize:</span>{focus.prizes["first"]} </h4>
                  <h4 className='text-white font-semibold'><span className='text-pink-500'>Second Prize:</span>{focus.prizes["second"]} </h4>
                  <h4 className='text-white font-semibold'><span className='text-pink-500'>Third Prize:</span>{focus.prizes["third"]} </h4>
                  <h4 className='text-white font-semibold'><span className='text-pink-500'>Registration fees:</span>{focus.fee} </h4>
                  <h4 className='text-white font-semibold'><span className='text-pink-500'>Last Date to Register:</span>{focus.reglastdate} </h4>
                  <h4 className='text-white font-semibold'><span className='text-pink-500'>Tournament Begins At:</span>{focus.startdate} </h4>
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
                  {!mygames.includes(each.name) ? <><input placeholder='Team name' value={teamname} onChange={(e)=>setTeamname(e.target.value)}></input>
                  <button
                    className="bg-pink-500 text-white rounded-full active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handlecreate(each)}
                  >
                    create Team
                  </button>
                  <button
                    className="bg-pink-500 text-white rounded-full active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handlejoin()}
                  >
                    join Team
                  </button></>:<><button
                    className="bg-pink-500 text-white rounded-full active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    disabled
                  >
                    Already Joined
                  </button></>}
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
