import React from 'react'
import styles from './CompletedViewModal.module.css'
import { Modal } from 'react-bootstrap'
const CompletedViewModal = ({ show, onClose, appointmentDetail }) => {
  return (
    <Modal centered show={show} onHide={onClose}>
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
                        <div>
                            <h4 className={styles.InfoHeadingServices}>Dịch vụ sử dụng</h4>
                            {appointmentDetail?.services && appointmentDetail?.services.length > 0 ? (
                                <div className={styles.InfoCustomer}>
                                    {appointmentDetail?.services.map((service) => (
                                        <div>
                                            <div key={service?._id}>
                                                <p className={styles.InfoText}>Tên dịch vụ: {service?.name}</p>
                                                <p className={styles.InfoText}>Mô tả: {service?.description}</p>
                                                <p className={styles.InfoText}>
                                                    Giá: {service?.price.toLocaleString()} đ
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Không có dịch vụ nào được cung cấp.</p>
                            )}
                        </div>
                        <hr />
                        <div>
                            {/* <h4 className={styles.InfoTextTotal}>
                                Tổng thời gian thực hiện: {appointmentDetail?.slot_id?.duration_minutes} phút
                            </h4> */}
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
  )
}

export default CompletedViewModal
