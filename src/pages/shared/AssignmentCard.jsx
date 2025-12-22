import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaBookmark, FaRegBookmark, FaStar, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const AssignmentCard = ({ assignment, isFeatured, layoutView }) => {

  const { user } = useAuth();
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

  const diffStyles = {
    Easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  useEffect(() => {
    if (user) {
      axios.get(`https://edu-circle-server-seven.vercel.app/bookmarks`, { 
        headers: { Authorization: `Bearer ${user.accessToken}` } 
      })
      .then(res => {
        const exists = res.data.some(b => b.assignmentId === assignment._id);
        setBookmarked(exists);
      });
    }
  }, [user, assignment._id]);

  const toggleBookmark = () => {
    if (!user) return alert('Login to bookmark');

    if (bookmarked) {
      axios.delete(`https://edu-circle-server-seven.vercel.app/bookmarks/${assignment._id}`, { 
        headers: { Authorization: `Bearer ${user.accessToken}` } 
      })
      .then(() => setBookmarked(false));
    } 
    else {
      axios.post(`https://edu-circle-server-seven.vercel.app/bookmarks`, 
        { assignmentId: assignment._id }, 
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      )
      .then(() => setBookmarked(true));
    }
  };

  return (
    <motion.div
      layout
      className={`group relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden

      ${layoutView === "list"
        ? "flex flex-row items-center gap-6 p-4 min-h-[150px]"
        : "flex flex-col h-full"
      }
      `}
    >

      {/* Image */}
      <div
        className={`
        overflow-hidden aspect-video bg-gray-200 rounded-xl

        ${layoutView === "list"
          ? "min-w-36 min-h-28 max-w-36"
          : isFeatured ? "h-64 md:h-80 lg:h-96 w-full" : "h-52 w-full"
        }
      `}
      >
        <img
          src={thumbnail}
          alt={title}
          className={`w-full h-full object-cover 
          transition-transform duration-500 group-hover:scale-105`}
        />
      </div>

      {/* CONTENT PANEL */}
      <div
        className={`
        flex flex-col flex-grow

        ${layoutView === "list"
          ? "pr-4 gap-2"
          : "p-6"
        }
      `}
      >

        {/* Title */}
        <h3
          className={`
          font-bold text-gray-900 dark:text-white transition-colors
          group-hover:text-indigo-600
          
          ${layoutView === "list"
            ? "text-lg line-clamp-1"
            : isFeatured ? "text-2xl md:text-3xl mb-3" : "text-xl mb-3 line-clamp-1"
          }
        `}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`
          text-gray-500 dark:text-gray-400

          ${layoutView === "list"
            ? "text-sm line-clamp-2 max-w-[80%]"
            : isFeatured ? "text-base mb-6 line-clamp-3" : "text-sm mb-6 line-clamp-2"
          }
        `}
        >
          {description}
        </p>

        {/* Bottom row */}
        <div
          className={`
          flex items-center justify-between w-full

          ${layoutView === "list"
            ? "mt-auto"
            : "pt-4 border-t border-gray-200 dark:border-gray-700"
          }
        `}
        >

          {/* Creator */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
              {creatorEmail ? creatorEmail[0].toUpperCase() : 'U'}
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase font-bold">Creator</span>
              <span className="text-xs text-gray-700 dark:text-gray-300 font-bold truncate max-w-[120px]">
                {creatorEmail?.split('@')[0]}
              </span>
            </div>
          </div>

          {/* Marks + CTA */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
              Score
            </span>

            <Link
              to={`/assignment/${_id}`}
              className={`flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400 transition-all
              ${layoutView === "list" ? "text-sm" : isFeatured ? "text-lg" : "text-sm hover:gap-3"}
              `}
            >
              {layoutView === "list" ? "View" : isFeatured ? "Start Challenge" : "Details"} 
              <FaEye />
            </Link>

          </div>

        </div>
      </div>

      {/* Bookmark */}
      <button
        onClick={toggleBookmark}
        className={`
        absolute p-2 rounded-xl bg-white/80 dark:bg-gray-900/80 text-indigo-600 shadow-lg hover:scale-110 transition-transform active:scale-90 z-20 

        ${layoutView === "list" ? "top-3 right-3" : "top-4 right-4"}
        `}
      >
        {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </button>

      {/* Difficulty Tag */}
      <span
        className={`
        absolute text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md

        ${layoutView === "list"
          ? "top-3 left-[155px]"
          : "top-4 left-4"
        }

        ${diffStyles[difficulty] || diffStyles.Medium}
        `}
      >
        {difficulty}
      </span>

      {/* Marks Badge */}
      {layoutView !== "list" && (
        <div className="absolute bottom-16 right-0 bg-indigo-600 text-white px-4 py-1 rounded-l-full font-semibold text-sm shadow-xl">
          {marks} Marks
        </div>
      )}

    </motion.div>
  );
};

export default AssignmentCard;
