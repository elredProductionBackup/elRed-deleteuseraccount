import React, { useState } from 'react'
import '../SuccessPage/successpage.scss'
import Button from '../../components/Button/Button'
import { redirectToHome } from '../../functions'
import logo from '../../assets/ok.svg'
import Skeleton from 'react-loading-skeleton'
import moment from 'moment'

const AlreadyRequest = ({ date }) => {
    const [imgLoading, setImgLoading] = useState(true);
    const momentDate = moment(date)

    return (
        <div className='success_page'>
            <div className='inner_success_page'>
                <div className={imgLoading ? 'img_shimmer_container' : "d-none"}>
                    <Skeleton height={178} width={178} baseColor={"#D6DAE5"} circle
                        className={imgLoading ? "img_ok_shimmer" : "d-none"} />
                </div>
                <img src={logo} alt="" onLoad={() => setImgLoading(false)}
                    className={imgLoading ? "d-none" : "img_ok_image"} />
                <div className='success_title'>Account deletion is already
                    in progress</div>
                <div className="success_desc">
                    We have received your request on {momentDate.format('MMMM Do')} and our Admin is reviewing your request. You will be notified via email once the account is deleted.<br />
                    <span className='note'>Note</span> : Try to signin via the app, your request will be revoked.
                </div>
            </div>
            <Button title={'Ok'} onClickFunction={redirectToHome} />
        </div>
    )
}

export default AlreadyRequest
