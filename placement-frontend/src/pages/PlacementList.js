import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPlacements, deletePlacement } from "../services/api";

export default function PlacementList() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getAllPlacements();
      setPlacements(res.data || []);
    } catch (e) {
      setErr("Failed to load placements. Make sure backend is running on http://localhost:8080");
    } finally {
      setLoading(false);
    }
  };

  const doDelete = async (id) => {
    if (!window.confirm("Delete placement?")) return;
    try {
      await deletePlacement(id);
      load();
    } catch (e) {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2>Placements</h2>
        <Link to="/placements/new"><button className="btn btn-primary">Add Placement</button></Link>
      </div>

      <div className="card">
        {loading ? (
          <div>Loading...</div>
        ) : err ? (
          <div style={{ color: "red" }}>{err}</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Role</th>
                <th>Package</th>
                <th>Drive Date</th>
                <th>Location</th>
                <th>Eligibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {placements.length === 0 && (
                <tr><td colSpan="8"><small>No placements found.</small></td></tr>
              )}
              {placements.map((p) => (
                <tr key={p.placementId}>
                  <td>{p.placementId}</td>
                  <td>{p.companyName}</td>
                  <td>{p.jobRole}</td>
                  <td>{p.packageOffered}</td>
                  <td>{p.driveDate}</td>
                  <td>{p.location}</td>
                  <td>{p.eligibilityCriteria}</td>
                  <td>
                    <Link to={`/placements/edit/${p.placementId}`} style={{ marginRight: 8 }}>Edit</Link>
                    <button className="btn btn-danger" onClick={() => doDelete(p.placementId)} style={{ marginLeft: 6 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
