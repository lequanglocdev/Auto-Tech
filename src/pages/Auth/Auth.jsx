import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import { Button } from 'react-bootstrap';

const Auth = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className={styles['auth']}>
            <div className={styles['auth-container']}>
                <div className={styles['auth-image']}>
                    <img src="./logo.png" alt="Logo" />
                </div>
                <div className={styles['auth-btn']}>
                    <Button variant="light" className={styles['btn']} onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                    <Button variant="light" className={styles['btn']} onClick={handleRegister}>
                        Đăng ký
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
