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
    const [thumbnail, setThumbnail] = useState(null);
    const [difficulty, setDifficulty] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);


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

        if (!thumbnail) {
            errors.thumbnail = 'Please upload an image.';
        }
        if (!difficulty) errors.difficulty = 'Please select a difficulty level.';

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});






        try {
            setUploading(true);
            const imageUrl = await uploadToCloudinary(thumbnail);

            const newAssignment = {
                title,
                description,
                marks,
                thumbnail: imageUrl,
                difficulty,
                dueDate,
                creatorEmail: user?.email,
                creatorName: user?.displayName,
            };

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
        } finally {
            setUploading(false);
        }
    };

    const uploadToCloudinary = async (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', import.meta.env.VITE_PUBLIC_CLOUDINARY_PRESET);
        // formData.append('cloud_name', import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME);

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );
            return res.data.secure_url;
        }
        catch (error) {
            throw new Error('Image upload failed');
        }

    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            {/* Card Container */}
            <div className=" shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create New Assignment
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Fill in the details to publish a new task for your students.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Assignment Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Introduction to React"
                            className="input input-bordered focus:input-primary w-full bg-gray-50 dark:bg-gray-900"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        {validationErrors.title && (
                            <p className="text-error text-xs mt-1 italic">{validationErrors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Description</span>
                        </label>
                        <textarea
                            placeholder="Write a clear instruction for this assignment..."
                            className="textarea textarea-bordered focus:textarea-primary w-full bg-gray-50 dark:bg-gray-900 leading-relaxed"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        {validationErrors.description && (
                            <p className="text-error text-xs mt-1 italic">{validationErrors.description}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Marks */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Total Marks</span>
                            </label>
                            <input
                                type="number"
                                placeholder="100"
                                className="input input-bordered focus:input-primary w-full bg-gray-50 dark:bg-gray-900"
                                value={marks}
                                onChange={(e) => setMarks(e.target.value)}
                                required
                            />
                            {validationErrors.marks && (
                                <p className="text-error text-xs mt-1 italic">{validationErrors.marks}</p>
                            )}
                        </div>

                        {/* Difficulty Dropdown */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Difficulty Level</span>
                            </label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="select select-bordered focus:select-primary w-full bg-gray-50 dark:bg-gray-900"
                                required
                            >
                                <option value="" disabled>Select level</option>
                                <option value="easy">🟢 Easy</option>
                                <option value="medium">🟡 Medium</option>
                                <option value="hard">🔴 Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Thumbnail Upload */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                                Assignment Thumbnail
                            </span>
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered w-full"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setThumbnail(file);
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                        />

                        <p className="text-xs text-gray-500 mt-1">
                            Upload a cover image (JPG, PNG, WEBP)
                        </p>

                        {/* Image Preview */}
                        {preview && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                <img
                                    src={preview}
                                    alt="Thumbnail preview"
                                    className="h-40 w-full object-cover rounded-xl border"
                                />
                            </div>
                        )}

                        {/* Validation Error */}
                        {validationErrors.thumbnail && (
                            <p className="text-error text-xs mt-2 italic">
                                {validationErrors.thumbnail}
                            </p>
                        )}
                    </div>


                    {/* Due Date */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Deadline</span>
                        </label>
                        <DatePicker
                            selected={dueDate}
                            onChange={(date) => setDueDate(date)}
                            dateFormat="dd-MM-yyyy"
                            className="input input-bordered focus:input-primary w-full bg-gray-50 dark:bg-gray-900"
                            wrapperClassName="w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-full text-lg font-bold shadow-lg hover:shadow-primary/30 transition-all duration-300"
                        >
                            {uploading ? 'Uploading ...' : 'Create Assignment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAssignment;
