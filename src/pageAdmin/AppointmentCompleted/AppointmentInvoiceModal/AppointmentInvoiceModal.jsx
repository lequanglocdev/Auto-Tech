import React from 'react';
import { Modal, Table } from 'react-bootstrap';
import styles from './AppointmentInvoiceModal.module.css';

const AppointmentInvoiceModal = ({ show, handleClose, invoiceDetails }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết hóa đơn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {invoiceDetails && (
                    <div className={styles.invoiceDetails}>
                        <h3 className={styles.invoiceDetailsTitle}>Cửa hàng chăm sóc xe L&K TECH</h3>
                        <h3 className={styles.invoiceDetailsTitle}>Hóa đơn</h3>
                        <div className={styles.invoiceDetailsBody}>
                            <div className={styles.invoiceDetailsBodyContent}>
                                <p>
                                    <strong>Ngày:</strong>{' '}
                                    {new Date(invoiceDetails.invoice.created_at).toLocaleDateString('vi-VN')}
                                </p>
                                <p>
                                    <strong>Thu ngân:</strong> Lê Thành Dương
                                </p>
                              
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className={styles.dataTableHead}>Tên dịch vụ</th>
                                            <th className={styles.dataTableHead}>Số lượng</th>
                                            <th className={styles.dataTableHead}>Đơn giá</th>
                                            <th className={styles.dataTableHead}>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(invoiceDetails?.invoice?.details) &&
                                        invoiceDetails?.invoice?.details.length > 0 ? (
                                            invoiceDetails.invoice.details.map((detail) => (
                                                <tr key={detail?._id}>
                                                    <td>{detail?.service_id?.name}</td>
                                                    <td>{detail?.quantity}</td>
                                                    <td>{detail?.price.toLocaleString()}đ</td>
                                                    <td>{(detail?.price * detail?.quantity).toLocaleString()}đ</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">
                                                    Không có dịch vụ nào
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <div className={styles.invoicePay}>
                                    <p className={styles.invoicePayText}>Tiền dịch vụ</p>
                                    <p>{Number(invoiceDetails?.invoice?.total_amount).toLocaleString('vi-VN')}đ</p>
                                </div>
                                <hr />
                                <div className={styles.invoicePay}>
                                    <p className={styles.invoicePayText}>Khuyến mãi</p>
                                    <p>{Number(invoiceDetails?.invoice?.discount_amount).toLocaleString('vi-VN')}đ</p>
                                </div>
                                <hr />
                                <div className={styles.invoicePay}>
                                    <p className={styles.invoicePayText}>Tổng số tiền phải trả</p>
                                    <p>{Number(invoiceDetails?.invoice?.final_amount).toLocaleString('vi-VN')}đ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="primary" onClick={handlePayment}>
                    Thanh toán
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer> */}
        </Modal>
    );
};

export default AppointmentInvoiceModal;
