import React, { useEffect, useState } from 'react';
import styles from './appointmentCard.module.css';
import AppointmentInvoiceModal from '../AppointmentInvoiceModal/AppointmentInvoiceModal';
import {
    cashPayment,
    createPayment,
    createPaymentCustomer,
    getInvoiceDetails,
    getPrintPayment,
    returnPayment,
} from '@/utils/api';
import { toast } from 'react-toastify';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';

const AppointmentCard = ({ appointment, updateAppointment, isLatest }) => {
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [invoiceId, setInvoiceId] = useState(null);
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const fixedEmployeeId = '6707e7ecd6e37f3cfa5e4ce8';

    const [showRefundModal, setShowRefundModal] = useState(false);
    const [refundNote, setRefundNote] = useState('');

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState({
        createInvoice: false,
        viewInvoice: false,
        paymentInvoice: false,
        cashPayment: false,
        printInvoice: false,
        refundInvoice: false,
    });

    useEffect(() => {
        // Kiểm tra lại trạng thái invoice khi component mount lại
        if (appointment?.invoice?.status === 'back') {
            setDisabled(true);
        }
    }, [appointment?.invoice?.status]);

    const handlePaymentInvoice = async () => {
        console.log('Setting loading to true');
        setLoading((prev) => ({ ...prev, createInvoice: true })); // Sử dụng đồng nhất createInvoice
    
        try {
            // Gọi API để tạo hóa đơn
            const response = await createPaymentCustomer(appointment?._id, fixedEmployeeId);
            const invoiceId = response?.invoice?._id;
    
            if (!invoiceId) throw new Error('Không tìm thấy ID của hóa đơn.');
    
            // Lưu invoiceId để sử dụng sau này (ví dụ trong modal)
            setInvoiceId(invoiceId); 
    
            // Hiển thị thông báo thành công
            toast.success('Hóa đơn đã được tạo thành công!');
    
            // Cập nhật danh sách cuộc hẹn với hóa đơn mới tạo
            updateAppointment({ ...appointment, invoice: response.invoice });
        } catch (error) {
            console.error('Lỗi khi tạo hóa đơn:', error);
            toast.error('Lỗi khi tạo hóa đơn');
        } finally {
            console.log('Setting loading to false');
            setLoading((prev) => ({ ...prev, createInvoice: false })); // Reset đúng key loading
        }
    };
    

    const handleViewInvoice = async () => {
        setLoading((prev) => ({ ...prev, viewInvoice: true }));
        const invoiceId = appointment?.invoice?._id;
        if (invoiceId) {
            try {
                const invoiceData = await getInvoiceDetails(invoiceId);
                setInvoiceDetails(invoiceData); // Set invoice details after fetching
                setShowInvoiceModal(true); // Open the modal
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết hóa đơn:', error);
                toast.error('Không thể tải chi tiết hóa đơn');
            }
        } else {
            toast.error('Không tìm thấy hóa đơn để xem.');
        }
    };

    const handlePaymentInvoiceBill = async () => {
        setLoading((prev) => ({ ...prev, paymentInvoice: true }));
        const invoiceId = appointment?.invoice?._id;
        if (invoiceId) {
            try {
                const paymentResponse = await createPayment(invoiceId);
                const checkoutUrl = paymentResponse?.paymentLink?.checkoutUrl;
                toast.success('Đã tạo liên kết thanh toán thành công!');
                window.location.href = checkoutUrl;
            } catch (err) {
                toast.error('Tạo liên kết thanh toán thất bại: ' + (err.response?.data?.message || err?.message));
            }
        } else {
            toast.error('Không tìm thấy ID của hóa đơn.');
        }
    };

    const handlePaymentCashInvoiceBill = async () => {
        setLoading((prev) => ({ ...prev, cashPayment: true }));
        const invoiceId = appointment?.invoice?._id;
        if (invoiceId) {
            try {
                const paymentCashResponse = await cashPayment(invoiceId);
                console.log('paymentCashResponse', paymentCashResponse);
                toast.success(paymentCashResponse.msg);
                updateAppointment({ ...appointment, invoice: { ...appointment.invoice, status: 'paid' } });
                setShowPaymentModal(false); // Đóng modal sau khi thanh toán thành công
            } catch (err) {
                toast.error(err.response?.data?.msg || err?.message);
            }
        } else {
            toast.error('Không tìm thấy ID của hóa đơn.');
        }
    };

    const handlePrint = async () => {
        setLoading((prev) => ({ ...prev, printInvoice: true }));
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

    const handlePayBill = async () => {
        setLoading((prev) => ({ ...prev, refundInvoice: true }));
        const invoiceId = appointment?.invoice?._id;
        if (invoiceId && refundNote) {
            try {
                await returnPayment(invoiceId, refundNote);
                toast.success('Đã trả hóa đơn thành công!');
                setShowRefundModal(false); // Đóng modal sau khi refund thành công
                updateAppointment({ ...appointment, invoice: { ...appointment?.invoice, status: 'refunded' } });
            } catch (error) {
                toast.error('Trả hóa đơn thất bại: ' + (error?.response?.msg || error.message));
            }
        } else {
            toast.error('Vui lòng nhập lý do trả hóa đơn.');
        }
    };

    return (
        <div className={styles.appointmentCard}>
            {/* {isLatest && <div className={styles.newestLabel}>Gần đây</div>} */}
            <div className={styles.appointmentCardHeader}>
                <h5>{appointment?.status ? 'Hoàn thành' : 'Chưa hoàn thành'}</h5>
                <h5>Thời gian đặt lịch: {new Date(appointment?.appointment_datetime).toLocaleString()}</h5>
            </div>
            <div className={styles.appointmentCardBody}>
                <div>
                    <p className={styles.appointmentCardText}>
                        <strong>Tên: </strong> {appointment?.customer_id?.name}
                    </p>
                    <p className={styles.appointmentCardText}>
                        <strong>Số điện thoại: </strong> {appointment?.customer_id?.phone_number}
                    </p>
                    <p className={styles.appointmentCardText}>
                        <strong>Biển số xe: </strong> {appointment?.vehicle_id?.license_plate}
                    </p>
                </div>
                <div>
                    {appointment?.invoice && appointment?.invoice?.status !== 'paid' && (
                        <>
                            <p className={styles.appointmentCardText}>
                                <strong>Tổng giá dịch vụ:</strong>{' '}
                                {appointment?.invoice?.total_amount?.toLocaleString()}đ
                            </p>
                            <p className={styles.appointmentCardText}>
                                <strong>Khuyến mãi:</strong> {appointment?.invoice?.discount_amount?.toLocaleString()}đ
                            </p>
                            <p className={styles.appointmentCardText}>
                                <strong>Thanh toán:</strong> {appointment?.invoice?.final_amount?.toLocaleString()}đ
                            </p>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.appointmentFooter}>
                {!appointment?.invoice && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button className={styles.accordionBtn} onClick={handlePaymentInvoice}>
                            Lập hóa đơn
                        </button>
                        {loading.paymentInvoice && (
                            <Spinner
                                animation="border"
                                role="status"
                                size="sm"
                                className="text-primary"
                                style={{ width: '20px', height: '20px', zIndex: 10000 }}
                            >
                                <span className="sr-only">Đang tạo hóa đơn...</span>
                            </Spinner>
                        )}
                    </div>
                )}
                {appointment?.invoice && appointment?.invoice?.status !== 'paid' && (
                    <div className={styles.appointment}>
                        {loading.paymentInvoiceBill && (
                            <div className="loadingSpinner">Đang tạo liên kết thanh toán...</div>
                        )}{' '}
                        {/* Spinner khi đang tạo liên kết thanh toán */}
                        <button
                            className={`${styles.accordionBtnPay} ${
                                appointment?.invoice?.status === 'refunded' ? styles.disabledButton : ''
                            }`}
                            onClick={
                                !disabled ? () => setShowPaymentModal(true) : null
                            }
                            disabled={disabled}
                        >
                            Thanh toán
                        </button>
                        {/* {loading.viewInvoice && <div className="loadingSpinner">Đang tải hóa đơn...</div>} */}
                        {/* Spinner khi đang tải hóa đơn */}
                        <button className={styles.accordionBtnPayCash} onClick={handleViewInvoice}>
                            Xem hóa đơn
                        </button>
                    </div>
                )}
                {appointment?.invoice && appointment?.invoice?.status === 'paid' && (
                    <div className={styles.appointment}>
                        {loading.print && <div className="loadingSpinner">Đang in hóa đơn...</div>}{' '}
                        {/* Spinner khi in hóa đơn */}
                        <button className={styles.accordionBtnPrint} onClick={handlePrint}>
                            In hóa đơn
                        </button>
                        {loading.payBill && <div className="loadingSpinner">Đang trả hóa đơn...</div>}{' '}
                        {/* Spinner khi trả hóa đơn */}
                        <button
                            className={styles.accordionBtnReturn}
                            onClick={() => setShowRefundModal(true)}
                            disabled={appointment?.invoice?.status === 'refunded'}
                        >
                            Trả hóa đơn
                        </button>
                    </div>
                )}
            </div>
            <AppointmentInvoiceModal
                show={showInvoiceModal}
                handleClose={() => setShowInvoiceModal(false)}
                invoiceDetails={invoiceDetails}
            />
            <Modal
                centered
                show={showRefundModal}
                onHide={() => setShowRefundModal(false)}
                contentLabel="Lý do trả hóa đơn"
            >
                <Modal.Header closeButton>
                    <Modal.Title className={styles.customerTitle}>Nhập lý do trả hóa đơn</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.customerLabel}>
                    <Form.Control
                        size="lg"
                        as="textarea"
                        className={styles.formText}
                        placeholder="Nhập lý do..."
                        rows={3}
                        onChange={(e) => setRefundNote(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" className={styles.customerBtn} onClick={handlePayBill}>
                        Xác nhận trả hóa đơn
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                centered
                show={showPaymentModal}
                onHide={() => setShowPaymentModal(false)}
                contentLabel="Lý do trả hóa đơn"
            >
                <Modal.Header closeButton>
                    <Modal.Title className={styles.paymentTitle}>Phương thức thanh toán</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.customerLabel}>
                    <div className={styles.cashPayment}>
                        <Button className={styles.accordionBtnPrint} onClick={handlePaymentCashInvoiceBill}>
                            Tiền mặt
                        </Button>
                        <Button className={styles.accordionBtnPrint} onClick={handlePaymentInvoiceBill}>
                            Chuyển khoản
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AppointmentCard;
