import React, { useState, useEffect } from "react";
import "./UserDetails.css";
import { API_URL } from "../../../data/ApiPath";

const UserDetails = () => {
  const [vendor, setVendor] = useState(null);
  const [firm, setFirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("loginToken");
      if (!token) {
        setError("Authorization token missing. Please log in.");
        setLoading(false);
        return;
      }

      // Fetch Vendor profile
      const response = await fetch(`${API_URL}/vendor/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.vendor) {
        setVendor(data.vendor);

        // Fetch firm details if they have one linked
        const hasFirm = data.vendor.firm && data.vendor.firm.length > 0;
        const savedFirmId = localStorage.getItem("firmId") || (hasFirm ? data.vendor.firm[0] : null);

        if (savedFirmId) {
          try {
            const firmRes = await fetch(`${API_URL}/firm/${savedFirmId}`);
            const firmData = await firmRes.json();
            if (firmRes.ok && firmData.firm) {
              setFirm(firmData.firm);
            } else if (firmRes.ok && firmData.firmName) {
              setFirm({ firmName: firmData.firmName });
            }
          } catch (err) {
            console.error("Failed to fetch firm details:", err);
          }
        }
      } else {
        setError(data.message || "Failed to fetch profile details.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error fetching profile details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="userDetailsSection">
        <div className="profile-card">
          <div className="profile-loader">
            <div className="spinner"></div>
            <p>Loading Vendor Details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="userDetailsSection">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-circle" style={{ color: "#ef4444", borderColor: "#fca5a5" }}>⚠️</div>
            <h3>Error</h3>
            <span className="vendor-badge" style={{ backgroundColor: "#fee2e2", color: "#ef4444" }}>Failed</span>
          </div>
          <div className="detail-item" style={{ borderColor: "#fee2e2", backgroundColor: "#fef2f2" }}>
            <div className="detail-info">
              <span className="detail-label" style={{ color: "#ef4444" }}>Message</span>
              <span className="detail-value" style={{ color: "#991b1b" }}>{error}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const initial = vendor && vendor.username ? vendor.username.charAt(0).toUpperCase() : "V";

  return (
    <div className="userDetailsSection">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-circle">{initial}</div>
          <h3>{vendor?.username}</h3>
          <span className="vendor-badge">Active Vendor</span>
        </div>

        <div className="profile-details-list">
          <div className="detail-item">
            <span className="detail-icon">📧</span>
            <div className="detail-info">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{vendor?.email}</span>
            </div>
          </div>


          <div className="detail-item">
            <span className="detail-icon">🏪</span>
            <div className="detail-info">
              <span className="detail-label">Linked Restaurant</span>
              {firm ? (
                <>
                  <span className="detail-value" style={{ color: "var(--primary-hover)" }}>
                    {firm.firmName}
                  </span>
                  {firm.area && (
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
                      📍 {firm.area} {firm.offer ? `• 🏷️ ${firm.offer}` : ""}
                    </span>
                  )}
                </>
              ) : (
                <span className="detail-value no-firm">No firm registered yet. Please add a firm from the sidebar.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
