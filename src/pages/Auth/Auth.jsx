import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import { Button } from 'react-bootstrap';
import logo from '../../assets/logo.png';

const Auth = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };
    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className={styles.auth}>
            <div className={styles.authContainer}>
                <div className={styles.authImage}>
                    <img src={logo} alt="Logo" />
                </div>
                <div className={styles.authBtn}>
                    <Button variant="light" className={styles.btn} onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                    <Button variant="light" className={styles.btn} onClick={handleRegister}>
                        Đăng ký
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
