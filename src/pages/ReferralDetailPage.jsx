import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getReferralById } from "../services/userService";
import { QRCodeCanvas } from 'qrcode.react';
import {format} from "date-fns";
import {id} from "date-fns/locale";

export default function ReferralDetailPage() {
  const { referralId } = useParams();
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef();

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const response = await getReferralById(referralId);
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
    <div className="container mx-auto bg-white px-8 min-h-[100dvh] pt-12">
      <div className="flex flex-col items-center gap-4" ref={printRef}>
        <h2 className={'text-4xl font-bold mb-12'}>Detail Rujukan</h2>
        <QRCodeCanvas value={window.location.href} size={200} className="qr-code" />

        <div className="referral-detail space-y-2 my-12">
          <p><strong>ID Rujukan:</strong> {referral.referralId}</p>
          <p><strong>Tanggal Dibuat:</strong> {format(new Date(referral.createdAt), 'EEEE, dd MMMM yyyy HH:mm', {locale:id})}</p>
          <p className={'capitalize'}><strong>Dokter Perujuk:</strong> Dr. {referral.doctorName}</p>
          <p className={'capitalize'}><strong>Nama Pasien:</strong> {referral.userName}</p>
          <p><strong>Alasan Rujukan:</strong> {referral.referralReason}</p>
          <p><strong>Tanggal Rujukan:</strong> {format(new Date(referral.referralDate), 'EEEE, dd MMMM yyyy', {locale:id})}</p>
          <p><strong>Catatan Tambahan:</strong> {referral.notes}</p>
        </div>
      </div>

      <button className="button w-full bg-primary text-white" onClick={handlePrint}>Cetak Rujukan</button>
    </div>
  );
}
