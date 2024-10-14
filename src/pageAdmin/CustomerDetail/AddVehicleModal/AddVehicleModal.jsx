import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getCarApi, createVehicleApi } from '@/utils/api';
import styles from './AddVehicleModal.module.css';

const AddVehicleModal = ({ show, onClose, customerId, onSave }) => {
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [selectedVehicleType, setSelectedVehicleType] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [color, setColor] = useState('');
    
    // State để lưu trữ lỗi
    const [errors, setErrors] = useState({});

    // Fetch vehicle types when the modal is shown
    useEffect(() => {
        if (show) {
            getCarApi()
                .then((response) => {
                    setVehicleTypes(response || []);
                })
                .catch((error) => {
                    console.error('Error fetching vehicle types:', error);
                    setVehicleTypes([]);
                });
            resetForm();
        }
    }, [show]);

    const resetForm = () => {
        setSelectedVehicleType('');
        setLicensePlate('');
        setManufacturer('');
        setModel('');
        setYear('');
        setColor('');
        setErrors({}); // Reset errors khi form được reset
    };

    // Hàm xác thực
    const validateForm = () => {
        const newErrors = {};

        if (!selectedVehicleType) newErrors.selectedVehicleType = 'Bạn phải chọn loại xe';
        if (!licensePlate) newErrors.licensePlate = 'Bạn phải nhập biển số xe';
        if (!manufacturer) newErrors.manufacturer = 'Bạn phải nhập hãng xe';
        if (!model) newErrors.model = 'Bạn phải nhập model';
        if (!year || isNaN(year) || year < 1886 || year > new Date().getFullYear()) 
            newErrors.year = 'Bạn phải nhập năm hợp lệ';
        if (!color) newErrors.color = 'Bạn phải nhập màu sắc';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Nếu không có lỗi
    };

    // Handle form submit
    const handleSave = () => {
        if (validateForm()) {
            const newVehicle = {
                vehicle_type_id: selectedVehicleType,
                license_plate: licensePlate,
                manufacturer,
                model,
                year,
                color,
            };
            console.log('New Vehicle Info:', newVehicle);
            createVehicleApi(customerId, newVehicle)
                .then((response) => {
                    console.log('Vehicle added successfully:', response);
                    const addedVehicle = response.vehicle; // Lấy xe mới từ response
                    onSave(addedVehicle);
                    onClose(); // Close the modal after saving
                })
                .catch((error) => {
                    console.error('Error adding vehicle:', error);
                });
        }
    };

    return (
        <Modal show={show} size='lg' onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className={styles.modalTitle}>Thêm xe mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className={styles.formGroup} controlId="vehicleType">
                        <Form.Label className={styles.formLabel}>Loại xe</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedVehicleType}
                            className={`${styles.formControl} ${errors.selectedVehicleType ? 'is-invalid' : ''}`}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                setSelectedVehicleType(selectedId);
                                console.log('Selected Vehicle Type ID:', selectedId);
                            }}
                        >
                            <option value="">Chọn loại xe</option>
                            {vehicleTypes.map((type) => (
                                <option key={type.id} value={type._id}>
                                    {type.vehicle_type_name}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.selectedVehicleType}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={styles.formGroup} controlId="licensePlate">
                        <Form.Label className={styles.formLabel}>Biển số xe</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập biển số xe"
                            className={`${styles.formControl} ${errors.licensePlate ? 'is-invalid' : ''}`}
                            value={licensePlate}
                            onChange={(e) => setLicensePlate(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">{errors.licensePlate}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={styles.formGroup} controlId="manufacturer">
                        <Form.Label className={styles.formLabel}>Hãng xe</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập hãng xe"
                            className={`${styles.formControl} ${errors.manufacturer ? 'is-invalid' : ''}`}
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">{errors.manufacturer}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={styles.formGroup} controlId="model">
                        <Form.Label className={styles.formLabel}>Model</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập model"
                            className={`${styles.formControl} ${errors.model ? 'is-invalid' : ''}`}
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">{errors.model}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={styles.formGroup} controlId="year">
                        <Form.Label className={styles.formLabel}>Năm sản xuất</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập năm sản xuất"
                            className={`${styles.formControl} ${errors.year ? 'is-invalid' : ''}`}
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={styles.formGroup} controlId="color">
                        <Form.Label className={styles.formLabel}>Màu sắc</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập màu sắc"
                            className={`${styles.formControl} ${errors.color ? 'is-invalid' : ''}`}
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">{errors.color}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className={styles.btn} onClick={onClose}>
                    Hủy
                </Button>
                <Button variant="primary" className={styles.btn} onClick={handleSave}>
                    Thêm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddVehicleModal;
