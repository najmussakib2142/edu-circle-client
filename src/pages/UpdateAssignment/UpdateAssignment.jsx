import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import DatePicker from 'react-datepicker';
import { useLoaderData, useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAccessToken from '../../api/useAccessToken';
import Loading from '../shared/Loading';

const UpdateAssignment = () => {

    const { user } = useAuth();
    const { id } = useParams()
    // const navigate = useNavigate()
    const { _id } = useLoaderData()
    // const [accessToken, setAccessToken] = useState('');
    const {accessToken, loading} = useAccessToken()

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
    // useEffect(() => {
    //     const getToken = async () => {
    //         if (user) {
    //             const token = await user.getIdToken();
    //             setAccessToken(token);
    //         }
    //     };
    //     getToken();
    // }, [user]);

    // useEffect(() => {
    //     if (!accessToken || !id) return;

    //     axios.get(`http://localhost:5000/assignments/${id}`, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`
    //         }
    //     })
    //         .then(res => {
    //             const assignment = res.data;
    //             setFormData({
    //                 ...assignment,
    //                 dueDate: new Date(assignment.dueDate)
    //             })
    //         })
    //         .catch(error => {
    //             Swal.fire('Error!', 'Failed to load assignment data.', 'error', error);
    //         })
    // }, [id, accessToken])

    useEffect(() => {
        if (loading || !accessToken || !id) return

        const fetchAssignment = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/assignments/${id}`, {
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
    }, [id,loading, accessToken]);

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

        // const assignment = updateAssignment.name;

        Swal.fire({
            title: "Are you sure?",
            text: `You want to update this assignment?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1F1A70",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/assignments/${id}`, {
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
                            });

                        }
                    });
            }
        })
    }

    return (
        <div className="max-w-3xl mx-auto px-5 py-10">
            <h2 className="text-3xl font-bold mb-6 text-primary">Update This Assignment</h2>


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


                {/* Thumbnail URL */}
                <label htmlFor="thumbnail" className="block font-medium mb-1">
                    Thumbnail URL
                </label>
                <input
                    type="text"
                    name="thumbnail"
                    className="input input-bordered w-full"
                    placeholder="Thumbnail URL"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    required
                />

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


                {/* Due Date */}
                <div>
                    <label className="block mb-1 font-medium">Due Date</label>
                    {/* <input type="date" name="startDate" defaultValue={dueDate} className="input w-full select-primary" /> */}

                    <DatePicker
                        selected={formData.dueDate}
                        onChange={(date) =>
                            setFormData(oldData => ({ ...oldData, dueDate: date }))
                        }
                        dateFormat="yyyy-MM-dd"
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