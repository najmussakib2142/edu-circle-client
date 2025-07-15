import React from 'react';
import { motion } from "framer-motion";
// import { motion } from "motion/react"
import { Link } from "react-router";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";


const AssignmentCard = ({ assignment, isCreator }) => {

    const {
        _id,
        title,
        description,
        marks,
        thumbnail,
        difficulty,
        creatorEmail,
    } = assignment;


    return (

        <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className="card w-full bg-base-100 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition duration-300"
        >
            <figure>
                <img src={thumbnail} alt={title} className="h-48 w-full object-cover rounded-t-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-primary">{title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{description.slice(0, 70)}...</p>
                <div className="flex justify-between text-sm mt-3">
                    <span className="font-semibold text-accent">Marks: {marks}</span>
                    <span className="badge badge-secondary">{difficulty}</span>
                </div>

                <div className="card-actions mt-4 flex-wrap gap-2">
                    <Link to={`/assignment/${_id}`} className="btn btn-sm btn-info text-white">
                        <FaEye /> View
                    </Link>

                    {/* {isCreator && (
                        <>
                            <Link to={`/assignments/update/${_id}`} className="btn btn-sm btn-warning text-white">
                                <FaEdit /> Update
                            </Link>

                            <button
                                // onClick={() => handleDelete(_id)}
                                className="btn btn-sm btn-error text-white"
                            >
                                <FaTrash /> Delete
                            </button>
                        </>
                    )} */}
                    <Link to={`/assignments/update/${_id}`} className="btn btn-sm btn-warning text-white">
                        <FaEdit /> Update
                    </Link>

                    <button
                        // onClick={() => handleDelete(_id)}
                        className="btn btn-sm btn-error text-white"
                    >
                        <FaTrash /> Delete
                    </button>

                </div>
            </div>
        </motion.div>

    );
};

export default AssignmentCard;