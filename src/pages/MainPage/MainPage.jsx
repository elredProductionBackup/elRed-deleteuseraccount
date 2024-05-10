import Button from '../../components/Button/Button'
import './mainpage.scss'
import TitleText from '../../components/TitleText/TitleText'
import { deleteInstructions } from '../../data'
import { handleChange, handlePaste, onPhoneBlur } from '../../functions'
import NoAccountModal from '../../components/NoAccountModal/NoAccountModal'
import DeleteInstructions from '../../components/DeleteInstructions/DeleteInstructions'
import { isMacOs } from 'react-device-detect';
import InputCountry from '../../components/InputCountry/InputCountry'

const MainPage = ({ number, setNumber, handleSubmit, setReason, reason, phoneError, setPhoneError, noUser, otpLoader, setNoUser,
    countryPrefix, setCountryPrefix
 }) => {
    // const handleClick = () => { setPage(true) }, 
    const isReason = reason.trim().length === 0;
    const isButtonDisabled = !phoneError || number === '' || isReason === true;

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
                    {/* <div className="number_input">
                        <div className={isMacOs ? 'country_code input-mac-os-padding-top' : 'country_code'}>+91</div>
                        <input type="text"
                            value={number}
                            onChange={(e) => handleChange(e, setNumber, setPhoneError)}
                            onPaste={(e) => handlePaste(e, setNumber, setPhoneError)}
                            onBlur={(e) => onPhoneBlur(e,setNumber, setPhoneError)}
                            maxLength={10} 
                            inputMode="numeric" 
                            placeholder='Enter phone number'
                            autoComplete="phoneInputNoAutocomplete"
                            className={isMacOs ? 'input-mac-os-padding-top' : ''}
                            />
                    </div>
                    {phoneError && <div className="error_number">Enter valid phone number</div>} */}
                    <InputCountry number={number} setNumber={setNumber} phoneError={phoneError} setPhoneError={setPhoneError} countryPrefix={countryPrefix} setCountryPrefix={setCountryPrefix}/>
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

            {noUser ? <NoAccountModal setNoUser={setNoUser} /> : null}
        </div>
    )
}

export default MainPage
