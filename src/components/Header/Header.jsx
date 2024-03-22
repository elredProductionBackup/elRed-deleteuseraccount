import React from 'react'
import './header.scss'
import logo from '../../assets/el_red.svg'
import { redirectToHome } from '../../functions'

const Header = () => {
    return (
        <div className='header_elred'>
            <img src={logo} alt="" onClick={() => redirectToHome()} />
        </div>
    )
}

export default Header
