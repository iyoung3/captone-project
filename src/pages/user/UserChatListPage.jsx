import { Link } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import "../../styles/UserHomePage.css";
import {AuthUserWrapper} from "../../components/AuthUserWrapper";
import SearchDoctors from "../../components/SearchDoctors";
import {useEffect, useState} from "react";
import {getChats} from "../../services/userService";

export default function UserChatListPage() {
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
    <AuthUserWrapper>
      <div>
        <UserNavbar />
        <div className="user-home-container">
          {chats.map((chat) => (<div key={chat.doctorId}>
            {chat.doctorId}
            <Link to={`/user/chat/${chat.doctorId}`}>Chat</Link>
          </div>))}
        </div>
      </div>
    </AuthUserWrapper>
  );
}
