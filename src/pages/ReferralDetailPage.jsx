import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getReferral } from "../services/userService";
import { QRCodeCanvas } from 'qrcode.react';

export default function ReferralDetailPage() {
  const { referralId } = useParams();
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef();

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const response = await getReferral(referralId);
        if (response) {
          setReferral(response.data);
        } else {
          alert("Data rujukan tidak ditemukan.");
        }
        setLoading(false);
      } catch (err) {
        alert("Gagal mengambil data rujukan.");
        console.error(err);
        setLoading(false);
      }
    };
    fetchReferral();
  }, [referralId]);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Cetak Rujukan</title>");
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) return <p>Memuat data rujukan...</p>;
  if (!referral) return <p>Data rujukan tidak tersedia.</p>;

  return (
    <div className="referral-container">
      <div className="referral-card" ref={printRef}>
        <h2>Detail Rujukan</h2>
        <QRCodeCanvas value={window.location.href} size={100} className="qr-code" />

        <div className="referral-detail">
          <p><strong>ID Rujukan:</strong> {referral.referralId}</p>
          <p><strong>Tanggal Dibuat:</strong> {new Date(referral.createdAt).toLocaleDateString()}</p>
          <p><strong>Dokter Perujuk:</strong> {referral.doctorName}</p>
          <p><strong>Nama Pasien:</strong> {referral.patientName}</p>
          <p><strong>Alasan Rujukan:</strong> {referral.referralReason}</p>
          <p><strong>Tanggal Rujukan:</strong> {new Date(referral.referralDate).toLocaleDateString()}</p>
          <p><strong>Catatan Tambahan:</strong> {referral.notes}</p>
        </div>
      </div>

      <button className="print-button" onClick={handlePrint}>Cetak Rujukan</button>
    </div>
  );
}
