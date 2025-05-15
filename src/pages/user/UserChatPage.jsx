import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../styles/UserChatPage.css";
import UserNavbar from "../../components/UserNavbar";

const UserChatPage = () => {
  const { id: doctorId } = useParams();
  const { state } = useLocation();
  const doctor = state?.doctor;

  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`https://capstone-project.up.railway.app/api/chat/${userId}/${doctorId}`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Gagal mengambil pesan:", err);
      }
    };
    fetchMessages();
  }, [doctorId, userId]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await fetch("https://capstone-project.up.railway.app/user/chat/history");
        const data = await res.json();
        setChatHistory(data);
      } catch (err) {
        console.error("Gagal mengambil riwayat chat:", err);
      }
    };
    fetchChatHistory();
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      senderId: userId,
      receiverId: doctorId,
      message: input,
    };

    try {
      const res = await fetch("https://capstone-project.up.railway.app/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      if (res.ok) {
        setMessages((prev) => [...prev, { ...newMessage, createdAt: new Date().toISOString() }]);
        setInput("");
        scrollToBottom();
      }
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
    }
  };

  const handlePrintReferral = () => {
    const referralMessage = messages.find((msg) => msg.isReferral);
    if (!referralMessage) return alert("Tidak ada rujukan untuk dicetak.");

    const printWindow = window.open("", "", "height=500,width=800");
    printWindow.document.write(`
      <html>
        <head><title>Rujukan Dokter</title></head>
        <body>
          <h2>Rujukan dari Dr. ${doctor?.name}</h2>
          <p><strong>Pesan Rujukan:</strong> ${referralMessage.message}</p>
          <button onclick="window.print();">Cetak</button>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div>
        <UserNavbar />
        <div className="chat-page">
      <h1 className="chat-title">Chat dengan Dr. {doctor?.name}</h1>
      <div className="chat-box">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>Belum ada percakapan. Kirim pesan pertama ke Dr. {doctor?.name || "Dokter"}!</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.senderId === userId ? "sent" : "received"}`}>
              {msg.isReferral && <strong>Rujukan: </strong>}
              {msg.message}
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="chat-input-form">
        <input
          type="text"
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
        />
        <button type="submit" className="chat-send-btn">Kirim</button>
      </form>

      <button onClick={handlePrintReferral} className="print-btn">Cetak Rujukan</button>

      {chatHistory.length > 0 && (
        <div className="chat-history">
          <h2>Riwayat Konsultasi</h2>
          <ul>
            {chatHistory.map((item, index) => (
              <li key={index}>
                Dr. {item.doctorName} - {new Date(item.lastMessageTime).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default UserChatPage;
