import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../Navbar/Navbar";
import CardKolam from "../CardKolam/CardKolam";
import BackButton from "../BackButton/BackButton";
import "./KolamIkan.css";

const KolamIkan = () => {
  const [devices, setDevices] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { ID } = useParams();

  useEffect(() => {
    const token = Cookies.get();
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/loginsignup");
      return;
    }
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:3001/group/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        const { data } = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setDevices(data);
          setGroupName(data[0].group_name || "Kolam Ikan Saya");
        } else {
          setGroupName("Kolam Ikan Saya");
        }
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
        if (error.response && error.response.status === 401) {
          navigate("/loginsignup");
        }
      });
  }, [ID, navigate]);

  const handleDetailsClick = useCallback(
    (deviceId, deviceName) => {
      navigate(`/sensor-monitoring/${deviceId}`, { state: { deviceName } });
    },
    [navigate]
  );

  const handleTambahKolamClick = useCallback(() => {
    const safeGroupName = groupName || "default-group-name";
    navigate(`/adddevice/${safeGroupName}/${ID}`);
  }, [navigate, groupName, ID]);

  const handleEditClick = useCallback(() => {
    setEditMode((prevEditMode) => !prevEditMode);
  }, []);

  const handleDeleteClick = useCallback((deviceId) => {
    setDevices((devices) => devices.filter((device) => device.ID !== deviceId));
    requestAnimationFrame(() => {
      axios
        .delete(`http://localhost:3001/device/delete/${deviceId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .catch((error) => {
          console.error("Error deleting device:", error);
        });
    });
  }, []);

  return (
    <div className="kolam-ikan-page">
      <Navbar />
      <div className="kolam-ikan-container">
        <div className="kolam-ikan-header">
          <BackButton />
          <div className="kolam-ikan-title">{groupName}</div>
          <div className="kolam-ikan-underline"></div>
        </div>
        <div className="card-container">
          <div className="edit-container">
            <button
              className={`edit-button ${editMode ? "active" : ""}`}
              onClick={handleEditClick}
            >
              {editMode ? "Done" : "Edit"}
            </button>
          </div>
          {devices.map((device) => (
            <div key={device.ID}>
              <CardKolam
                title={device.Name}
                description={`Aktivasi: ${
                  device.IsActivated ? "Aktif" : "Tidak Aktif"
                }`}
                status={device.IsActivated ? "Aktif" : "Tidak Aktif"}
                onDetailsClick={() =>
                  handleDetailsClick(device.ID, device.Name)
                }
                onDeleteClick={() => handleDeleteClick(device.ID)}
                editMode={editMode}
              />
            </div>
          ))}
          <div className="add-device-container">
            <button
              className="add-device-button"
              onClick={handleTambahKolamClick}
            >
              Tambah Device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KolamIkan;
