import { useState } from 'react';
import './InputCountry.scss';
// import { countryData } from './countryData';
import { countryCodesData } from "../SearchableCountryCodes/countryCodesData";
import SearchableCountryCodes from "../SearchableCountryCodes/SearchableCountryCodes";

function InputCountry({number, setNumber,phoneError, setPhoneError, countryPrefix, setCountryPrefix}) {
    const [selectedCountry, setSelectedCountry] = useState(countryCodesData[0]);
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [isValid, setIsValid] = useState(true);

    // const handleCountryChange = selectedOption => {
    //     setCountryPrefix(selectedOption.countryCode)
    //     setSelectedCountry(selectedOption);
    //     // setPhoneNumber('');
    //     setNumber('');
    //     // setIsValid(true);
    //     setPhoneError(false)
    // };

    const handlePhoneNumberChange = (event) => {
        let inputNumber = event.target.value.replace(/\s/g, '');
        inputNumber = inputNumber.replace(/\D/g, '');
        inputNumber = inputNumber.slice(0, selectedCountry.maxDigits);
        // setPhoneNumber(inputNumber);
        setNumber(inputNumber);
        validatePhoneNumber(inputNumber, selectedCountry.maxDigits);
    };

    const validatePhoneNumber = (number, max) => {
        setPhoneError(number.length !== max || number[0] === "0");
    };

    // const formatOptionLabel = ({ label, flag, name, countryCode }, { context }) => {
    //     return context === "value" ? (
    //         <div style={{ display: "flex", alignItems: "center", justifyContent:"center" }}>
    //             {countryCode}
    //         </div>
    //     ) : (
    //         <div style={{ display: "flex", alignItems: "center" }}>
    //             <span style={{ minWidth: 35 }}>{countryCode}</span>
    //             <img src={flag} alt={label} style={{ width: 24, marginRight: 10 }} />
    //             {name}
    //         </div>
    //     );
    // };

    const numberPlaceholderMapper = (selectedCountry) => {
        let zeroes = "";
        for (let i = 0; i < selectedCountry?.maxDigits; i++) {
            zeroes += "0"
        }
        return zeroes;
    };

    return (
        <div className="">
            <div className='country_select'>
                {/* <Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={countryData}
                    formatOptionLabel={formatOptionLabel}
                    getOptionLabel={option => option.name}
                    isSearchable={false}
                /> */}
                <SearchableCountryCodes countryCodesData={countryCodesData} setNumber={setNumber} setPhoneError={setPhoneError}
                    selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setCountryPrefix={setCountryPrefix} />
                <input
                    type="text"
                    value={number}
                    onChange={handlePhoneNumberChange}
                    // maxLength={selectedCountry.maxDigits}
                    placeholder={numberPlaceholderMapper(selectedCountry)}
                    className="country_select_input_field"
                    inputMode='numeric'
                />
            </div>
            {phoneError && number.length > 0 && (
                <div className='error_msg'>
                    {/* Invalid phone number - enter {selectedCountry.maxDigits} digits */}
                    {number?.length === selectedCountry?.maxDigits || number[0] === "0" ? "Invalid phone number" :
                    `Invalid phone number - enter ${selectedCountry?.maxDigits} digits`}
                </div>
            )}
        </div>
    );
}

export default InputCountry;
