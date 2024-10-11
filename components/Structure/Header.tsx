import React from "react";
import Link from "next/link"; 


// import { toast, ToastOptions, TypeOptions } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



const Header = () => {
  
  
  // const notify = (message: string, type: TypeOptions) => {
  //   const options: ToastOptions = { type, autoClose: 5000};
  //   toast(message, options);
  // }

 
   return (
    <header className="bg-gray-800 text-white w-full fixed top-0 left-0 z-10 h-16 flex items-center">
      <div className="flex justify-between items-center w-full px-4">
        
        <div className="text-2xl font-bold">Vocal-stems</div>

        
        <nav className="flex space-x-6 ml-8">
          
          
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          {/* <Link href="/about" className="hover:text-gray-400">
            About
          </Link> */}
         
        </nav>

        
       
      </div>
    </header>
  );
};

export default Header;
