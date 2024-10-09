import React from "react";
import Home from '../components/Structure/Home'
import type { AppProps } from 'next/app';
import '../globals.css';
import Header from "@/components/Structure/Header";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        
    <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex-grow bg-gray-100 overflow-y-auto">
            <Component {...pageProps} />
        </div>
    </div>
            
           
    );
  }
  
  export default MyApp;