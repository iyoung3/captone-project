import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLoginPage from "./pages/user/UserLoginPage";
import UserRegisterPage from "./pages/user/UserRegisterPage";
import UserHomePage from "./pages/user/UserHomePage";
import DoctorLoginPage from "./pages/doctor/DoctorLoginPage";
import DoctorRegisterPage from "./pages/doctor/DoctorRegisterPage";
import InfoDoctorPage from "./pages/InfoDoctorPage";
import DoctorHomePage from "./pages/doctor/DoctorHomePage";
import ConsultationRequestsPage from './pages/ConsultationRequestsPage';
import ReferralPage from './pages/ReferralPage';
import UserChatPage from "./pages/user/UserChatPage";
import DoctorChatPage from "./pages/doctor/DoctorChatPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* user */}
        <Route path="/" element={<UserLoginPage />} />
        <Route path="/user/register" element={<UserRegisterPage />} />
        <Route path="/user/home" element={<UserHomePage />} />

        {/* dokter */}
        <Route path="/doctor/login" element={<DoctorLoginPage />} />
        <Route path="/doctor/register" element={<DoctorRegisterPage />} />
        <Route path="/doctor/home" element={<DoctorHomePage />} />

        {/* info dokter */}
        <Route path="/doctors" element={<InfoDoctorPage />} />
        <Route path="/doctor/requests" element={<ConsultationRequestsPage />} />
        <Route path="/doctor/referrals" element={<ReferralPage />} />

        {/* Halaman Chat */}
        <Route path="/chat/:id" element={<UserChatPage />} />
        <Route path="/doctor-chat/:id" element={<DoctorChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
