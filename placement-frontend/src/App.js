import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import PlacementList from "./pages/PlacementList";
import PlacementForm from "./pages/PlacementForm";
import NotFound from "./pages/NotFound";
import { isAuthenticated } from "./services/authService";

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 1000, margin: "20px auto", padding: "0 16px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/placements" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/placements"
            element={
              <PrivateRoute>
                <PlacementList />
              </PrivateRoute>
            }
          />
          <Route
            path="/placements/new"
            element={
              <PrivateRoute>
                <PlacementForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/placements/edit/:id"
            element={
              <PrivateRoute>
                <PlacementForm />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

