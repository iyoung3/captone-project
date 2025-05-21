import { Link } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import { AuthUserWrapper } from "../../components/AuthUserWrapper";
import SearchDoctors from "../../components/SearchDoctors";
import { FaComments, FaStethoscope } from "react-icons/fa";

export default function UserHomePage() {
  return (
    <AuthUserWrapper>
      <div className="container mx-auto min-h-screen px-12">
        <h1 className="text-5xl pt-4">
          <span className="app-name font-black">KONSUL<span className="text-primary">DOK</span></span>
        </h1>

        <div className="bg-primary rounded-lg p-4 my-6 text-white">
          <h2 className={'text-2xl font-bold'}>Saling Jaga Kesehatan</h2>
          <p>Konsultasi dan Rujukan Mudah, Cepat, Aman</p>
        </div>

        <h3 className="w-full text-2xl">Mau melakukan apa hari ini?</h3>
        <div className="flex flex-wrap my-6">
          <div className="w-full flex gap-4">
            <Link to="/user/chat" className="bg-white shadow rounded-xl flex-1 flex items-center p-4 justify-center flex-col">
              <FaComments size={32} />
              <span>Chat Dokter</span>
            </Link>
            <Link to="/user/doctor-info/:doctorId" className="bg-white shadow rounded-xl flex-1 flex items-center p-4 justify-center flex-col">
              <FaStethoscope size={32} />
              <span>Cari Dokter</span>
            </Link>
          </div>
          <SearchDoctors />
        </div>
      </div>
      <UserNavbar />
    </AuthUserWrapper>
  );
}
