import React, { use, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthContext';
import { delay } from 'motion';
import useAuth from '../../hooks/useAuth';

const CreateAssignment = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [marks, setMarks] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [dueDate, setDueDate] = useState(new Date());

    const navigate = useNavigate();
    const { user } = useAuth();

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!title || !description || !marks || !thumbnail || !difficulty) {
            return Swal.fire('Error!', 'Please fill out all fields.', 'error');
        }

        if (description.length < 20) {
            return Swal.fire('Error!', 'Description must be at least 20 characters.', 'error');
        }

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
            const res = await axios.post('http://localhost:5000/assignments', newAssignment);
            if (res.data.insertedId) {
                Swal.fire('Success!', 'Assignment created successfully!', 'success');
                navigate('/assignments');

            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6 text-primary">Create New Assignment</h2>

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

                {/* Description */}
                <textarea
                    placeholder="Assignment Description (at least 20 characters)"
                    className="textarea textarea-bordered w-full"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                {/* Marks */}
                <input
                    type="number"
                    placeholder="Marks"
                    className="input input-bordered w-full"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    required
                />

                {/* Thumbnail URL */}
                <input
                    type="text"
                    placeholder="Thumbnail Image URL"
                    className="input input-bordered w-full"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    required
                />

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
                        dateFormat="yyyy-MM-dd"
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
