import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { FaCheck, FaRegCalendarAlt, FaBriefcase } from 'react-icons/fa'; 
import styles from './ProgressModal.module.css';
import { putAppointmentService } from '@/utils/api';
import { toast } from 'react-toastify';

const ProgressModal = ({ show, onClose, appointmentDetail}) => {
    const [currentStep, setCurrentStep] = useState(0); 
    const [updatedAppointmentDetail, setUpdatedAppointmentDetail] = useState(appointmentDetail); 
    const [progress, setProgress] = useState(15);
    useEffect(() => {
        if (appointmentDetail?.services?.length > 0) {
            setCurrentStep(0); 
            setUpdatedAppointmentDetail(appointmentDetail);
            setProgress(15);
        }
    }, [appointmentDetail]);

    

    useEffect(() => {
        if (updatedAppointmentDetail?.services && updatedAppointmentDetail?.services.length > 0) {
            const totalServices = updatedAppointmentDetail.services.length;
            const completedServices = updatedAppointmentDetail.services.filter(service => service.is_done).length;
    
            // Tính toán lại tiến trình
            const initialProgress = (completedServices / totalServices) * 85 + 15; // Tiến trình từ 15% đến 100%
            setProgress(initialProgress);
    
            // Xác định bước hiện tại
            setCurrentStep(completedServices);
        }
    }, [updatedAppointmentDetail?.services]);

    const calculateEstimatedCompletionTime = () => {
        const startTime = new Date(updatedAppointmentDetail?.slot_id?.updated_at);
        const totalServiceTime = updatedAppointmentDetail?.services.reduce((total, service) => {
            return total + (service.time_required || 0); // Cộng thời gian của mỗi dịch vụ
        }, 0);

        // Thêm thời gian của tất cả dịch vụ vào thời gian tiếp nhận
        const estimatedCompletionTime = new Date(startTime.getTime() + totalServiceTime * 60000); // Chuyển phút sang mili giây

        return estimatedCompletionTime;
    };

    const handleConfirmService = async (serviceId, index) => {
        try {
            const response = await putAppointmentService(serviceId); // Gọi API cập nhật trạng thái
            const updatedServices = [...updatedAppointmentDetail.services];
            if (response?.appointmentService?.is_done) {
                toast.success('Cập nhật trạng thái thành công!');

                // onProgressUpdate(updatedServices);
                // Cập nhật trạng thái của dịch vụ trong danh sách
                setUpdatedAppointmentDetail((prev) => {
                    const updatedServices = [...prev.services];
                    updatedServices[index].is_done = true; // Đánh dấu dịch vụ đã hoàn thành
                    return { ...prev, services: updatedServices };
                });
                const totalServices = updatedAppointmentDetail?.services?.length || 1;
                const newProgress = ((index + 1) / totalServices) * 85 + 15; // Từ 15% đến 100%
                setProgress(newProgress);
                setCurrentStep(index + 1); // Chuyển đến bước tiếp theo
            }
        } catch (error) {
            toast.error('Cập nhật trạng thái thất bại!');
            console.error(error);
        }
    };

    return (
        
        <Modal centered show={show} onHide={onClose} size="lg" className={styles.modalSize}>
            <Modal.Header closeButton>
                <Modal.Title className={styles.customerTitle}>Thông tin chi tiết cuộc hẹn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {updatedAppointmentDetail ? (
                    <div>
                        <div className={styles.infoCustomer}>
                            <div>
                                <h4 className={styles.infoHeading}>Thông tin khách hàng</h4>
                                <p className={styles.infoText}>Tên: {updatedAppointmentDetail?.customer_id?.name}</p>
                                <p className={styles.infoText}>
                                    Số điện thoại: {updatedAppointmentDetail?.customer_id?.phone_number}
                                </p>
                                <p className={styles.infoText}>Email: {updatedAppointmentDetail?.customer_id?.email}</p>
                                <p className={styles.infoText}>
                                    Địa chỉ: {updatedAppointmentDetail?.customer_id?.address}
                                </p>
                            </div>
                            <div>
                                <h4 className={styles.infoHeading}>Thông tin xe của khách</h4>
                                <p className={styles.infoText}>
                                    Biển số: {updatedAppointmentDetail?.vehicle_id?.license_plate}
                                </p>
                                <p className={styles.infoText}>
                                    Tên xe: {updatedAppointmentDetail?.vehicle_id?.manufacturer}
                                </p>
                                <p className={styles.infoText}>
                                    Dòng xe: {updatedAppointmentDetail?.vehicle_id?.model}
                                </p>
                                <p className={styles.infoText}>
                                    Màu sắc: {updatedAppointmentDetail?.vehicle_id?.color}
                                </p>
                            </div>
                        </div>
                        <hr />

                        {/* Tiến trình thực hiện */}
                        <h4 className={styles.infoHeadingServices}>Tiến trình thực hiện </h4>
                        <div className={styles.bodyData}>
                            {updatedAppointmentDetail?.services && updatedAppointmentDetail?.services.length > 0 ? (
                                <div
                                    className={styles.serviceItemBody}
                                    style={{
                                        backgroundSize: `${progress}% 100%`,
                                    }}
                                >
                                    <p className={styles.completed}>
                                        <span className={styles.step}>
                                            <FaRegCalendarAlt size={20} />
                                        </span>
                                        <strong className={styles.serviceName}>
                                            Thời gian tiếp nhận: <br />
                                            {new Date(updatedAppointmentDetail?.slot_id?.updated_at).toLocaleTimeString(
                                                'en-GB',
                                                {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false,
                                                },
                                            )}
                                        </strong>
                                    </p>

                                    {updatedAppointmentDetail?.services?.map((service, index) => (
                                        <div
                                            key={service._id || index}
                                            className={`${styles.serviceItem} ${
                                                service.is_done ? styles.completed : ''
                                            }`}
                                        >
                                            <p>
                                                <span className={styles.step}>
                                                    <FaBriefcase size={20} />
                                                </span>
                                                <strong className={styles.serviceName}>
                                                    {service?.name} <br />
                                                    Thời gian: {service?.time_required} phút
                                                </strong>
                                                {index === currentStep && !service.is_done && (
                                                    <button
                                                        className={styles.confirmButton}
                                                        onClick={() =>
                                                            handleConfirmService(service.appServiceId, index)
                                                        }
                                                    >
                                                        Xác nhận
                                                    </button>
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                    <p className={styles.completed}>
                                        <span className={styles.step}>
                                            <FaCheck size={20} />
                                        </span>
                                        <strong>
                                            Thời gian ước tính hoàn thành:
                                            {calculateEstimatedCompletionTime().toLocaleTimeString('en-GB', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false,
                                            })}
                                        </strong>
                                    </p>
                                </div>
                            ) : (
                                <p>Không có dịch vụ nào được cung cấp.</p>
                            )}
                        </div>

                        <div className={styles.totalCost}>
                            <h4 className={styles.infoTextTotal}>
                                Tổng giá tiền: {updatedAppointmentDetail?.total_cost.toLocaleString()} đ
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
