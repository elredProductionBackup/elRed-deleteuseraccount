import React from 'react'
import './button.scss'
import { Spinner } from 'react-bootstrap'

const Button = ({ onClickFunction, title, disable, loading }) => {
    return (
        <div className='btn_div'>
            <button className={disable ? `btn button_main_disable` : `btn button_main`} onClick={loading ? null : onClickFunction}>
                {loading ? 
                    <div className="submit_button_spinner_wrapper">
                        <Spinner animation="border" className="submit_button_spinner" />
                    </div> : title}
            </button>
        </div>
    )
}

export default Button
