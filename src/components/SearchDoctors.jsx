import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InfoDoctorPage.css";
import { fetchDoctors, initiateConsultation } from "../services/userService";
import defaultAvatar from "../assets/doctor-avatar.png";
import UserNavbar from "./UserNavbar";

export default function SearchDoctors() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [doctors, setDoctors] = useState([]);
  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const totalPage = Math.ceil(total / perPage);

  useEffect(() => {
    const searchDoctors = async () => {
      try {
        if (search.trim() === "") {
          setDoctors([]);
          return;
        }

        const data = await fetchDoctors({ page, perPage, search });
        setDoctors(data.data);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Gagal mengambil data dokter.");
      }
    };

    searchDoctors();
  }, [page, perPage, search]);

  const handleOnClick = async (doctorId) => {
    try {
      const res = await initiateConsultation(doctorId);
      if (res) navigate(`/user/chat/${doctorId}`);
    } catch (err) {
      console.error("Gagal memulai konsultasi:", err);
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <div>
<div className="info-doctor-container">
      <h1 className="info-doctor-title">Cari Dokter</h1>

      <div className="info-doctor-controls">
        <input
          type="text"
          placeholder="Cari nama atau spesialisasi..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="search-input"
        />
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="select-per-page"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      {search.trim() !== "" && doctors.length > 0 && (
        <>
          <div className="doctor-list">
            {doctors.map((doctor) => (
              <div key={doctor.doctorId} className="doctor-card">
                <img
                  src={defaultAvatar}
                  alt="avatar"
                  className="doctor-avatar"
                />
                <div className="doctor-info">
                  <p className="doctor-name">{doctor.name}</p>
                  <p>Spesialis: {doctor.specialization}</p>
                  <p>Rumah Sakit: {doctor.hospitalAffiliation}</p>
                  <button
                    onClick={() => handleOnClick(doctor.doctorId)}
                    className="start-consultation-btn"
                  >
                    Mulai Konsultasi
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination-controls">
            <button
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="pagination-info">
              Halaman {page} dari {totalPage}
            </span>
            <button
              onClick={() =>
                setPage(page < totalPage ? page + 1 : totalPage)
              }
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </>
      )}

      {search.trim() !== "" && doctors.length === 0 && (
        <p className="no-result">Tidak ditemukan dokter yang sesuai.</p>
      )}
    </div>
    <UserNavbar/>
    </div>
    
  );
}
