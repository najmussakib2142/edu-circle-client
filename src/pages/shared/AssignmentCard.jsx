import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaTrash, FaEdit, FaEye, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const AssignmentCard = ({ assignment }) => {
  const { user } = useAuth();
  // const [assignments, setAssignments] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);

  const {
    _id,
    title,
    description,
    marks,
    thumbnail,
    difficulty,
    creatorEmail,
  } = assignment;

  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'This will permanently delete the assignment!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .delete(`https://edu-circle-server-seven.vercel.app/assignments/${id}?email=${user.email}`)
  //         // .then((res) => {
  //         //   if (res.data.deletedCount > 0) {
  //         //     Swal.fire('Deleted!', 'Your assignment has been deleted.', 'success');
  //         //   }
  //         // })
  //         .then((res) => {
  //           if (res.data.deletedCount > 0) {
  //             Swal.fire('Deleted!', 'Your assignment has been deleted.', 'success').then(() => {
  //               // setAssignments(prev => prev.filter(item => item._id !== id));
  //             });
  //           }
  //         })
  //         .catch((err) => {
  //           if (err.response?.status === 403) {
  //             Swal.fire({
  //               icon: 'error',
  //               title: 'Permission Denied',
  //               text: 'You can only delete your own assignments.',
  //             });
  //           } else {
  //             Swal.fire('Error', 'Something went wrong.', 'error');
  //           }
  //         });
  //     }
  //   });
  // };

  useEffect(() => {
    if (user) {
      axios.get(`https://edu-circle-server-seven.vercel.app/bookmarks`, { headers: { Authorization: `Bearer ${user.accessToken}` } })
        .then(res => {
          const exists = res.data.some(b => b.assignmentId === assignment._id);
          setBookmarked(exists);
        });
    }
  }, [user, assignment._id]);

  const toggleBookmark = () => {
    if (!user) return alert('Login to bookmark');

    if (bookmarked) {
      axios.delete(`https://edu-circle-server-seven.vercel.app/bookmarks/${assignment._id}`, { headers: { Authorization: `Bearer ${user.accessToken}` } })
        .then(() => setBookmarked(false));
    } else {
      axios.post(`https://edu-circle-server-seven.vercel.app/bookmarks`, { assignmentId: assignment._id }, { headers: { Authorization: `Bearer ${user.accessToken}` } })
        .then(() => setBookmarked(true));
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      <figure className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="h-48  w-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-gray-700 dark:bg-gray-500  text-white text-xs px-2 py-1 rounded-full shadow">
          {difficulty}
        </div>

      </figure>

      <div className="p-5">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-semibold line-clamp-1 text-indigo-600 dark:text-indigo-400 mb-2">{title}</h2>
          <button onClick={toggleBookmark} className=" text-xl text-yellow-400">
            {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2 dark:text-gray-300 mb-4">
          {description.length > 70 ? `${description.slice(0, 70)}...` : description}
        </p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
          <span>
            <strong>Marks:</strong> {marks}
          </span>
          <span className="italic text-xs">By: {creatorEmail}</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={`/assignment/${_id}`}
            className="flex w-full items-center gap-2 btn btn-sm bg-gray-700 dark:bg-gray-400 hover:bg-gray-800 dark:hover:bg-gray-700 text-white"
            title="View Assignment"
          >
            <FaEye /> View
          </Link>

          {/* <Link
            to={`/update/${_id}`}
            className="flex items-center gap-2 btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white"
            title="Update Assignment"
          >
            <FaEdit /> Edit
          </Link>

          <button
            onClick={() => handleDelete(_id)}
            className="flex items-center gap-2 btn btn-sm bg-red-500 hover:bg-red-600 text-white"
            title="Delete Assignment"
          >
            <FaTrash /> Delete
          </button> */}
        </div>
      </div>
    </motion.div>
  );
};

export default AssignmentCard;
