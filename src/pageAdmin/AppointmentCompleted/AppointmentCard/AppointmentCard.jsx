import React, { useState } from 'react';
import styles from './appointmentCard.module.css';
import AppointmentInvoiceModal from '../AppointmentInvoiceModal/AppointmentInvoiceModal';
import { createPayment, createPaymentCustomer, getInvoiceDetails, getPrintPayment } from '@/utils/api';
import { toast } from 'react-toastify';

const AppointmentCard = ({ appointment, updateAppointment, isLatest }) => {
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const fixedEmployeeId = '6707e7ecd6e37f3cfa5e4ce8';

    const handlePaymentInvoice = async () => {
        try {
            const response = await createPaymentCustomer(appointment._id, fixedEmployeeId);
            const invoiceId = response?.invoice?._id;
            if (!invoiceId) throw new Error("Không tìm thấy ID của hóa đơn.");

            const invoiceResponse = await getInvoiceDetails(invoiceId);
            setInvoiceDetails(invoiceResponse);
            setShowInvoiceModal(true);
            toast.success('Hóa đơn đã được tạo thành công!');
            updateAppointment({ ...appointment, invoice: invoiceResponse });
        } catch (error) {
            console.error('Lỗi khi tạo hóa đơn hoặc lấy chi tiết hóa đơn:', error);
            toast.error('Lỗi khi tạo hóa đơn');
        }
    };

    const handleClose = () => {
        setShowInvoiceModal(false);
    };

    const handlePaymentInvoiceBill = async () => {
        const invoiceId = appointment.invoice?._id;
        if (invoiceId) {
            try {
                const paymentResponse = await createPayment(invoiceId);
                const checkoutUrl = paymentResponse.paymentLink.checkoutUrl;
                toast.success('Đã tạo liên kết thanh toán thành công!');
                window.location.href = checkoutUrl;
            } catch (err) {
                toast.error('Tạo liên kết thanh toán thất bại: ' + (err.response?.data?.message || err.message));
            }
        } else {
            toast.error('Không tìm thấy ID của hóa đơn.');
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
                toast.success('In hóa đơn thành công!');
            } catch (err) {
                toast.error('In hóa đơn thất bại: ' + (err.response?.data?.msg || err.message));
            }
        } else {
            toast.error('Không tìm thấy hóa đơn để in');
        }
    };

    return (
        <div className={styles.appointmentCard}>
            {isLatest && <div className={styles.newestLabel}>Mới nhất</div>}
            <div className={styles.appointmentCardHeader}>
                <h5>{appointment.status ? 'Hoàn thành' : 'Chưa hoàn thành'}</h5>
                <h5>Thời gian đặt lịch: {new Date(appointment?.appointment_datetime).toLocaleString()}</h5>
            </div>
            <div className={styles.appointmentCardBody}>
                <div>
                    <p className={styles.appointmentCardText}><strong>Tên: </strong> {appointment?.customer_id?.name}</p>
                    <p className={styles.appointmentCardText}><strong>Số điện thoại: </strong> {appointment?.customer_id?.phone_number}</p>
                    <p className={styles.appointmentCardText}><strong>Biển số xe: </strong> {appointment?.vehicle_id?.license_plate}</p>
                </div>
                <div>
                    {appointment?.invoice && appointment?.invoice?.status !== 'paid' && (
                        <>
                            <p className={styles.appointmentCardText}><strong>Tổng giá dịch vụ:</strong> {appointment?.invoice?.total_amount?.toLocaleString()}đ</p>
                            <p className={styles.appointmentCardText}><strong>Khuyến mãi:</strong> {appointment?.invoice?.discount_amount?.toLocaleString()}đ</p>
                            <p className={styles.appointmentCardText}><strong>Thanh toán:</strong> {appointment?.invoice?.final_amount?.toLocaleString()}đ</p>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.appointmentFooter}>
                {!appointment.invoice && (
                    <button className={styles.accordionBtn} onClick={handlePaymentInvoice}>Lập hóa đơn</button>
                )}
                {appointment.invoice && appointment.invoice.status !== 'paid' && (
                    <button className={styles.accordionBtnPay} onClick={handlePaymentInvoiceBill}>Thanh toán</button>
                )}
                {appointment.invoice && appointment.invoice.status === 'paid' && (
                    <button className={styles.accordionBtnPrint} onClick={handlePrint}>In hóa đơn</button>
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
