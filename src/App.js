import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLoginPage from "./pages/user/UserLoginPage";
import UserRegisterPage from "./pages/user/UserRegisterPage";
import UserHomePage from "./pages/user/UserHomePage";
import DoctorLoginPage from "./pages/doctor/DoctorLoginPage";
import DoctorRegisterPage from "./pages/doctor/DoctorRegisterPage";
import DoctorHomePage from "./pages/doctor/DoctorHomePage";
import ConsultationRequestsPage from './pages/ConsultationRequestsPage';
import ReferralPage from './pages/ReferralPage';
import ReferralDetailPage from "./pages/ReferralDetailPage";
import UserChatRoomPage from "./pages/user/UserChatRoomPage";
import DoctorChatRoomPage from "./pages/doctor/DoctorChatRoomPage";
import SelectRolePage from "./pages/SelectRolePage";
import UserChatListPage from "./pages/user/UserChatListPage";
import DoctorChatListPage from "./pages/doctor/DoctorChatListPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<SelectRolePage />} />
        {/* user */}
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/user/register" element={<UserRegisterPage />} />
        <Route path="/user/home" element={<UserHomePage />} />
        <Route path="/user/doctor-info/:doctorId" element={<></>} />

        <Route path="/user/referral" element={<></>} />

        {/* Isi room chat kayak dm */}
        <Route path="/user/chat/:doctorId" element={<UserChatRoomPage />} />

        {/* Isi list2 chat */}
        <Route path="/user/chat" element={<UserChatListPage/>} />


        {/* dokter */}
        <Route path="/doctor/login" element={<DoctorLoginPage />} />
        <Route path="/doctor/register" element={<DoctorRegisterPage />} />
        <Route path="/doctor/home" element={<DoctorHomePage />} />
        <Route path="/doctor/requests" element={<ConsultationRequestsPage />} />

        {/* Isi room chat kayak dm */}
        <Route path="/doctor/chat/:userId" element={<DoctorChatRoomPage />} />

        {/* Isi list2 chat */}
        <Route path="/doctor/chat" element={<DoctorChatListPage />} />

        {/* Semi public, ini buat cek detail referral */}
        <Route path="/referrals/:referralId" element={<ReferralPage />} />
        <Route path="/referral/:referralId" element={<ReferralDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
