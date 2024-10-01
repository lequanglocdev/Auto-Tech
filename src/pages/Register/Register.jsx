import React from 'react';
import styles from './Register.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import icons from '@/utils/icon';
import { useRegisterForm, usePasswordToggle } from './hooks/useRegisterForm';
import { createCustomerApi } from '@/utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const { FaRegUser, IoMdEye, IoMdEyeOff, FaMailBulk, FaPhone, FaLocationDot  } = icons;
    const { formData, setFormData, errorMessage, handleInputChange, validateForm } = useRegisterForm();
    const [showPassword, togglePasswordVisibility] = usePasswordToggle();
    const naviagte = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await createCustomerApi(
                    formData.username,
                    formData.password,
                    formData.email,
                    formData.name,
                    formData.address,
                    formData.phone_number,
                );
                console.log(response);
                toast.success('Đăng ký thành công!', { autoClose: 3000 });
                setFormData({
                    username: '',
                    password: '',
                    email: '',
                    name: '',
                    address:'',
                    phone_number: '',
                });

                setTimeout(() => {
                    naviagte('/login');
                }, 4000);
            } catch (error) {
                toast.error('Đăng ký thất bại. Vui lòng thử lại!', { autoClose: 3000 });
                setFormData({
                    username: '',
                    name: '',
                    password: '',
                    email: '',
                    phone_number: '',
                    address:''
                });
            }
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
                        <Form.Group controlId="formUserName">
                            <div className={styles.registerGroup}>
                                <FaRegUser className={styles.registerIcon} />
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Nhập tên tài khoản"
                                    className={styles.registerInput}
                                    value={formData.username}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                />
                            </div>
                            {errorMessage.username && (
                                <div className={styles.errorMessage}>{errorMessage.username}</div>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <div className={styles.registerGroup}>
                                <FaRegUser className={styles.registerIcon} />
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Nhập tên người dùng"
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
                                    type="number"
                                    placeholder="Nhập số điện thoại"
                                    className={styles.registerInput}
                                    value={formData.phone_number}
                                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                                />
                            </div>
                            {errorMessage.phone_number && (
                                <div className={styles.errorMessage}>{errorMessage.phone_number}</div>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <div className={styles.registerGroup}>
                                <FaLocationDot  className={styles.registerIcon} />
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Nhập địa chỉ"
                                    className={styles.registerInput}
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                />
                            </div>
                            {errorMessage.address && (
                                <div className={styles.address}>{errorMessage.address}</div>
                            )}
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
            <ToastContainer />
            </div>
        </div>
    );
};

export default Register;
