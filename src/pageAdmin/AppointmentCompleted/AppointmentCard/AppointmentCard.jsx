import React, { useState } from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './appointmentCard.module.css';
import AppointmentInvoiceModal from '../AppointmentInvoiceModal/AppointmentInvoiceModal';
import { createPayment, createPaymentCustomer, getInvoiceDetails, getPrintPayment } from '@/utils/api';
import { toast } from 'react-toastify';

const AppointmentCard = ({ appointment }) => {
    const navigate = useNavigate();
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const fixedEmployeeId = '6707e7ecd6e37f3cfa5e4ce8';

    const handlePaymentInvoice = async () => {
        try {
            // Gọi API để tạo hóa đơn
            const response = await createPaymentCustomer(appointment._id, fixedEmployeeId);
            console.log('res', response);
            const invoiceId = response.invoice?._id; // Lấy ID của hóa đơn vừa tạo từ kết quả API
            console.log('Create Invoice Response:', invoiceId);
            // Gọi API để lấy chi tiết hóa đơn
            const invoiceResponse = await getInvoiceDetails(invoiceId);
            setInvoiceDetails(invoiceResponse);
            setShowInvoiceModal(true);
            toast.success('Hóa đơn đã được tạo thành công!');
            // Mở modal
        } catch (error) {
            console.error('Lỗi khi tạo hóa đơn hoặc lấy chi tiết hóa đơn:', error);
        }
        // console.log('Thông tin cuộc hẹn:', appointment);
        // navigate(`/invoice/${appointment._id}`)
    };

    const handleClose = () => {
        setShowInvoiceModal(false); // Đóng modal
    };

    const handlePaymentInvoiceBill = async () => {
        const invoiceId = appointment.invoice?._id; // Lấy ID của hóa đơn từ đối tượng appointment
        if (invoiceId) {
            console.log('Invoice ID:', invoiceId); // In ra ID của hóa đơn để kiểm tra
            //navigate(`/invoice/${invoiceId}`); // Điều hướng tới trang thanh toán
            try {
                const paymentResponse = await createPayment(invoiceId);
                const checkoutUrl = paymentResponse.paymentLink.checkoutUrl;
                toast.success('Đã tạo liên kết thanh toán thành công!');
                console.log('Payment Link:', checkoutUrl);

                // Chuyển hướng người dùng đến trang thanh toán
                window.location.href = checkoutUrl;
            } catch (err) {
                toast.error('Tạo liên kết thanh toán thất bại: ' + (err.response?.data?.message || err.message));
            }
        } else {
            console.error('Không tìm thấy ID của hóa đơn.');
        }
    };

    const handlePrint = async () => {
        const invoiceId = appointment?.invoice?._id;
        if (invoiceId) {
            try {
                const response = await getPrintPayment(invoiceId);
                const pdfBlob = new Blob([response], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                window.open(pdfUrl);
            } catch (err) {
                console.error('Error response:', err);
                toast.error('In hóa đơn thất bại: ' + (err.response?.data?.msg || err.message));
            }
        } else {
            toast.error('Không tìm thấy hóa đơn để in');
        }
    };
    
    
    return (
        <div className={styles.appointmentCard}>
            <div className={styles.appointmentCardHeader}>
                <h5>{appointment.status ? 'Hoàn thành' : 'Chưa hoàn thành'}</h5>
                <h5>Thời gian đặt lịch: {new Date(appointment.appointment_datetime).toLocaleString()}</h5>
            </div>
            <div className={styles.appointmentCardBody}>
                <div>
                    <p className={styles.appointmentCardText}>
                        <strong>Tên: </strong> {appointment.customer_id.name}
                    </p>
                    <p className={styles.appointmentCardText}>
                        <strong>Số điện thoại: </strong> {appointment.customer_id.phone_number}
                    </p>
                    <p className={styles.appointmentCardText}>
                        <strong>Biển số xe: </strong> {appointment.vehicle_id.license_plate}
                    </p>
                </div>

                <div>
                    {/* Hiển thị thông tin hóa đơn nếu đã có invoice */}
                    {appointment.invoice ? (
                        <>
                            {/* <h4>
                                Hóa đơn: {appointment.invoice.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                            </h4> */}
                            {/* Hiển thị chi tiết hóa đơn nếu chưa thanh toán */}
                            {appointment.invoice.status !== 'paid' && (
                                <>
                                    <p className={styles.appointmentCardText}>
                                        <strong>Tổng giá dịch vụ:</strong>{' '}
                                        {appointment?.invoice?.total_amount?.toLocaleString()}đ
                                    </p>
                                    <p className={styles.appointmentCardText}>
                                        <strong>Khuyến mãi:</strong>{' '}
                                        {appointment?.invoice?.discount_amount?.toLocaleString()}đ
                                    </p>
                                    <p className={styles.appointmentCardText}>
                                        <strong>Thanh toán:</strong>{' '}
                                        {appointment?.invoice?.final_amount?.toLocaleString()}đ
                                    </p>
                                </>
                            )}
                        </>
                    ) : (
                        <h4></h4>
                    )}
                </div>
            </div>
            <div className={styles.appointmentFooder}>
                {/* Nút Lập hóa đơn hiển thị nếu chưa có hóa đơn, ngược lại ẩn đi */}
                {!appointment.invoice && (
                    <button className={styles.accordionBtn} onClick={handlePaymentInvoice}>
                        Lập hóa đơn
                    </button>
                )}
                {/* Nút Thanh toán hiển thị nếu đã có hóa đơn nhưng chưa thanh toán, ngược lại ẩn đi */}
                {appointment.invoice && appointment.invoice.status !== 'paid' && (
                    <button className={styles.accordionBtnPay} onClick={handlePaymentInvoiceBill}>
                        Thanh toán
                    </button>
                )}
                {appointment.invoice && appointment.invoice.status === 'paid' && (
                    <button
                        className={styles.accordionBtnPrint}
                        onClick={handlePrint}
                    >
                        In hóa đơn
                    </button>
                )}
            </div>

            <AppointmentInvoiceModal
                show={showInvoiceModal}
                handleClose={handleClose}
                invoiceDetails={invoiceDetails}
            />
        </div>
    );
};

export default AppointmentCard;
