import { Link } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import "../../styles/UserHomePage.css";
import {AuthUserWrapper} from "../../components/AuthUserWrapper";

export default function UserHomePage() {
  return (
      <AuthUserWrapper>
        <div>
          <UserNavbar />
          <div className="user-home-container">
            <h1 className="user-home-title">Selamat datang, Pasien!</h1>
            <ul className="user-home-menu">
              <li>
                <span>Cari Dokter</span>
                <Link to="/doctors">
                  <button className="user-home-button">Cari Dokter</button>
                </Link>
              </li>
              <li>
                <span>Mulai Chat dengan Dokter</span>
                <Link to="/chat/:id">
                  <button className="user-home-button">Buka Chat</button>
                </Link>
              </li>
              <li>
                <span>Cetak Rujukan Dokter</span>
                  <button className="user-home-button">Lihat Rujukan</button>
              </li>
            </ul>
          </div>
        </div>
      </AuthUserWrapper>
  );
}
