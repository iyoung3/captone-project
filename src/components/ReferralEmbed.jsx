import {memo, useEffect, useState} from "react";
import {getReferral} from "../services/userService";
import {Link} from "react-router-dom";

function ReferralEmbed({referralId}) {
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferral = async () => {
        const response = await getReferral(referralId);

        if (response) {
          setReferral(response.data);
        } else {
          alert('Gagal mengambil data rujukan');
        }
        setLoading(false);
    };

    fetchReferral();
  }, []);


  return (
    <div className={'h-30'}>
        {loading?<></>
            : <><h2 className={'w-full'}>Rujukan</h2>
            <p>{referral.referralReason}</p>
            <p>{new Date(referral.referralDate).toISOString()}</p>
            <p className={'text-neutral-600'}>{referral.notes}</p>
            <Link to={`/referral/${referral.referralId}`}>Lihat detail</Link></>}
    </div>
  );

}

export default memo(ReferralEmbed);