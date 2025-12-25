import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendarAlt, FaUserEdit, FaTrophy, FaEdit, FaInfoCircle } from "react-icons/fa";
import Loading from "../shared/Loading";

const CreatorAssignmentDetail = () => {
    const { id } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://edu-circle-server-seven.vercel.app/assignments/${id}`)
            .then(res => res.json())
            .then(data => {
                setAssignment(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <Loading />;
    if (!assignment) return <div className="p-20 text-center font-bold">Assignment not found</div>;

    return (
        <div className="min-h-screen bg-white dark:bg-[#020617] py-10 px-4">
            <div className="max-w-5xl mx-auto">
                
                {/* 1. Top Navigation & Action Row */}
                <div className="flex justify-between items-center mb-8">
                    <Link to="/dashboard" className="btn btn-ghost hover:bg-base-200 gap-2 normal-case">
                        <FaArrowLeft className="text-xs" /> Back to Dashboard
                    </Link>
                    <Link to={`/dashboard/update/${assignment._id}`} className="btn btn-primary btn-md gap-2 shadow-lg">
                        <FaEdit /> Edit Assignment
                    </Link>
                </div>

                {/* 2. Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: The "Hero" Card (L: 7 units) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="overflow-hidden rounded-3xl border border-base-300 shadow-sm bg-base-100">
                            <img
                                src={assignment.thumbnail || "https://via.placeholder.com/800x450"}
                                alt={assignment.title}
                                className="w-full h-[350px] object-cover"
                            />
                            <div className="p-8">
                                <div className="flex gap-2 mb-4">
                                    <span className="badge badge-secondary badge-outline px-4 py-3 font-semibold capitalize">
                                        {assignment.difficulty}
                                    </span>
                                    <span className="badge badge-ghost px-4 py-3 font-medium">
                                        Assignment ID: {assignment._id.slice(-6)}
                                    </span>
                                </div>
                                <h1 className="text-4xl font-black mb-6 leading-tight text-base-content">
                                    {assignment.title}
                                </h1>
                                <p className="text-lg leading-relaxed text-base-content/70 whitespace-pre-wrap">
                                    {assignment.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Metadata & Details (L: 5 units) */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* Quick Stats Card */}
                        <div className="card bg-base-200/50 border border-base-300 rounded-3xl p-6">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <FaInfoCircle className="text-primary" /> Submission Details
                            </h2>
                            
                            <div className="space-y-4">
                                {/* Marks */}
                                <div className="flex items-center justify-between p-4 bg-base-100 rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg"><FaTrophy /></div>
                                        <span className="font-medium opacity-70">Total Marks</span>
                                    </div>
                                    <span className="text-2xl font-black text-primary">{assignment.marks}</span>
                                </div>

                                {/* Date */}
                                <div className="flex items-center justify-between p-4 bg-base-100 rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><FaCalendarAlt /></div>
                                        <span className="font-medium opacity-70">Deadline</span>
                                    </div>
                                    <span className="font-bold">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                                </div>

                                {/* Creator */}
                                <div className="flex items-center justify-between p-4 bg-base-100 rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 text-purple-700 rounded-lg"><FaUserEdit /></div>
                                        <span className="font-medium opacity-70">Created By</span>
                                    </div>
                                    <span className="font-bold">{assignment.creatorName || "Instructor"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Instructional Alert */}
                        <div className="alert bg-info/10 border-info/20 rounded-2xl">
                            <div className="flex flex-col items-start gap-1">
                                <span className="font-bold text-info">Creator View</span>
                                <p className="text-xs opacity-70">You are viewing this assignment as its owner. Students see a "Submit Assignment" button here.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorAssignmentDetail;