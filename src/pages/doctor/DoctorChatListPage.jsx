import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChats } from "../../services/doctorService";
import { AuthDoctorWrapper } from "../../components/AuthDoctorWrapper";
import DoctorNavbar from "../../components/DoctorNavbar";

export default function DoctorChatListPage() {
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
      <div className="chat-list-page">
        <DoctorNavbar />
        <div className="chat-list-container">
          <h2 className="chat-list-title">Daftar Percakapan Pasien</h2>
          {chats.length === 0 ? (
            <p className="empty-list">Belum ada percakapan.</p>
          ) : (
            chats.map((chat) => (
              <Link to={`/doctor/chat/${chat.userId}`} key={chat.chatId} className="chat-list-item">
                <div className="chat-avatar">
                  {chat.userName?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="chat-info">
                  <div className="chat-name">{chat.userName || `Pasien ${chat.userId}`}</div>
                  <div className="chat-preview">Klik untuk buka percakapan</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </AuthDoctorWrapper>
  );
}
