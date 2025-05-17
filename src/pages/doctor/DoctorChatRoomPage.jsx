import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../styles/DoctorChatPage.css";
import DoctorNavbar from "../../components/DoctorNavbar";
import {AuthDoctorWrapper} from "../../components/AuthDoctorWrapper";

const DoctorChatRoomPage = () => {
  const { userId } = useParams();
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

    console.log("Sending message:", input);
    const newMessage = {
      message: input,
      messageType: "text",
    };

    ws.current?.send(JSON.stringify(newMessage));
    setInput('')
  };

  const handleSendReferral = async () => {
    if (!referralReason.trim()) return;

    const referralData = {
      userId,
      referralReason,
      referralDate: referralDate || null,
      notes,
    };

    //   TODO: Send referral data to the server
  };

const ws = useRef(null);
useEffect(() => {
  let socket;

  const connectWebSocket = () => {
    socket = new WebSocket(`${process.env.REACT_APP_API_URL}/doctor/chat/${userId}`);

    socket.onopen = () => {
      console.log("WebSocket connection established");
      ws.current = socket;
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
      // setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      socket?.close();
      ws.current = null;
    };
  };

  connectWebSocket();

  return () => {
    socket?.close();
    ws.current = null;
  };
}, []);
  return (
    <AuthDoctorWrapper>


    <div>
        <DoctorNavbar />
      <div className="doctor-chat-page">
        <h1 className="chat-title">Chat dengan {user?.name}</h1>

        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${
                msg.isFromDoctor ? "sent" : "received"
              }`}
            >
              {/*{msg.isReferral && <strong> Rujukan: </strong>}*/}
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
    </AuthDoctorWrapper>
  );
};

export default DoctorChatRoomPage;
