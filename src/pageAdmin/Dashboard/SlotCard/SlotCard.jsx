import React from 'react';
import styles from './SLotCard.module.css';

const SlotCard = ({ slotInfo, index, handleViewSlot, handleBookSlot }) => {
    // Kiểm tra nếu slot đã được booked, không render gì cả
    if (slotInfo.slot.status === 'booked') {
        return null;
    }

    // Nếu slot chưa booked, hiển thị giao diện
    return (
        <div className={styles.slotCard}>
            <div className={styles.slotCardHeader}>
                <p className={styles.slotCardHeaderTextLeft}>Khu vực chăm sóc số {index + 1}</p>
                <p className={styles.availableStatus}>Trống</p>
            </div>
            <div className={styles.slotCardBody}>
                <p className={styles.slotCardBodyText}>
                    <strong>Ngày và giờ:</strong> {/* Thêm thông tin ngày giờ */}
                </p>
                <p className={styles.slotCardBodyText}>
                    <strong>Tổng thời gian dự kiến:</strong> {/* Thêm thông tin thời gian */}
                </p>
                <p className={styles.slotCardBodyText}>
                    <strong>Số lượng khách có thể đặt:</strong> {/* Thêm thông tin số lượng khách */}
                </p>
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
