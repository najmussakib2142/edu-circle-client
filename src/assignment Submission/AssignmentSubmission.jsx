// import React from 'react';
// import { Link, useLoaderData, useParams } from 'react-router';
// import useAuth from '../hooks/useAuth';

// const AssignmentSubmission = () => {

//     const { title } = useLoaderData()
//     const { id: assignmentId } = useParams();
//     const { user } = useAuth()

//     const handleSubmit = e => {
//         e.preventDefault();
//         const form = e.target;
//         const link = form.link.value;
//         const note = form.note.value;
//         console.log(link, note);
//     }

//     // console.log(assignmentId, user);
//     return (
//         <div>
//             <div className=" py-10 inset-0 backdrop-blur-lg transition-all bg-opacity-40 flex items-center justify-center z-50">
//                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
//                     <h3 className="text-xl font-semibold mb-4 text-center">Submit Assignment for : <br /> {title}</h3>

//                     <form >
//                         <label className="block text-sm font-medium mb-1">Google Docs Link</label>
//                         <input type="url" name='link' placeholder="https://docs.google.com/..." required className="input input-bordered w-full mb-4" />

//                         <label className="block text-sm font-medium mb-1">Quick Note</label>
//                         <textarea name='note' placeholder="Add any note..." className="textarea textarea-bordered w-full mb-4"></textarea>

//                         <div className="flex justify-between">
//                             <Link to={`/assignment/${assignmentId}`}>
//                                 <button type="button"
//                                     // onClick={() => setShowModal(false)} 
//                                     className="btn">Cancel</button>
//                             </Link>
//                             <button type="submit" className="btn btn-primary">Submit</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AssignmentSubmission;