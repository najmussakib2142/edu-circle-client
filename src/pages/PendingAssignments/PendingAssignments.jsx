import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Loading from '../shared/Loading';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const PendingAssignments = () => {
    const { user, loading } = useAuth()
    const [submissions, setSubmissions] = useState([]);
    const [selected, setSelected] = useState(null);
    const [mark, setMark] = useState('');
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState('');
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            if (!user) return;

            setLoadingState(true);

            try {
                const token = await user.getIdToken();
                const res = await axios.get(`https://edu-circle-server-seven.vercel.app/submissions?status=pending`, {
                    headers: { authorization: `Bearer ${token}` },
                });
                setSubmissions(res.data || []);
            } catch (err) {
                toast.error(err.message || 'Error loading submissions');
            } finally {
                setLoadingState(false); 
            }
        };

        fetchSubmissions();
    }, [user]);

    if (loading || !user || loadingState) {
        return <Loading></Loading>
    }


    // Submit mark & feedback
    const handleSubmit = async () => {
        if (!mark || !feedback) return toast.warning('Both fields are required');;

        if (selected.studentEmail === user.email) {
            setError("You can't mark your own submission.");
            return;
        }

        try {
            const res = await axios.patch(`https://edu-circle-server-seven.vercel.app/submissions/${selected._id}`, {
                obtainedMarks: parseInt(mark),
                feedback,
                markedBy: user.email,
            });

            if (res.data.modifiedCount > 0) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Marked successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setSubmissions((prev) => prev.filter((s) => s._id !== selected._id));
                setSelected(null);
                setMark('');
                setFeedback('');
                setError('');
            } else {
                toast.error('Something went wrong while updating.');
            }
        } catch (err) {
            toast.error(err.message, 'Error submitting mark:');
            toast.error('Failed to mark the assignment.');
        }
    };


    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 pt-6 text-gray-900 dark:text-white text-center">📝 Pending Assignments</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-300 dark:border-gray-700">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            <th>Title</th>
                            <th>Status</th>
                            <th>Full Marks</th>
                            <th>Submitted By</th>
                            <th>Submitted</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((item, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                <td>{item.assignmentTitle}</td>
                                <td>
                                    <span className="badge badge-warning">{item.status}</span>
                                </td>
                                <td>{item.marks}</td>
                                <td>{item.studentEmail}</td>
                                <td>{new Date(item.submittedAt).toLocaleDateString()}</td>
                                <td>
                                    {item.studentEmail === user.email ? (
                                        <span className="text-gray-400 italic text-sm">Can't mark own</span>
                                    ) : (
                                        <button
                                            onClick={() => setSelected(item)}
                                            className="btn border border-none btn-sm bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Give Mark
                                        </button>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {submissions.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">No pending submissions available.</p>
                )}
            </div>

            {/* Modal */}
            {selected && (
                <div className="fixed   inset-0 backdrop-blur-lg transition-all bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white border border-primary bg-gradient-to-br from-indigo-100 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100  dark:bg-gray-800 p-7 rounded-md shadow-lg max-w-md w-full relative">
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold mb-2 dark:text-white">{selected.assignmentTitle}</h3>
                        <p className="text-sm dark:text-gray-300">
                            <strong>Submitted by:</strong> {selected.studentEmail}
                        </p>
                        <p className="text-sm dark:text-gray-300">
                            <strong>Docs Link:</strong>{' '}
                            <a href={selected.submissionLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                Open Submission
                            </a>
                        </p>
                        <p className="text-sm dark:text-gray-300">
                            <strong>Note:</strong>{' '}
                            <a href={selected.note} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                View Note
                            </a>
                        </p>


                        <div className="mt-4">
                            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                            <label className="block font-medium mb-1 dark:text-white">Marks:</label>
                            <input
                                type="number"
                                className="w-full border p-2 mb-2 rounded dark:bg-gray-700 dark:text-white"
                                value={mark}
                                onChange={(e) => setMark(e.target.value)}
                            />

                            <label className="block font-medium mb-1 dark:text-white">Feedback:</label>
                            <textarea
                                className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
                                rows="3"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            ></textarea>

                            <button
                                onClick={handleSubmit}
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                            >
                                Submit Mark
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingAssignments;
