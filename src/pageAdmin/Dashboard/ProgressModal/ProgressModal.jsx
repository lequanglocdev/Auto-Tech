import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import icons from '@/utils/icon';
import styles from './ProgressModal.module.css';

const ProgressModal = ({ show, onClose, appointmentDetail }) => {
    const [totalTime, setTotalTime] = useState(0);
    const {FaCheck, FaRegCalendarAlt, FaBriefcase  } = icons
    useEffect(() => {
        if (appointmentDetail) {
            let totalMinutes = 0;

            // Cộng dồn thời gian của từng dịch vụ
            appointmentDetail.services?.forEach((service) => {
                totalMinutes += service.time_required;
            });

            setTotalTime(totalMinutes); // Lưu tổng thời gian của các dịch vụ
        }
    }, [appointmentDetail]);

    const getFormattedTime = (startDate, minutesToAdd) => {
        const start = new Date(startDate);
        const end = new Date(start.getTime() + minutesToAdd * 60000); // Thêm phút vào thời gian tiếp nhận
        return end.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    };
    return (
        <Modal centered show={show} onHide={onClose} size="lg" className={styles.modalSize}>
            <Modal.Header closeButton>
                <Modal.Title className={styles.customerTitle}>Thông tin chi tiết cuộc hẹn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {appointmentDetail ? (
                    <div>
                        <div className={styles.InfoCustomer}>
                            <div>
                                <h4 className={styles.InfoHeading}>Thông tin khách hàng</h4>
                                <p className={styles.InfoText}>Tên: {appointmentDetail?.customer_id?.name}</p>
                                <p className={styles.InfoText}>
                                    Số điện thoại: {appointmentDetail?.customer_id?.phone_number}
                                </p>
                                <p className={styles.InfoText}>Email: {appointmentDetail?.customer_id?.email}</p>
                                <p className={styles.InfoText}>Địa chỉ: {appointmentDetail?.customer_id?.address}</p>
                            </div>
                            <div>
                                <h4 className={styles.InfoHeading}>Thông tin xe của khách</h4>
                                <p className={styles.InfoText}>
                                    Biển số: {appointmentDetail?.vehicle_id?.license_plate}
                                </p>
                                <p className={styles.InfoText}>Tên xe: {appointmentDetail?.vehicle_id?.manufacturer}</p>
                                <p className={styles.InfoText}>Dòng xe: {appointmentDetail?.vehicle_id?.model}</p>
                                <p className={styles.InfoText}>Màu sắc: {appointmentDetail?.vehicle_id?.color}</p>
                            </div>
                        </div>
                        <hr />
                        <div className={styles.bodyData}>
                            <h4 className={styles.InfoHeadingServices}>Tiến trình thực hiện</h4>
                            {appointmentDetail?.services && appointmentDetail?.services.length > 0 ? (
                                <div className={styles.serviceItemBody}>
                                    <p className={styles.completed}>
                                        <span className={styles.step}><FaRegCalendarAlt size={20}/></span>
                                        <strong>
                                            Thời gian tiếp nhận: <br />
                                            {new Date(appointmentDetail?.slot_id?.updated_at).toLocaleTimeString(
                                                'en-GB',
                                                {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false,
                                                },
                                            )}
                                        </strong>
                                    </p>

                                    {appointmentDetail.services.map((service, index) => (
                                        <div key={index} className={styles.serviceItem}>
                                            <p className={styles.completed}>
                                                <span className={styles.step}><FaBriefcase size={20}/></span>
                                                <strong>
                                                    {service?.name} <br /> Thời gian: {service?.time_required} phút{' '}
                                                </strong>
                                            </p>
                                        </div>
                                    ))}
                                    <p className={styles.InfoText}>
                                        <p className={styles.completed}>
                                            <span className={styles.step}> <FaCheck size={20}/>  </span>
                                            <strong>
                                                Thời gian ước tính hoàn thành:
                                                {getFormattedTime(appointmentDetail?.slot_id?.updated_at, totalTime)}
                                            </strong>
                                        </p>
                                    </p>
                                </div>
                            ) : (
                                <p>Không có dịch vụ nào được cung cấp.</p>
                            )}
                        </div>
                        <div className={styles}>
                            <h4 className={styles.InfoTextTotal}>
                                Tổng giá tiền: {appointmentDetail?.total_cost.toLocaleString()} đ
                            </h4>
                        </div>
                    </div>
                ) : (
                    <p>Đang tải dữ liệu...</p>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ProgressModal;
