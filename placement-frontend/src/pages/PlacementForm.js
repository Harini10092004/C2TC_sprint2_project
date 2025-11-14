import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPlacement, getPlacementById, updatePlacement } from "../services/api";

export default function PlacementForm() {
  const { id } = useParams(); // id => placementId
  const navigate = useNavigate();
  const [placement, setPlacement] = useState({
    placementId: "",
    companyName: "",
    jobRole: "",
    packageOffered: "",
    driveDate: "",
    location: "",
    eligibilityCriteria: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getPlacementById(id)
        .then(res => {
          setPlacement(res.data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  const change = (e) => {
    const { name, value } = e.target;
    setPlacement(prev => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePlacement(id, placement);
      } else {
        // For create: ensure placementId may be handled by backend or you can set one
        await createPlacement(placement);
      }
      navigate("/placements");
    } catch (err) {
      alert("Save failed. Check backend logs.");
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div className="card">
        <h2>{id ? "Edit Placement" : "New Placement"}</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={submit}>
            <div className="form-row">
              <label>Placement ID</label>
              <input name="placementId" value={placement.placementId} onChange={change} type="number" required />
            </div>

            <div className="form-row">
              <label>Company Name</label>
              <input name="companyName" value={placement.companyName || ""} onChange={change} type="text" required />
            </div>

            <div className="form-row">
              <label>Job Role</label>
              <input name="jobRole" value={placement.jobRole || ""} onChange={change} type="text" required />
            </div>

            <div className="form-row">
              <label>Package Offered (eg: 4.5)</label>
              <input name="packageOffered" value={placement.packageOffered || ""} onChange={change} type="number" step="0.01" required />
            </div>

            <div className="form-row">
              <label>Drive Date (string)</label>
              <input name="driveDate" value={placement.driveDate || ""} onChange={change} type="text" placeholder="YYYY-MM-DD or any format" />
            </div>

            <div className="form-row">
              <label>Location</label>
              <input name="location" value={placement.location || ""} onChange={change} type="text" />
            </div>

            <div className="form-row">
              <label>Eligibility Criteria</label>
              <textarea name="eligibilityCriteria" value={placement.eligibilityCriteria || ""} onChange={change} rows="4" />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary" type="submit">{id ? "Update" : "Save"}</button>
              <button className="btn" type="button" onClick={() => navigate("/placements")}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
