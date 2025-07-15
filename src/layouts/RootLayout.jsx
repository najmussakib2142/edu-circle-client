import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';
import Loading from '../pages/shared/Loading';

const RootLayout = () => {

        const {state} = useNavigation()

    return (
        <div className='lg:pt-15'>
            <nav className=''>
                <Navbar></Navbar>
            </nav>
            <main className='max-w-7xl mx-auto'>
                {state == "loading" ? <Loading /> : <Outlet></Outlet>}
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;