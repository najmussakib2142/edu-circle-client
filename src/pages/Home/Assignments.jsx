import React, { use, useState } from 'react';
import AssignmentCard from '../shared/AssignmentCard';
import { motion } from "framer-motion";

const Assignments = ({ assignmentsPromise }) => {
    const assignments = use(assignmentsPromise);
    const [showAll, setShowAll] = useState(false);

    const visibleAssignments = showAll
        ? assignments
        : assignments.slice(0, 6);

    const handleToggle = () => {
        setShowAll(prev => !prev);
    };

    return (
        <div className=" max-w-5xl mx-auto py-7 px-4 md:px-6">
            <h2 className="text-4xl text-center font-bold mb-3 text-primary">Top Picks for You</h2>
            <p className='text-xl text-center text-gray-600 font-medium mb-10 dark:text-gray-500'>Challenge your skills with our top picks.</p>


            <motion.div
                className="grid gap-5 px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
                        className="px-6 py-2.5 bg-indigo-500 dark:bg-indigo-500 text-white rounded-lg font-semibold transition"
                    >
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Assignments;
