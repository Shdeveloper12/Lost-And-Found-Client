import React from "react";
import { Helmet } from "react-helmet-async";
import img1 from "../assets/error.jpg"
const Error = () => {
  return (
    <>
      
      <div className="flex justify-center p-8">

        <img src={img1} alt="" className="w-120"/>
      </div>
    </>
  );
};

export default Error;
