import { Link } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import { AuthUserWrapper } from "../../components/AuthUserWrapper";
import { useEffect, useState } from "react";
import { getChats } from "../../services/userService";
import {format, isSameDay } from "date-fns";

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
      <div className="container mx-auto min-h-[100dvh] px-8 bg-white">
      <UserNavbar />
      <h2 className="text-5xl mb-8 pt-4">Chat dengan Dokter</h2>
        <div className="flex flex-col divide-y">
          {chats.length === 0 ? (
            <p className="empty-list">Tidak ada percakapan.</p>
          ) : (
            chats.map((chat) => (
              <Link to={`/user/chat/${chat.doctorId}`} key={chat.chatId} className="flex w-full group hover:bg-neutral-100 bg-white transition-all px-2 py-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold text-xl mr-4">
                  {chat.doctorName?.charAt(0).toUpperCase() || "D"}
                </div>
                <div className="chat-info w-full">
                  <div className="chat-name flex w-full">
                    <span className={'font-bold'}>
                      Dr. {chat.doctorName}
                    </span>
                    <span className={'ml-auto text-neutral-500 text-xs'}>
                      {chat.latestChat? format(chat.latestChat.createdAt,isSameDay(chat.latestChat.createdAt, new Date())?'HH:mm':'dd MMMM yyyy') :''}
                    </span>
                  </div>
                  <div className="text-neutral-500">{chat.latestChat? chat.latestChat.message:'Mulai percakapan'}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </AuthUserWrapper>
  );
}
