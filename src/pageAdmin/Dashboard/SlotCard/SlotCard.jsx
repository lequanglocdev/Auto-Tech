import React from 'react';
import styles from './SLotCard.module.css';

const SlotCard = ({ slotInfo, index, handleViewSlot, handleBookSlot }) => {
    if (slotInfo.slot.status === 'booked') {
        return null;
    }
    return (
        <div className={styles.slotCard}>
            <div className={styles.slotCardHeader}>
                <p className={styles.slotCardHeaderTextLeft}>Khu vực chăm sóc số {index + 1}</p>
                <p className={styles.availableStatus}>Trống</p>
            </div>
            <div className={styles.slotCardBody}>
                
            </div>
            <div className={styles.slotCardFooter}>
                <div className={styles.slotCardFooterBook} onClick={() => handleBookSlot(slotInfo)}>
                    <span>Đặt dịch vụ</span>
                </div>
            </div>
        </div>
    );
};

export default SlotCard;
