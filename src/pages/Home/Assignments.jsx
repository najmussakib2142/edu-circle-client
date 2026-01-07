import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router';
import { FaArrowRight, FaFire, FaThLarge, FaListUl, FaAward, FaEye } from 'react-icons/fa';

const getDifficultyStyle = (difficulty) => {
    const key = difficulty?.toLowerCase().trim();
    const base = "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors duration-300";

    switch (key) {
        case 'easy':
            return `${base} bg-emerald-50/50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20`;
        case 'medium':
            return `${base} bg-amber-50/50 text-amber-700 border-amber-200/60 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20`;
        case 'hard':
            return `${base} bg-rose-50/50 text-rose-700 border-rose-200/60 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20`;
        default:
            return `${base} bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700`;
    }
};

const CustomAssignmentCard = ({ assignment }) => {
    const { title, thumbnail, description, marks, difficulty, creatorEmail } = assignment;

    const currentStyle = getDifficultyStyle(difficulty);

    return (
        <div className="group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex gap-3 flex-col md:flex-row h-auto">
            <div className="relative overflow-hidden w-full md:w-72 shrink-0 aspect-video">
                <img src={thumbnail} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${currentStyle}`}>
                        {difficulty}
                    </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg">
                    {marks} Marks
                </div>
            </div>

            <div className="p-6 flex flex-col justify-between grow">
                <div>
                    <h3 className="font-black text-gray-900 dark:text-white leading-tight mb-3 group-hover:text-indigo-600 transition-colors text-xl">
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                        {description}
                    </p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold uppercase">
                        {creatorEmail?.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Creator</span>
                        <span className="text-xs text-gray-700 dark:text-gray-300 font-bold truncate max-w-30">
                            {creatorEmail?.split('@')[0]}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
                    <Link to={`/assignment/${assignment._id}`} className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all">
                        Start Challenge <FaArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

/**
 * NEW GRID STYLE: Featured Card (Spans 8 cols)
 */
const FeaturedCard = ({ assignment }) => {
    const currentStyle = getDifficultyStyle(assignment.difficulty);
    return (
        <div className="group relative h-full bg-indigo-900/10 dark:bg-indigo-900/20 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 flex flex-col lg:flex-row shadow-xl">
            <div className="lg:w-3/5 h-64 lg:h-auto overflow-hidden relative">
                <img src={assignment.thumbnail} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute top-6 left-6">
                    <span className={`${currentStyle} px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg`}>
                        {assignment.difficulty}
                    </span>
                </div>
            </div>
            <div className="p-8 lg:w-2/5 flex flex-col justify-center bg-white dark:bg-gray-900/40 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-4">
                    <FaAward className="text-indigo-500" />
                    <span className="text-indigo-600 dark:text-indigo-400 font-black text-xs tracking-widest uppercase">Premium Challenge</span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                    {assignment.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed line-clamp-3">
                    {assignment.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Reward</span>
                        <span className="text-xl font-black text-gray-900 dark:text-white">{assignment.marks} <span className="text-xs text-indigo-500">Marks</span></span>
                    </div>
                    <Link to={`/assignment/${assignment._id}`} className="flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 hover:rotate-12 transition-all shadow-lg shadow-indigo-600/30">
                        <FaArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

/**
 * NEW GRID STYLE: Standard Card (Spans 4 cols)
 */
const StandardCard = ({ assignment }) => {
    const currentStyle = getDifficultyStyle(assignment.difficulty);
    return (
        <div className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 transition-all flex flex-col h-full hover:shadow-2xl relative">

            {/* Thumbnail Area */}
            <div className="relative aspect-video rounded-t-xl overflow-hidden mb-5">
                <img
                    src={assignment.thumbnail}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    alt={assignment.title}
                />

                {/* Bookmark Button */}


                {/* Difficulty Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${currentStyle}`}>
                    {assignment.difficulty}
                </div>

                {/* Marks Overlay */}

            </div>

            {/* Content Area */}
            <div className="flex flex-col grow px-5 pt-2 pb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {assignment.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-7 leading-relaxed">
                    {assignment.description}
                </p>

                {/* Footer / Creator Info */}
                <div className="mt-auto relative pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                            {assignment.creatorEmail ? assignment.creatorEmail[0].toUpperCase() : 'U'}
                        </div>
                        <div className="flex flex-col pt-1">
                            <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">Creator</span>
                            <span className="text-[11px] text-gray-700 dark:text-gray-300 font-bold line-clamp-1">
                                {assignment.creatorEmail?.split('@')[0]}
                            </span>
                        </div>
                    </div>

                    <div className="absolute bottom-12 -right-5 bg-indigo-600 text-white px-3 py-1 rounded-l-lg font-bold text-xs shadow-lg">
                        {assignment.marks} Marks
                    </div>

                    <Link
                        to={`/assignment/${assignment._id}`}
                        className="text-indigo-600 pt-2 dark:text-indigo-400 text-xs font-black flex items-center gap-1.5 hover:gap-2 transition-all"
                    >
                        DETAILS <FaEye />
                    </Link>
                </div>
            </div>
        </div>
    )
}

