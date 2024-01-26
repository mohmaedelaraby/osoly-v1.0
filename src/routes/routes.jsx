import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import MainLayout from "../layouts/MainLayout";
import UserFormPage from "../pages/users/UserFormPage";
import UserTablePage from "../pages/users/UserTablePage";
import OwenrsTablePage from "../pages/owners/OwenrsTablePage";
import OwnersFormPage from "../pages/owners/OwnersFormPage";

export const RootRoutes = () => {
  const navigate = useNavigate();

  // Check if the current location is the root path ("/")
  React.useEffect(() => {
    if (window.location.pathname === "/") {
      // Redirect to "/home" if the path is "/"
      navigate("/home");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/home" index element={<HomePage />} />
        <Route path="/user" index element={<UserFormPage />} />
        <Route path="/users" index element={<UserTablePage />} />
        <Route path="/owners" index element={<OwenrsTablePage/>} />
        <Route path="/owner" index element={<OwnersFormPage/>} />
        <Route path="/ads" index element={<>ads</>} />
        <Route path="/tickets" index element={<>tickets</>} />
      </Route>
    </Routes>
  );
};
