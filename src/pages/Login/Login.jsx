import React from 'react';
import styles from './Login.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import icons from '@/utils/icon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginForm, usePasswordToggle } from './hooks/useLoginForm';
import { loginAdminApi } from '@/utils/api';

const Login = () => {
    const { FaRegUser, IoMdEye, IoMdEyeOff} = icons;
    const { formData, setFormData, errorMessage, handleInputChange, validateForm } = useLoginForm();
    const [showPassword, togglePasswordVisibility] = usePasswordToggle();
   
    const handleSubmitButon = async(e) => {
        e.preventDefault();    
        if (validateForm()) {
          
            try {
                const response = await loginAdminApi(formData.email, formData.password);
                console.log('Đăng nhập thành công:', response.data);
                localStorage.setItem("access_token",response.token)
                toast.success('Đăng ký thành công!', { autoClose: 3000 });
                setFormData({
                    email: '',
                    password: '',
                  
                });
                console.log('formData after reset:', formData);
            } catch (error) {
                console.error('Lỗi đăng nhập:', error);
              
            } 
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
                <Form onSubmit={handleSubmitButon}>
                    <Form.Group controlId="formName">
                        <div className={styles.loginGroup}>
                            <FaRegUser className={styles.loginIcon} />
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
                    <a href="/">Quay lại</a>
                    <a href="/login">Đăng ký</a>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
    );
};

export default Login;
