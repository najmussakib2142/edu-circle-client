import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaClock, FaUser, FaLayerGroup } from "react-icons/fa";

const CreatorAssignmentDetail = () => {
    const { id } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/assignments/${id}`)
            .then(res => res.json())
            .then(data => {
                setAssignment(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);


    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!assignment) return <p className="text-center mt-10">Assignment not found.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg">

            <img
                src={assignment.thumbnail}
                alt={assignment.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
            />

            <h1 className="text-2xl font-bold mb-2">{assignment.title}</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{assignment.description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                    <FaLayerGroup /> Difficulty: {assignment.difficulty}
                </span>
                <span className="flex items-center gap-2">
                    <FaClock /> Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                    <FaUser /> Created by: {assignment.creatorName}
                </span>
            </div>

            <div className="mt-6 mb-4">
                <p className="font-semibold">Total Marks: {assignment.marks}</p>
            </div>

            <Link
                to="/dashboard"
                className="btn btn-sm btn-outline  flex items-center gap-2"
            >
                <FaArrowLeft /> Back to Assignments
            </Link>
        </div>
    );
};

export default CreatorAssignmentDetail;
