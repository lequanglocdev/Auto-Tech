import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createPriceLineApi } from '@/utils/api';
import { toast } from 'react-toastify';
import styles from './AddPriceDetailModal.module.css';
const AddPriceDetailModal = ({ show, onHide, priceId, onUpdatePriceDetail, services, vehicles }) => {
    const [addedVehicles, setAddedVehicles] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [selectedVehicleId, setSelectedVehicleId] = useState('');
    const [price, setPrice] = useState('');
    const [priceError, setPriceError] = useState('');
    const [vehicleError, setVehicleError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPriceError('');
        setVehicleError('');

        // Kiểm tra giá
        if (parseFloat(price) <= 0) {
            setPriceError('Giá không được nhỏ hơn và bằng 0.');
            return;
        }

        // Kiểm tra trùng loại xe
        if (addedVehicles.includes(selectedVehicleId)) {
            setVehicleError('Loại xe đã được thêm trước đó.');
            return;
        }

        try {
            // Gọi API để tạo dòng giá mới
            const newPriceDetail = await createPriceLineApi(priceId, selectedServiceId, selectedVehicleId, price);
            console.log('Thêm thông tin bảng giá thành công!', newPriceDetail);

            // Cập nhật danh sách các loại xe đã thêm và gọi callback để cập nhật danh sách chi tiết
            setAddedVehicles([...addedVehicles, selectedVehicleId]);
            onUpdatePriceDetail(newPriceDetail);
            toast.success('Thêm thông tin bảng giá thành công!');
            onHide();
        } catch (error) {
            console.error('Error creating price line:', error.response?.data?.msg || error.message);
            toast.error(error.response?.data?.msg);
        }
    };

    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm Thông Tin Bảng Giá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="serviceSelect" className={styles.customerLabel}>
                            Chọn Dịch Vụ
                        </Form.Label>
                        <Form.Control
                           
                            as="select"
                            size="lg"
                            className={styles.formControl}
                            id="serviceSelect"
                            value={selectedServiceId}
                            onChange={(e) => setSelectedServiceId(e.target.value)}
                        >
                            <option value="">Chọn dịch vụ</option>
                            {services.map((service) => (
                                <option key={service._id} value={service._id}>
                                    {service.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="vehicleSelect" className={styles.customerLabel}>
                            Chọn Loại Xe
                        </Form.Label>
                        <Form.Control
                            size="lg"
                            as="select"
                            className={styles.formControl}
                            id="vehicleSelect"
                            value={selectedVehicleId}
                            onChange={(e) => setSelectedVehicleId(e.target.value)}
                        >
                            <option value="">Chọn loại xe</option>
                            {vehicles.map((vehicle) => (
                                <option key={vehicle._id} value={vehicle._id}>
                                    {vehicle.vehicle_type_name}
                                </option>
                            ))}
                        </Form.Control>
                        {vehicleError && <div className="text-danger">{vehicleError}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="price" className={styles.customerLabel}>
                            Giá
                        </Form.Label>
                        <Form.Control
                            size="lg"
                            type="number"
                            className="form-control"
                            id="price"
                            placeholder="Nhập giá"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {priceError && <div className="text-danger">{priceError}</div>}
                    </Form.Group>

                    <div className={styles.btn}>
                        <Button className={`mt-2 ${styles.customerBtn}`} variant="primary" type="submit">
                            Thêm
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddPriceDetailModal;
