import "./searchable-country-codes.scss";
import { useEffect, useRef, useState } from "react";
import searchIcon from "../../assets/searchIcon.svg";
import DownIcon from "../../assets/red-down-icon.svg";
import useOnClickOutside from "../../Hooks/useOnClickOutside";

const SearchableCountryCodes = ({ countryCodesData, setNumber, setPhoneError, setSelectedCountry, setCountryPrefix }) => {
    const [showList, setShowList] = useState(false);
    const [countryCodeList, setCountryCodeList] = useState(countryCodesData);
    const [selectedCode, setSelectedCode] = useState(countryCodesData[0]?.countryCode);
    const [searchVal, setSearchVal] = useState("");
    const inputRef = useRef();
    const dropdownRef = useRef();

    const handlClose = () => {
        setShowList(false);
    };
 
    useOnClickOutside(dropdownRef, handlClose);

    const selectCodeFromList = (country) => {
        setSelectedCountry(country);
        setCountryPrefix(country?.countryCode);
        setSelectedCode(country?.countryCode);
        setShowList(false);
        setNumber("");
        setPhoneError(false);
    };

    useEffect(() => {
        setSearchVal("");
        setCountryCodeList(countryCodesData);
    }, [showList]); // eslint-disable-line

    const handleDropdownSearch = (e) => {
        setSearchVal(e.target.value);
    };

    useEffect(() => {
        if (!searchVal) return setCountryCodeList(countryCodesData);
        const filteredList1 = countryCodesData?.filter((item) => 
            item.countryCode.toLowerCase().includes(searchVal.toLowerCase())
        );
        const filteredList2 = countryCodesData?.filter((item) => 
            item.countryName.toLowerCase().includes(searchVal.toLowerCase())
        );
        const newList = [...new Set([...filteredList1, ...filteredList2])];
        setCountryCodeList(newList);
    }, [searchVal]);

    useEffect(() => {
        if (showList) inputRef?.current?.focus();
    }, [showList]);

    return (
        <div ref={dropdownRef} className="searchable-country-codes-main-container">
            <div className="searchable-country-codes-top-field" onClick={() => setShowList(!showList)}>
                <span className="codes-top-field-text">{selectedCode}</span>
                <img src={DownIcon} alt="" className="searchable-country-codes-down-icon" />
            </div>
            {showList ? 
                <div className="searchable-country-codes-dropdown">
                    <div className="searchable-country-codes-search-container">
                        <div className="searchable-country-codes-search-icon-container">
                            <img src={searchIcon} alt="" className="searchable-country-codes-search-icon" />
                        </div>
                        <span style={{ marginTop: "-4px" }}>|</span>
                        <input type="text" value={searchVal} onChange={(e) => handleDropdownSearch(e)} ref={inputRef}
                            placeholder="Search country code" className="searchable-country-codes-search-input"/>
                    </div>
                    <div className="country-codes-list-container">
                        {
                            countryCodeList?.map((item, index) => 
                                <div key={item?.id}>
                                    {index !== 0 && <hr className="country-codes-list-divider-border" />}
                                    <div className={selectedCode === item.countryCode ? "country-codes-list-item-single country-codes-list-item-single-active" 
                                        : "country-codes-list-item-single"} onClick={() => selectCodeFromList(item)} >
                                        <div className="country-codes-list-item-code-num">{item?.countryCode}</div>
                                        <img src={item?.countryFlagIcon} alt="" className="country-codes-list-item-flag"/>
                                        <div className="country-codes-list-item-name">{item?.countryName}</div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                : null
            }
        </div>
    )
}

export default SearchableCountryCodes;