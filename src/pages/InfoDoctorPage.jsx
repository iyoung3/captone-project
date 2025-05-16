import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/InfoDoctorPage.css";
import UserNavbar from "../components/UserNavbar";
import {fetchDoctors} from "../services/userService";

export default function InfoDoctorPage() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [doctors, setDoctors] = useState([]);
  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const searchDoctors = async (page, perPage) => {
      try{

        const data = await fetchDoctors({page, perPage})

        setDoctors(data.data);
          setTotal(data.total);
      }catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Gagal mengambil data dokter.");
      }

    };

    searchDoctors(page, perPage);
  }, [page, perPage]);


  const initiateConsultation = async (doctorId) => {
    try {
      const res = await fetch('https://capstone-project.up.railway.app/user/initiate-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ doctorId }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Konsultasi dimulai.");
        navigate(`/user/chat/${doctorId}`, { state: { doctor: result.doctor } });
      } else {
        alert(result.message || "Gagal memulai konsultasi.");
      }
    } catch (err) {
      console.error("Gagal memulai konsultasi:", err);
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="info-doctor-container">
      <h1 className="info-doctor-title">Cari Dokter</h1>

      <div className="info-doctor-controls">
        <input
          type="text"
          placeholder="Cari nama atau spesialisasi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <p className="doctor-name">{doctor.name}</p>
            <p>Spesialis: {doctor.specialization}</p>
            <p>Rumah Sakit: {doctor.hospitalAffiliation}</p>
            <button
              onClick={() => initiateConsultation(doctor.id)}
              className="start-consultation-btn"
            >
              Mulai Konsultasi
            </button>
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
        <span className="pagination-info">Halaman {page} dari {Math.ceil(total/perPage)}</span>
        <button
          onClick={() => setPage(page < total ? page + 1 : total)}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
    </div>
    
  );
}
