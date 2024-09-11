import React from 'react';
import styles from './Register.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import icons from '@/utils/icon';
import { useRegisterForm, usePasswordToggle } from './hooks/useRegisterForm';

const Register = () => {
    const { FaRegUser, IoMdEye, IoMdEyeOff, FaMailBulk, FaPhone } = icons;
    const { formData, errorMessage, handleInputChange, validateForm } = useRegisterForm();
    const [showPassword, togglePasswordVisibility] = usePasswordToggle();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Đăng ký thành công!');
        }
    };

    return (
        <div className={styles.register}>
            <div className={styles.registerContainer}>
                <div className={styles.registerImage}>
                    <img src="./logo.png" alt="Logo" />
                </div>
                <div className={styles.registerForm}>
                    <p>Đăng ký</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <div className={styles.registerGroup}>
                                <FaRegUser className={styles.registerIcon} />
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Nhập tên"
                                    className={styles.registerInput}
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                />
                            </div>
                            {errorMessage.name && <div className={styles.errorMessage}>{errorMessage.name}</div>}
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <div className={styles.registerGroup}>
                                <span onClick={togglePasswordVisibility} className={styles.registerIcon}>
                                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                                </span>
                                <Form.Control
                                    size="lg"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Nhập mật khẩu"
                                    className={styles.registerInput}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                />
                            </div>
                            {errorMessage.password && (
                                <div className={styles.errorMessage}>{errorMessage.password}</div>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <div className={styles.registerGroup}>
                                <span onClick={togglePasswordVisibility} className={styles.registerIcon}>
                                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                                </span>
                                <Form.Control
                                    size="lg"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    className={styles.registerInput}
                                    value={formData.confirmpassword}
                                    onChange={(e) => handleInputChange('confirmpassword', e.target.value)}
                                />
                            </div>
                            {errorMessage.confirmpassword && (
                                <div className={styles.errorMessage}>{errorMessage.confirmpassword}</div>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <div className={styles.registerGroup}>
                                <FaMailBulk className={styles.registerIcon} />
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Nhập email"
                                    className={styles.registerInput}
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </div>
                            {errorMessage.email && <div className={styles.errorMessage}>{errorMessage.email}</div>}
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <div className={styles.registerGroup}>
                                <FaPhone className={styles.registerIcon} />
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    className={styles.registerInput}
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                />
                            </div>
                            {errorMessage.phone && <div className={styles.errorMessage}>{errorMessage.phone}</div>}
                        </Form.Group>
                        <Button variant="danger" type="submit" size="lg" className={styles.registerButton}>
                            Đăng ký
                        </Button>
                    </Form>
                    <div className={styles.registerFooter}>
                        <a href="/">Quay lại</a>
                        <a href="/login">Đăng nhập</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
