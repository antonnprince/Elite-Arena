import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import 'firebase/auth';
import {app, auth} from './config'; // Import your firebaseConfig here
const Login = () => {

  const provider = new GoogleAuthProvider();
  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        window.location.href = "/profile"
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="bg-zinc-900 h-full w-screen h-screen flex items-center">
      <div className='bg-zinc-800 px-8 py-4 rounded-2xl mx-[600px] my-[100px]'>
        <button onClick={handleSignIn}
          className='bg-pink-500 text-white text-xl text-center mx-auto my-auto font-bold rounded-full px-4 py-4'
        //    onClick={handleLoginClick} // Call the function to handle button click
        >
          Login/Signup with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
