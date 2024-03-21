import React from 'react'
import './button.scss'

const Button = ({ onClickFunction, title }) => {
    return (
        <div className='btn_div'>
            <button className='btn button_main' onClick={onClickFunction} >
                {title}
            </button>
        </div>
    )
}

export default Button
