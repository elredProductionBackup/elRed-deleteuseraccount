import React, { useState } from 'react'
import './header.scss'
import logo from '../../assets/el_red.svg'
import { redirectToHome } from '../../functions'
import Skeleton from "react-loading-skeleton";

const Header = () => {
    const [headerLoader, setHeaderLoader] = useState(true);

    return (
        <div className='header_elred'>
            <img src={logo} alt="" onClick={() => redirectToHome()} className={headerLoader ? "d-none" : ""}
                onLoad={() => setHeaderLoader(false)} />
            <Skeleton height={20} width={72} borderRadius={6} baseColor={"#D6DAE5"} 
                className={headerLoader ? "header-elred-logo-shimmer" : "d-none"} />
        </div>
    )
}

export default Header
