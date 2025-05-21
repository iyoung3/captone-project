import { Link } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import "../../styles/UserHomePage.css";
import { AuthUserWrapper } from "../../components/AuthUserWrapper";
import SearchDoctors from "../../components/SearchDoctors";
import { useNavigate } from "react-router-dom";
import { FaComments, FaStethoscope } from "react-icons/fa";
import logo from "../../assets/iconAppT.png";

export default function UserHomePage() {
  return (
    <AuthUserWrapper>
      <div>
        
      </div>
      <div className="user-home-page mobile-only">
        <div className="user-home-logo-header">
          <img src={logo} alt="Logo" className="app-logo" />
          <h2 className="app-name">KONSUL<span className="app-name-2">DOK</span><p className="app-name-3">konsultasikan Kepada Dokter</p></h2>
          
        </div>

        <div className="user-home-header">
          <h2>Saling Jaga Kesehatan</h2>
          <p>Konsultasi dan Rujukan Mudah, Cepat, Aman</p>
        </div>

        <div className="user-home-menu-section">
          <h3 className="user-home-subtitle">Mau melakukan apa hari ini?</h3>
          <div className="user-home-menu-grid">
            <Link to="/user/chat" className="user-home-menu-item">
              <FaComments size={32} />
              <span>Chat Dokter</span>
            </Link>
            <Link to="/user/doctor-info/:doctorId" className="user-home-menu-item">
              <FaStethoscope size={32} />
              <span>Cari Dokter</span>
            </Link>
          </div>
          <SearchDoctors />
        </div>
        <UserNavbar />
      </div>
    </AuthUserWrapper>
  );
}
