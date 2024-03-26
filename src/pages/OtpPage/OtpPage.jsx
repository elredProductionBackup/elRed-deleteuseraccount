import { useEffect, useState } from "react";
import "./otppage.scss";
import Button from "../../components/Button/Button";
import TitleText from "../../components/TitleText/TitleText";
import OTPInput from "react-otp-input";
import SuccessPage from "../SuccessPage/SuccessPage";
import ConfirmationPopup from "../../components/ConfirmationPopup/ConfirmationPopup";
import { useCountdownTimer } from "../../components/Hooks/useCountDownTimer";
import axios from "axios";
import { formatPhoneNumber } from "../../functions";

const OtpPage = ({ number, reason, transactionId, resendOtp }) => {
  const { REACT_APP_API_ENDPOINT } = process.env
  const [otp, setOtp] = useState("");
  const [incorrectOtp, setIncorrectOtp] = useState(false);
  const [expiredOtp, setExpiredOtp] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false)
  const [startTimer, setStartTimer] = useState(false);
  const { timer, formatTime, resetTimer } = useCountdownTimer(60, startTimer);
  const buttonDisabled = otp.length < 6

  useEffect(() => {
    setStartTimer(true);
  }, []);

  const submitRequest = async () => {
    setConfirm(false)
    const data = { reason, otp, transactionId, phone: `+91${number}` }
    try {
      const res = await axios.post(`${REACT_APP_API_ENDPOINT}/webViewDeleteAccountVerifyOtp`, data)
      if (res?.data?.success) {
        setSuccess(true)
      } else if (res?.data?.errorCode === 5) {
        setIncorrectOtp(true)
      } else if (res?.data?.errorCode === 8) {
        setExpiredOtp(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onFocusOtp = () => {
    setIncorrectOtp(false)
    setExpiredOtp(false)
  }

  return (
    <>
      {success ? (
        <SuccessPage />
      ) : (
        <div className="main_page">
          <div className="main_page_content">
            <TitleText title={"One time password"} />
            <div className="main_page_desc">
              We have sent OTP to your registered mobile number{" "}
              <span className="otp-page-phone-number">{formatPhoneNumber(number)}</span>
            </div>
            <div className="otp-input-label">OTP</div>
            <div className="otp-input-wrapper-div">
              <OTPInput
                value={otp}
                onChange={setOtp}
                isInputNum
                numInputs={6}
                pattern="[0-9]*"
                inputType="number"
                renderInput={(props) => (
                  <input
                    {...props}
                    className={
                      incorrectOtp
                        ? "custom_input_one border_error"
                        : "custom_input_one"
                    }
                    type="text"
                    inputMode="decimal"
                    onFocus={onFocusOtp}
                  />
                )}
              />
              {incorrectOtp && <div className="incorrect-otp-error">Invalid OTP entered</div>}
              {expiredOtp && <div className="incorrect-otp-error">OTP expired</div>}
            </div>
            {timer > 0 && startTimer ? (
              <div className="otp-time-remaining">
                Time Remaining: {timer > 0 && formatTime(timer)}
              </div>
            ) : (
              <div className="resend-otp-link-container">
                <span
                  className="resend-otp-link-txt"
                  onClick={() => {
                    resendOtp()
                    resetTimer()
                    setIncorrectOtp(false)
                    setOtp("")
                  }}
                >
                  Resend OTP
                </span>
              </div>
            )}
          </div>
          <Button
            onClickFunction={() => setConfirm(true)}
            title={"Submit delete request"}
            disable={buttonDisabled}
          />
        </div>
      )}
      {confirm ? <ConfirmationPopup confirm={confirm} setConfirm={setConfirm} setSuccess={setSuccess} submitRequest={submitRequest} /> : null}
    </>
  );
};

export default OtpPage;
