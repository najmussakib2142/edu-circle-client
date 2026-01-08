import { Link, useLoaderData, useNavigate } from 'react-router';
import { FaArrowLeft, FaBookmark, FaCalendarAlt, FaCheckCircle, FaExternalLinkAlt, FaInfoCircle, FaRegBookmark, FaTimes, FaTrophy, FaUserEdit } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAccessToken from '../../api/useAccessToken';
import { IoMdArrowBack } from "react-icons/io";
import Loading from '../shared/Loading';


const AssignmentDetails = () => {

    const assignment = useLoaderData()
    // console.log(assignment);
    const [showModal, setShowModal] = useState(false);
    const { user, loading } = useContext(AuthContext)
    const { accessToken } = useAccessToken()
    const [bookmarked, setBookmarked] = useState(false);
    const navigate = useNavigate();

    const {
        title,
        description,
        marks,
        difficulty,
        thumbnail,
        dueDate,
        _id,
        creatorName,
        creatorEmail,
    } = assignment;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Login required',
                text: 'Please login to submit the assignment'
            });
            return navigate("/signIn");;
        }

        const submission = {
            assignmentId: assignment._id,
            assignmentTitle: assignment.title,
            marks: assignment.marks,
            studentEmail: user.email,
            submissionLink: e.target.link.value,
            note: e.target.note.value,
            status: 'pending',
            submittedAt: new Date(),
        }

        axios.post('https://edu-circle-server-seven.vercel.app/submissions', submission, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        // position: "top-end",
                        icon: "success",
                        title: "Submitted!",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
                e.target.reset()
                setShowModal(false);
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: 'Please try again later.',
                    error
                });
            })

    }



    useEffect(() => {
        if (user) {
            axios.get(`https://edu-circle-server-seven.vercel.app/bookmarks`, { headers: { Authorization: `Bearer ${user.accessToken}` } })
                .then(res => {
                    const exists = res.data.some(b => b.assignmentId === assignment._id);
                    setBookmarked(exists);
                });
        }
    }, [user, assignment._id]);

    const toggleBookmark = () => {
        if (!user) return alert('Login to bookmark');

        if (bookmarked) {
            axios.delete(`https://edu-circle-server-seven.vercel.app/bookmarks/${assignment._id}`, { headers: { Authorization: `Bearer ${user.accessToken}` } })
                .then(() => setBookmarked(false));
        } else {
            axios.post(`https://edu-circle-server-seven.vercel.app/bookmarks`, { assignmentId: assignment._id }, { headers: { Authorization: `Bearer ${user.accessToken}` } })
                .then(() => setBookmarked(true));
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white dark:bg-[#020617] pt-6 pb-10 lg:py-10 px-4  "
        >
            <div className='max-w-5xl mx-auto'>
                <div className="flex justify-between items-center mb-8">
                    <Link to="/assignments" className="btn btn-ghost hover:bg-base-200 gap-2 normal-case">
                        <FaArrowLeft className="text-xs" /> Back to Assignments
                    </Link>
                    {/* <Link to={`/dashboard/update/${assignment._id}`} className="btn btn-primary btn-md gap-2 shadow-lg">
                        <FaEdit /> Edit Assignment
                    </Link> */}
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                    <div className="lg:col-span-7 space-y-6">
                        <div className="overflow-hidden rounded-3xl border border-base-300 shadow-sm bg-base-100">
                            <img
                                src={thumbnail || "https://via.placeholder.com/800x450"}
                                alt={title}
                                className="w-full h-87.5 object-cover"
                            />
                            <div className="p-6 lg:p-8">
                                <div className="flex justify-between gap-2 mb-4">
                                    <span className="badge badge-secondary badge-outline px-4 py-3 font-semibold capitalize">
                                        {difficulty}
                                    </span>
                                    {/* <span className="badge badge-secondary badge-outline px-4 py-3 font-semibold capitalize">
                                        {user.email}
                                    </span> */}
                                    {/* <span className="badge badge-ghost px-4 py-3 font-medium">
                                            Assignment ID: {assignment._id.slice(-6)}
                                        </span> */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={toggleBookmark}
                                        className={`text-2xl transition-colors duration-300 ${bookmarked ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
                                            }`}
                                        title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
                                    >
                                        {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                                    </motion.button>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-black mb-6 leading-tight text-base-content">
                                    {title}
                                </h1>
                                <p className="text-md md:text-lg leading-relaxed text-base-content/70 whitespace-pre-wrap">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Right Column: Metadata & Details (L: 5 units) */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Quick Stats Card */}
                        <div className="card bg-base-200/50 border border-base-300 rounded-3xl p-6">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <FaInfoCircle className="text-black dark:text-white" /> Submission Details
                            </h2>

                            <div className="space-y-4">
                                {/* Marks */}
                                <div className="flex items-center justify-between p-4 bg-base-100 rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg"><FaTrophy /></div>
                                        <span className="font-medium opacity-70">Total Marks</span>
                                    </div>
                                    <span className="text-2xl font-bold text-indigo-600 dark:text-white">{marks}</span>
                                </div>

                                {/* Date */}
                                <div className="flex items-center justify-between p-4 bg-base-100 rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><FaCalendarAlt /></div>
                                        <span className="font-medium opacity-70">Deadline</span>
                                    </div>
                                    <span className="font-bold">{new Date(dueDate).toLocaleDateString()}</span>
                                </div>

                                {/* Creator */}
                                <div className="flex items-center justify-between p-4 bg-base-100 rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 text-purple-700 rounded-lg"><FaUserEdit /></div>
                                        <span className="font-medium opacity-70">Created By</span>
                                    </div>
                                    <span className="font-bold">{creatorName || "Instructor"}</span>
                                </div>

                            </div>

                        </div>


                        {user?.email === creatorEmail ? (
                            <div className="alert bg-info/10 border-info/20 rounded-2xl">
                                <div className="flex flex-col items-start gap-1">
                                    <span className="font-bold text-info">Creator View</span>
                                    <p className="text-xs opacity-70">You are viewing this assignment as its owner. Students see a "Submit Assignment" button here.</p>
                                </div>
                            </div>

                        ) : (

                            <div className='max-w-full'>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)" }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => {
                                        if (!user) return navigate("/signIn", { state: { from: location.pathname } });
                                        setShowModal(true);
                                    }}
                                    className="group w-full relative flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all"
                                >
                                    <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform" />
                                    Submit Your Assignment
                                </motion.button>
                            </div>
                        )}
                    </div>

                    {/* Modal Section */}

                </div>
            </div>

            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white dark:bg-gray-800 w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl border border-white/20"
                        >
                            <div className="p-6 md:p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-blue-500">
                                        Submit Assignment
                                    </h3>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                    >
                                        <FaTimes className="text-gray-500" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Google Docs Link</label>
                                        <input
                                            type="url"
                                            name='link'
                                            placeholder="https://docs.google.com/..."
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Quick Note</label>
                                        <textarea
                                            name='note'
                                            rows="3"
                                            placeholder="Anything you'd like the teacher to know?"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="flex-1 px-6 py-3 font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={!user}
                                            className="flex-2 bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
                                        >
                                            Send Submission
                                        </motion.button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};


export default AssignmentDetails;