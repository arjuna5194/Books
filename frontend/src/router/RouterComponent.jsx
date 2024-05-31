import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminHome from "../pages/AdminHome/AdminHome";
import Book from "../pages/Book/Book";

const RouterComponent = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes isAdminRoute={false}>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin-home"
          element={
            <ProtectedRoutes isAdminRoute={true}>
              <AdminHome />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoutes isAdminRoute={false}>
              <Book />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default RouterComponent;
