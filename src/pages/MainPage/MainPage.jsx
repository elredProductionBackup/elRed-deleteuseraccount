import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import './mainpage.scss'
import TitleText from '../../components/TitleText/TitleText'
import { deleteInstructions } from '../../data'
import { handleChange, handlePaste } from '../../functions'

const MainPage = ({ setPage, number, setNumber }) => {
    const handleClick = () => { setPage(true) }

    return (
        <div className='main_page'>
            <div className="main_page_content">
                <TitleText title={'Delete account'} />
                <div className="main_page_desc">
                    Are you sure you want to delete your account?
                </div>
                <div className="delete_instructions">
                    {
                        deleteInstructions?.map((item, id) => (
                            <div className="instruction_div">
                                <img src={item?.logo} alt="" />
                                <div className="text_div">
                                    {item?.desc}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="phone_number_div">
                    <div className="phone_title">Phone number</div>
                    <div className="number_input">
                        <div className='country_code'>+91</div>
                        <input type="text"
                            value={number}
                            onChange={(e) => handleChange(e, setNumber)}
                            onPaste={(e) => handlePaste(e, setNumber)}
                            maxLength={10} />
                    </div>
                </div>
                <div className="main_page_question">
                    Why are you deleting your account?
                </div>
                <div className="text_area_div">
                    <textarea placeholder='Type here...' />
                </div>
            </div>
            <Button onClickFunction={handleClick} title={'Get OTP'} />
        </div>
    )
}

export default MainPage
