import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Invoice.module.css';
import { createPayment, createPaymentCustomer, getInvoiceDetails, getPrintPayment } from '@/utils/api'; // Import hàm lấy thông tin hóa đơn
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Invoice = () => {
    const { appointmentId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [invoiceDetails, setInvoiceDetails] = useState(null);

    // ID nhân viên cố định
    const fixedEmployeeId = '6707e7ecd6e37f3cfa5e4ce8';

    const handleCreateInvoice = async () => {
        try {
            const response = await createPaymentCustomer(appointmentId, fixedEmployeeId);
            const invoiceId = response.invoice?._id;
            console.log('Create Invoice Response:', invoiceId);
            toast.success('Hóa đơn đã được tạo thành công!');
            const invoiceResponse = await getInvoiceDetails(invoiceId);
            setInvoiceDetails(invoiceResponse);
            console.log('Invoice Details:', invoiceResponse.invoiceDetails?.invoice?.employee_id?.name);
        } catch (err) {
            toast.error('Tạo hóa đơn thất bại: ' + (err.response?.data?.message || err.message));
        }
    };

    const handlePayment = async () => {
        const invoiceId = invoiceDetails?.invoice?._id;
        if (invoiceId) {
            try {
                const paymentResponse = await createPayment(invoiceId);
                const checkoutUrl = paymentResponse.paymentLink.checkoutUrl;
                toast.success('Đã tạo liên kết thanh toán thành công!');
                // Chuyển hướng người dùng đến trang thanh toán
                window.location.href = checkoutUrl;
            } catch (err) {
                toast.error('Tạo liên kết thanh toán thất bại: ' + (err.response?.data?.message || err.message));
            }
        } else {
            toast.error('Không tìm thấy hóa đơn để thanh toán');
        }
    };

    const handlePrint = async () => {
        const invoiceId = invoiceDetails?.invoice?._id;
        if (invoiceId) {
            try {
                const response = await getPrintPayment(invoiceId);
                if (response.msg) {
                    // Hiển thị thông báo lỗi từ msg
                    toast.error(response.msg);
                } else {
                    // Nếu không có msg, tiếp tục xử lý PDF
                    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                    const pdfUrl = URL.createObjectURL(pdfBlob);
                    window.open(pdfUrl);
                }
            } catch (err) {
                // Nếu có lỗi trong khi gọi API
                toast.error('In hóa đơn thất bại: ' + (err.response?.data?.msg || err.message));
            }
        } else {
            toast.error('Không tìm thấy hóa đơn để in');
        }
    };

    useEffect(() => {
        setLoading(false); // Bỏ loading ngay lập tức vì không cần fetch dữ liệu nhân viên
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <div>
                <h4 className={styles.slotHeader}>Trang đặt tạo hóa đơn khách hàng tại cửa hàng L&k TECH</h4>
            </div>
            <div className={styles.invoiceBtn}>
                <Button size="lg" onClick={handleCreateInvoice}>
                    Tạo hóa đơn
                </Button>
            </div>

            {invoiceDetails && (
                <div className={styles.invoiceDetails}>
                    <h3 className={styles.invoiceDetailsTitle}>Cửa hàng chăm sóc xe L&K TECH</h3>
                    <h3 className={styles.invoiceDetailsTitle}>Hóa đơn</h3>
                    <div className={styles.invoiceDetailsBody}>
                        <div className={styles.invoiceDetailsBodyContent}>
                            <p>
                                <strong>Ngày:</strong>:{' '}
                                {new Date(invoiceDetails?.invoice?.created_at).toLocaleDateString('vi-VN')}
                            </p>
                            <p>
                                <strong>Thu ngân</strong>: Lê Thành Dương
                            </p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className={styles.dataTableHead}>Tên dịch vụ</th>
                                        <th className={styles.dataTableHead}>Số lượng</th>
                                        <th className={styles.dataTableHead}>Đơn giá</th>
                                        <th className={styles.dataTableHead}>Khuyến mãi</th>
                                        <th className={styles.dataTableHead}>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(invoiceDetails?.invoiceDetails) &&
                                    invoiceDetails.invoiceDetails.length > 0 ? (
                                        invoiceDetails.invoiceDetails.map((detail) => (
                                            <tr key={detail._id}>
                                                <td className={styles.dataTableItem}>{detail.service_id.name}</td>
                                                <td className={styles.dataTableItem}>{detail.quantity}</td>
                                                <td className={styles.dataTableItem}>{detail.price}</td>
                                                <td className={styles.dataTableItem}>{detail.discount_amount || 0}</td>
                                                <td className={styles.dataTableItem}>
                                                    {detail.price * detail.quantity}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">Không có dịch vụ nào trong hóa đơn.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

                            <div className={styles.invoicePay}>
                                <p className={styles.invoicePayText}>Tiền dịch vụ</p>
                                <p>{Number(invoiceDetails.invoice.total_amount).toLocaleString('vi-VN')}đ</p>
                            </div>
                            <hr />
                            <div className={styles.invoicePay}>
                                <p className={styles.invoicePayText}>Khuyến mãi</p>
                                <p>{Number(invoiceDetails.invoice.discount_amount).toLocaleString('vi-VN')}đ</p>
                            </div>
                            <hr />
                            <div className={styles.invoicePay}>
                                <p className={styles.invoicePayText}>Tổng số tiền phải trả</p>
                                <p>{Number(invoiceDetails.invoice.final_amount).toLocaleString('vi-VN')}đ</p>
                            </div>
                        </div>

                        <div></div>
                    </div>
                    <div className={styles.dataTableBill}>
                        <div className={styles.dataTableBtn}>
                            <button className={styles.btn} onClick={handlePayment}>
                                Thanh toán
                            </button>
                        </div>
                        <div className={styles.dataTablePrint}>
                            <button className={styles.btnPrint} onClick={handlePrint}>
                                In hóa đơn
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invoice;
