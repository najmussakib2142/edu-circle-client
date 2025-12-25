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

    // const token = localStorage.getItem("access-token"); // assuming you store Firebase token here

    // 🔹 Fetch user-created assignments
    useEffect(() => {
        const fetchMyAssignments = async () => {
            // 1. Wait until user is actually available
            if (!user) return;

            setLoading(true);
            try {
                // 2. Get a fresh token directly from Firebase (No LocalStorage needed!)
                const token = await user.getIdToken();

                // 3. Use the dedicated "my-assignments" endpoint
                const res = await axios.get(`http://localhost:5000/my-assignments?email=${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                // 4. Set the data (ensure it's an array)
                setAssignments(res.data || []);
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                // Even if it fails, stop the loading spinner
            } finally {
                setLoading(false);
            }
        };

        fetchMyAssignments();
    }, [user]); // Only depend on the user object 

    // 🔹 Fetch global stats for header
    useEffect(() => {
        fetch("https://edu-circle-server-seven.vercel.app/stats")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch(console.error);
    }, []);

    // 🔹 Delete Assignment
    const handleDelete = (id) => {
        // if (!confirm("Are you sure you want to delete this assignment?")) return;

        // fetch(
        //     `https://edu-circle-server-seven.vercel.app/assignments/${id}?email=${user.email}`,
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
                    .delete(`https://edu-circle-server-seven.vercel.app/assignments/${id}?email=${user.email}`)
                    // .then((res) => {
                    //   if (res.data.deletedCount > 0) {
                    //     Swal.fire('Deleted!', 'Your assignment has been deleted.', 'success');
                    //   }
                    // })
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Your assignment has been deleted.', 'success').then(() => {
                                setAssignments(prev => prev.filter(item => item._id !== id));
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
                            Welcome, {user?.displayName || "User"}
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
                <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-sm border border-base-300">
                    <table className="table table-zebra w-full">
                        {/* Head */}
                        <thead className="bg-base-100 border ">
                            <tr >
                                <th>Info</th>
                                <th>Difficulty</th>
                                <th>Marks</th>
                                <th>Due Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((a) => (
                                <tr key={a._id} className="hover">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={a.thumbnail} alt={a.title} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold line-clamp-1">{a.title}</div>
                                                <div className="text-sm opacity-50">ID: {a._id.slice(-6)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge badge-sm capitalize ${a.difficulty === 'hard' ? 'badge-error' :
                                                a.difficulty === 'medium' ? 'badge-warning' : 'badge-success'
                                            }`}>
                                            {a.difficulty}
                                        </span>
                                    </td>
                                    <td className="font-mono font-semibold">{a.marks}</td>
                                    <td>{new Date(a.dueDate).toLocaleDateString()}</td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            <Link
                                                to={`/dashboard/update/${a._id}`}
                                                className="btn btn-ghost btn-xs text-info"
                                                title="Edit"
                                            >
                                                <FaEdit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(a._id)}
                                                className="btn btn-ghost btn-xs text-error"
                                                title="Delete"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                            <Link
                                                to={`/dashboard/creator-assignments/${a._id}`}
                                                className="btn btn-ghost btn-xs dark:text-primary-content"
                                                title="View Details"
                                            >
                                                <FaBookOpen size={16} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
