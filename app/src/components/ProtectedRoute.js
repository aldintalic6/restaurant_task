// checks if the route can be accessed (e.g. profile cannot be accessed if user not logged in)

import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useUser } from "../contexts/UserContext";

const ProtectedRoute = ({element}) => {
    const { user, loading } = useUser();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // You can customize the loading indicator
    }

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return element;
};

export default ProtectedRoute;