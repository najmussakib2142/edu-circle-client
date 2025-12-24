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
import SubmitReview from "../pages/SubmitReview/SubmitReview";
import BookmarkedAssignments from "../pages/BookmarkedAssignments/BookmarkedAssignments";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreatorAssignmentDetail from "../pages/Dashboard/CreatorAssignmentDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        errorElement: <ErrorPage></ErrorPage>,
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
                path: 'assignment/:id',
                element:
                    <PrivateRoute><AssignmentDetails></AssignmentDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://edu-circle-server-seven.vercel.app/assignments/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>,
                // errorElement: <SignIn></SignIn>
            },

            {
                path: 'pendingAssignments',
                element: <PrivateRoute><PendingAssignments></PendingAssignments></PrivateRoute>
            },
            {
                path: "submit-review",
                element: <PrivateRoute><SubmitReview></SubmitReview></PrivateRoute>,
            },

        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Dashboard></Dashboard>
            },
            {
                path: 'creator-assignments/:id',
                element: <CreatorAssignmentDetail></CreatorAssignmentDetail>,
            },
            {
                path: 'update/:id',
                element: <PrivateRoute><UpdateAssignment></UpdateAssignment></PrivateRoute>,
                loader: ({ params }) => fetch(`https://edu-circle-server-seven.vercel.app/assignments/${params.id}`),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: 'createAssignment',
                element:
                    <PrivateRoute><CreateAssignment></CreateAssignment> </PrivateRoute>
            },
            {
                path: "bookmarkedAssignments",
                element: <PrivateRoute><BookmarkedAssignments></BookmarkedAssignments></PrivateRoute>,
            },
            {
                path: 'mySubmissions',
                element:
                    <PrivateRoute><MySubmissions></MySubmissions></PrivateRoute>
            },

        ]
    }
]);

export default router;