import { useEffect, useState } from "react";
import "./otppage.scss";
import Button from "../../components/Button/Button";
import TitleText from "../../components/TitleText/TitleText";
import OTPInput from "react-otp-input";
import SuccessPage from "../SuccessPage/SuccessPage";
import NoAccountModal from "../../components/NoAccountModal/NoAccountModal";
import ConfirmationPopup from "../../components/ConfirmationPopup/ConfirmationPopup";
import { useCountdownTimer } from "../../components/Hooks/useCountDownTimer";

const OtpPage = ({ number }) => {
  const [otp, setOtp] = useState("");
  const [incorrectOtp, setIncorrectOtp] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showNoAccountPopup, setShowNoAccountPopup] = useState(false);
  const [confirm, setConfirm] = useState(false)
  const [startTimer, setStartTimer] = useState(false);
  const { timer, formatTime, resetTimer } = useCountdownTimer(60, startTimer);

  useEffect(() => {
    setStartTimer(true);
  }, []);

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
              <span className="otp-page-phone-number">+91 {number}</span>
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
                  />
                )}
              />
              {incorrectOtp ? (
                <div class="incorrect-otp-error">Invalid OTP entered</div>
              ) : null}
            </div>
            {timer > 0 && startTimer ? (
              <div className="otp-time-remaining">
                Time Remaining: {timer > 0 && formatTime(timer)}
              </div>
            ) : (
              <div className="resend-otp-link-container">
                <span
                  className="resend-otp-link-txt"
                  onClick={() => setShowNoAccountPopup(true)}
                  // onClick={resetTimer}
                >
                  Resend OTP
                </span>
              </div>
            )}
          </div>
          <Button
            onClickFunction={() => setConfirm(true)}
            title={"Submit delete request"}
          />
        </div>
      )}
      {showNoAccountPopup ? <NoAccountModal /> : null}
      {confirm ? <ConfirmationPopup confirm={confirm} setConfirm={setConfirm} setSuccess={setSuccess} /> : null}
    </>
  );
};

export default OtpPage;
