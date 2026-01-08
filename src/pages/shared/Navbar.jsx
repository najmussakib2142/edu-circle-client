import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '../../provider/ThemeContext';
import { AuthContext } from '../../provider/AuthContext';
import { motion } from "framer-motion";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';




const Navbar = () => {

    const { theme, toggleTheme } = useTheme();
    const { user, signOutUser } = useContext(AuthContext);
    const [isOpen, setOpen] = useState(false);

    const [showNavbar, setShowNavbar] = useState(true);
    // const [lastScrollY, setLastScrollY] = useState(0);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const currentScrollY = window.scrollY;

    //         if (currentScrollY > lastScrollY && currentScrollY > 100) {
    //             // Scrolling Down
    //             setShowNavbar(false);
    //         } else {
    //             // Scrolling Upfi
    //             setShowNavbar(true);
    //         }

    //         setLastScrollY(currentScrollY);
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [lastScrollY]);


    const handleSignOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3949AB",
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

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => (document.body.style.overflow = 'auto');
    }, [isOpen]);

    return (
        <div className=''>
            <div className={`fixed top-0 w-full bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 backdrop-blur  z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'
                } shadow`}>
                <div className='max-w-7xl mx-auto'>
                    <div className="navbar  py-0  z-50 md:px-18 lg:px-14  ">
                        <div className="navbar-start">
                            {/* <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /> </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm left-0 text-[#101828] dropdown-content bg-base-100  z-1 w-[80vw] p-2 shadow">
                                    {links}
                                </ul>
                            </div> */}
                            <button
                                onClick={() => setOpen(true)}
                                className='btn btn-ghost lg:hidden'
                                aria-label='open menu'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <Link to={"/"} className="font-extrabold text-2xl text-indigo-600 dark:text-indigo-400">
                                EduCircle
                            </Link>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu text-[#101828] menu-horizontal px-1">
                                {links}
                            </ul>
                        </div>

                        <div className="navbar-end md:gap-3 gap-2 flex items-center">
                            <div>
                                <div className=''>
                                    <div className="flex items-center space-x-1 md:space-x-2">
                                        <div className="flex items-center bg-gray-300 dark:bg-gray-700 rounded-2xl p-1  md:p-0.5 transition-colors">
                                            <button
                                                onClick={() => toggleTheme('light')}
                                                className={`p-1 md:p-1 rounded-full transition-colors ${theme === 'light'
                                                    ? 'bg-white text-yellow-600'
                                                    : 'text-gray-600 dark:text-gray-300'
                                                    }`}
                                                aria-label="Switch to light mode"
                                            >
                                                <span className="text-base md:text-xl">☀️</span>
                                            </button>
                                            <button
                                                onClick={() => toggleTheme('dark')}
                                                className={`p-1 md:p-1 rounded-full transition-colors ${theme === 'dark'
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

                                {/* <div className="block md:hidden">
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
                                </div> */}
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
                                        <div className="absolute -bottom-7.5 left-1/2 -translate-x-1/2 w-max bg-gray-700 text-white text-xs font-medium py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-20">
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

                            {user ? (
                                <button
                                    onClick={handleSignOut}
                                    className="btn border border-indigo-600 bg-transparent text-indigo-600 dark:border-white/70 dark:text-white  hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors"
                                >
                                    Sign Out
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="btn border border-indigo-600 bg-transparent text-indigo-600 dark:border-white/70 dark:text-white hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors"
                                    >
                                        Register
                                    </Link>

                                    <div className='hidden md:block'>
                                        <Link
                                            to="/signIn"
                                            className="btn  border border-indigo-600 bg-indigo-600 text-white dark:bg-indigo-600 dark:text-white hover:bg-transparent hover:text-indigo-600 hover:border-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Menu Overlay */
                isOpen && (
                    <div
                        onClick={() => setOpen(false)}
                        className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden'
                    />
                )
            }
            <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: isOpen ? 0 : "-100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="fixed  top-0 left-0 h-full w-[80vw] max-w-xs bg-base-100 dark:bg-gray-900 z-50  p-5 lg:hidden shadow-xl"
            >
                {/* Header */}
                <div className="flex pb-3 border-b border-b-indigo-600 dark:border-b-indigo-400 items-center justify-start gap-3 mb-6">
                    <button
                        onClick={() => setOpen(false)}
                        className="text-2xl font-bold"
                    >
                        ✕
                    </button>
                    <Link to={"/"} className="font-extrabold text-2xl text-indigo-600 dark:text-indigo-400">
                        EduCircle
                    </Link>
                </div>

                {/* Navigation Links */}
                <ul
                    onClick={() => setOpen(false)}
                    className="menu gap-2 text-lg"
                >
                    {links}

                    <div className='pl-3 pt-3'>
                        <Link
                            to="/signIn"
                            className="btn  border border-indigo-600 bg-indigo-600 text-white dark:bg-indigo-600 dark:text-white hover:bg-transparent hover:text-indigo-600 hover:border-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>

                </ul>


            </motion.aside>

        </div>
    );
};

export default Navbar;