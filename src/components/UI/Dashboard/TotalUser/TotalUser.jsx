import React from 'react';
import styles from './TotalUser.module.css';
const TotalUser = () => {
    return (
        <div className={styles.dashBoardTotalUser}>
            <div>
                <div>
                    <span>TotalUser</span>
                    <span>277</span>
                </div>
                <div>
                    <span>last month</span>
                    <span>icon</span>
                </div>
            </div>
        </div>
    );
};

export default TotalUser;
