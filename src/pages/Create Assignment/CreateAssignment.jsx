import React, { use, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthContext';
import { delay } from 'motion';
import useAuth from '../../hooks/useAuth';
import useAccessToken from '../../api/useAccessToken';
import Loading from '../shared/Loading';

const CreateAssignment = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [marks, setMarks] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [dueDate, setDueDate] = useState(new Date());

    const navigate = useNavigate();
    const { user } = useAuth();
    const { accessToken, loading } = useAccessToken()
    const [validationErrors, setValidationErrors] = useState({});
    // const token = user.accessToken;
    // console.log(token);


    useEffect(() => {
        if (!accessToken && !loading) {
            
            navigate('/login');
        }
    }, [accessToken, loading, navigate])
    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) {
            return <Loading></Loading>
        }

        if (!accessToken) {
            return Swal.fire('Unauthorized', 'No access token found.', 'error');
        }
        // if (!title || !description || !marks || !thumbnail || !difficulty) {
        //     return Swal.fire('Error!', 'Please fill out all fields.', 'error');
        // }
        // if (description.length < 20) {
        //     return Swal.fire('Error!', 'Description must be at least 20 characters.', 'error');
        // }

        const errors = {};

        if (!title) {
            errors.title = 'Title is required.';
        }
        if (!description) {
            errors.description = 'Description is required.';
        } else if (description.length < 20) {
            errors.description = 'Description must be at least 20 characters.';
        }

        if (!marks) {
            errors.marks = 'Marks are required.';
        } else if (isNaN(marks)) {
            errors.marks = 'Marks must be a number.';
        }

        if (!thumbnail) errors.thumbnail = 'Thumbnail URL is required.';
        if (!difficulty) errors.difficulty = 'Please select a difficulty level.';

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});


        const newAssignment = {
            title,
            description,
            marks,
            thumbnail,
            difficulty,
            dueDate,
            creatorEmail: user?.email,
            creatorName: user?.displayName,
        };

        try {
            // POST to server (replace url)
            // const accessToken = await user.getIdToken();
            const res = await axios.post('https://edu-circle-server-seven.vercel.app/assignments',
                newAssignment,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (res.data.insertedId) {
                Swal.fire('Success!', 'Assignment created successfully!', 'success');
                navigate('/assignments');

            }
        } catch (error) {
            // console.error(error);
            Swal.fire('Error!', 'Something went wrong.', 'error', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-5 py-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Create New Assignment</h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}

                <input
                    type="text"
                    placeholder="Assignment Title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                {validationErrors.title && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
                )}

                {/* Description */}
                <textarea
                    placeholder="Assignment Description (at least 20 characters)"
                    className="textarea textarea-bordered w-full"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                {validationErrors.description && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
                )}

                {/* Marks */}
                <input
                    type="number"
                    placeholder="Marks"
                    className="input input-bordered w-full"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    required
                />
                {validationErrors.marks && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.marks}</p>
                )}

                {/* Thumbnail URL */}
                <input
                    type="url"
                    placeholder="Thumbnail Image URL"
                    className="input input-bordered w-full"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    required
                />
                {validationErrors.thumbnail && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.thumbnail}</p>
                )}

                {/* Difficulty Dropdown */}
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="select select-bordered w-1/2"
                    required
                >
                    <option value="">Select Difficulty Level</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                {/* Due Date */}
                <div>
                    <label className="block mb-1 font-medium">Due Date</label>
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="dd-MM-yyyy"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">Create Assignment</button>
            </form>
        </div>
    );
};

export default CreateAssignment;
