import React, { useEffect, useState } from 'react';
// import { useLoaderData } from 'react-router';
import AssignmentCard from '../shared/AssignmentCard';
import { motion } from "framer-motion";
import axios from 'axios';
import { IoSearch } from "react-icons/io5";
import { toast } from 'react-toastify';
import Loading from '../shared/Loading';
// import { Helmet } from 'react-helmet-async';



const AllAssignments = () => {
    // const assignments = useLoaderData()

    const [assignments, setAssignments] = useState([]);
    const [difficulty, setDifficulty] = useState('');
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    const [debouncedSearch, setDebouncedSearch] = useState(searchText);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 1000)
        return () => {
            clearTimeout(handler);
        }
    }, [searchText]);

    const fetchAssignments = async () => {
        setLoading(true);

        // const params = {};
        // if (difficulty) params.difficulty = difficulty;
        // if (debouncedSearch) params.search = debouncedSearch;

        const params = {
            page: currentPage,
            limit: limit,
            difficulty,
            search: debouncedSearch
        };

        try {
            const res = await axios.get('https://edu-circle-server-seven.vercel.app/assignments', { params });
            setAssignments(res.data.data || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (error) {
            toast.error(error.message, "Failed to fetch assignments");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAssignments();
    }, [difficulty, debouncedSearch, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [difficulty, debouncedSearch]);

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div className="px-3 max-w-6xl mx-auto py-12 md:px-9">
            {/* <Helmet>
                <title>EduCircle || Assignments</title>
            </Helmet> */}

            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight">
                    Featured Assignments
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                    Explore and filter through the most engaging assignments from our community.
                </p>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-6 mb-10">

                {/* Search */}
                <div className="col-span-8 relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>

                    <input
                        type="text"
                        className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-sm
                 focus:outline-none focus:ring-2 focus:ring-black/40
                 bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Search by title..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                {/* Filter */}
                <div className="col-span-4 flex items-center gap-2">
                    <label className="hidden sm:block text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Filter:
                    </label>

                    <select
                        className="w-full py-3 px-4 border border-gray-300 rounded-sm
                 focus:outline-none focus:ring-2 focus:ring-black/40
                 bg-white text-gray-900"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="">All Levels</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

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
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 border rounded-md transition ${currentPage === index + 1
                                    ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllAssignments;