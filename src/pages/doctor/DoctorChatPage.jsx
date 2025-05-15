import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../styles/DoctorChatPage.css";
import DoctorNavbar from "../../components/DoctorNavbar";

const DoctorChatPage = () => {
  const { id: userId } = useParams();
  const { state } = useLocation();
  const user = state?.user;
  const doctorId = localStorage.getItem("doctorId");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [referralReason, setReferralReason] = useState("");
  const [referralDate, setReferralDate] = useState("");
  const [notes, setNotes] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `https://capstone-project.up.railway.app/api/chat/${doctorId}/${userId}`
        );
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Gagal mengambil pesan:", err);
      }
    };
    fetchMessages();
  }, [doctorId, userId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageData = {
      senderId: doctorId,
      receiverId: userId,
      message: input,
    };

    try {
      const res = await fetch(
        "https://capstone-project.up.railway.app/api/chat/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageData),
        }
      );

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { ...messageData, createdAt: new Date().toISOString() },
        ]);
        setInput("");
        scrollToBottom();
      }
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
    }
  };

  const handleSendReferral = async () => {
    if (!referralReason.trim()) return;

    const referralData = {
      userId,
      referralReason,
      referralDate: referralDate || null,
      notes,
    };

    try {
      const res = await fetch(
        "https://capstone-project.up.railway.app/referral/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(referralData),
        }
      );

      if (res.ok) {
        const chatMessage = {
          senderId: doctorId,
          receiverId: userId,
          message: `Rujukan: ${referralReason}${notes ? ` - ${notes}` : ""}`,
          isReferral: true,
        };

        await fetch("https://capstone-project.up.railway.app/api/chat/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(chatMessage),
        });

        setMessages((prev) => [
          ...prev,
          { ...chatMessage, createdAt: new Date().toISOString() },
        ]);
        setShowReferralForm(false);
        setReferralReason("");
        setReferralDate("");
        setNotes("");
        scrollToBottom();
      } else {
        alert("Gagal mengirim rujukan.");
      }
    } catch (err) {
      console.error("Gagal mengirim rujukan:", err);
    }
  };

  return (
    <div>
        <DoctorNavbar />
      <div className="doctor-chat-page">
        <h1 className="chat-title">Chat dengan {user?.name}</h1>

        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${
                msg.senderId === doctorId ? "sent" : "received"
              }`}
            >
              {msg.isReferral && <strong> Rujukan: </strong>}
              {msg.message}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {showReferralForm ? (
          <div className="referral-form">
            <h2>Formulir Rujukan</h2>
            <input
              type="text"
              placeholder="Alasan rujukan"
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
              placeholder="Catatan tambahan"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
            <div className="referral-buttons">
              <button onClick={handleSendReferral} className="btn btn-green">
                Kirim Rujukan
              </button>
              <button
                onClick={() => setShowReferralForm(false)}
                className="btn btn-gray"
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              placeholder="Ketik pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-blue">
              Kirim
            </button>
            <button
              type="button"
              onClick={() => setShowReferralForm(true)}
              className="btn btn-yellow"
            >
              Rujukan
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DoctorChatPage;
