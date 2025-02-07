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
                        <div className={styles.infoCustomer}>
                            <div>
                                <h4 className={styles.infoHeading}>Thông tin khách hàng</h4>
                                <p className={styles.infoText}>Tên: {appointmentDetail?.customer_id?.name}</p>
                                <p className={styles.infoText}>
                                    Số điện thoại: {appointmentDetail?.customer_id?.phone_number}
                                </p>
                                <p className={styles.infoText}>Email: {appointmentDetail?.customer_id?.email}</p>
                                <p className={styles.infoText}>Địa chỉ: {appointmentDetail?.customer_id?.address}</p>
                            </div>
                            <div>
                                <h4 className={styles.infoHeading}>Thông tin xe của khách</h4>
                                <p className={styles.infoText}>
                                    Biển số: {appointmentDetail?.vehicle_id?.license_plate}
                                </p>
                                <p className={styles.infoText}>Tên xe: {appointmentDetail?.vehicle_id?.manufacturer}</p>
                                <p className={styles.infoText}>Dòng xe: {appointmentDetail?.vehicle_id?.model}</p>
                                <p className={styles.infoText}>Màu sắc: {appointmentDetail?.vehicle_id?.color}</p>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h4 className={styles.infoHeadingServices}>Dịch vụ sử dụng</h4>
                            {appointmentDetail?.services && appointmentDetail?.services.length > 0 ? (
                                <div className={styles.infoCustomer}>
                                    {appointmentDetail?.services.map((service) => (
                                        <div>
                                            <div key={service?._id}>
                                                <p className={styles.infoText}>Tên dịch vụ: {service?.name}</p>
                                                <p className={styles.infoText}>Mô tả: {service?.description}</p>
                                                <p className={styles.infoText}>
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
                            <h4 className={styles.infoTextTotal}>
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
