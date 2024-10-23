import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './EditPriceModal.module.css';
import { toast } from 'react-toastify'; // Để hiển thị thông báo lỗi
import { getServicesApi, getCarApi, putPriceDetailApi } from '@/utils/api';

const EditPriceModal = ({ priceId, show, onHide, onUpdate }) => {
    const [services, setServices] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        service_id: '',
        vehicle_type_id: '',
        price: '',
        is_active: true,
    });

    // Fetch danh sách dịch vụ và loại xe khi modal mở
    useEffect(() => {
        const fetchData = async () => {
            try {
                const servicesData = await getServicesApi();
                const vehiclesData = await getCarApi();
                setServices(servicesData);
                setVehicles(vehiclesData);
            } catch (error) {
                console.error('Error fetching services or vehicles:', error);
            }
        };
        fetchData();
    }, []);

    // Cập nhật form khi nhận dữ liệu từ prop "price"
    useEffect(() => {
        if (priceId && priceId.service_id && priceId.vehicle_type_id) {
            setFormData({
                service_id: priceId?.service_id?._id || '',
                vehicle_type_id: priceId?.vehicle_type_id?._id || '',
                price: priceId?.price || '',
                is_active: priceId?.is_active ?? true, // Sử dụng `??` để xử lý giá trị `false` hợp lệ
            });
        }
    }, [priceId]);

    // Xử lý khi người dùng thay đổi dữ liệu trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Gửi yêu cầu cập nhật thông tin giá
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPrice = {
                service_id: formData.service_id,
                vehicle_type_id: formData.vehicle_type_id,
                price: formData.price,
            };
    
            // Gọi API để cập nhật
            const response = await putPriceDetailApi(priceId, updatedPrice);
            
            // Tìm tên dịch vụ và loại xe tương ứng
            const updatedService = services.find(service => service._id === updatedPrice.service_id);
            const updatedVehicle = vehicles.find(vehicle => vehicle._id === updatedPrice.vehicle_type_id);
    
            // Gọi hàm onUpdate để cập nhật lại dữ liệu trong PriceDetailPage
            onUpdate({
                ...priceId, 
                ...updatedPrice, 
                service_id: { _id: updatedPrice.service_id, name: updatedService ? updatedService.name : 'Không tìm thấy tên dịch vụ' },
                vehicle_type_id: { _id: updatedPrice.vehicle_type_id, vehicle_type_name: updatedVehicle ? updatedVehicle.vehicle_type_name : 'Không tìm thấy tên loại xe' },
            });
    
            toast.success('Cập nhật thông tin giá thành công!');
            onHide(); // Đóng modal sau khi thành công
        } catch (error) {
            console.error('Error updating price detail:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật thông tin giá.');
        }
    };
    

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className={styles.customerTitle}>Chỉnh sửa thông tin bảng giá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {priceId ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className={styles.customerGroup} controlId="service_id">
                            <Form.Label className={styles.customerLabel}>Dịch vụ</Form.Label>
                            <Form.Control
                                as="select"
                                name="service_id"
                                value={formData.service_id}
                                onChange={handleChange}
                            >
                                <option value="">Chọn dịch vụ</option>
                                {services.map((service) => (
                                    <option key={service._id} value={service._id}>
                                        {service.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="vehicle_type_id">
                            <Form.Label className={styles.customerLabel}>Loại xe</Form.Label>
                            <Form.Control
                                as="select"
                                name="vehicle_type_id"
                                value={formData.vehicle_type_id}
                                onChange={handleChange}
                            >
                                <option value="">Chọn loại xe</option>
                                {vehicles.map((vehicle) => (
                                    <option key={vehicle._id} value={vehicle._id}>
                                        {vehicle.vehicle_type_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className={styles.customerGroup} controlId="price">
                            <Form.Label className={styles.customerLabel}>Giá</Form.Label>
                            <Form.Control
                                className={styles.customerControl}
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Nhập giá"
                            />
                        </Form.Group>
                        <div className={styles.btn}>
                            <Button className={`mt-2 ${styles.customerBtn}`} variant="primary" type="submit">
                                Cập nhật
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default EditPriceModal;
