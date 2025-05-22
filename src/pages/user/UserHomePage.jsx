import { Link } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import { AuthUserWrapper } from "../../components/AuthUserWrapper";
import SearchDoctors from "../../components/SearchDoctors";
import { FaComments, FaStethoscope } from "react-icons/fa";

export default function UserHomePage() {
  return (
    <AuthUserWrapper>
      <div className="container mx-auto min-h-[100dvh] px-8 bg-white">
        <h1 className="text-5xl pt-4">
          <span className="app-name font-black">KONSUL<span className="text-primary">DOK</span></span>
        </h1>

        <div className="bg-primary rounded-lg p-4 my-6 text-white">
          <h2 className={'text-2xl font-bold'}>Saling Jaga Kesehatan</h2>
          <p>Konsultasi dan Rujukan Mudah, Cepat, Aman</p>
        </div>

        <div className="my-6">
          <SearchDoctors />
        </div>
      </div>
      <UserNavbar />
    </AuthUserWrapper>
  );
}
