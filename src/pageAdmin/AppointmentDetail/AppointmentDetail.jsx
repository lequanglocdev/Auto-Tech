import { createAppointmentCustomer, getAppointmentsDetailApi } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './AppointmentDetail.module.css';

import icons from '@/utils/icon';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
const AppointmentDetail = () => {
    const { id } = useParams();
    const [appointmentDetail, setAppointmentDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const { MdArrowBackIos } = icons;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAppointmentDetail = async () => {
            try {
                const response = await getAppointmentsDetailApi({ _id: id });
                setAppointmentDetail(response);
            } catch (error) {
                toast.error('Đã xảy ra lỗi khi lấy thông tin chi tiết cuộc hẹn.');
            } finally {
                setLoading(false);
            }
        };
        fetchAppointmentDetail();
    }, [id]);

    const handleConfirmCustomer = async () => {
        try {
            await createAppointmentCustomer(id); 
            toast.success('Xác nhận khách hàng thành công!'); 
           
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi xác nhận khách hàng.'); 
        }
    };

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (!appointmentDetail) {
        return <div>Không có dữ liệu chi tiết cuộc hẹn.</div>;
    }
    const handleListDashboard = () => {
        navigate('/admin');
    };

    return (
        <div>
            <div className={styles.appointmentDetail}>
                <MdArrowBackIos onClick={handleListDashboard} className={styles.appointmentDetailIcon} />
                <Breadcrumb
                    items={['Đặt lịch', 'Thông tin chi tiết đặt lịch']}
                    activeItem="Thông tin chi tiết đặt lịch"
                />
            </div>
            <div className={styles.appointmentDetailHeader}>
                <div className={styles.appointmentDetailDate}>
                    <p>Ngày hẹn: {new Date(appointmentDetail.appointment_datetime).toLocaleString()}</p>
                </div>

                <div className={styles.appointmentDetailStatus}>
                    <p>
                        Trạng thái:
                        {appointmentDetail.status === 'scheduled' && 'Đã lên lịch'}
                        {appointmentDetail.status === 'completed' && 'Đã hoàn thành'}
                        {appointmentDetail.status === 'cancelled' && 'Đã hủy'}
                    </p>
                </div>
            </div>

            <div className={styles.appointmentDetailBody}>
                <div className={styles.appointmentCustomer}>
                    <div className={styles.customerHeader}>
                        <h3>Khách hàng</h3>
                    </div>
                    <div className={styles.customerDetails}>
                        <p>Khách hàng: {appointmentDetail.customer_id?.name}</p>
                        <p>Email: {appointmentDetail.customer_id?.email}</p>
                        <p>Phone: {appointmentDetail.customer_id?.phone_number}</p>
                        <p>Address: {appointmentDetail.customer_id?.address}</p>
                    </div>
                </div>

                <div className={styles.vehicleInfo}>
                    <div className={styles.vehicleHeader}>
                        <h3>Thông tin xe</h3>
                    </div>
                    <div className={styles.vehicleDetails}>
                        <p>Biển số xe: {appointmentDetail.vehicle_id?.license_plate}</p>
                        <p>Hãng xe: {appointmentDetail.vehicle_id?.manufacturer}</p>
                        <p>Mẫu xe: {appointmentDetail.vehicle_id?.model}</p>
                        <p>Năm sản xuất: {appointmentDetail.vehicle_id?.year}</p>
                        <p>Màu sắc: {appointmentDetail.vehicle_id?.color}</p>
                    </div>
                </div>

                <div className={styles.services}>
                    <div className={styles.serviceHeader}>
                        <h3>Các dịch vụ</h3>
                    </div>
                    <ul className={styles.serviceList}>
                        {appointmentDetail.services.map((service) => (
                            <li key={service._id} className={styles.serviceItem}>
                                <span className={styles.serviceName}>{service.name}:</span>
                                <span className={styles.servicePrice}>{service.price} VNĐ</span>
                            </li>
                        ))}
                    </ul>
                    <hr className={styles.separator} />
                    <p className={styles.totalCost}>Tổng hóa đơn: {appointmentDetail.total_cost} VNĐ</p>
                </div>
            </div>
            <div className={styles.appointmentDetailFooter}>
                <button className={styles.appointmentDetailFooterBtn} onClick={handleConfirmCustomer}>Xác nhận khách hàng</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AppointmentDetail;
