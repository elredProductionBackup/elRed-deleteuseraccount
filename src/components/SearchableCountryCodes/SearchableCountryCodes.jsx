import "./searchable-country-codes.scss";
import { useEffect, useRef, useState } from "react";
import searchIcon from "../../assets/searchIcon.svg";
import DownIcon from "../../assets/red-down-icon.svg";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import CountryDropdownListItem from "./CountryDropdownListItem/CountryDropdownListItem";
import { Spinner } from "react-bootstrap";

const SearchableCountryCodes = ({ countryCodesData, setNumber, setPhoneError, selectedCountry, setSelectedCountry, setCountryPrefix }) => {
    const [showList, setShowList] = useState(false);
    const [countryCodeList, setCountryCodeList] = useState(countryCodesData);
    const [searchVal, setSearchVal] = useState("");
    const [searchIconLoader, setSearchIconLoader] = useState(true);
    const inputRef = useRef();
    const dropdownRef = useRef();

    const handlClose = () => {
        setShowList(false);
    };
 
    useOnClickOutside(dropdownRef, handlClose);

    const selectCodeFromList = (country) => {
        setSelectedCountry(country);
        setCountryPrefix(country?.countryCode);
        setShowList(false);
        setNumber("");
        setPhoneError(false);
    };

    useEffect(() => {
        setSearchVal("");
        setCountryCodeList(countryCodesData);
    }, [showList]); // eslint-disable-line

    const handleDropdownSearch = (e) => {
        const searchInput = e.target.value?.trimStart();
        if (/^\+?[a-zA-Z0-9 ]*$/.test(searchInput)) {
            setSearchVal(searchInput);
        } else {
            return false;
        }
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
    }, [searchVal]); //eslint-disable-line

    useEffect(() => {
        setSearchIconLoader(true);
    }, [showList]);

    // useEffect(() => {
    //     if (showList) inputRef?.current?.focus();
    // }, [showList]);

    return (
        <div ref={dropdownRef} className="searchable-country-codes-main-container">
            <div className="searchable-country-codes-top-field" onClick={() => setShowList(!showList)}>
                <span className="codes-top-field-text">{selectedCountry?.countryCode}</span>
                <img src={DownIcon} alt="" className="searchable-country-codes-down-icon" />
            </div>
            {showList ? 
                <div className="searchable-country-codes-dropdown">
                    <div className="searchable-country-codes-search-container">
                        <div className="searchable-country-codes-search-icon-container">
                            <Spinner variant="danger" className={searchIconLoader ? "searchable-country-codes-search-icon-loader" : "d-none"} />
                            <img src={searchIcon} alt="" className={searchIconLoader ? "d-none" : "searchable-country-codes-search-icon"} 
                                onLoad={() => setSearchIconLoader(false)} />
                        </div>
                        <input type="text" value={searchVal} onChange={(e) => handleDropdownSearch(e)} ref={inputRef}
                            placeholder="Search by country code / name" className="searchable-country-codes-search-input"/>
                    </div>
                    <div className="country-codes-list-container">
                        {
                            countryCodeList?.sort((a, b) => a.countryName.toLowerCase().localeCompare(b.countryName.toLowerCase()))
                                ?.map((item, index) => 
                                <CountryDropdownListItem key={item?.id} item={item} index={index} selectedCountry={selectedCountry} 
                                    selectCodeFromList={selectCodeFromList} />
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