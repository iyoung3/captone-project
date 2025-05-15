import React, { useState } from 'react';
import '../../src/styles/ReferralPage.css';
import DoctorNavbar from '../components/DoctorNavbar';

export default function ReferralPage() {
  const [userId, setUserId] = useState('');
  const [referralReason, setReferralReason] = useState('');
  const [referralDate, setReferralDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://capstone-project.up.railway.app/referral/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, referralReason, referralDate, notes }),
      });

      if (res.ok) {
        alert('Rujukan berhasil dikirim!');
        setUserId('');
        setReferralReason('');
        setReferralDate('');
        setNotes('');
      } else {
        alert('Gagal mengirim rujukan.');
      }
    } catch (error) {
      console.error('Error saat mengirim rujukan:', error);
    }
  };

  return (
    <div>
        <DoctorNavbar />
        <div className="referral-container">
      <h2 className="title">Buat Rujukan</h2>
      <form onSubmit={handleSubmit} className="referral-form">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Alasan Rujukan"
          value={referralReason}
          onChange={(e) => setReferralReason(e.target.value)}
          required
        />
        <input
          type="date"
          value={referralDate}
          onChange={(e) => setReferralDate(e.target.value)}
        />
        <textarea
          placeholder="Catatan Tambahan"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">Kirim Rujukan</button>
      </form>
    </div>
    </div>
    
  );
}
