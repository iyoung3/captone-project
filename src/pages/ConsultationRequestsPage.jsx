import React, { useEffect, useState } from 'react';
import DoctorNavbar from '../components/DoctorNavbar';

export default function ConsultationRequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {

    const fetchRequests = async () => {
      try {
        const res = await fetch('https://capstone-project.up.railway.app/api/consultation-requests');
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error('Gagal mengambil permintaan konsultasi:', err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
        <DoctorNavbar />
        <div className="consultation-requests-container">
      <h2 className="title">Permintaan Konsultasi</h2>
      {requests.length === 0 ? (
        <p>Tidak ada permintaan konsultasi saat ini.</p>
      ) : (
        <ul className="request-list">
          {requests.map((req, index) => (
            <li key={index} className="request-item">
              <strong>{req.userName}</strong> - {req.reason}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
    
  );
}
