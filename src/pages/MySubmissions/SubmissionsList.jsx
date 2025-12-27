import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Loading from '../shared/Loading';

const SubmissionsList = ({ mySubmissionsPromise }) => {

    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        mySubmissionsPromise
            .then(data => {
                setSubmissions(data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [mySubmissionsPromise]);

    if (loading) return <Loading />;    

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">📚 My Submissions</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-300 dark:border-gray-700">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            <th>Title</th>
                            <th>Status</th>
                            <th>Full Marks</th>
                            <th>Obtained</th>
                            <th>Feedback</th>
                            <th>Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                <td>{submission.assignmentTitle}</td>
                                <td>
                                    <span className={`badge ${submission.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                        {submission.status}
                                    </span>
                                </td>
                                <td>{submission.marks}</td>
                                <td>{submission.obtainedMarks || '--'}</td>
                                <td className="text-sm italic">{submission.feedback || '—'}</td>
                                <td>{new Date(submission.submittedAt).toLocaleDateString()}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {submissions.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">You haven't submitted any assignments yet.</p>
                )}
            </div>
        </div>
    );
};

export default SubmissionsList;
