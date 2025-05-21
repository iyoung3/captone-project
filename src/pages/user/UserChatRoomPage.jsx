import React, { useEffect, useState, useRef, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthUserWrapper } from "../../components/AuthUserWrapper";
import ReferralEmbed from "../../components/ReferralEmbed";
import { fetchChatHistory } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { getDoctorById } from "../../services/userService";
import { GoArrowLeft } from "react-icons/go";
import {FaChevronLeft, FaPaperPlane} from "react-icons/fa";
import {addDays, format} from 'date-fns'
import {id} from "date-fns/locale";

const UserChatRoomPage = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();

  const [doctorName, setDoctorName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const [permitted, setPermitted] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetchChatHistory(doctorId);
      setMessages(() => [...response.data]);

      const doctorRes = await getDoctorById(doctorId);
      if (doctorRes?.data?.name) {
        setDoctorName(doctorRes.data.name);
      } else {
        setDoctorName(`Dr. ${doctorId}`);
      }
    })();
  }, []);

  const handleSend = async (e) => {
    if (!permitted) return alert('Error')
    e.preventDefault();
    if (!input.trim()) return;

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
      <div className="container h-screen mx-auto flex flex-col">
        <div className="bg-primary text-white p-2 flex items-center">
          <button onClick={() => navigate("/user/chat")} className="p-4">
            <FaChevronLeft />
          </button>
          <h1 className={'font-bold text-2xl'}>
            Dr.{doctorName}
          </h1>
        </div>

        <div className="flex-1 min-h-0 flex flex-col-reverse overflow-y-auto bg-pattern">
          <div className="flex flex-col-reverse gap-1 p-4 pb-12">
            {messages.length === 0 ? (
              <div className="empty-chat">
                <p>Belum ada percakapan. Kirim pesan pertama ke {doctorName || "Dokter"}!</p>
              </div>
            ) : (
              Object.entries(
                messages.reduce((acc, msg) => {
                  const date = format(new Date(msg.createdAt), 'yyyy-MM-dd', { locale: id });
                  const time = format(new Date(msg.createdAt), 'HH:mm');
                  if (!acc[date]) acc[date] = {};
                  if (!acc[date][time]) acc[date][time] = [];
                  acc[date][time].push(msg);
                  return acc;
                }, {})
              ).map(([date, dailyMessages]) => (
                <Fragment key={date}>
                  {Object.entries(dailyMessages).map(([time, timeMessages]) => (
                    <Fragment key={time}>
                      {timeMessages.map((msg, index) => (
                        <div
                          key={msg.chatId}
                          className={`px-4 py-2 rounded-2xl relative shadow w-fit ${
                            !msg.isFromDoctor
                              ? "bg-primary ml-auto rounded-br-none text-white"
                              : "rounded-bl-none bg-white"
                          } ${index === 0?"mb-6":""}`}
                        >
                          {index === 0 && (
                            <div
                              className={`timestamp text-xs text-neutral-500 absolute top-full pt-1 ${
                                !msg.isFromDoctor ? "right-0" : "left-0"
                              }`}
                            >
                              {time}
                            </div>
                          )}
                          {msg.messageType === "referral" ? (
                            <ReferralEmbed referralId={msg.message} />
                          ) : (
                            <div className="chat-text">{msg.message}</div>
                          )}
                        </div>
                      ))}
                    </Fragment>
                  ))}
                  <div className="text-center text-sm text-neutral-500 my-4">
                    {format(new Date(date), "EEEE, dd MMMM yyyy")}
                  </div>
                </Fragment>
              ))
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {permitted && (
          <form onSubmit={handleSend} className="flex gap-2 p-2 bg-white border-t">
            <input
              type="text"
              placeholder="Ketik pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input flex-1 w-full"
            />
            <button type="submit" className="text-white bg-primary w-12 flex items-center justify-center rounded-md"><FaPaperPlane /></button>
          </form>
        )}
      </div>
    </AuthUserWrapper>
  );
};

export default UserChatRoomPage;
