import React, { use, useState } from 'react';
import AssignmentCard from '../shared/AssignmentCard';
import { motion } from "framer-motion";

const Assignments = ({ assignmentsPromise }) => {
    const assignments = use(assignmentsPromise);
    const [showAll, setShowAll] = useState(false); // toggle flag

    const visibleAssignments = showAll
        ? assignments
        : assignments.slice(0, 6);

    const handleToggle = () => {
        setShowAll(prev => !prev);
    };

    return (
        <div className="px-4 py-7 md:px-10">
            <h2 className="text-4xl text-center font-bold mb-8 text-primary">🔥 Hot Assignments</h2>

            <motion.div
                className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
            >
                {visibleAssignments.map((assignment) => (
                    <AssignmentCard
                        key={assignment._id}
                        assignment={assignment}
                    />
                ))}
            </motion.div>

            {assignments.length > 6 && (
                <div className="text-center mt-8">
                    <button
                        onClick={handleToggle}
                        className="btn p-5 border border-primary text-primary bg-transparent hover:bg-primary hover:text-white dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Assignments;
