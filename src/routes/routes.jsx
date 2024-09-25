import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import MainLayout from "../layouts/MainLayout";
import UserTablePage from "../pages/users/UserTablePage";

import TicketsPage from "../pages/Tickets/TicketsPage";
import SettingsPage from "../pages/settings/SettingsPage";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/Auth/LoginPage";
import PropertiesTablePage from "../pages/Properties/PropertiesPage";

import EnterpraisUserTablePage from "../pages/EnterpraisUsers/EnterpraisUserTablePage";
import { ProtectedRoutes } from "./protectedRoutes";
import ContractsTablePage from "../pages/contracts/ContractsTablePage";
import FinanceTablePage from "../pages/finance/ContractsTablePage";
import PravicyPolicyPage from "../pages/Pravicy/PravicyPolicyPage";
import UserDeletePreviewPage from "../pages/users/UserDeletePreview";

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
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <MainLayout />
          </ProtectedRoutes>
        }
      >
        <Route path="/home" index element={<HomePage />} />
        <Route path="/users" index element={<UserTablePage />} />
        <Route
          path="/enterprises"
          index
          element={<EnterpraisUserTablePage />}
        />
        <Route path="/tickets" index element={<TicketsPage />} />
        <Route path="/settings" index element={<SettingsPage />} />
        <Route path="/PravicyPolicyPage" index element={<PravicyPolicyPage />} />
        <Route path="/users/delete" index element={<UserDeletePreviewPage />} />
        <Route path="/propreties" index element={<PropertiesTablePage />} />
        <Route path="/contracts" index element={<ContractsTablePage />} />
        <Route path="/finance" index element={<FinanceTablePage />} />
      </Route>

      <Route path="login" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
