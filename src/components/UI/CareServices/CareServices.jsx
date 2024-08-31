import React from 'react';
import {  Container, Image,  } from 'react-bootstrap';
import './CareServices.css';
const CareServices = () => {
    return (
        <Container>
            <div className="care-services">
                <h4>Dịch vụ chăm sóc</h4>
                <p>Đây là một trong số những dịch vụ sửa chữa ô tô mà Auto Tech chúng tôi cung cấp.</p>
            </div>
            <div className="care-content">
                <div className='care-card'>
                    <Image src='./services1.png' width={130} height={130}/>
                    <p></p>
                </div>
                <div className='care-card'>
                    <Image src=''/>
                    <p></p>
                </div>
                <div className='care-card'>
                    <Image src=''/>
                    <p></p>
                </div>
                <div className='care-card'>
                    <Image src=''/>
                    <p></p>
                </div>
                <div className='care-card'>
                    <Image src=''/>
                    <p></p>
                </div>
                <div className='care-card'>
                    <Image src=''/>
                    <p></p>
                </div>
                <div className='care-card'>
                    <Image src=''/>
                    <p></p>
                </div>
                <div className='care-card'>
                    <Image src=''/>
                    <p></p>
                </div>
                <div className='care-card'>
                    <Image src=''/>
                    <p></p>
                </div>
                <div className='care-card'>
                    <Image src=''/>
                    <p></p>
                </div>
                <div className='care-card'>
                    <Image src=''/>
                    <p></p>
                </div>
                <div className='care-card'>
                    <Image src=''/>
                    <p></p>
                </div>
            </div>
        </Container>
    );
};

export default CareServices;
