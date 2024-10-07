import React from 'react';
import styles from './Otp.module.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {  verifyOtpApi} from '@/utils/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useOTP } from './hooks/otpForm';
import icons  from '@/utils/icon'
const Otp = () => {
    const {FaMailBulk, FaLock } = icons
    const { formData, setFormData, errorMessage, handleInputChange, validateForm } = useOTP()
    const navigate = useNavigate();
    const handleSubmitButon = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await verifyOtpApi(formData.email, formData.otp);
                console.log(">> check otp",response.otp)
                toast.success(response.msg, { autoClose: 3000 });
                setTimeout(() => {
                  navigate('/login');
              }, 3000); 
                setFormData({
                    email: '',
                    otp: '',
                });
            } catch (error) {
                toast.error('Email của bạn đã được sử dụng rồi ', { autoClose: 3000 });
            }
        }
    };

    return (
        <div className={styles.otp}>
            <div className={styles.otpContainer}>
                <div className={styles.otpImage}>
                    <img src="./logo.png" alt="Logo" />
                </div>
                <div className={styles.otpForm}>
                    <p>Xác thực OTP </p>
                    <Form onSubmit={handleSubmitButon}>
                        <Form.Group controlId="formName">
                            <div className={styles.otpGroup}>
                                <FaMailBulk className={styles.otpIcon} />
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Nhập địa chỉ email"
                                    className={styles.otpInput}
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </div>
                            {errorMessage.email && <div className={styles.errorMessage}>{errorMessage.email}</div>}
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <div className={styles.otpGroup}>
                                <FaLock className={styles.otpIcon} />
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Nhập mã otp"
                                    className={styles.otpInput}
                                    value={formData.otp}
                                    onChange={(e) => handleInputChange('otp', e.target.value)}
                                />
                            </div>
                            {errorMessage.otp && <div className={styles.errorMessage}>{errorMessage.otp}</div>}
                        </Form.Group>
                        
                        <Button variant="danger" type="submit" size="lg" className={styles.otpButton}>
                            Xác thực
                        </Button>
                    </Form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Otp;
