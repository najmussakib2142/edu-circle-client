import { FaHome, FaPlusCircle, FaClipboardList, FaBookmark } from "react-icons/fa";
import { Link, NavLink, Outlet, useLocation } from "react-router";

const DashboardLayout = () => {
    const location = useLocation();


    return (
        <div className="flex min-h-screen  ">
            <aside className="w-64 bg-base-200 p-6 hidden md:block">
                {/* <h2 className="text-2xl font-bold">eduCircle</h2> */}
                {/* <Link to="/" className="text-2xl pt-2 font-bold inline-block">
                    eduCircle
                </Link> */}
                <Link to="/" className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">EduCircle</Link>
                <span className="divider"></span>
                <ul className="space-y-3">
                    <li className="pt-1">
                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-2   rounded-md ${location.pathname === "/dashboard" || isActive
                                    ? "font-semibold underline text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary hover:underline "
                                    : "text-[#101828] py-2 dark:text-gray-100 hover:text-primary dark:hover:text-secondary hover:underline"
                                }`
                            }
                        >
                            <FaHome />
                            <span>Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/createAssignment"
                            className="flex  items-center gap-2 text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary hover:underline"
                        >
                            <FaPlusCircle />
                            <span>Create Assignments</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/mySubmissions"
                            className="flex py-2 items-center gap-2 text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary hover:underline"
                        >
                            <FaClipboardList />
                            <span>My Submissions</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/bookmarkedAssignments"
                            className="flex items-center gap-2 text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary hover:underline"
                        >
                            <FaBookmark />
                            <span>My Bookmarked Assignments</span>
                        </NavLink>
                    </li>


                </ul>
            </aside>
            <main className="flex-1  ">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
