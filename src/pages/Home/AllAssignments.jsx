import React from 'react';
import { useLoaderData } from 'react-router';
import AssignmentCard from '../shared/AssignmentCard';
import { motion } from "framer-motion";


const AllAssignments = () => {
    const assignments = useLoaderData()
    return (
        <div>
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
                    {assignments.map((assignment) => (
                        <AssignmentCard
                            key={assignment._id}
                            assignment={assignment}
                        />
                    ))}
                </motion.div>
            </div>

        </div>
    );
};

export default AllAssignments;