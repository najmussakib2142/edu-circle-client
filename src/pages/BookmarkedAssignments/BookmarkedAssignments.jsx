import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import useAuth from '../../hooks/useAuth';
import AssignmentCard from '../shared/AssignmentCard';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import Loading from '../shared/Loading';
// import Loading from '../shared/Loading';

const BookmarkedAssignments = () => {
    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchBookmarks = async () => {
            try {
                // 1. Get bookmarked assignment IDs
                const res = await axios.get('https://edu-circle-server-seven.vercel.app/bookmarks', {
                    headers: { Authorization: `Bearer ${user.accessToken}` }
                });

                const bookmarkedAssignments = res.data; // array of { assignmentId, ... }

                if (bookmarkedAssignments.length === 0) {
                    setAssignments([]);
                    setLoading(false);
                    return;
                }

                // 2. Fetch assignment details for each bookmarked ID
                const assignmentPromises = bookmarkedAssignments.map(b =>
                    axios.get(`https://edu-circle-server-seven.vercel.app/assignments/${b.assignmentId}`)
                        .then(res => res.data)
                );

                const results = await Promise.all(assignmentPromises);
                setAssignments(results);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center">
                <h2 className="text-2xl font-bold">Please login to view your bookmarked assignments.</h2>
            </div>
        );
    }

    if (loading) return <Loading />;

    if (assignments.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center">
                <h2 className="text-2xl font-bold">You have no bookmarked assignments yet.</h2>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-10 px-6">
            <h2 className="text-3xl font-bold mb-2 text-center text-primary dark:text-primary/80">
                My Bookmarked Assignments
            </h2>
            <div className="h-1 w-24 bg-primary dark:bg-primary/70 mx-auto mb-6 rounded-full"></div>
            
            <motion.div
                className="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
            >
                {assignments.map(a => (
                    <AssignmentCard key={a._id} assignment={a} />
                ))}
            </motion.div>
        </div>
    );
};

export default BookmarkedAssignments;
