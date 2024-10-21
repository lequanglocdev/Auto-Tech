import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import styles from './CalendarSearch.module.css';
import { FaPlusCircle } from 'react-icons/fa';
import { createAppointmentCustomer } from '@/utils/api';
import { ToastContainer, toast } from 'react-toastify';

const CalendarSearch = ({ bookedSlots, fetchAppointments }) => {
    const [updatedBookedSlots, setUpdatedBookedSlots] = useState(bookedSlots);

    const handleConfirmCustomer = async (appointment) => {
        const id = appointment._id;
        try {
            await createAppointmentCustomer(id);
            toast.success('Xác nhận khách hàng thành công!');
            
            // Cập nhật danh sách bookedSlots để loại bỏ lịch hẹn đã xác nhận
            const updatedSlots = updatedBookedSlots.filter(
                (slotInfo) => slotInfo.appointments[0]._id !== id
            );
            setUpdatedBookedSlots(updatedSlots);

            await fetchAppointments(); // Gọi lại fetchAppointments sau khi API thành công
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi xác nhận khách hàng.');
            console.error('Lỗi:', error);
        }
    };

    const hanleCancelCustomer = async () => {
        alert('Hủy lịch khách hàng');
    };

    return (
        <div className={styles.calendarSearch}>
            <h3>Lịch hẹn</h3>
            <Form className={styles.calendarForm}>
                <Form.Control size="lg" type="text" placeholder="Search" />
                <div>
                    <FaPlusCircle />
                </div>
            </Form>
            <div className={styles.bookedSlots}>
                {updatedBookedSlots.length > 0 ? (
                    updatedBookedSlots.map((slotInfo, index) => (
                        <div key={slotInfo.slot._id} className={styles.bookedSlot}>
                            <div className={styles.slotCardHeader}>
                                <p className={styles.slotCardHeaderTextLeft}>Khu vực chăm sóc số {index + 1}</p>
                                <p className={styles.availableStatus}>Chờ xác nhận</p>
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
                                <div className={styles.slotCardFooterCompleted} onClick={() => handleConfirmCustomer(slotInfo.appointments[0])}>
                                    <span>Xác nhận</span>
                                </div>
                                <div className={styles.slotCardFooterDelete} onClick={hanleCancelCustomer}>
                                    <span>Huỷ</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Không có lịch hẹn nào</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default CalendarSearch;
