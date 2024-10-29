import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Spinner, Table } from 'react-bootstrap';
import { createAppointments, createAppointmentsWithoutSlot, findCustomerApi, getPriceForService } from '@/utils/api'; // Giả sử bạn có hàm này
import styles from './BookedModal.module.css';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const BookedModal = ({ show, handleClose, slotId, onUpdateSlot }) => {
    const [query, setQuery] = useState('');
    const [customerData, setCustomerData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedVehicleType, setSelectedVehicleType] = useState('');
    const [servicePrice, setServicePrice] = useState(null);
    const [serviceQuery, setServiceQuery] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState(null); // Thêm state mới để theo dõi xe đã chọn

    const [selectedServices, setSelectedServices] = useState([]);

    useEffect(() => {
        if (slotId) {
            console.log('Received slot ID:', slotId); // Thông báo sẽ chạy khi slotId thay đổi
        }
    }, [slotId]);

    useEffect(() => {
        if (show) {
            setQuery('');
            setCustomerData(null);
            setIsLoading(false);
            setError('');
            setSelectedVehicleType('');
            setServicePrice(null);
            setServiceQuery('');
            setSelectedVehicle(null);
            setSelectedServices([]);
        }
    }, [show]);
    const searchCustomer = async () => {
        setIsLoading(true);
        setError('');
        try {
            const queryParam = query.trim();
            const isPhoneNumber = /^[0-9]+$/.test(queryParam);
            const queryString = isPhoneNumber ? `phone_number=${queryParam}` : `email=${queryParam}`;

            const response = await findCustomerApi(queryString);
            console.log('>>> dữ liệu trả về');
            setCustomerData(response); // Cập nhật với dữ liệu từ API
        } catch (err) {
            setError('Không tìm thấy khách hàng.');
            setCustomerData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVehicleSelect = async (vehicle) => {
        setSelectedVehicle(vehicle); // Lưu đối tượng xe đã chọn
        setSelectedVehicleType(vehicle?.vehicle_type_id?.vehicle_type_name); // Cập nhật loại xe đã chọn

        // Gọi API lấy giá dịch vụ dựa trên loại xe đã chọn
        try {
            const response = await getPriceForService(null, vehicle?.vehicle_type_id?.vehicle_type_name);
            console.log('>> Dữ liệu dịch vụ:', response);
            if (response.length > 0) {
                setServicePrice(response);
            } else {
                setServicePrice([]); // Nếu không có dữ liệu, gán thành mảng rỗng
            }
        } catch (err) {
            console.error('Không thể lấy giá dịch vụ:', err);
            setServicePrice([]); // Đảm bảo không có lỗi
        }
    };

    const searchService = async (serviceName) => {
        try {
            const response = await getPriceForService(serviceName, selectedVehicleType); // Gọi API với tên dịch vụ và loại xe
            console.log('>> Dữ liệu dịch vụ tìm kiếm:', response);
            if (response.length > 0) {
                setServicePrice(response);
            } else {
                setServicePrice([]); // Không có dữ liệu
            }
        } catch (err) {
            console.error('Không thể tìm kiếm dịch vụ:', err);
            setServicePrice([]); // Đảm bảo không có lỗi
        }
    };

    const handleServiceSelect = (service) => {
        setSelectedServices((prevSelectedServices) => {
            const alreadySelected = prevSelectedServices.find(
                (selectedService) => selectedService.priceline_id === service.priceline_id,
            );

            if (alreadySelected) {
                // Nếu đã chọn dịch vụ này rồi, loại bỏ nó
                return prevSelectedServices.filter(
                    (selectedService) => selectedService.priceline_id !== service.priceline_id,
                );
            } else {
                // Nếu chưa chọn dịch vụ, thêm nó vào danh sách
                return [...prevSelectedServices, service];
            }
        });
    };

    const totalTime = selectedServices.reduce((acc, service) => acc + service.time_required, 0);
    const totalCost = selectedServices.reduce((acc, service) => acc + service.price, 0);

    const handleSearchClick = (event) => {
        event.preventDefault();
        searchCustomer();
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn không cho trang tải lại

        // Lấy ngày giờ hiện tại
        const currentDatetime = new Date().toISOString();

        if (!selectedVehicle || !servicePrice) {
            toast.error('Vui lòng chọn xe và dịch vụ!');
            return;
        }

        const serviceIds = servicePrice.map((service) => service.priceline_id);

        try {
            // Gọi API với sumTime là totalTime
            const response = await createAppointments(
                slotId,
                selectedVehicle._id,
                serviceIds,
                currentDatetime,
                totalTime,
            );
            toast.success('Lịch hẹn đã được tạo:', response);
            console.log(' dịch vụ có lưu vào ko', response);
            onUpdateSlot();
            handleClose(); // Đóng modal sau khi tạo thành công
        } catch (error) {
            console.error('Có lỗi xảy ra khi tạo lịch hẹn:', error);
            toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    return (
        <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header className={styles.modalHeader} closeButton>
                <Modal.Title>Đặt lịch trực tiếp</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Form>
                    <Form.Group controlId="searchCustomer">
                        <Form.Label className={styles.labelForm}>Nhập số điện thoại hoặc email khách hàng</Form.Label>
                        <div className={styles.formCustomer}>
                            <Form.Control
                                size="lg"
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Số điện thoại hoặc email"
                            />
                            <button className={styles.customerBtn} onClick={handleSearchClick}>
                                Tìm kiếm
                            </button>
                        </div>
                        {isLoading && (
                            <Spinner
                                animation="border"
                                variant="primary"
                                size="lg"
                                role="status"
                                aria-hidden="true"
                                centered
                            />
                        )}
                        {error && <p>{error}</p>}

                        {customerData && (
                            <div className={styles.customer}>
                                <div>
                                    <h4>Thông tin khách hàng</h4>
                                    <p className={styles.customerText}>Tên: {customerData.customer.name}</p>
                                    <p className={styles.customerText}>Email: {customerData.customer.email}</p>
                                    <p className={styles.customerText}>
                                        Số điện thoại: {customerData.customer.phone_number}
                                    </p>
                                    <p className={styles.customerText}>Địa chỉ: {customerData.customer.address}</p>
                                </div>
                                <div>
                                    <h4 style={{ textAlign: 'center' }}>Thông tin xe:</h4>
                                    {customerData.vehicles.length > 0 ? (
                                        <div className={styles.car}>
                                            {customerData.vehicles.map((vehicle) => (
                                                <div key={vehicle?._id}>
                                                    <p className={styles.customerText}>
                                                        Tên xe: {vehicle.manufacturer}{' '}
                                                    </p>
                                                    <p className={styles.customerText}>
                                                        Biển số: {vehicle.license_plate}
                                                    </p>
                                                    <p className={styles.customerText}>
                                                        Loại xe: {vehicle?.vehicle_type_id?.vehicle_type_name}{' '}
                                                    </p>
                                                    <button
                                                        className={styles.carBtn}
                                                        onClick={(e) => {
                                                            e.preventDefault(); // Ngăn không để sự kiện lan truyền đóng modal
                                                            handleVehicleSelect(vehicle);
                                                        }}
                                                        style={{
                                                            backgroundColor:
                                                                selectedVehicle && selectedVehicle._id === vehicle._id
                                                                    ? '#2ecc71'
                                                                    : '#3498db', // Đổi màu sắc
                                                            color: 'white', // Màu chữ
                                                        }}
                                                    >
                                                        {selectedVehicle && selectedVehicle._id === vehicle._id
                                                            ? 'Đã chọn xe'
                                                            : 'Chọn xe này'}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className={styles.errorText}>Khách hàng không có thông tin xe.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-4 mt-4">
                        <Form.Label className={styles.labelForm}>Tìm kiếm dịch vụ</Form.Label>
                        <div className={styles.formCustomer}>
                            <Form.Control size="lg" type="Tìm kiếm" onChange={(e) => setServiceQuery(e.target.value)} />
                            <button
                                className={styles.customerBtn}
                                onClick={(e) => {
                                    e.preventDefault();
                                    searchService(serviceQuery); // Gọi hàm tìm kiếm
                                }}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                        <h4 className="mb-2 mt-2">Bảng dịch vụ </h4>
                        {servicePrice && servicePrice.length > 0 && (
                            <Table className="mt-4">
                                <thead>
                                    <tr>
                                        <th className={styles.dataTableHead}>Mã dịch vụ</th>
                                        <th className={styles.dataTableHead}>Tên dịch vụ</th>
                                        <th className={styles.dataTableHead}>Loại xe</th>
                                        <th className={styles.dataTableHead}>Thời gian</th>
                                        <th className={styles.dataTableHead}>Giá</th>
                                        <th className={styles.dataTableHead}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicePrice.map((service) => (
                                        <tr key={service.priceline_id}>
                                            <td className={styles.dataTableItem}>{service.service_code}</td>
                                            <td className={styles.dataTableItem}>{service.service}</td>
                                            <td className={styles.dataTableItem}>{service.vehicle_type}</td>
                                            <td className={styles.dataTableItem}>{service.time_required} phút</td>
                                            <td className={styles.dataTableItem}>{service.price} VNĐ</td>
                                            <td className={styles.dataTableIcon}>
                                                {selectedServices.some(
                                                    (s) => s.priceline_id === service.priceline_id,
                                                ) ? (
                                                    <FaTrash
                                                        onClick={() => handleServiceSelect(service)}
                                                        style={{ color: 'red', cursor: 'pointer' }}
                                                    />
                                                ) : (
                                                    <FaPlus
                                                        onClick={() => handleServiceSelect(service)}
                                                        style={{ color: 'green', cursor: 'pointer' }}
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                        <h4 className="mb-2 mt-2">Bảng dịch vụ được chọn </h4>
                        {selectedServices.length > 0 && (
                            <Table className="mt-4">
                                <thead>
                                    <tr>
                                        <th className={styles.dataTableHead}>Mã dịch vụ</th>
                                        <th className={styles.dataTableHead}>Tên dịch vụ</th>
                                        <th className={styles.dataTableHead}>Thời gian</th>
                                        <th className={styles.dataTableHead}>Giá</th>
                                        <th className={styles.dataTableHead}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedServices.map((service) => (
                                        <tr key={service.priceline_id}>
                                            <td className={styles.dataTableItem}>{service.service_code}</td>
                                            <td className={styles.dataTableItem}>{service.service}</td>
                                            <td className={styles.dataTableItem}>{service.time_required} phút</td>
                                            <td className={styles.dataTableItem}>
                                                {service.price.toLocaleString()} VNĐ
                                            </td>
                                            <td className={styles.dataTableIcon}>
                                                <FaTrash
                                                    style={{ color: 'red', cursor: 'pointer' }}
                                                    variant="danger"
                                                    onClick={() => handleServiceSelect(service)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Form.Group>
                    <div>
                        <h4 className={styles.totalText}>Tổng thời gian thực hiện dịch vụ: {totalTime} phút</h4>
                        <h4 className={styles.totalText}>Tổng phí dịch vụ: {totalCost.toLocaleString()} VNĐ</h4>
                    </div>
                    <button className={styles.btnSubmit} size="lg" onClick={handleSubmit}>
                        Đặt
                    </button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BookedModal;