const SkeletonPulse = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-md ${className}`} />
);

const CardSkeleton = ({ viewMode, isFeatured }) => {
    // List View Skeleton (CustomAssignmentCard)
    if (viewMode === "list") {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex gap-3 flex-col md:flex-row h-auto p-0 overflow-hidden">
                <SkeletonPulse className="w-full md:w-72 aspect-video rounded-none" />
                <div className="p-6 flex flex-col justify-between grow space-y-4">
                    <div className="space-y-2">
                        <SkeletonPulse className="h-6 w-3/4" />
                        <SkeletonPulse className="h-4 w-full" />
                        <SkeletonPulse className="h-4 w-5/6" />
                    </div>
                    <div className="flex items-center gap-2">
                        <SkeletonPulse className="w-8 h-8 rounded-full" />
                        <div className="space-y-1">
                            <SkeletonPulse className="h-2 w-12" />
                            <SkeletonPulse className="h-3 w-20" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Grid View: Featured Skeleton
    if (isFeatured) {
        return (
            <div className="h-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col lg:flex-row overflow-hidden">
                <SkeletonPulse className="lg:w-3/5 h-64 lg:h-auto rounded-none" />
                <div className="p-8 lg:w-2/5 flex flex-col justify-center space-y-4">
                    <SkeletonPulse className="h-4 w-32" />
                    <SkeletonPulse className="h-10 w-full" />
                    <div className="space-y-2">
                        <SkeletonPulse className="h-4 w-full" />
                        <SkeletonPulse className="h-4 w-full" />
                        <SkeletonPulse className="h-4 w-2/3" />
                    </div>
                    <div className="flex justify-between items-end pt-4">
                        <SkeletonPulse className="h-10 w-20" />
                        <SkeletonPulse className="w-14 h-14 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    // Grid View: Standard Skeleton
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col h-full p-0 overflow-hidden">
            <SkeletonPulse className="aspect-video rounded-none mb-5" />
            <div className="px-5 pb-6 space-y-4">
                <SkeletonPulse className="h-6 w-3/4" />
                <div className="space-y-2">
                    <SkeletonPulse className="h-3 w-full" />
                    <SkeletonPulse className="h-3 w-5/6" />
                </div>
                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <SkeletonPulse className="w-8 h-8 rounded-full" />
                        <div className="space-y-1">
                            <SkeletonPulse className="h-2 w-10" />
                            <SkeletonPulse className="h-3 w-16" />
                        </div>
                    </div>
                    <SkeletonPulse className="h-4 w-12" />
                </div>
            </div>
        </div>
    );
};

const Assignments = ({ assignmentsPromise }) => {
    const [assignments, setAssignments] = useState([]);
    const [viewMode, setViewMode] = useState("grid");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        assignmentsPromise
            .then((data) => {
                setAssignments(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error("Failed to load assignments", err);
                setAssignments([]);
            })
            .finally(() => setLoading(false));
    }, [assignmentsPromise]);

    // if (loading) return null;
    const skeletonItems = [1, 2, 3, 4, 5];

    return (
        <section className="py-20 bg-white dark:bg-[#020617] transition-colors duration-500 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-14 relative z-10">

                {/* Header Section (Unchanged) */}
                <div className="flex flex-col md:flex-row justify-between   md:items-end mb-15 gap-6">
                    <div className="space-y-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center  gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest"
                        >
                            <FaFire className="animate-pulse" /> Trending Now
                        </motion.div>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                            Curated <span className="text-transparent bg-clip-text bg-linear-to-tr from-indigo-600 to-purple-500">Challenges.</span>
                        </h2>
                    </div>

                    <div className='hidden md:block'>
                        <div className=" flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                            <div className="p-1 bg-gray-200 dark:bg-gray-900 rounded-xl flex items-center">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === "grid" ? "bg-white dark:bg-gray-800 shadow-sm text-indigo-600" : "text-gray-500"}`}
                                >
                                    <FaThLarge /> Grid
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === "list" ? "bg-white dark:bg-gray-800 shadow-sm text-indigo-600" : "text-gray-500"}`}
                                >
                                    <FaListUl /> List
                                </button>
                            </div>
                            <Link to="/assignments" className="w-full sm:w-auto group flex items-center justify-center gap-2 font-bold text-indigo-600 dark:hover:text-indigo-400 hover:shadow-xl transition-all active:scale-95">
                                Explore All <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <motion.div
                    layout
                    className={
                        viewMode === "grid"
                            ? "grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-12 md:auto-rows-fr"
                            : "flex flex-col gap-6"
                    }
                >
                    {loading ? (
                        // RENDER SKELETONS
                        skeletonItems.map((_, index) => {
                            const isFeatured = index === 0 && viewMode === "grid";
                            return (
                                <div
                                    key={`skeleton-${index}`}
                                    className={
                                        viewMode === "grid"
                                            ? isFeatured ? "lg:col-span-8 lg:row-span-1" : "lg:col-span-4"
                                            : "w-full"
                                    }
                                >
                                    <CardSkeleton viewMode={viewMode} isFeatured={isFeatured} />
                                </div>
                            )
                        })
                    ) : (
                        // RENDER ACTUAL CONTENT
                        <AnimatePresence mode="popLayout">
                            {assignments.map((item, index) => {
                                const isFeatured = index === 0 && viewMode === "grid";
                                return (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className={
                                            viewMode === "grid"
                                                ? isFeatured ? "lg:col-span-8 lg:row-span-1" : "lg:col-span-4"
                                                : "w-full"
                                        }
                                    >
                                        {viewMode === "list" ? (
                                            <CustomAssignmentCard assignment={item} />
                                        ) : (
                                            isFeatured ? <FeaturedCard assignment={item} /> : <StandardCard assignment={item} />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    )}
                </motion.div>

                {/* Decorative Background */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-125 h-125 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            </div>
        </section>
    );
};



export default Assignments;

// feat(ui): add responsive loading skeletons for assignments