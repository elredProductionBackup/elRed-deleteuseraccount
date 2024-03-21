import React from 'react'
import './confirmationpopup.scss'
import Offcanvas from 'react-bootstrap/Offcanvas';
import delete_logo from '../../assets/del.svg'

const ConfirmationPopup = ({ confirm, setConfirm, setSuccess }) => {
    const handleClose = () => setConfirm(false)
    const confirmed = () => {
        setConfirm(false)
        setSuccess(true)
    }
    return (
        <div className='confirmation_popup'>
            <Offcanvas show={confirm} onHide={handleClose} placement='bottom'>
                <Offcanvas.Body>
                    <div className="d-flex align-items-center flex-column">
                        <div className="handle"></div>
                        <img src={delete_logo} alt="" />
                        <div className="confirm_msg">
                            Are you sure you want to delete the account?
                        </div>
                        <div className="action_msg">
                            <span>Note{" "}</span>
                            - This action cannot be undone.
                        </div>
                        <div className="button_div d-flex align-items-center">
                            <div className='no_btn' onClick={handleClose}>No</div>
                            <div className='yes_btn' onClick={confirmed}>Yes</div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default ConfirmationPopup
