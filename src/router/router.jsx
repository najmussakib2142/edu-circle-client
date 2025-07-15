import {
    createBrowserRouter,
} from "react-router";
import Home from "../pages/Home/Home";
import RootLayout from "../layouts/RootLayout";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import CreateAssignment from "../pages/Create Assignment/CreateAssignment";
import AssignmentDetails from "../pages/Assignment Details/AssignmentDetails";
import Loading from "../pages/shared/Loading";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'signIn',
                element: <SignIn></SignIn>
            },
            {
                path: 'createAssignment',
                element: <CreateAssignment></CreateAssignment>
            },
            {
                path: 'assignment/:id',
                element: <AssignmentDetails></AssignmentDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/assignments/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>
            },
        ]
    },
]);

export default router;