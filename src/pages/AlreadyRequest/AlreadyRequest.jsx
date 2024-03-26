import React, { useEffect, useState } from 'react'
import '../SuccessPage/successpage.scss'
import Button from '../../components/Button/Button'
import { redirectToHome } from '../../functions'
import logo from '../../assets/ok.svg'

const AlreadyRequest = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const img = new Image();
        img.onload = () => setLoading(false);
        img.src = logo;
    }, []);

    return (
        <div className='success_page'>
            <div
                className='inner_success_page'>
                {loading ? <div className='img_shimmer'></div> :
                    <img src={logo} alt="" />}
                <div className='success_title'>Account deletion is already
                    in progress</div>
                <div className="success_desc">
                    We have received your request, our admin will investigate the request. Account will be deleted in 90 days and  you will be notified via email once the account is deleted
                </div>
            </div>
            <Button title={'Ok'} onClickFunction={redirectToHome} />
        </div>
    )
}

export default AlreadyRequest
