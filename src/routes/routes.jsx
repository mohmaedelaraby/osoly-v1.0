import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import MainLayout from "../layouts/MainLayout";
import UserFormPage from "../pages/users/UserFormPage";
import UserTablePage from "../pages/users/UserTablePage";
import OwenrsTablePage from "../pages/owners/OwenrsTablePage";
import OwnersFormPage from "../pages/owners/OwnersFormPage";
import AdsTablePage from "../pages/ads/AdsTablePage";
import AdsFormPage from "../pages/ads/AdsFormPage";
import TicketsPage from "../pages/Tickets/TicketsPage";
import SettingsPage from "../pages/settings/SettingsPage";

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
        <Route path="/ads" index element={<AdsTablePage/>} />
        <Route path="/ad" index element={<AdsFormPage/>} />
        <Route path="/tickets" index element={<TicketsPage/>} />
        <Route path="/settings" index element={<SettingsPage/>} />
        <Route path="/building" index element={<>building </>} />
      </Route>
    </Routes>
  );
};
