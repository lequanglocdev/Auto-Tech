import React from 'react';
import styles from './CreateCustomer.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import icons from '@/utils/icon';
import { Button, Form, Modal } from 'react-bootstrap';
import useCreateCustomerForm from './hooks/useCreateCustomerForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateCustomer = () => {
    const { FaPlusCircle } = icons;

    const {
      formData,
      errors,
      handleChange,
      handleSubmit,
      otp,
      handleOtpChange,
      showOtpModal,
      setShowOtpModal,
      handleOtpSubmit,
  } = useCreateCustomerForm();

    return (
        <div>
            <div className={styles.createCustomer}>
                <Breadcrumb items={['Quản lý khách hàng', 'Thêm mới khách hàng']} activeItem="Thêm mới khách hàng" />
            </div>
            <div className={styles.createCustomerBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="employeeCode">
                        <Form.Label className={styles.labelText}>Tên tài khoản</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Nhập mã nhân viên"
                            size="lg"
                            value={formData.username}
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="employeeName">
                        <Form.Label className={styles.labelText}>Tên khách hàng</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập tên nhân viên"
                            size="lg"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label className={styles.labelText}>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            size="lg"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label className={styles.labelText}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Nhập email"
                            size="lg"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label className={styles.labelText}>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Nhập số điện thoại"
                            size="lg"
                            value={formData.phone}
                            onChange={handleChange}
                            isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label className={styles.labelText}>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            placeholder="Nhập địa chỉ"
                            size="lg"
                            value={formData.address}
                            onChange={handleChange}
                            isInvalid={!!errors.address}
                        />
                        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                    </Form.Group>

                    <button type="submit" className={styles.btnAdd}>
                        <FaPlusCircle />
                        Thêm
                    </button>
                </Form>
            </div>
            <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nhập mã OTP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="emailModal">
                        <Form.Label>Email đã nhập</Form.Label>
                        <Form.Control type="text" value={formData.email} readOnly />
                    </Form.Group>
                    <Form.Group controlId="otp">
                        <Form.Label>OTP</Form.Label>
                        <Form.Control type="text" placeholder="Nhập mã OTP" value={otp} onChange={handleOtpChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleOtpSubmit}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default CreateCustomer;