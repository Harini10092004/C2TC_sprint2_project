import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, isAuthenticated } from "../services/authService";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="nav">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: 18 }}>PlacementService</Link>
        <Link to="/placements" style={{ marginLeft: 12 }}>Placements</Link>
      </div>
      <div>
        {isAuthenticated() ? (
          <>
            <button className="btn btn-primary" style={{ marginRight: 8 }} onClick={() => navigate("/placements/new")}>New Placement</button>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
