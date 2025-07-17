import React from 'react';
import { motion } from "framer-motion";
// import { motion } from "motion/react"
import { Link } from "react-router";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';


const AssignmentCard = ({ assignment }) => {
    const {user} = useAuth()

    const {
        _id,
        title,
        description,
        marks,
        thumbnail,
        difficulty,
        creatorEmail,
    } = assignment;

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the assignment!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/assignments/${id}?email=${user.email}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Your assignment has been deleted.', 'success');
                            // Optional: refresh data or remove card from UI
                        }
                    })
                    .catch(err => {
                        if (err.response && err.response?.status === 403) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Permission Denied',
                                text: 'You can only delete your own assignments..',
                            });
                            // Swal.fire('Unauthorized', 'You can only delete your own assignments.', 'error');
                        } else {
                            Swal.fire('Error', 'Something went wrong.', 'error');
                        }
                    });
            }
        })
    }


    return (

        <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className="card w-full bg-base-100 shadow-2xl shadow-blue-300 dark:shadow-md dark:shadow-blue-400 hover:shadow-xl transition duration-300"
        >
            <figure>
                <img src={thumbnail} alt={title} className="h-48  w-full object-cover rounded-t-xl" />
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

                    <Link to={`/update/${_id}`} className="btn btn-sm btn-warning text-white">
                        <FaEdit /> Update
                    </Link>

                    <button
                        onClick={() => handleDelete(_id)}
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