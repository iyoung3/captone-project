import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDoctors, initiateConsultation } from "../services/userService";
import defaultAvatar from "../assets/doctor-avatar.png";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

export default function SearchDoctors() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [doctors, setDoctors] = useState([]);
  const [total, setTotal] = useState(1);
  const [specialization, setSpecialization] = useState("");
  const navigate = useNavigate();

  const totalPage = Math.ceil(total / perPage);

  useEffect(() => {
    const searchDoctors = async () => {
      try {
        const data = await fetchDoctors({ page, perPage, specialization });
        setDoctors(data.data);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Gagal mengambil data dokter.");
      }
    };

    searchDoctors();
  }, [page, perPage, specialization]);

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
    <div className="w-full pb-16">
      <h1 className="text-2xl mt-8">Cari Dokter</h1>

      <select
          value={specialization}
          onChange={(e) => {
            setPage(1);
            setSpecialization(e.target.value);
          }}
          className="input w-full my-4 bg-white"
      >

        <option value="">Pilih Spesialisasi</option>
        <option value="DERMATOLOGY">DERMATOLOGY</option>
        <option value="CARDIOLOGY">CARDIOLOGY</option>
        <option value="NEUROLOGY">NEUROLOGY</option>
        <option value="PEDIATRICS">PEDIATRICS</option>
        <option value="PSYCHIATRY">PSYCHIATRY</option>
        <option value="ORTHOPEDICS">ORTHOPEDICS</option>
        <option value="GYNECOLOGY">GYNECOLOGY</option>
        <option value="OPHTHALMOLOGY">OPHTHALMOLOGY</option>
        <option value="RADIOLOGY">RADIOLOGY</option>
        <option value="ANESTHESIOLOGY">ANESTHESIOLOGY</option>

      </select>

      {doctors.length > 0 && (
          <>
            <div className="flex flex-col gap-6">
              {doctors.map((doctor) => (
                  <div key={doctor.doctorId} className="doctor-card shadow p-6 flex relative">
                    <div className="w-1/4">

                      <img
                          src={defaultAvatar}
                          alt="avatar"
                          className="w-full aspect-square"
                      />
                    </div>
                    <div className="pl-4 flex flex-col flex-1 min-w-0">
                      <p className="font-bold capitalize truncate">{doctor.name}</p>
                      <p className={'text-neutral-800 capitalize'}>Spesialis: {doctor.specialization}</p>
                  <p className={'text-xs text-neutral-500'}>Rumah Sakit: {doctor.hospitalAffiliation}</p>
                <button
                  onClick={() => handleOnClick(doctor.doctorId)}
                  className="text-primary font-bold mt-12 ml-auto"
                >
                  Mulai Konsultasi
                </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-evenly my-8 items-center">
            <button
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
              className={`${page > 1?'bg-primary rounded-lg text-white':'opacity-0 cursor-default'} p-4`}
            >
              <FaChevronLeft />
            </button>
            <span className="text-neutral-500">
              Halaman {page} dari {totalPage}
            </span>
            <button
              onClick={() =>
                setPage(page < totalPage ? page + 1 : totalPage)
              }
              className={`${page < totalPage?'bg-primary rounded-lg text-white':'opacity-0 cursor-default'} p-4`}
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      )}

      {specialization.trim() !== "" && doctors.length === 0 && (
        <p className="no-result">Tidak ditemukan dokter yang sesuai.</p>
      )}
    </div>
  );
}
