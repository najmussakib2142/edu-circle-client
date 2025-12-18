import React, { use, useState, useMemo } from 'react';
import AssignmentCard from '../shared/AssignmentCard';
import { motion } from "framer-motion";

// Fisher-Yates shuffle
const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const Assignments = ({ assignmentsPromise }) => {
    const assignments = use(assignmentsPromise);
    const [showAll, setShowAll] = useState(false);

    // Shuffle only once per render
    const shuffledAssignments = useMemo(() => shuffleArray(assignments), [assignments]);

    const visibleAssignments = showAll
        ? shuffledAssignments.slice(0, 9)
        : shuffledAssignments.slice(0, 6);

    const handleToggle = () => {
        setShowAll(prev => !prev);
    };

    return (
        <div className="max-w-6xl mx-auto py-7 md:py-20 px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral dark:text-gray-100  text-center  mb-3 ">Top Picks for You</h2>
            <p className='text-xl text-center text-gray-600 font-medium mb-10 dark:text-gray-500'>
                Challenge your skills with our top picks.
            </p>

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
                        className="px-6 py-2.5 bg-gray-700 dark:bg-gray-500 hover:bg-gray-800 dark:hover:bg-gray-700 text-white cursor-pointer rounded-lg font-semibold transition"
                    >
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Assignments;
