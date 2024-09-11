import React from 'react';
import styles from './Login.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import icons from '@/utils/icon';

import { useLoginForm, usePasswordToggle } from './hooks/useLoginForm';

const Login = () => {
    const { FaRegUser, IoMdEye, IoMdEyeOff} = icons;
    const { formData, errorMessage, handleInputChange, validateForm } = useLoginForm();
    const [showPassword, togglePasswordVisibility] = usePasswordToggle();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Đăng ký thành công!');
        }
    };
    return (
        <div className={styles.login}>
        <div className={styles.loginContainer}>
            <div className={styles.loginImage}>
                <img src="./logo.png" alt="Logo" />
            </div>
            <div className={styles.loginForm}>
                <p>Đăng nhập </p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <div className={styles.loginGroup}>
                            <FaRegUser className={styles.loginIcon} />
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Nhập tên"
                                className={styles.loginInput}
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </div>
                        {errorMessage.name && <div className={styles.errorMessage}>{errorMessage.name}</div>}
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <div className={styles.loginGroup}>
                            <span onClick={togglePasswordVisibility} className={styles.loginIcon}>
                                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                            </span>
                            <Form.Control
                                size="lg"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu"
                                className={styles.loginInput}
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                            />
                        </div>
                        {errorMessage.password && (
                            <div className={styles.errorMessage}>{errorMessage.password}</div>
                        )}
                    </Form.Group>
                 
                    <Button variant="danger" type="submit" size="lg" className={styles.loginButton}>
                        Đăng nhập
                    </Button>
                </Form>
                <div className={styles.loginFooter}>
                    <a href="/">Quay lại</a>
                    <a href="/login">Đăng ký</a>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;
