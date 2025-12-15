import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllContests from "../pages/Contests/AllContests";
import ContestDetails from "../pages/Contests/ContestDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AddContest from "../pages/Dashboard/Creator/AddContest";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import MyCreatedContests from "../pages/Dashboard/Creator/MyCreatedContests";
import EditContest from "../pages/Dashboard/Creator/EditContest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";
import MyParticipated from "../pages/Dashboard/User/MyParticipated";
import PaymentSuccess from "../pages/Contests/payment-success";
import SubmittedTasks from "../pages/Dashboard/Creator/SubmittedTasks";
import MyWinningContests from "../pages/Dashboard/User/MyWinningContests";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import Leaderboard from "../pages/Extra/Leaderboard";
import AdminRoute from "./AdminRoute";
import CreatorRoute from "./CreatorRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'all-contests',
                Component: AllContests
            },
            {
                path: 'all-contests/:id',
                element: <PrivateRoute><ContestDetails></ContestDetails></PrivateRoute>
            },
            {
                path: 'payment-success',
                element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>
            },
            {
                path: 'leaderboard',
                Component: Leaderboard
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },

            // User only route
            {
                path: 'my-profile',
                Component: MyProfile
            },
            {
                path: 'my-participated-contests',
                Component: MyParticipated
            },
            {
                path: 'my-winning-contests',
                element: <MyWinningContests />
            },

            // Creator only route
            {
                path: 'add-contest',
                element: <CreatorRoute><AddContest></AddContest></CreatorRoute>
            },
            {
                path: 'my-created-contests',
                element: <CreatorRoute><MyCreatedContests></MyCreatedContests></CreatorRoute>
            },
            {
                path: 'edit-contest/:id',
                element: <CreatorRoute><EditContest></EditContest></CreatorRoute>
            },
            {
                path: 'submitted-task',
                element: <CreatorRoute><SubmittedTasks></SubmittedTasks></CreatorRoute>
            },

            // Admin only route
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'manage-contests',
                element: <AdminRoute><ManageContests></ManageContests></AdminRoute>
            }
        ]
    }
]);