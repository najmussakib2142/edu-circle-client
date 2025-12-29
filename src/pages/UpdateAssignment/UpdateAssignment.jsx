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
    const [newThumbnail, setNewThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
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
                    title: assignment.title || '',
                    description: assignment.description || '',
                    marks: assignment.marks || '',
                    thumbnail: assignment.thumbnail || '',
                    difficulty: assignment.difficulty || '',
                    dueDate: assignment.dueDate
                        ? new Date(assignment.dueDate)
                        : new Date(),
                    userEmail: assignment.userEmail || user?.email || '',
                    userName: assignment.userName || user?.displayName || '',
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

    const handleUpdate = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.title) errors.title = 'Title is required.';
        if (!formData.description || formData.description.length < 20) {
            errors.description = 'Description must be at least 20 characters.';
        }
        if (!formData.marks || isNaN(formData.marks)) {
            errors.marks = 'Marks must be a number.';
        }
        if (!formData.difficulty) {
            errors.difficulty = 'Please select difficulty.';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});

        let thumbnailUrl = formData.thumbnail;

        try {
            // ✅ Upload only if new image selected
            if (newThumbnail) {
                setUploading(true);
                thumbnailUrl = await uploadToCloudinary(newThumbnail);
            }

            const updateAssignment = {
                ...formData,
                thumbnail: thumbnailUrl,
                dueDate: formData.dueDate.toISOString(),
            };

            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You want to update this assignment?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1471e3",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update it!",
            });

            if (!result.isConfirmed) return;

            const res = await fetch(
                `https://edu-circle-server-seven.vercel.app/assignments/${id}`,
                {
                    method: "PUT",
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(updateAssignment)
                }
            );

            const data = await res.json();

            if (data.modifiedCount) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Assignment updated successfully!",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });

                navigate('/dashboard');
            }

        } catch (error) {
            Swal.fire('Error!', 'Failed to update assignment.', 'error');
        } finally {
            setUploading(false);
        }
    };


    const uploadToCloudinary = async (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append(
            'upload_preset',
            import.meta.env.VITE_PUBLIC_CLOUDINARY_PRESET
        );

        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );

        return res.data.secure_url;
    };

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

                {/* Thumbnail Update */}
                <label className="block font-medium mb-1">
                    Assignment Thumbnail
                </label>

                {/* Existing Image Preview */}
                {formData.thumbnail && !preview && (
                    <img
                        src={formData.thumbnail}
                        alt="Current thumbnail"
                        className="h-40 w-full object-cover rounded-xl mb-3 border"
                    />
                )}

                {/* New Image Preview */}
                {preview && (
                    <img
                        src={preview}
                        alt="New thumbnail preview"
                        className="h-40 w-full object-cover rounded-xl mb-3 border"
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setNewThumbnail(file);
                            setPreview(URL.createObjectURL(file));
                        }
                    }}
                />

                <p className="text-xs text-gray-500 mt-1">
                    Upload a new image only if you want to change it
                </p>

                {validationErrors.thumbnail && (
                    <p className="text-red-500 text-sm mt-1">
                        {validationErrors.thumbnail}
                    </p>
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
                    className="btn btn-primary w-full"
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Update Assignment'}
                </button>
            </form>

        </div>
    );
};

export default UpdateAssignment;