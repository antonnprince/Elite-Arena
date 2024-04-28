import React from 'react';

const Login = () => {
    

  return (
    <div className="bg-zinc-900 h-full w-screen h-screen flex items-center">
      <div className='bg-zinc-800 px-8 py-4 rounded-2xl mx-[600px] my-[100px]'>
        <button 
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
