import React, {useEffect, useState, useRef, Fragment} from "react";
import { useParams } from "react-router-dom";
import { AuthDoctorWrapper } from "../../components/AuthDoctorWrapper";
import { createDoctorReferral } from "../../services/doctorService";
import ReferralEmbed from "../../components/ReferralEmbed";
import { fetchChatHistory } from "../../services/doctorService";
import { getUserById } from "../../services/doctorService";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import {FaChevronLeft, FaPaperPlane} from "react-icons/fa";
import {format} from "date-fns";
import {id} from "date-fns/locale";
import {MdArrowBackIosNew, MdAttachFile, MdOutlineAdd, MdSend} from "react-icons/md";

const DoctorChatRoomPage = () => {
  const navigate = useNavigate();
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
        <div className="container h-screen mx-auto flex flex-col bg-white">
          <div className="bg-secondary text-white p-2 flex items-center shadow-lg">
            <button onClick={() => navigate("/doctor/home")} className="p-4">
              <MdArrowBackIosNew />
            </button>
            <h1 className={'font-bold text-2xl capitalize'}>
              {userName}
            </h1>
          </div>

          <div className="flex-1 min-h-0 flex flex-col-reverse overflow-y-auto bg-pattern">
            <div className="flex flex-col-reverse gap-1 p-4 pb-12">
              {messages.length === 0 ? (
                  <div className="empty-chat">
                    <p>Belum ada percakapan. Kirim pesan pertama ke {userName || "Dokter"}!</p>
                  </div>
              ) : (
                  Object.entries(
                      messages.reduce((acc, msg) => {
                        const date = format(new Date(msg.createdAt), 'yyyy-MM-dd');
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
                                          msg.isFromDoctor
                                              ? "bg-secondary ml-auto rounded-br-none text-white"
                                              : "rounded-bl-none bg-white"
                                      } ${index === 0 ? "mb-6" : ""}`}
                                  >
                                    {index === 0 && (
                                        <div
                                            className={`timestamp text-xs text-neutral-500 absolute top-full pt-1 ${
                                                msg.isFromDoctor ? "right-0" : "left-0"
                                            }`}
                                        >
                                          {time}
                                        </div>
                                    )}
                                    {msg.messageType === "referral" ? (
                                        <ReferralEmbed referralId={msg.message}/>
                                    ) : (
                                        <div className="chat-text">{msg.message}</div>
                                    )}
                                  </div>
                              ))}
                            </Fragment>
                        ))}
                        <div className="text-center text-sm text-neutral-500 my-4">
                          {format(new Date(date), "EEEE, dd MMMM yyyy",{ locale: id })}
                        </div>
                      </Fragment>
                  ))
              )}
              <div ref={chatEndRef}/>
            </div>
          </div>

          {showReferralForm ? (
              <div className="flex flex-col gap-2 p-2 bg-white border-t w-full">
                <h2 className={'text-2xl font-bold'}>Formulir Rujukan</h2>
                <input
                    className={'input'}
                    type="text"
                    placeholder="Alasan rujukan"
                    value={referralReason}
                    onChange={(e) => setReferralReason(e.target.value)}
                    required
                />
                <input
                    className={'input'}
                    type="date"
                    value={referralDate}
                    onChange={(e) => setReferralDate(e.target.value)}
                />
                <textarea
                    className={'input min-h-20 max-h-40'}
                    placeholder="Catatan tambahan"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                />
                <div className="ml-auto">
                  <button
                      onClick={() => setShowReferralForm(false)}
                      className="button text-secondary ml-4"
                  >
                    Batal
                  </button>
                  <button onClick={handleSendReferral} className="button bg-secondary text-white">
                    Kirim Rujukan
                  </button>
                </div>
              </div>
          ) :
              permitted && <form onSubmit={handleSendMessage} className="flex gap-2 p-2 bg-white border-t">
            <input
                type="text"
                placeholder="Ketik pesan..."
                value={input}
                className="input flex-1 w-full"
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="text-white bg-secondary w-12 flex items-center justify-center rounded-md">
              <MdSend/>
            </button>

            <button
                type="button"
                onClick={() => setShowReferralForm(true)}
                className="text-secondary bg-white border border-secondary w-12 flex items-center justify-center rounded-md"
            >
              <MdAttachFile/>
            </button>
          </form>}
        </div>
      </AuthDoctorWrapper>
  );
};

export default DoctorChatRoomPage;
