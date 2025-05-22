import React from "react";
import { useNavigate } from "react-router-dom";

export default function SelectRolePage() {
  const navigate = useNavigate();

  return (
    <div className="container bg-white mx-auto min-h-[100dvh] px-8 flex flex-col">
      <div className="flex-1 flex items-center justify-center flex-col">
        <img src={'/svg/onboarding.svg'} alt={'morning routine'} className={'w-3/4 mx-auto min-h-[432px]'}/>
        <h1 className={'font-bold text-4xl mr-auto mt-12'}>KonsulDok</h1>
        <p className={'mr-auto text-neutral-500'}>Konsultasi dan Rujukan Mudah, Cepat, Aman</p>
      </div>
      <div className="flex flex-col gap-2 pb-12">
        <button className={'button bg-primary text-white'} onClick={() => navigate("/doctor/login")}>Masuk sebagai Dokter</button>
        <button className={'button border-primary border text-primary'} onClick={() => navigate("/user/login")}>Masuk sebagai pengguna biasa</button>
      </div>
    </div>
  );
}
