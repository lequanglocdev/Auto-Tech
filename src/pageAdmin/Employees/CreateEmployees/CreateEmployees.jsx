import React from 'react';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import styles from './CreateEmployees.module.css';
import { Button, Form, Modal } from 'react-bootstrap';
import icons from '@/utils/icon';
import useCreateEmployeeForm from './hooks/useCreateEmployeeForm';
import { useNavigate } from 'react-router-dom';
const CreateEmployees = () => {
    const navigate = useNavigate();
    const { FaPlusCircle, MdArrowBackIos } = icons;
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
    } = useCreateEmployeeForm();
    
    const handleListEmployee = () =>{
        navigate('/employees')
    }
    return (

        <div>
            <div className={styles.createEmployees}>
                <MdArrowBackIos onClick={handleListEmployee} className={styles.createEmployeesIcon}/>
                <Breadcrumb items={['Quản lý nhân viên', 'Thêm mới']} activeItem="Thêm mới" />
            </div>
            <div className={styles.createEmployeesBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="employeeCode">
                        <Form.Label className={styles.labelText}>Mã nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="employeeCode"
                            placeholder="Nhập mã nhân viên"
                            size="lg"
                            value={formData.employeeCode}
                            onChange={handleChange}
                            isInvalid={!!errors.employeeCode}
                        />
                        <Form.Control.Feedback type="invalid">{errors.employeeCode}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="employeeName">
                        <Form.Label className={styles.labelText}>Tên nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="employeeName"
                            placeholder="Nhập tên nhân viên"
                            size="lg"
                            value={formData.employeeName}
                            onChange={handleChange}
                            isInvalid={!!errors.employeeName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.employeeName}</Form.Control.Feedback>
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

                    <Form.Group className="mb-3" controlId="role">
                        <Form.Label className={styles.labelText}>Vai trò</Form.Label>
                        <Form.Select size="lg" name="role" value={formData.role} onChange={handleChange}>
                            <option value="manager">Nhân viên</option>
                        </Form.Select>
                    </Form.Group>

                    <button type="submit" className={styles.btnAdd}>
                        <FaPlusCircle />
                        Thêm
                    </button>
                </Form>
            </div>
            <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nhập mã OTP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="emailModal">
                        <Form.Label className={styles.labelText}>Email đã nhập</Form.Label>
                        <Form.Control type="text" value={formData.email} readOnly />
                    </Form.Group>
                    <Form.Group controlId="otp">
                        <Form.Label className={styles.labelText}>OTP</Form.Label>
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
        </div>
       
    );
};

export default CreateEmployees;
