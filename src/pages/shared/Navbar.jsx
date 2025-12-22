import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '../../provider/ThemeContext';
import { AuthContext } from '../../provider/AuthContext';
import { motion } from "framer-motion";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';




const Navbar = () => {

    const { theme, toggleTheme } = useTheme();
    const { user, signOutUser } = use(AuthContext)

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling Down
                setShowNavbar(false);
            } else {
                // Scrolling Up
                setShowNavbar(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);


    const handleSignOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1471e3",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log me out!"
        }).then((result) => {
            if (result.isConfirmed) {
                signOutUser()
                    .then(() => {
                        Swal.fire({
                            title: "Logged out!",
                            text: "You have been successfully logged out.",
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    })
            }
        })
    }

    const links = <>
        <li className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary'><NavLink to="/">Home</NavLink></li>
        <li className='text-[#101828]  dark:text-gray-100 hover:text-primary dark:hover:text-secondary'><NavLink to="/assignments">Assignments</NavLink></li>
        {
            user && <>
                {/* <li className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary'><NavLink to="/createAssignment">Create Assignment </NavLink></li>
                // <li className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary'><NavLink to="/mySubmissions">My Submissions</NavLink></li> */}
                <li className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary'><NavLink to="/pendingAssignments">Pending Assignments</NavLink></li>
                <li className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary'><NavLink to="/dashboard">Dashboard</NavLink></li>
                {/* <li className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary'><NavLink to="/createAssignment">Create Assignment </NavLink></li> */}
                {/* <li className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary'><NavLink to="/mySubmissions">My Submissions</NavLink></li> */}

            </>
        }
    </>

    return (
        <div className=''>
            <div className={`fixed top-0 w-full bg-base-100/80 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 backdrop-blur transition-all duration-300  z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'
                } shadow`}>
                <div className='max-w-7xl mx-auto'>
                    <div className="navbar  py-0  z-50 md:px-18 lg:px-14  ">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /> </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm left-0 text-[#101828] dropdown-content bg-base-100  z-1 w-[80vw] p-2 shadow">
                                    {links}
                                </ul>
                            </div>
                            <Link to="/" className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">EduCircle</Link>

                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu text-[#101828] menu-horizontal px-1">
                                {links}
                            </ul>
                        </div>

                        <div className="navbar-end md:gap-3 gap-1">
                            <div>
                                <div className='hidden md:block'>
                                    <div className="flex items-center space-x-1 md:space-x-2">
                                        <div className="flex items-center bg-gray-300 dark:bg-gray-700 rounded-full md:p-0.5 transition-colors">
                                            <button
                                                onClick={() => toggleTheme('light')}
                                                className={`md:p-1 rounded-full transition-colors ${theme === 'light'
                                                    ? 'bg-white text-yellow-600'
                                                    : 'text-gray-600 dark:text-gray-300'
                                                    }`}
                                                aria-label="Switch to light mode"
                                            >
                                                <span className="text-base md:text-xl">☀️</span>
                                            </button>
                                            <button
                                                onClick={() => toggleTheme('dark')}
                                                className={` md:p-1 rounded-full transition-colors ${theme === 'dark'
                                                    ? 'bg-white text-indigo-500'
                                                    : 'text-gray-600 dark:text-gray-300'
                                                    }`}
                                                aria-label="Switch to dark mode"
                                            >
                                                <span className="text-base md:text-xl">🌙</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="block md:hidden">
                                    <button
                                        onClick={toggleTheme}
                                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                                        className='p-1 md:p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
                                    >
                                        {
                                            theme === 'dark' ?
                                                (
                                                    <span className='text-yellow-600 text-xl' > ☀️</span>
                                                ) :
                                                (
                                                    <span className='text-gray-700 text-xl'>🌙</span>
                                                )
                                        }
                                    </button>
                                </div>
                            </div>


                            {
                                user && (
                                    <div className="dropdown dropdown-end group relative">
                                        {/* Dropdown button */}
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            {user?.photoURL ? (
                                                <img
                                                    className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border dark:border-primary"
                                                    src={user.photoURL}
                                                    alt="User"
                                                />
                                            ) : (
                                                <FaUserCircle className="w-12 h-12 text-gray-600 dark:text-primary transition-colors" />)}
                                        </div>

                                        {/* Tooltip on hover */}
                                        <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-max bg-gray-700 text-white text-xs font-medium py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-20">
                                            {user?.displayName || user?.email}
                                        </div>

                                        {/* Dropdown menu items */}
                                        <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                            <li className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 cursor-default">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold truncate text-gray-800 dark:text-gray-200">
                                                        {user?.displayName || "User"}
                                                    </span>
                                                    <span className="text-sm truncate text-gray-500 dark:text-gray-400">
                                                        {user?.email}
                                                    </span>
                                                </div>
                                            </li>
                                            {/* <li><span className="font-semibold">{user.displayName}</span></li> */}
                                            <li className=''><NavLink to="/dashboard">Dashboard</NavLink></li>
                                            {/* <li className=''><NavLink to="/createAssignment">Create Assignments</NavLink></li>
                                        <li><NavLink to="/mySubmissions">My Attempted Assignments </NavLink></li>
                                        <li><NavLink to="/bookmarkedAssignments">My Bookmarked Assignments </NavLink></li> */}
                                            {/* <li><button onClick={handleSignOut}>Sign Out</button></li> */}
                                        </ul>
                                    </div>
                                )
                            }


                            {
                                user ? <button onClick={handleSignOut} className='btn border-primary text-primary hover:bg-primary hover:text-white hover:border-primary'>Sign Out</button> : <>
                                    <Link to="/register" className="btn border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:border-primary
             dark:border-gray-700 dark:text-white dark:hover:bg-primary dark:hover:text-white">Register</Link>
                                    <Link
                                        to="/signIn" className="btn bg-primary text-white border-primary hover:bg-white hover:text-primary hover:border-primary
             dark:bg-primary dark:text-base-100 dark:border-gray-900 dark:hover:border-white dark:hover:bg-transparent dark:hover:text-white">SignIn</Link>

                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;