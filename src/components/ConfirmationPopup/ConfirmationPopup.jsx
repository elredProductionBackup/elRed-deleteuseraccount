import React, { useState } from 'react'
import './confirmationpopup.scss'
import Offcanvas from 'react-bootstrap/Offcanvas';
import delete_logo from '../../assets/del.svg'
import { Spinner } from 'react-bootstrap';

const ConfirmationPopup = ({ confirm, setConfirm, setSuccess, submitRequest }) => {
    const handleClose = () => setConfirm(false)
    const [loading, setLoading] = useState(true)

    return (
        <div className='confirmation_popup'>
            <Offcanvas show={confirm} onHide={handleClose} placement='bottom'>
                <Offcanvas.Body>
                    <div className="d-flex align-items-center flex-column">
                        <div className="handle"></div>
                        <div className={loading ? "d-flex img-div-conatiner align-items-center justify-content-center" : "d-none"}>
                            <Spinner variant='danger' />
                        </div>
                        <img src={delete_logo} alt="" onLoad={() => setLoading(false)} className={loading ? "d-none" : "d-block img-div-conatiner"} />
                        <div className="confirm_msg">
                            Are you sure you want to delete the account?
                        </div>
                        <div className="action_msg">
                            <span>Note{" "}</span>
                            - This action cannot be undone.
                        </div>
                        <div className="button_div d-flex align-items-center">
                            <div className='no_btn' onClick={handleClose}>No</div>
                            <div className='yes_btn' onClick={submitRequest}>Yes</div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default ConfirmationPopup
