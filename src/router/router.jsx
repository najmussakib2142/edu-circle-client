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
                loader: () => fetch('http://localhost:5000/assignments'),
                element: <AllAssignments></AllAssignments>,
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: 'mySubmissions',
                element:
                    <PrivateRoute>
                        <MySubmissions></MySubmissions>
                    </PrivateRoute>
            },
            {
                path: 'createAssignment',
                element:
                    <PrivateRoute>
                        <CreateAssignment></CreateAssignment>
                    </PrivateRoute>
            },
            {
                path: 'assignment/:id',
                element:
                    <PrivateRoute>
                        <AssignmentDetails></AssignmentDetails>
                    </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/assignments/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
]);

export default router;