import { useState } from "react";
import { Spinner } from "react-bootstrap";
import "./deleteinstructions.scss";

const DeleteInstructions = ({ logo, desc }) => {
    const [imgLoading, setimgLoading] = useState(true);

    return (
            <div className="instruction_div">
                <div className={imgLoading ? "d-flex align-items-center justify-content-center icon-spinner-container" : "d-none"}>
                    <Spinner variant='danger' className="loader-spinner-instructions-icon" />
                </div>
                <img src={logo} alt="" onLoad={() => setimgLoading(false)} className={imgLoading ? "d-none" : "d-block"} />
                <div className="text_div">
                    {desc}
                </div>
            </div>
        )
    }
  
export default DeleteInstructions;
