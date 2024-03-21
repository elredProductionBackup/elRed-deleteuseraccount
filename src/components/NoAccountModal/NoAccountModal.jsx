import "./noaccountmodal.scss";
import alert from "../../assets/redalert.svg";

const NoAccountModal = () => {
  return (
    <>
      <div id="overlay"></div>
      <div className="no-account-modal-container">
        <div className="no-account-modal">
          <div className="no-account-alert-img-container">
            <img src={alert} alt="" className="no-account-alert-img" />
          </div>
          <div className="no-account-popup-header">Account doesn’t exist</div>
          <div className="no-account-popup-text">
            No user account exists with this number, please try with a different
            number.
          </div>
          <div
            className="no-account-popup-btn"
            onClick={() => window.location.reload()}
          >
            Ok
          </div>
        </div>
      </div>
    </>
  );
};

export default NoAccountModal;
