import { useState, useEffect } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import { FaCheck, FaRegCalendarAlt, FaBriefcase } from 'react-icons/fa'; // Import biểu tượng
import styles from './ProgressModal.module.css'; // CSS module

const ProgressModal = ({ show, onClose, appointmentDetail }) => {
    const [totalTime, setTotalTime] = useState(0);
    const [progress, setProgress] = useState(0); // Phần trăm tiến trình

    useEffect(() => {
        if (appointmentDetail) {
            let totalMinutes = 0;

            // Tính tổng thời gian của các dịch vụ
            appointmentDetail.services?.forEach((service) => {
                totalMinutes += service.time_required;
            });

            setTotalTime(totalMinutes); // Lưu tổng thời gian của các dịch vụ
        }
    }, [appointmentDetail]);

    useEffect(() => {
        if (appointmentDetail && totalTime > 0) {
            const startTime = new Date(appointmentDetail?.slot_id?.updated_at).getTime(); // Thời gian bắt đầu
            const endTime = startTime + totalTime * 60000; // Thời gian kết thúc (tính bằng ms)

            const interval = setInterval(() => {
                const now = Date.now();
                const elapsedTime = now - startTime;
                const percentage = Math.min((elapsedTime / (endTime - startTime)) * 100, 100); // Tính % tiến trình

                setProgress(percentage); // Cập nhật % tiến trình

                if (percentage >= 100) {
                    clearInterval(interval); // Dừng cập nhật khi hoàn thành
                }
            }, 1000); // Cập nhật mỗi giây

            return () => clearInterval(interval); // Xóa interval khi component unmount
        }
    }, [appointmentDetail, totalTime]);

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
                        {/* Thông tin khách hàng */}
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

                        {/* Tiến trình thực hiện */}
                        <div className={styles.bodyData}>
                            <h4 className={styles.InfoHeadingServices}>Tiến trình thực hiện {Math.floor(progress)}%</h4>
                            {appointmentDetail?.services && appointmentDetail?.services.length > 0 ? (
                                <div
                                    className={styles.serviceItemBody}
                                    style={{
                                        backgroundSize: `${progress}% 4px, 100% 4px`, // % đã hoàn thành và toàn bộ chiều dài thanh
                                    }}
                                >
                                    <p className={styles.completed}>
                                        <span className={styles.step}>
                                            <FaRegCalendarAlt size={20} />
                                        </span>
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
                                            <p className={progress >= (index + 1) * (100 / appointmentDetail.services.length) ? styles.completed : ""}>
                                                <span className={styles.step}>
                                                    <FaBriefcase size={20} />
                                                </span>
                                                <strong>
                                                    {service?.name} <br /> Thời gian: {service?.time_required} phút{' '}
                                                </strong>
                                            </p>
                                        </div>
                                    ))}
                                    <p  className={styles.completed}>
                                        <span className={styles.step}>
                                            <FaCheck size={20} />
                                        </span>
                                        <strong>
                                            Thời gian ước tính hoàn thành:{' '}
                                            {getFormattedTime(appointmentDetail?.slot_id?.updated_at, totalTime)}
                                        </strong>
                                    </p>
                                </div>
                            ) : (
                                <p>Không có dịch vụ nào được cung cấp.</p>
                            )}
                        </div>

                        {/* Thanh tiến trình */}
                        {/* <div className={styles.progressContainer}>
                            <h5>Tiến trình: {Math.floor(progress)}%</h5>
                            <ProgressBar
                                now={progress}
                                label={`${Math.floor(progress)}%`}
                                striped
                                variant="success"
                                className={styles.progressBar}
                            />
                        </div> */}

                        {/* Tổng giá tiền */}
                        <div className={styles.totalCost}>
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
