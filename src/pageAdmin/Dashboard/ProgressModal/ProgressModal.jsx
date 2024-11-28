import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { FaCheck, FaRegCalendarAlt, FaBriefcase } from 'react-icons/fa'; // Import biểu tượng
import styles from './ProgressModal.module.css'; // CSS module
import { putAppointmentService } from '@/utils/api';

const ProgressModal = ({ show, onClose, appointmentDetail }) => {
    const [totalTime, setTotalTime] = useState(0);
    const [progress, setProgress] = useState(0); // Phần trăm tiến trình

    const [isPaused, setIsPaused] = useState(false); // Dừng tiến trình chờ xác nhận
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0); // Dịch vụ hiện tại
    const [remainingTime, setRemainingTime] = useState(totalTime); // Thời gian còn lại dự kiến

    const isPausedRef = useRef(false);
    useEffect(() => {
        isPausedRef.current = isPaused;
    }, [isPaused]);

    useEffect(() => {
        if (appointmentDetail) {
            // Tính tổng thời gian các dịch vụ
            const total = appointmentDetail.services.reduce((acc, service) => acc + service.time_required, 0);
            setTotalTime(total);
    
            // Lấy thời gian bắt đầu
            const startTime = new Date(appointmentDetail?.slot_id?.updated_at).getTime();
            const now = Date.now();
            const elapsedTime = Math.floor((now - startTime) / 60000); // Thời gian đã trôi qua
    
            // Tính toán lại dịch vụ đã hoàn thành
            let completedServices = 0;
            let totalElapsedMinutes = elapsedTime;
    
            for (let i = 0; i < appointmentDetail.services.length; i++) {
                const serviceTime = appointmentDetail.services[i].time_required;
                if (totalElapsedMinutes >= serviceTime) {
                    completedServices++;
                    totalElapsedMinutes -= serviceTime;
                } else {
                    break;
                }
            }
    
            // Cập nhật trạng thái
            setCurrentServiceIndex(completedServices); // Dịch vụ hiện tại
            setRemainingTime(total - elapsedTime); // Thời gian còn lại
            setProgress(Math.min((elapsedTime / total) * 100, 100)); // Phần trăm tiến trình
            setIsPaused(completedServices > 0); // Dừng nếu đã có dịch vụ hoàn thành
        }
    }, [appointmentDetail]);
    

    useEffect(() => {
        if (appointmentDetail && remainingTime > 0) {
            if (isPaused) return; // Không tiếp tục nếu đang tạm dừng
    
            const startTime = new Date(appointmentDetail?.slot_id?.updated_at).getTime();
    
            const interval = setInterval(() => {
                const now = Date.now();
                const elapsedTime = Math.floor((now - startTime) / 60000); // Thời gian đã trôi qua
    
                let completedServices = 0;
                let totalElapsedMinutes = elapsedTime;
    
                for (let i = 0; i < appointmentDetail.services.length; i++) {
                    const serviceTime = appointmentDetail.services[i].time_required;
                    if (totalElapsedMinutes >= serviceTime) {
                        completedServices++;
                        totalElapsedMinutes -= serviceTime;
                    } else {
                        break;
                    }
                }
    
                if (completedServices > currentServiceIndex) {
                    setIsPaused(true); // Dừng tiến trình
                    setCurrentServiceIndex(completedServices); // Cập nhật dịch vụ hiện tại
                    clearInterval(interval); // Dừng interval
                } else {
                    const progressPercent = Math.min((elapsedTime / totalTime) * 100, 100);
                    setProgress(progressPercent);
                    setRemainingTime(totalTime - elapsedTime);
                }
            }, 1000); // Cập nhật mỗi giây
    
            return () => clearInterval(interval); // Dọn dẹp interval
        }
    }, [appointmentDetail, totalTime, remainingTime, isPaused, currentServiceIndex]);
    
    const handleConfirm = async (appServiceId) => {
        try {
            const response = await putAppointmentService(appServiceId); // Gọi API
            if (response.data?.appointmentService?.is_done) {
                setIsPaused(false); // Tiếp tục tiến trình sau khi xác nhận
            }
        } catch (error) {
            console.error('Lỗi khi xác nhận dịch vụ:', error);
        }
    };
    
    const isCurrentService = (index) => {
        return index === currentServiceIndex && isPaused && remainingTime > 0;
    };
    
    
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
                        <h4 className={styles.InfoHeadingServices}>Tiến trình thực hiện {Math.floor(progress)}% </h4>
                        <div className={styles.bodyData}>
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

                                    {appointmentDetail.services.map((service, index) => {
                                       
                                        const isCompleted = index < currentServiceIndex;
                               
                                        console.log({
                                            isPaused,
                                            currentServiceIndex,
                                            index,
                                            isCurrentService: index === currentServiceIndex && isPaused && remainingTime > 0,
                                        });
                                        return (
                                            <div key={service._id || index} className={styles.serviceItem}>
                                                <p
                                                    className={
                                                        isCompleted ? `${styles.step} ${styles.completed}` : styles.step
                                                    }
                                                >
                                                    <span className={styles.step}>
                                                        <FaBriefcase size={20} />
                                                    </span>
                                                    <strong className={styles.serviceName}>
                                                        {service?.name} <br /> Thời gian: {service?.time_required} phút{' '}
                                                    </strong>
                                                </p>

                                                {isCurrentService(index) && (
                                                    <button
                                                        onClick={() => handleConfirm(service.appServiceId)}
                                                        className={styles.confirmButton}
                                                    >
                                                        Xác nhận dịch vụ
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}

                                    <p className={styles.completed}>
                                        <span className={styles.step}>
                                            <FaCheck size={20} />
                                        </span>
                                        <strong>
                                            Thời gian ước tính hoàn thành:{' '}
                                            {getFormattedTime(
                                                appointmentDetail?.slot_id?.updated_at,
                                                totalTime - remainingTime,
                                            )}
                                        </strong>
                                    </p>
                                </div>
                            ) : (
                                <p>Không có dịch vụ nào được cung cấp.</p>
                            )}
                        </div>

    
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
