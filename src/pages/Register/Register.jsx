import React from 'react';
import styles from './Register.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';

const Register = () => {
    return (
        <div className={styles['login']}>
            <div className={styles['login-container']}>
                <div className={styles['login-image']}>
                    <img src="./logo.png" alt="Logo" />
                </div>
                <div className={styles['login-form']}>
                    <Form>
                        <Form.Group controlId="formName">
                            <div className={styles['input-group']}>
                                <FaUser className={styles['input-icon']} />
                                <Form.Control type="text" placeholder="nhập tên" className={styles['input-with-icon']} />
                            </div>
                        </Form.Group>
                        
                        <Form.Group controlId="formPassword">
                            <div className={styles['input-group']}>
                                <FaLock className={styles['input-icon']} />
                                <Form.Control type="password" placeholder="mật khẩu" className={styles['input-with-icon']} />
                            </div>
                        </Form.Group>
                        
                        <Form.Group controlId="formEmail">
                            <div className={styles['input-group']}>
                                <FaEnvelope className={styles['input-icon']} />
                                <Form.Control type="email" placeholder="email" className={styles['input-with-icon']} />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <div className={styles['input-group']}>
                                <FaPhone className={styles['input-icon']} />
                                <Form.Control type="text" placeholder="số điện thoại" className={styles['input-with-icon']} />
                            </div>
                        </Form.Group>

                        <Button variant="danger" type="submit" className={styles['register-button']}>
                            Đăng ký
                        </Button>
                    </Form>
                    <div className={styles['login-footer']}>
                        <a href="/">Quay lại</a>
                        <a href="/login">Đăng nhập</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
