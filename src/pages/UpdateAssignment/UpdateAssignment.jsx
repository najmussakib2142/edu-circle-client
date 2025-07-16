import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';

const UpdateAssignment = () => {

    const { id,
        title,
        description,
        marks,
        thumbnail,
        difficulty,
        creatorEmail, } = useParams()
    const { user } = useAuth()
    console.log(id, title, user);

    const [assignment, setAssignment] = useState(null)
    return (
        <div className="max-w-3xl mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6 text-primary">Update Assignment</h2>
            <form>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={assignment.title}
                />
            </form>
        </div>
    );
};

export default UpdateAssignment;