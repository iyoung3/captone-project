import { Link } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import { AuthUserWrapper } from "../../components/AuthUserWrapper";
import { useEffect, useState } from "react";
import { getChats } from "../../services/userService";

export default function UserChatListPage() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getChats();
      if (!res) {
        alert("Tidak ada chat yang ditemukan.");
        return;
      }
      setChats(res.data);
    })();
  }, []);

  return (
    <AuthUserWrapper>
      <UserNavbar />
      <div className="chat-list-page">
        <div className="chat-list-container">
          <h2 className="chat-list-title">Chat dengan Dokter</h2>
          {chats.length === 0 ? (
            <p className="empty-list">Tidak ada percakapan.</p>
          ) : (
            chats.map((chat) => (
              <Link to={`/user/chat/${chat.doctorId}`} key={chat._id} className="chat-list-item">
                <div className="chat-avatar">
                  {chat.doctorName?.charAt(0).toUpperCase() || "D"}
                </div>
                <div className="chat-info">
                  <div className="chat-name">Dr. {chat.doctorName || chat.doctorId}</div>
                  <div className="chat-preview">Klik untuk buka percakapan</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </AuthUserWrapper>
  );
}
