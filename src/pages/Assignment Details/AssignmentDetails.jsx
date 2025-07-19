import { Link, useLoaderData } from 'react-router';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { use, useState } from 'react';
import { AuthContext } from '../../provider/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAccessToken from '../../api/useAccessToken';
import { IoMdArrowBack } from "react-icons/io";


const AssignmentDetails = () => {

    const assignment = useLoaderData()
    // console.log(assignment);
    const [showModal, setShowModal] = useState(false);
    const { user } = use(AuthContext)
    const { accessToken } = useAccessToken()

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

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto my-12 p-4 bg-base-100 rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
        >
            <div className="mb-6">
                <img src={thumbnail} alt={title} className="rounded-lg w-full h-64 object-cover" />
            </div>
            <div className='md:px-5 px-3 pb-4'>

                <h2 className="text-3xl font-bold text-primary mb-3">{title}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>

                <div className="flex flex-wrap gap-3 text-sm mb-6">
                    <span className="badge text-lg p-3 font-medium badge-secondary">Marks: {marks}</span>
                    <span className="badge text-lg p-3 font-medium badge-accent">Difficulty: {difficulty}</span>
                    <span className="badge text-lg p-3 font-medium badge-info">Due: {new Date(dueDate).toLocaleDateString()}</span>
                </div>

                {/* <Link to={`/AssignmentSubmission/${_id}`}> */}
                <div className='flex flex-col md:flex-row gap-3 justify-between'>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setShowModal(true)}
                        className="btn btn-active"
                    >
                        <FaExternalLinkAlt className="mr-2" /> Take Assignment
                    </motion.button>
                    <Link to={'/'} className='btn btn-active'>
                        <IoMdArrowBack />
                        Back To Home
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