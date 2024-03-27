import "./noaccountmodal.scss";
import alert from "../../assets/redalert.svg";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const NoAccountModal = ({ setNoUser }) => {
  const [imageLoader, setimageLoader] = useState(true);

  return (
    <>
      <div id="overlay"></div>
      <div className="no-account-modal-container">
        <div className="no-account-modal">
          <div className="no-account-alert-img-container">
            <img src={alert} alt="" className={imageLoader ? "d-none" : "no-account-alert-img"} 
              onLoad={() => setimageLoader(false)} />
            <div className={imageLoader ? "no-account-alert-img-loader-container" : "d-none"}>
              <Spinner variant='danger' className="no-account-img-spinner" />
            </div>
          </div>
          <div className="no-account-popup-header">Account doesn’t exist</div>
          <div className="no-account-popup-text">
            No user account exists with this number, please try with a different
            number.
          </div>
          <div
            className="no-account-popup-btn"
            onClick={() => setNoUser(false)}
          >
            Ok
          </div>
        </div>
      </div>
    </>
  );
};

export default NoAccountModal;
