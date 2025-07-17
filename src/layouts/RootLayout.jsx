import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';
import Loading from '../pages/shared/Loading';
import BottomNav from '../pages/shared/BottomNav';
// import CountSection from '../pages/shared/CountSection';

const RootLayout = () => {

    const { state } = useNavigation()

    return (
        <div className=' mt-[70px]'>
            <nav className=''>
                <Navbar></Navbar>
            </nav>
            <main className='max-w-6xl mx-auto'>
                {state == "loading" ? <Loading /> : <Outlet></Outlet>}
            </main>
            
            <Footer></Footer>
            <BottomNav></BottomNav>
        </div>
    );
};

export default RootLayout;