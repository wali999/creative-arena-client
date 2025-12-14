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
                Component: ContestDetails
            },
            {
                path: 'payment-success',
                element: <PaymentSuccess></PaymentSuccess>
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
                path: 'my-articipated-contests',
                Component: MyParticipated
            },

            // Creator only route
            {
                path: 'add-contest',
                Component: AddContest
            },
            {
                path: 'my-created-contests',
                Component: MyCreatedContests
            },
            {
                path: 'edit-contest/:id',
                Component: EditContest
            },

            // Admin only route
            {
                path: 'manage-users',
                Component: ManageUsers
            },
            {
                path: 'manage-contests',
                Component: ManageContests
            }
        ]
    }
]);