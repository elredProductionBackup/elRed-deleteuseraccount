import { Spinner } from "react-bootstrap";
import "./savingchangesoverlay.scss";

const SavingChangesOverlay = () => {
  return (
    <div className="saving-changes-overlay">
        <div className="saving-changes-overlay-text-container">
            <Spinner variant="danger" className="saving-changes-overlay-spinner" />
            <div className="saving-changes-text">Submitting request...</div>
        </div>
    </div>
  )
}

export default SavingChangesOverlay;