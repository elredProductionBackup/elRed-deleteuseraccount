import React, { useState } from 'react'
import MainPage from '../MainPage/MainPage'
import OtpPage from '../OtpPage/OtpPage'

const Home = () => {
    const [otpPage, setOtpPage] = useState(false)
    const [number, setNumber] = useState('')
    return (
        <div>
            {
                otpPage ? <OtpPage number={number} /> : <>
                    <MainPage setPage={setOtpPage} number={number} setNumber={setNumber} /></>
            }
        </div>
    )
}

const Page1 = () => {
    return (
        <div>Page 1</div>
    )
}

const Page2 = () => {
    const [page3, setPage3] = useState(false)
    return (
        <div>
            {
                page3 ? <Page3 /> : <>
                    <div className='bg-success'>Page 2</div>
                    <button onClick={() => setPage3(true)}>goto page 3</button>
                </>
            }
        </div>

    )
}


const Page3 = () => {
    return (
        <>
            <h1>Page 3</h1>
        </>
    )
}

export default Home
