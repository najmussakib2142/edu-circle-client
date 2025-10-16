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
import PrivateRoute from "../routes/PrivateRoute";
// import AssignmentSubmission from "../assignment Submission/AssignmentSubmission";
import MySubmissions from "../pages/MySubmissions/MySubmissions";
import Assignments from "../pages/Home/Assignments";
import AllAssignments from "../pages/Home/AllAssignments";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import UpdateAssignment from "../pages/UpdateAssignment/UpdateAssignment";
import PendingAssignments from "../pages/PendingAssignments/PendingAssignments";
import assignmentLoader from "../api/assignmentLoader";

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
                path: 'assignments',
                loader: () => fetch('https://edu-circle-server-seven.vercel.app/assignments'),
                element: <AllAssignments></AllAssignments>,
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: 'mySubmissions',
                element:
                    <PrivateRoute><MySubmissions></MySubmissions></PrivateRoute>
            },
            {
                path: 'createAssignment',
                element:
                    <PrivateRoute><CreateAssignment></CreateAssignment> </PrivateRoute>
            },
            {
                path: 'assignment/:id',
                element:
                    <PrivateRoute><AssignmentDetails></AssignmentDetails></PrivateRoute>,
                loader: ({params}) =>  fetch(`https://edu-circle-server-seven.vercel.app/assignments/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>,
                // errorElement: <SignIn></SignIn>
            },
            {
                path: 'update/:id',
                element: <PrivateRoute><UpdateAssignment></UpdateAssignment></PrivateRoute>,
                loader: ({params}) =>  fetch(`https://edu-circle-server-seven.vercel.app/assignments/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: 'pendingAssignments',
                element: <PrivateRoute><PendingAssignments></PendingAssignments></PrivateRoute>
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
]);

export default router;