import React, { useState } from "react";
import MainPage from "../MainPage/MainPage";
import OtpPage from "../OtpPage/OtpPage";
import axios from "axios";
import AlreadyRequest from "../AlreadyRequest/AlreadyRequest";
import toast from "react-simple-toasts";

const Home = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [otpPage, setOtpPage] = useState(false);
  const [number, setNumber] = useState("");
  const [reason, setReason] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [noUser, setNoUser] = useState(false)
  const [otpLoader, setOtpLoader] = useState(false)
  const [existed, setExisted] = useState(false)

  

  const handleSubmit = async () => {
    setOtpLoader(true)
    const mobile = `+91${number}`;
    try {
      const res = await axios.post(
        `${REACT_APP_API_ENDPOINT}/webViewDeleteAccountSendOtp`,
        { phone: mobile }
      );
      if (res?.data?.success) {
        setTransactionId(res?.data?.result?.[0]?.transactionId);
        setOtpPage(true);
        setOtpLoader(false)
      } else if (res.data?.errorCode === 9) {
        setNoUser(true)
        setOtpLoader(false)
      } else if (res?.data?.errorCode === 10) {
        setExisted(true)
      }
    } catch (error) {
      console.log(error, 'eroor');
      setOtpLoader(false)

      toast("OTP Service is Down, Please Try Later")

    }
  };

  const resendOtp = async () => {
    const mobile = `+91${number}`;
    try {
      const res = await axios.post(
        `${REACT_APP_API_ENDPOINT}/webViewDeleteAccountSendOtp`,
        { phone: mobile }
      );
      if (res?.status === 200) {
        setTransactionId(res?.data?.result?.[0]?.transactionId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {existed ? (
        <AlreadyRequest />
      ) : (
        otpPage ? (
          <OtpPage
            number={number}
            reason={reason}
            transactionId={transactionId}
            resendOtp={resendOtp}
          />
        ) : (
          <MainPage
            setPage={setOtpPage}
            number={number}
            setNumber={setNumber}
            handleSubmit={handleSubmit}
            reason={reason}
            setReason={setReason}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
            noUser={noUser}
            otpLoader={otpLoader}
            setOtpLoader={setOtpLoader}
          />
        )
      )}
    </div>
  );
};

export default Home;
