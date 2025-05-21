import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import DoctorNavbar from "../../components/DoctorNavbar";
import {AuthDoctorWrapper} from "../../components/AuthDoctorWrapper";
import {getChats} from "../../services/doctorService";

export default function DoctorHomePage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [chats, setChats] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getChats();
      if (!res) {
        alert("No chats found.");
        return;
      }
      setChats(res.data);
    })();
  }, []);

  return (
    <AuthDoctorWrapper>
      <div>
        <DoctorNavbar />
        <div className="container mx-auto bg-white px-12 min-h-screen">
          <h1 className="text-5xl pt-4">
            <span className="app-name font-black">KONSUL<span className="text-primary">DOK</span></span>
          </h1>
          <h2 className="text-3xl pt-4 mb-12 font-bold">Selamat datang, Dokter!</h2>

          <h3 className="text-xl mb-4">Daftar Percakapan Pasien</h3>
          <div className="flex flex-col divide-y">
            {chats.length === 0 ? (
                <p className="empty-list">Belum ada percakapan.</p>
            ) : (
                chats.map((chat) => (
                    <Link to={`/doctor/chat/${chat.userId}`} key={chat.chatId}
                          className="flex w-full group hover:bg-neutral-100 bg-white transition-all py-4 px-2">
                      <div
                          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold text-xl mr-4">
                        {chat.userName?.charAt(0).toUpperCase() || "D"}
                      </div>
                      <div className="chat-info">
                        <div className="chat-name font-bold capitalize">{chat.userName}</div>
                        <div className="chat-preview">Klik untuk buka percakapan</div>
                      </div>
                    </Link>
                ))
            )}
          </div>

        </div>
      </div>
    </AuthDoctorWrapper>
  );
}
