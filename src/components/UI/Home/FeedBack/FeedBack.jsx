import React from 'react';
import styles from './FeedBack.module.css';
import { Container } from 'react-bootstrap';

const FeedBack = () => {
    return (
        <div className={styles.feedback}>
            <div className={styles.overlay}></div>
            <Container className={styles.content}>
                <div className={styles['feedback-header']}>
                    <h4>Cảm nhận khách hàng</h4>
                </div>
                <div className={styles['feedback-body']}>
                      <div className={styles['feedback-content']}></div>  
                      <div className={styles['feedback-content']}></div>  
                </div>
            </Container>
        </div>
    );
};

export default FeedBack;
