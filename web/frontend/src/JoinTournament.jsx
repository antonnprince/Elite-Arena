import React from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'firebase/auth';
import { app, auth } from './config';
import { useEffect,useState } from "react";

const JoinTournament = () => {
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

    
  return (
    <div>
      <button></button>
    </div>
  )
}

export default JoinTournament
