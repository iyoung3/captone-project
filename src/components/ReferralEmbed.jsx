import {memo, useEffect, useState} from "react";
import {getReferralById} from "../services/userService";
import {Link} from "react-router-dom";

function ReferralEmbed({referralId}) {
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferral = async () => {
        const response = await getReferralById(referralId);

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
        {loading?
            <></>
            :
            <>
                <h2 className={'w-full text-3xl font-bold'}>Rujukan</h2>
                <p>Alasan: {referral.referralReason}</p>
                <Link className={'underline'} to={`/referral/${referral.referralId}`}>Lihat detail</Link>
            </>
        }
    </div>
  );

}

export default memo(ReferralEmbed);