import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../components/Navbar';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;