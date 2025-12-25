import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import DatePicker from 'react-datepicker';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAccessToken from '../../api/useAccessToken';
import Loading from '../shared/Loading';

const UpdateAssignment = () => {

    const { user } = useAuth();
    const { id } = useParams()
    const { _id } = useLoaderData()
    const [validationErrors, setValidationErrors] = useState({});
    const { accessToken, loading } = useAccessToken()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        marks: '',
        thumbnail: '',
        difficulty: '',
        dueDate: new Date(),
        userEmail: user?.email || '',
        userName: user?.displayName || ''
    })

    useEffect(() => {
        if (loading || !accessToken || !id) return

        const fetchAssignment = async () => {
            try {
                const res = await axios.get(`https://edu-circle-server-seven.vercel.app/assignments/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const assignment = res.data;
                setFormData({
                    ...assignment,
                    dueDate: new Date(assignment.dueDate)
                });
            } catch (error) {
                Swal.fire('Error!', 'Failed to load assignment data.', 'error', error);
            }
        };

        fetchAssignment();
    }, [id, loading, accessToken]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData, [name]: value
        }))
    }

    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updateAssignment = Object.fromEntries(formData.entries());

        const errors = {};

        if (!updateAssignment.title) errors.title = 'Title is required.';
        if (!updateAssignment.description) {
            errors.description = 'Description is required.';
        } else if (updateAssignment.description.length < 20) {
            errors.description = 'Description must be at least 20 characters.';
        }

        if (!updateAssignment.marks) {
            errors.marks = 'Marks are required.';
        } else if (isNaN(updateAssignment.marks)) {
            errors.marks = 'Marks must be a number.';
        }

        if (!updateAssignment.thumbnail) errors.thumbnail = 'Thumbnail is required.';
        if (!updateAssignment.difficulty) errors.difficulty = 'Please select difficulty.';

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({}); // Clear previous errors


        Swal.fire({
            title: "Are you sure?",
            text: `You want to update this assignment?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1471e3",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://edu-circle-server-seven.vercel.app/assignments/${id}`, {
                    method: "PUT",
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(updateAssignment)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            Swal.fire({
                                toast: true,
                                position: "top-end",
                                icon: "success",
                                title: `Your Assignment has updated successfully!`,
                                showConfirmButton: false,
                                timer: 2000,
                                timerProgressBar: true,
                                didClose: () => {
                                    // Navigate after toast closes
                                    navigate('/dashboard');
                                }
                            });

                        }
                    });
                // navigate('/dashboard');
            }
        })
    }

    return (
        <div className="max-w-3xl mx-auto px-5 py-10">
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">Update This Assignment</h2>


            <form onSubmit={handleUpdate} className="space-y-6">

                {/* Title */}
                <label htmlFor="title" className="block font-medium mb-1">
                    Assignment Title
                </label>
                <input
                    type="text"
                    placeholder="Assignment Title"
                    className="input input-bordered w-full"
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    required

                />
                {validationErrors.title && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
                )}


                {/* Description */}
                <label htmlFor="description" className="block font-medium mb-1">
                    Description
                </label>
                <textarea
                    name="description"
                    className="textarea textarea-bordered w-full"
                    rows="4"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                {validationErrors.description && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
                )}


                {/* Marks */}
                <label htmlFor="marks" className="block font-medium mb-1">
                    Full Marks
                </label>
                <input
                    type='number'
                    name='marks'
                    className="input input-bordered w-full"
                    placeholder="Marks"
                    value={formData.marks}
                    onChange={handleChange}
                />
                {validationErrors.marks && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.marks}</p>
                )}

                {/* Thumbnail URL */}
                <label htmlFor="thumbnail" className="block font-medium mb-1">
                    Thumbnail URL
                </label>
                <input
                    type="url"
                    name="thumbnail"
                    className="input input-bordered w-full"
                    placeholder="Thumbnail URL"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    required
                />
                {validationErrors.thumbnail && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.thumbnail}</p>
                )}


                {/* Email */}
                <label className="block font-medium mb-1">
                    Your Email
                </label>
                <input
                    type="email"
                    name="userEmail"
                    className="input input-bordered w-full  cursor-not-allowed"
                    value={formData.userEmail}
                    onChange={handleChange}
                    readOnly
                />


                {/* userName */}
                <label className="block font-medium mb-1">
                    Your Name
                </label>
                <input
                    type="text"
                    name="userName"
                    className="input input-bordered w-full  cursor-not-allowed"
                    value={formData.userName}
                    onChange={handleChange}
                    readOnly
                />
                {/* Difficulty Dropdown */}
                <label htmlFor="difficulty" className="block font-medium mb-1">
                    Difficulty
                </label>
                <select
                    name="difficulty"
                    className="select select-bordered w-1/2"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Difficulty Level</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                {validationErrors.difficulty && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.difficulty}</p>
                )}


                {/* Due Date */}
                <div>
                    <label className="block mb-1 font-medium">Due Date</label>
                    {/* <input type="date" name="startDate" defaultValue={dueDate} className="input w-full select-primary" /> */}

                    <DatePicker
                        selected={formData.dueDate}
                        onChange={(date) =>
                            setFormData(oldData => ({ ...oldData, dueDate: date }))
                        }
                        dateFormat="dd-MM-yyyy"
                        className="input input-bordered w-full"
                    />
                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full
                ">Update Assignment</button>
            </form>

        </div>
    );
};

export default UpdateAssignment;