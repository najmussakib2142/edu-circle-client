import { Link, useLoaderData } from 'react-router';
import { FaBookmark, FaExternalLinkAlt, FaRegBookmark } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { use, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAccessToken from '../../api/useAccessToken';
import { IoMdArrowBack } from "react-icons/io";


const AssignmentDetails = () => {

    const assignment = useLoaderData()
    // console.log(assignment);
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext)
    const { accessToken } = useAccessToken()
    const [bookmarked, setBookmarked] = useState(false);

    const {
        title,
        description,
        marks,
        difficulty,
        thumbnail,
        dueDate,
        _id
    } = assignment;

    const handleSubmit = (e) => {
        e.preventDefault();

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
                        title: "Your assignment has been submitted",
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



    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl  mx-auto py-8 my-12  "
        >
            <div className="mb-6">
                <img src={thumbnail} alt={title} className="rounded-lg w-full h-64 object-cover" />
            </div>
            <div className='md:px-5 px-3 pb-4'>
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
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

                <p className="text-gray-700  dark:text-gray-300 mb-4">{description}</p>

                <div className="flex flex-wrap py-1 gap-3 text-sm mb-6">
                    <span className="badge text-lg p-3 font-medium badge-secondary">Marks: {marks}</span>
                    <span className="badge text-lg p-3 text-white font-medium badge-accent">Difficulty: {difficulty}</span>
                    <span className="badge text-lg p-3 text-white font-medium badge-info">Due: {new Date(dueDate).toLocaleDateString()}</span>
                </div>

                {/* <Link to={`/AssignmentSubmission/${_id}`}> */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-6">
                    {/* Take Assignment Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setShowModal(true)}
                        className="flex items-center justify-center gap-2 px-5 py-3 
               bg-indigo-600 text-white font-semibold rounded-lg 
               shadow-md hover:bg-indigo-700 transition duration-200"
                    >
                        <FaExternalLinkAlt className="text-sm" />
                        Take Assignment
                    </motion.button>

                    {/* Back to Home Button */}
                    <Link
                        to="/"
                        className="flex items-center justify-center  gap-2 px-5 py-3 
                text-gray-700 dark:text-gray-300 
               font-semibold rounded-lg shadow-md 
               hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-400 transition duration-200"
                    >
                        <IoMdArrowBack className="text-lg" />
                        Back to Home
                    </Link>
                </div>

            </div>

            {showModal && (
                <div className="fixed inset-0 backdrop-blur-lg transition-all bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white bg-gradient-to-br from-indigo-100 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Submit Assignment</h3>

                        <form onSubmit={handleSubmit}>
                            <label className="block text-sm font-medium mb-1">Google Docs Link</label>
                            <input type="url" name='link' placeholder="https://docs.google.com/..." required className="input input-bordered w-full mb-4" />

                            <label className="block text-sm font-medium mb-1">Quick Note</label>
                            <textarea name='note' placeholder="Add any note..." className="textarea textarea-bordered w-full mb-4"></textarea>

                            <div className="flex justify-between">
                                <button type="button" onClick={() => setShowModal(false)} className="btn">Cancel</button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    type="submit" className="btn btn-primary">Submit</motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </motion.div>
    );
};

export default AssignmentDetails;