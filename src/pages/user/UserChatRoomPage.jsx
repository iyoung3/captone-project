import React, { useEffect, useState, useRef, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/UserChatPage.css";
import UserNavbar from "../../components/UserNavbar";
import { AuthUserWrapper } from "../../components/AuthUserWrapper";
import ReferralEmbed from "../../components/ReferralEmbed";
import { fetchChatHistory } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const UserChatRoomPage = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const [permitted, setPermitted] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetchChatHistory(doctorId);
      // console.log(response);
      setMessages(() => [...response.data]);
    })()
  }, []);

  const handleSend = async (e) => {
    if (!permitted) return alert('Error')
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
        setMessages((prevMessages) => [JSON.parse(event.data), ...prevMessages]);
      };

      socket.onclose = (event) => {
        if (event.code === 4000) setPermitted(false)
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
        <div className="chat-page">
          <h1 className="chat-title"><button onClick={() => navigate("/user/chat")} className="back-btn">⬅</button>Chat dengan Dr. {doctorId}</h1>
          <div className="chat-box">
            {messages.length === 0 ? (
              <div className="empty-chat">
                <p>Belum ada percakapan. Kirim pesan pertama ke Dr. {doctorId || "Dokter"}!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <Fragment key={msg.chatId}>
                  <div className={`chat-bubble ${!msg.isFromDoctor ? "sent" : "received"}`}>
                    {/*{msg.isReferral && <strong>Rujukan: </strong>}*/}
                    {msg.messageType === 'referral' ?
                      <ReferralEmbed referralId={msg.message} /> :
                      <div className="chat-text">
                        {msg.message}
                      </div>
                    }
                  </div>
                </Fragment>
              ))
            )}
            <div ref={chatEndRef} />
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
        </div>
    </AuthUserWrapper>

  );
};

export default UserChatRoomPage;
