import { useState } from 'react';
import Select from 'react-select';
import './InputCountry.scss';
import { countryData } from './countryData';

function InputCountry({number, setNumber,phoneError, setPhoneError, countryPrefix, setCountryPrefix}) {
    const [selectedCountry, setSelectedCountry] = useState(countryData[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleCountryChange = selectedOption => {
        setCountryPrefix(selectedOption.countryCode)
        setSelectedCountry(selectedOption);
        // setPhoneNumber('');
        setNumber('');
        // setIsValid(true);
        setPhoneError(false)
    };

    const handlePhoneNumberChange = (event) => {
        let inputNumber = event.target.value.replace(/\D/g, '');
        inputNumber = inputNumber.slice(0, selectedCountry.maxDigits);
        // setPhoneNumber(inputNumber);
        setNumber(inputNumber);
        validatePhoneNumber(inputNumber, selectedCountry.maxDigits);
    };

    const validatePhoneNumber = (number, max) => {
        setPhoneError(number.length === max);
    };

    const formatOptionLabel = ({ label, flag, name, countryCode }, { context }) => {
        return context === "value" ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent:"center" }}>
                {countryCode}
            </div>
        ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ minWidth: 35 }}>{countryCode}</span>
                <img src={flag} alt={label} style={{ width: 24, marginRight: 10 }} />
                {name}
            </div>
        );
    };

    return (
        <div className="">
            <div className='country_select'>
                <Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={countryData}
                    formatOptionLabel={formatOptionLabel}
                    getOptionLabel={option => option.name}
                    isSearchable={false}
                />
                <input
                    type="text"
                    value={number}
                    onChange={handlePhoneNumberChange}
                    maxLength={selectedCountry.maxDigits}
                    placeholder='000 000 000'
                />
            </div>
            {!phoneError && number.length > 0 && (
                <div className='error_msg'>
                    Invalid phone number - enter {selectedCountry.maxDigits} digits
                </div>
            )}
        </div>
    );
}

export default InputCountry;
