import Button from '../../components/Button/Button'
import './mainpage.scss'
import TitleText from '../../components/TitleText/TitleText'
import { deleteInstructions } from '../../data'
import { handleChange, handlePaste, onPhoneBlur } from '../../functions'
import NoAccountModal from '../../components/NoAccountModal/NoAccountModal'
import DeleteInstructions from '../../components/DeleteInstructions/DeleteInstructions'

const MainPage = ({ number, setNumber, handleSubmit, setReason, reason, phoneError, setPhoneError, noUser, otpLoader }) => {
    // const handleClick = () => { setPage(true) }, 
    const isReason = reason.trim().length == 0
    const isButtonDisabled = phoneError || number === '' || isReason === true;

    return (
        <div className='main_page'>
            <div className="main_page_content">
                <TitleText title={'Delete account'} />
                <div className="main_page_desc">
                    Are you sure you want to delete your account?
                </div>
                <div className="delete_instructions">
                    {
                        deleteInstructions?.map((item) => (
                            <DeleteInstructions logo={item?.logo} desc={item?.desc} key={item?.id} />
                        ))
                    }
                </div>
                <div className="phone_number_div">
                    <div className="phone_title">Phone number</div>
                    <div className="number_input">
                        <div className='country_code'>+91</div>
                        <input type="text"
                            value={number}
                            onChange={(e) => handleChange(e, setNumber, setPhoneError)}
                            onPaste={(e) => handlePaste(e, setNumber)}
                            onBlur={(e) => onPhoneBlur(e, setPhoneError)}
                            maxLength={10} />
                    </div>
                    {phoneError && <div className="error_number">Enter valid phone number</div>}
                </div>
                <div className="main_page_question">
                    Why are you deleting your account?
                </div>
                <div className="text_area_div">
                    <textarea placeholder='Type here...' value={reason} onChange={e => setReason(e.target.value)} />
                </div>
                {isReason && <div className="reason_err">Minimum 1 character is required</div>}
            </div>
            <Button loading={otpLoader} onClickFunction={handleSubmit} title={'Get OTP'} disable={isButtonDisabled} />

            {noUser && <NoAccountModal />}
        </div>
    )
}

export default MainPage
