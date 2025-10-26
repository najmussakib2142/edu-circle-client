import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAuth } from "firebase/auth";
import { FaEdit, FaTrash, FaPlus, FaBookOpen } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../shared/Loading";

const Dashboard = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    const auth = getAuth();
    const user = auth.currentUser;

    const token = localStorage.getItem("access-token"); // assuming you store Firebase token here

    // 🔹 Fetch user-created assignments
    useEffect(() => {
        if (!user?.email) return;
        fetch(
            `http://localhost:5000/assignments?email=${user.email}`, // use your backend base URL
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                const created = data.filter(
                    (a) => a.creatorEmail === user.email
                );
                setAssignments(created);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [user]);

    // 🔹 Fetch global stats for header
    useEffect(() => {
        fetch("http://localhost:5000/stats")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch(console.error);
    }, []);

    // 🔹 Delete Assignment
    const handleDelete = (id) => {
        // if (!confirm("Are you sure you want to delete this assignment?")) return;

        // fetch(
        //     `http://localhost:5000/assignments/${id}?email=${user.email}`,
        //     {
        //         method: "DELETE",
        //         headers: { Authorization: `Bearer ${token}` },
        //     }
        // )
        //     .then((res) => res.json())
        //     .then(() => {
        //         setAssignments((prev) => prev.filter((a) => a._id !== id));
        //     });
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the assignment!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:5000/assignments/${id}?email=${user.email}`)
                    // .then((res) => {
                    //   if (res.data.deletedCount > 0) {
                    //     Swal.fire('Deleted!', 'Your assignment has been deleted.', 'success');
                    //   }
                    // })
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Your assignment has been deleted.', 'success').then(() => {
                                // setAssignments(prev => prev.filter(item => item._id !== id));
                            });
                        }
                    })
                    .catch((err) => {
                        if (err.response?.status === 403) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Permission Denied',
                                text: 'You can only delete your own assignments.',
                            });
                        } else {
                            Swal.fire('Error', 'Something went wrong.', 'error');
                        }
                    });
            }
        });
    };

    if (loading)
        return (
            <Loading></Loading>
        );

    return (
        <div className="min-h-screen p-6 ">
            {/* ✅ Header Section */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-900 text-white rounded-2xl p-6 mb-6">
                {/* Personal Info */}
                <div className="flex items-center gap-4">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/80"}
                        alt={user?.displayName || "User"}
                        className="w-20 h-20 rounded-full border-2 border-white dark:border-gray-300 object-cover"
                    />
                    <div>
                        {/* <h1 className="text-2xl font-bold">{user?.displayName || "User"}</h1> */}
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome, {user?.displayName || "User"} 👋
                        </h1>
                        <p className="text-white/90 dark:text-white/80">{user?.email}</p>
                        <p className="text-sm text-white/70 dark:text-white/60 mt-1">Creator / Student</p>
                    </div>
                </div>

                <p className="mt-4 text-white/90 dark:text-white/80">
                    Overview of your assignments and platform activity.
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {[
                        { title: "My Assignments", value: assignments.length },
                        { title: "Students", value: stats.students || 0 },
                        { title: "Instructors", value: stats.instructors || 0 },
                        { title: "Assignments Total", value: stats.courses || 0 },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-xl text-center shadow-md transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
                        >
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                            <p className="text-sm mt-1">{stat.title}</p>
                        </div>
                    ))}
                </div>
            </div>



            {/* ✅ Assignments List */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">My Created Assignments</h2>
                <Link
                    to="/dashboard/createAssignment"
                    className="btn btn-primary btn-sm flex items-center gap-2"
                >
                    <FaPlus /> New Assignment
                </Link>
            </div>

            {assignments.length === 0 ? (
                <p className="text-gray-500 text-center py-20">
                    You haven’t created any assignments yet.
                </p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assignments.map((a) => (
                        <div
                            key={a._id}
                            className="card bg-base-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
                        >
                            {/* Thumbnail */}
                            <figure className="relative">
                                <img
                                    src={a.thumbnail || "https://via.placeholder.com/400x250"}
                                    alt={a.title}
                                    className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                                />

                                {/* Clickable transparent overlay */}
                                <Link
                                    to={`/dashboard/creator-assignments/${a._id}`}
                                    className="absolute inset-0 z-10"
                                    title="View Assignment"
                                ></Link>

                                <div className="absolute top-2 right-2 flex gap-2 z-20">
                                    <span className="badge badge-info text-xs capitalize">{a.difficulty}</span>
                                    <span className="badge badge-primary text-xs">{a.marks} Marks</span>
                                </div>
                            </figure>


                            {/* Card Body */}
                            <div className="card-body p-4">
                                <h3 className="font-semibold text-lg line-clamp-1">{a.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{a.description}</p>

                                {/* Footer */}
                                <div className="mt-3 flex justify-between items-center text-xs">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        Due: {new Date(a.dueDate).toLocaleDateString()}
                                    </p>

                                    <div className="flex gap-2">
                                        <Link
                                            to={`/dashboard/update/${a._id}`}
                                            className="btn btn-sm btn-circle btn-outline border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-info hover:border-info tooltip tooltip-top before:bg-gray-800 before:text-gray-100 dark:before:bg-gray-100 dark:before:text-gray-800"
                                            data-tip="Edit Assignment"
                                        >
                                            <FaEdit />
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(a._id)}
                                            className="btn btn-sm btn-circle btn-outline border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-error hover:border-error tooltip tooltip-top before:bg-gray-800 before:text-gray-100 dark:before:bg-gray-100 dark:before:text-gray-800"
                                            data-tip="Delete Assignment"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
};

export default Dashboard;
