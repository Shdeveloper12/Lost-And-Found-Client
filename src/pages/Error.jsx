import { Link } from "react-router";
import React from "react";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa";
import { FaHome } from "react-icons/fa";


const Error = () => {
  return (
    <>
      
      <div className="text-center p-8 space-y-4">
        <h1 className="text-8xl text-gray-400">404</h1>
        <p className="text-gray-600">Page Not Found</p>
        <div className="flex justify-center items-center space-x-4">
          
          <div>
            <Link to="/">
              <button className="flex items-center hover:cursor-pointer bg-blue-500 px-3 text-white hover:bg-blue-600 rounded-md py-2">
                <FaHome /> Home
              </button>
            </Link>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default Error;
