import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const CountryDropdownListItem = ({ item, index, selectedCountry, selectCodeFromList }) => {
    const [flagIconLoader, setFlagIconLoader] = useState(true);

    return (
        <>
            {index !== 0 && <hr className="country-codes-list-divider-border" />}
            <div className={selectedCountry?.countryCode === item?.countryCode ? "country-codes-list-item-single country-codes-list-item-single-active" 
                : "country-codes-list-item-single"} onClick={() => selectCodeFromList(item)} >
                <div className="country-codes-list-item-code-num">{item?.countryCode}</div>
                <Skeleton baseColor="#D7D7D7" className={flagIconLoader ? "country-codes-list-item-flag" : "d-none"} />
                <img src={item?.countryFlagIcon} alt="" className={flagIconLoader ? "d-none" 
                    : "country-codes-list-item-flag country-codes-list-item-flag-border"} onLoad={() => setFlagIconLoader(false)} />
                <div className="country-codes-list-item-name">{item?.countryName}</div>
            </div>
        </>
  )
}

export default CountryDropdownListItem;