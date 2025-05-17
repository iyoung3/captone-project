import { Link } from "react-router-dom";
import "../../styles/UserHomePage.css";
import {useEffect, useState} from "react";
import {getChats} from "../../services/doctorService";
import {AuthDoctorWrapper} from "../../components/AuthDoctorWrapper";
import DoctorNavbar from "../../components/DoctorNavbar";

export default function DoctorChatListPage() {
  const [chats, setChats] = useState([]);


  useEffect(() => {
    (async () => {
      const res = await getChats()

      if(!res){
        alert("No chats found.");
        return
      }

      setChats(res.data);
    })()
  }, []);

  return (
    <AuthDoctorWrapper>
      <div>
        <DoctorNavbar />
        <div className="doctor-home-container">
          {chats.map((chat) => (<div key={chat.chatId}>
            {chat.userId}
            <Link to={`/doctor/chat/${chat.userId}`}>Chat</Link>
          </div>))}
        </div>
      </div>
    </AuthDoctorWrapper>
  );
}
