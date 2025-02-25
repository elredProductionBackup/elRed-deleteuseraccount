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
  const [date, setDate] = useState('')
  const [countryPrefix, setCountryPrefix] = useState("+91")

  const handleSubmit = async () => {
    setOtpLoader(true)
    const mobile = countryPrefix + number;
    try {
      const res = await axios.post(
        `${REACT_APP_API_ENDPOINT}/webViewDeleteAccountSendOtp`,
        { phone: mobile }
      );
      if (res?.data?.success) {
        setTransactionId(res?.data?.result?.[0]?.transactionId);
        setOtpPage(true);
      } else if (res.data?.errorCode === 9) {
        setNoUser(true)
      } else if (res?.data?.errorCode === 10) {
        setDate(res?.data?.result?.[0]?.requestCreatedAt)
        setExisted(true)
      }
    } catch (error) {
      if (error?.response?.data?.errorCode === 104) {
        toast("OTP Service is Down, Please Try Later")
      } 
      else if (error?.response?.data?.errorCode === 113 || error?.response?.data?.errorCode === 115) {
        toast(error?.response?.data?.message);
      }
      else {
        toast("Something went wrong, Please Try Later")
      }
    } finally {
      setOtpLoader(false)
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
      if (error?.response?.data?.errorCode === 104) {
        toast("OTP Service is Down, Please Try Later")
      }
      else if (error?.response?.data?.errorCode === 113 || error?.response?.data?.errorCode === 115) {
        toast(error?.response?.data?.message);
      }  
      else {
        toast("Something went wrong, Please Try Later")
      }
    }
  };

  return (
    <div>
      {existed ? (
        <AlreadyRequest date={date} />
      ) : (
        otpPage ? (
          <OtpPage
            number={number}
            reason={reason}
            transactionId={transactionId}
            resendOtp={resendOtp}
            existed={existed}
            setExisted={setExisted}
            date={date}
            setDate={setDate}
            countryPrefix={countryPrefix}
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
            setNoUser={setNoUser}
            setCountryPrefix={setCountryPrefix}
            countryPrefix={countryPrefix}
          />
        )
      )}
    </div>
  );
};

export default Home;
