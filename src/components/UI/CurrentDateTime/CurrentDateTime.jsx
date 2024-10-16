import React, { useState, useEffect } from 'react';
import styles from './CurrentDateTime.module.css';

const CurrentDateTime = () => {
    // State để lưu trữ thời gian hiện tại
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        // Cập nhật thời gian mỗi giây
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        // Dọn dẹp interval khi component bị unmount
        return () => clearInterval(timer);
    }, []);

    // Format ngày và giờ
    const formattedDate = currentDateTime.toLocaleDateString();
    const formattedTime = currentDateTime.toLocaleTimeString();

    return (
        <div className={styles.dateTimeContainer}>
            <p className={styles.dateText}>Date: {formattedDate}</p>
            <p className={styles.timeText}>Time: {formattedTime}</p>
        </div>
    );
};

export default CurrentDateTime;
