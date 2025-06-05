import React from 'react';
import { Outlet } from 'react-router';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;