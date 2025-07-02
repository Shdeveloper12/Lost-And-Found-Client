import React from "react";
import { Outlet } from "react-router";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";

const Root = () => {
  return (
    <>
      <Helmet>
        <title>Lost & Found</title>
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar></Navbar>
        <main className="flex-grow">
          <Outlet></Outlet>

        </main>
       
        <Footer></Footer>
      </div>
    </>
  );
};

export default Root;
