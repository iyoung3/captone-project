import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import UserLoginPage from "./pages/user/UserLoginPage";
import UserRegisterPage from "./pages/user/UserRegisterPage";
import UserHomePage from "./pages/user/UserHomePage";
import DoctorLoginPage from "./pages/doctor/DoctorLoginPage";
import DoctorRegisterPage from "./pages/doctor/DoctorRegisterPage";
import DoctorHomePage from "./pages/doctor/DoctorHomePage";
import ReferralsPage from './pages/ReferralsPage';
import ReferralDetailPage from "./pages/ReferralDetailPage";
import UserChatRoomPage from "./pages/user/UserChatRoomPage";
import DoctorChatRoomPage from "./pages/doctor/DoctorChatRoomPage";
import SelectRolePage from "./pages/SelectRolePage";
import UserChatListPage from "./pages/user/UserChatListPage";

function App() {


  return (
    <Router>
        <Routes>
            {/* Landing Page */}
            <Route path="/" element={<SelectRolePage/>}/>
            {/* user */}
            <Route path="/user/login" element={<UserLoginPage/>}/>
            <Route path="/user/register" element={<UserRegisterPage/>}/>
            <Route path="/user/home" element={<UserHomePage/>}/>

            {/* Isi room chat kayak dm */}
            <Route path="/user/chat/:doctorId" element={<UserChatRoomPage/>}/>

            {/* Isi list2 chat */}
            <Route path="/user/chat" element={<UserChatListPage/>}/>
            <Route path="/user/referrals" element={<ReferralsPage/>}/>


            {/* dokter */}
            <Route path="/doctor/login" element={<DoctorLoginPage/>}/>
            <Route path="/doctor/register" element={<DoctorRegisterPage/>}/>
            <Route path="/doctor/home" element={<DoctorHomePage/>}/>

            {/* Isi room chat kayak dm */}
            <Route path="/doctor/chat/:userId" element={<DoctorChatRoomPage/>}/>

            <Route path="/doctor/referrals" element={<ReferralsPage isDoctor/>}/>

            {/* Semi public, ini buat cek detail referral */}
            <Route path="/referral/:referralId" element={<ReferralDetailPage/>}/>


            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Router>
);
}

export default App;
