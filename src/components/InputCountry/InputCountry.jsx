import { useState } from 'react';
import Select from 'react-select';
import india from '../../assets/flags/in-flag.webp';
import canada from '../../assets/flags/ca-flag.webp';
import malaysia from '../../assets/flags/my-flag.webp';
import qatar from '../../assets/flags/qa-flag.webp';
import './InputCountry.scss';

const countryData = [
    { value: "India", label: "IN", name: "India", maxDigits: 10, countryCode: "+91", flag: india },
    { value: "Canada", label: "Canada", maxDigits: 10, name: "Canada", countryCode: "+1", flag: canada },
    { value: "Malaysia", label: "Malaysia", maxDigits: 10, name: "Malaysia", countryCode: "+60", flag: malaysia },
    { value: "Qatar", label: "Qatar", maxDigits: 8, name: "Qatar", countryCode: "+974", flag: qatar }
];

function InputCountry({number, setNumber}) {
    const [selectedCountry, setSelectedCountry] = useState(countryData[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleCountryChange = selectedOption => {
        setSelectedCountry(selectedOption);
        // setPhoneNumber('');
        setNumber('');
        setIsValid(true);
    };

    const handlePhoneNumberChange = (event) => {
        let inputNumber = event.target.value.replace(/\D/g, '');
        inputNumber = inputNumber.slice(0, selectedCountry.maxDigits);
        // setPhoneNumber(inputNumber);
        setNumber(inputNumber);
        validatePhoneNumber(inputNumber, selectedCountry.maxDigits);
    };

    const validatePhoneNumber = (number, max) => {
        setIsValid(number.length === max);
    };

    const formatOptionLabel = ({ label, flag, name, countryCode }, { context }) => {
        return context === "value" ? (
            <div style={{ display: "flex", alignItems: "center" }}>
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
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    maxLength={selectedCountry.maxDigits}
                    placeholder='000 000 000'
                />
            </div>
            {!isValid && phoneNumber.length > 0 && (
                <div className='error_msg'>
                    Invalid phone number - enter {selectedCountry.maxDigits} digits
                </div>
            )}
        </div>
    );
}

export default InputCountry;
