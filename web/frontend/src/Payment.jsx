import React from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'firebase/auth';
import { app, auth } from './config';
import { useEffect,useState } from "react";

const Payment = ({order_id, key, amount}) => {
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
    const handlesubmit = () =>{
        options = { 
            "key": key,  
            "amount": amount,  
            "currency": "INR", 
            "name": "Dummy Academy", 
            "description": "Pay & Checkout this Course, Upgrade your DSA Skill", 
             "image": "https://media.geeksforgeeks.org/wp-content/uploads/20210806114908/dummy-200x200.png", 
            "order_id": order_id,   
            "handler": function (response){ 
                console.log(response) 
                alert("Payment Succeeded"); 
            }, 
            "prefill": { 
              "contact":"9876543210",  
              "name": "Twinkle Sharma",   
              "email": "smtwinkle@gmail.com",
            }, 
           "notes" : { 
              "description":"Best Course for SDE placements", 
              "language":"Available in 4 major Languages JAVA,  C/C++, Python, Javascript", 
              "access":"This course have Lifetime Access" 
            },  
            "theme": { 
                "color": "#2300a3" 
            } 
        }; 
        var razorpayObject = new Razorpay(options); 
        console.log(razorpayObject); 
        razorpayObject.on('payment.failed', function (response){ 
              console.log(response); 
              alert("Payment Failed"); 
        }); 
    }
    
  return (
    <div>
      <button onClick={handlesubmit}>Pay here</button>
    </div>
  )
}

export default JoinTournament
