import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const BottomNav = () => {
    const { user } = useAuth()
    const [showNav, setShowNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < lastScrollY) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 md:px-8 bg-base-100/80 dark:bg-gray-800 backdrop-blur border-t border-gray-300 dark:border-gray-600 shadow-md px-2 py-3 flex justify-around text-sm lg:hidden transition-all duration-300 ${showNav ? "translate-y-0" : "translate-y-24"
                }`}
        >
            <NavLink className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary' to="/">Home</NavLink>
            <NavLink className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary' to="/assignments">Assignments</NavLink>
            {
                user && <>
                            <NavLink className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary' to="/pendingAssignments">Pending Assignments</NavLink>

                </>
            }


        </div>
    );
};

export default BottomNav;
