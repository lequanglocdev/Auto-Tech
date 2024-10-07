import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import icons from '@/utils/icon';
import { useLoginForm, usePasswordToggle } from './hooks/useLoginForm';
import { loginAdminApi } from '@/utils/api';
import { AuthContext } from '@/components/context/auth.context';
import { useNavigate } from 'react-router-dom';
import { FaMailBulk } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { IoMdEye, IoMdEyeOff } = icons;
    const { formData, setFormData, errorMessage, handleInputChange, validateForm } = useLoginForm();
    const [showPassword, togglePasswordVisibility] = usePasswordToggle();
    const [isLoading, setIsLoading] = useState(false);
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmitButon = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await loginAdminApi(formData.email, formData.password);
                localStorage.setItem('access_token', response.token);
                toast.success(response.msg, { autoClose: 3000 });
                if (response?.user?.role === 'customer') {
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                } else if (response?.user?.role === 'employee' || response?.user?.role === 'admin') {
                    setTimeout(() => {
                        navigate('/admin');
                    }, 3000);
                }
                setFormData({
                    email: '',
                    password: '',
                });
                setAuth({
                    isAuthenticated: true,
                    user: {
                        email: response?.user?.email,
                        name: response?.user?.username,
                        role: response?.user?.role,
                    },
                });
            } catch (error) {
                toast.error(error.msg, { autoClose: 3000 });
            } finally {
                setIsLoading(false); 
            }
        }
    };

    return (
        <div className={styles.login}>
            {isLoading && (
                <div className={styles.spinnerOverlay}>
                    <Spinner animation="border" role="status" className={styles.customSpinner}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            <div className={styles.loginContainer}>
                <div className={styles.loginImage}>
                    <img src="./logo.png" alt="Logo" />
                </div>
                <div className={styles.loginForm}>
                    <p>Đăng nhập </p>
                    <Form onSubmit={handleSubmitButon}>
                        <Form.Group controlId="formName">
                            <div className={styles.loginGroup}>
                                <FaMailBulk className={styles.loginIcon} />
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Nhập email"
                                    className={styles.loginInput}
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </div>
                            {errorMessage.email && <div className={styles.errorMessage}>{errorMessage.email}</div>}
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
                        <a href="/auth">Quay lại</a>
                        <a href="/register">Đăng ký</a>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Login;
