import React, { useEffect, useState } from 'react';
// import { useLoaderData } from 'react-router';
import AssignmentCard from '../shared/AssignmentCard';
import { motion } from "framer-motion";
import axios from 'axios';


const AllAssignments = () => {
    // const assignments = useLoaderData()

    const [assignments, setAssignments] = useState([]);
    const [difficulty, setDifficulty] = useState('');
    const [searchText, setSearchText] = useState('');

    const fetchAssignments = async () => {
        const params = {};
        if (difficulty) params.difficulty = difficulty;
        if (searchText) params.search = searchText;

        try {
            const res = await axios.get('http://localhost:5000/assignments', { params });
            setAssignments(res.data);
        } catch (error) {
            console.error('Failed to fetch assignments:', error);
        }
    }

    useEffect(() => {
        fetchAssignments();
    }, [difficulty, searchText]);

    return (
        <div className="px-4 py-12 md:px-10">
            <h2 className="text-4xl text-center font-bold mb-8 text-primary">🔥 Hot Assignments</h2>

            {/* Filter + Search */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
                {/* Difficulty Filter */}
                <select
                    className="select select-bordered w-48"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                {/* Search */}
                <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Search by title..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            {/* Assignment Cards */}
            <motion.div
                className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
            >
                {assignments.length > 0 ? (
                    assignments.map((assignment) => (
                        <AssignmentCard
                            key={assignment._id}
                            assignment={assignment}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No assignments found.</p>
                )}
            </motion.div>
        </div>
    );
};

export default AllAssignments;