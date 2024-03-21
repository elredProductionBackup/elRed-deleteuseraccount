import React from 'react'
import './successpage.scss'
import Button from '../../components/Button/Button'
import { redirectToHome } from '../../functions'
import logo from '../../assets/ok.svg'

const SuccessPage = () => {

    return (
        <div className='success_page'>
            <div
                className='inner_success_page'>
                <img src={logo} alt="" />
                <div className='success_title'>Request Received</div>
                <div className="success_desc">
                    We have received your request, our admin will investigate the request. Account will be deleted in 90 days and  you will be notified via email once the account is deleted
                </div>
            </div>
            <Button title={'OK'} onClickFunction={redirectToHome} />
        </div>
    )
}

export default SuccessPage
