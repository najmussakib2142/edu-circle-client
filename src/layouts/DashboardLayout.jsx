import { useState } from "react";
import { FaHome, FaPlusCircle, FaClipboardList, FaBookmark, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, Outlet, useLocation } from "react-router";

const DashboardLayout = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const navItemClass = ({ isActive }) =>
        `flex items-center gap-2 py-2 rounded-md transition
     ${isActive || location.pathname === "/dashboard"
            ? "font-semibold text-gray-700 dark:text-gray-200 "
            : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline"
        }`;

    return (
        <div className="min-h-screen flex bg-white dark:bg-gray-900">

            {/* ===== Mobile Top Bar ===== */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 border-b bg-base-100">
                <button onClick={() => setOpen(true)}>
                    <FaBars size={20} />
                </button>
                <Link to="/" className="font-bold text-lg">
                    EduCircle
                </Link>
            </div>

            {/* ===== Overlay (Mobile) ===== */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* ===== Sidebar ===== */}
            <aside
                className={`
          fixed md:static top-0 left-0 z-50
          h-full md:h-auto w-64 bg-white dark:bg-gray-800 px-6 py-4
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
            >
                {/* Sidebar Header */}
                <div className="flex gap-3 items-center pb-3 border-b border-b-gray-800 dark:border-b-white mb-2">
                    <button className="md:hidden text-2xl font-bold" onClick={() => setOpen(false)}>
                        ✕
                    </button>
                    {/* <button
                        onClick={() => setOpen(false)}
                        className="text-2xl font-bold"
                    >
                        ✕
                    </button> */}
                    <Link to="/" className="font-bold text-2xl">
                        EduCircle
                    </Link>
                </div>

                {/* <span className="divider"></span> */}

                {/* Navigation */}
                <ul className="space-y-3 pt-2">
                    <li>
                        <NavLink to="/dashboard" end className={navItemClass} onClick={() => setOpen(false)}>
                            <FaHome />
                            <span>Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/createAssignment"
                            className={navItemClass}
                            onClick={() => setOpen(false)}
                        >
                            <FaPlusCircle />
                            <span>Create Assignments</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/mySubmissions"
                            className={navItemClass}
                            onClick={() => setOpen(false)}
                        >
                            <FaClipboardList />
                            <span>My Submissions</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/bookmarkedAssignments"
                            className={navItemClass}
                            onClick={() => setOpen(false)}
                        >
                            <FaBookmark />
                            <span>Bookmarked</span>
                        </NavLink>
                    </li>
                </ul>
            </aside>

            {/* ===== Main Content ===== */}
            <main className="flex-1 pt-14 md:pt-0 ">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
