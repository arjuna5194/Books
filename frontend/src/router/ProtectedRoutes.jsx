import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfile } from "../apis/user";

const ProtectedRoutes = ({ children, isAdminRoute }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const userProfile = await getProfile();
        setProfile(userProfile);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    // Optionally, you can return a loading indicator here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdminRoute && profile?.isAdmin) {
    return children;
  } else if (isAdminRoute) {
    return <Navigate to="/" />;
  } else if (profile?.isAdmin) {
    return <Navigate to="/admin-home" />;
  }

  return children;
};

export default ProtectedRoutes;
