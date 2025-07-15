import { useLoaderData } from 'react-router';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';


const AssignmentDetails = () => {

    const assignment = useLoaderData()
    console.log(assignment);
    const [showModal, setShowModal] = useState(false);

    const {
        title,
        description,
        marks,
        difficulty,
        thumbnail,
        dueDate
    } = assignment;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto my-12 p-6 bg-base-100 rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
        >
            <div className="mb-6">
                <img src={thumbnail} alt={title} className="rounded-lg w-full h-64 object-cover" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-3">{title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>

            <div className="flex flex-wrap gap-3 text-sm mb-6">
                <span className="badge text-lg p-3 font-medium badge-secondary">Marks: {marks}</span>
                <span className="badge text-lg p-3 font-medium badge-accent">Difficulty: {difficulty}</span>
                <span className="badge text-lg p-3 font-medium badge-info">Due: {new Date(dueDate).toLocaleDateString()}</span>
            </div>

            <button
                onClick={() => setShowModal(true)}
                className="btn btn-active"
            >
                <FaExternalLinkAlt className="mr-2" /> Take Assignment
            </button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Submit Assignment</h3>

                        <form>
                            <label className="block text-sm font-medium mb-1">Google Docs Link</label>
                            <input type="url" placeholder="https://docs.google.com/..." required className="input input-bordered w-full mb-4" />

                            <label className="block text-sm font-medium mb-1">Quick Note</label>
                            <textarea placeholder="Add any note..." className="textarea textarea-bordered w-full mb-4"></textarea>

                            <div className="flex justify-between">
                                <button type="button" onClick={() => setShowModal(false)} className="btn">Cancel</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default AssignmentDetails;