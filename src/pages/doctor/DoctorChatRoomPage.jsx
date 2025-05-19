import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../../styles/DoctorChatPage.css";
import { AuthDoctorWrapper } from "../../components/AuthDoctorWrapper";
import { createDoctorReferral } from "../../services/doctorService";
import ReferralEmbed from "../../components/ReferralEmbed";
import { fetchChatHistory } from "../../services/doctorService";
import { getUserById } from "../../services/doctorService";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const DoctorChatRoomPage = () => {
  const navigate = useNavigate ();
  const { userId } = useParams();

  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [referralReason, setReferralReason] = useState("");
  const [referralDate, setReferralDate] = useState("");
  const [notes, setNotes] = useState("");
  const chatEndRef = useRef(null);

  const [permitted, setPermitted] = useState(false);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };


  useEffect(() => {
  (async () => {
    const response = await fetchChatHistory(userId);
    setMessages(() => [...response.data]);

    const userRes = await getUserById(userId);
    if (userRes?.data?.name) {
      setUserName(userRes.data.name);
    } else {
      setUserName(`User ${userId}`);
    }
  })()
}, []);


  const handleSendMessage = async (e) => {
    if (!permitted) return alert('Error')
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
    if (!permitted) return alert('Error')
    if (!referralReason.trim()) return;

    const referralData = {
      userId,
      referralReason,
      referralDate: referralDate || null,
      notes,
    };

    const response = await createDoctorReferral(referralData)

    if (response) {
      console.log("Referral sent successfully:", response);

      const content = {
        message: response.data.referralId,
        messageType: "referral",
      }

      ws.current?.send(JSON.stringify(content));
    } else {
      console.error("Failed to send referral");
    }

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
        setPermitted(true)
      };

      socket.onmessage = (event) => {
        console.log("Received message:", event.data);
        setMessages((prevMessages) => [JSON.parse(event.data), ...prevMessages]);
      };

      socket.onclose = (event) => {
        setPermitted(false)
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


        <div className="doctor-chat-page">
          <h1 className="chat-title">
  <button onClick={() => navigate("/user/chat")} className="back-btn"><GoArrowLeft /></button> Chat dengan {userName || userId}
  </h1>
          <div className="chat-box">
            {messages.map((msg) => (
              <div
                key={msg.chatId}
                className={`chat-bubble ${msg.isFromDoctor ? "sent" : "received"
                  }`}
              >
                {msg.messageType === 'text' ?
                  <div className="chat-text">

                    {msg.message}
                  </div> :
                  <ReferralEmbed referralId={msg.message} />
                }
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
          ) : permitted && <form onSubmit={handleSendMessage} className="chat-input-form">
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
          </form>}
        </div>
    </AuthDoctorWrapper>
  );
};

export default DoctorChatRoomPage;
