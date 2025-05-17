import {memo, useEffect, useState} from "react";
import {getReferral} from "../services/userService";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!referral) {
    return <div>No referral found</div>;
  }

  return (
    <div>
      <h2>Rujukan dari Dr. {referral.doctorId}</h2>
      <p>{referral.referralReason}</p>
      <p>{new Date(referral.referralDate).toLocaleDateString()}</p>
      <p>{referral.notes}</p>
        <a href={`/referral/${referral.referralId}`}>Lihat detail</a>
    </div>
  );

}

export default memo(ReferralEmbed);