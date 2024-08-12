import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../layouts/MainLayout";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Login from "../pages/login";
import LandingPage from "../pages/landingPage";
import Dashboard from "../pages/dashboard";

const AppRoutes: React.FC = () => {
  const {token} = useTypedSelector((state) => state.auth); // Get the loading state from the store

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
