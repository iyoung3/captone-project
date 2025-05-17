import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../../styles/UserChatPage.css";
import UserNavbar from "../../components/UserNavbar";
import {AuthUserWrapper} from "../../components/AuthUserWrapper";
import ReferralEmbed from "../../components/ReferralEmbed";

const UserChatRoomPage = () => {
  const { doctorId } = useParams();

  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const [permitted, setPermitted] = useState(false);

  const handleSend = async (e) => {
    if(!permitted)return alert('Error')
    e.preventDefault();
    if (!input.trim()) return;

    console.log("Sending message:", input);
    const newMessage = {
      message: input,
    };

    ws.current?.send(JSON.stringify(newMessage));
    setInput('')
  };

  const ws = useRef(null);
  useEffect(() => {
    let socket;

    const connectWebSocket = () => {
      socket = new WebSocket(`${process.env.REACT_APP_API_URL}/user/chat/${doctorId}`);
      socket.onopen = () => {
        ws.current = socket;
        console.log("WebSocket connection established");
        setPermitted(true)
      };

      socket.onmessage = (event) => {
        console.log("Received message:", event.data);
        setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
      };

      socket.onclose = (event) => {
        if(event.code === 4000)setPermitted(false)
        console.log("WebSocket connection closed. ");
        // setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        socket.close();
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
    <AuthUserWrapper>
      <div>
          <UserNavbar />
          <div className="chat-page">
        <h1 className="chat-title">Chat dengan Dr. {doctorId}</h1>
        <div className="chat-box">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <p>Belum ada percakapan. Kirim pesan pertama ke Dr. {doctorId || "Dokter"}!</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${!msg.isFromDoctor ? "sent" : "received"}`}>
                {/*{msg.isReferral && <strong>Rujukan: </strong>}*/}
                {msg.messageType === 'text'?
                    <div className="chat-text">

                      {msg.message}
                    </div>:
                    <ReferralEmbed referralId={msg.message}/>
                }
              </div>
            ))
          )}
          <div ref={chatEndRef}/>
        </div>

            {permitted && <form onSubmit={handleSend} className="chat-input-form">
              <input
                  type="text"
                  placeholder="Ketik pesan..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="chat-input"
              />
              <button type="submit" className="chat-send-btn">Kirim</button>
            </form>}

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
    </AuthUserWrapper>

  );
};

export default UserChatRoomPage;
