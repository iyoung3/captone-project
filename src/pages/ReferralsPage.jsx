import React, {useEffect, useState} from 'react';
import DoctorNavbar from '../components/DoctorNavbar';
import UserNavbar from "../components/UserNavbar";
import {getReferrals} from "../services/userService";
import {AuthDoctorWrapper} from "../components/AuthDoctorWrapper";
import {AuthUserWrapper} from "../components/AuthUserWrapper";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {id} from "date-fns/locale";

export default function ReferralsPage({isDoctor}) {
  const [data, setData] = useState([])


  useEffect(() => {
    (async() => {
      const result = await getReferrals()

      setData(result.data||[])
    })()
  }, []);

  console.log(data)

  const Guard = isDoctor? AuthDoctorWrapper:AuthUserWrapper;

  return (
      <Guard>
        <div className={'container mx-auto bg-white px-8 min-h-[100dvh]'}>
          {isDoctor ? <DoctorNavbar/> : <UserNavbar/>}
          <h1 className={'text-5xl pt-4 mb-12'}>Daftar rujukan</h1>
          <div className="flex flex-col gap-2">
            {data?.map((referral) =>
            <div key={referral.referralId} className={'bg-white shadow rounded-lg p-4'}>
              <div className="chat-info">
                <div className="chat-name font-bold text-xl">Rujukan {isDoctor? `untuk ${referral.userName}`:`dari ${referral.doctorName}`}</div>
                <div className="text-xs">{format(new Date(referral.createdAt), 'EEEE, dd MMMM yyyy HH:mm', {locale:id})}</div>
              </div>
              <Link to={`/referral/${referral.referralId}`} className="underline">
                Lihat detail
              </Link>

            </div>)}
          </div>
        </div>
      </Guard>

);
}
