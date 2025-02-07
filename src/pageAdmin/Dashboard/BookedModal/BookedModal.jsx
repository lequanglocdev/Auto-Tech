import React, { useState } from 'react';
import { Form, Modal, Table } from 'react-bootstrap';
import styles from './BookedModal.module.css';
import { createAppointments, findCustomerApi, getPriceForService } from '@/utils/api';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash } from 'react-icons/fa6';
const BookedModal = ({ show, handleClose, onUpdateSlot, slotId }) => {
    const [query, setQuery] = useState('');
    const [customerData, setCustomerData] = useState(null);

    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedVehicleType, setSelectedVehicleType] = useState('');
    const [servicePrice, setServicePrice] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);

     const totalTime = selectedServices.reduce((acc, service) => acc + service?.time_required, 0);
     const totalCost = selectedServices.reduce((acc, service) => acc + service?.price, 0);

    //-----------------Customer----------------------------
    const handleSearchCustomer = async () => {
        if (!query.trim()) return;
        try {
            const queryParam = query.trim();
            const isPhoneNumber = /^[0-9]+$/.test(queryParam);
            const queryString = isPhoneNumber ? `phone_number=${queryParam}` : `email=${queryParam}`;
            const response = await findCustomerApi(queryString);
            setCustomerData(response);
        } catch (err) {
            setCustomerData(null);
            toast.error('Khách hàng không có trong hệ thống ');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchCustomer();
        }
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
        if (!e.target.value.trim()) {
            setCustomerData(null);
            setSelectedServices([]);
        }
    };

    //-----------------------Vehicle-------------------------
    const handleVehicleSelect = async (vehicle) => {
        setSelectedVehicle(vehicle);
        setSelectedVehicleType(vehicle?.vehicle_type_id?.vehicle_type_name);

        try {
            const response = await getPriceForService(null, vehicle?.vehicle_type_id?.vehicle_type_name);
            if (response.length > 0) {
                setServicePrice(response);
            } else {
                setServicePrice([]);
                toast.error('Không tìm thấy dịch vụ nào cho loại xe này.');
            }
        } catch (err) {
            setServicePrice([]);
        }
    };

    const handleServiceSelect = (service) => {
        setSelectedServices((prevSelectedServices) => {
            const alreadySelected = prevSelectedServices.find(
                (selectedService) => selectedService?.priceline_id === service?.priceline_id,
            );

            if (alreadySelected) {
                // Nếu đã chọn dịch vụ này rồi, loại bỏ nó
                return prevSelectedServices.filter(
                    (selectedService) => selectedService?.priceline_id !== service?.priceline_id,
                );
            } else {
                // Nếu chưa chọn dịch vụ, thêm nó vào danh sách
                return [...prevSelectedServices, service];
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDatetime = new Date().toISOString();

        if (!selectedVehicle || !selectedServices || selectedServices.length === 0) {
            toast.error('Vui lòng chọn xe và dịch vụ!');
            return;
        }

        const serviceIds = selectedServices.map((service) => service?.priceline_id);
        console.log('dịch vụ chon', serviceIds);
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
            onUpdateSlot();
            handleClose();
        } catch (error) {
            toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    return (
        <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header className={styles.modalHeader} closeButton closeVariant="white">
                <Modal.Title>Đặt dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Form>
                    <Form.Group>
                        <Form.Label className={styles.labelForm}>Nhập số điện thoại hoặc email khách hàng</Form.Label>
                        <Form.Control
                            size="lg"
                            type="text"
                            value={query}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Số điện thoại hoặc email"
                        />
                        {customerData && (
                            <div className={styles.customer}>
                                <div>
                                    <h4>Thông tin khách hàng</h4>
                                    <p className={styles.customerText}>Tên: {customerData.customer?.name}</p>
                                    <p className={styles.customerText}>Email: {customerData.customer?.email}</p>
                                    <p className={styles.customerText}>
                                        Số điện thoại: {customerData.customer?.phone_number}
                                    </p>
                                    <p className={styles.customerText}>Địa chỉ: {customerData.customer?.address}</p>
                                </div>

                                <div>
                                    <h4 style={{ textAlign: 'center' }}>Thông tin xe</h4>
                                    {customerData.vehicles.length > 0 ? (
                                        <div className={styles.car}>
                                            {customerData.vehicles.map((vehicle) => (
                                                <div key={vehicle?._id}>
                                                    <p className={styles.customerText}>
                                                        Tên xe: {vehicle?.manufacturer}
                                                    </p>
                                                    <p className={styles.customerText}>
                                                        Biển số: {vehicle?.license_plate}
                                                    </p>
                                                    <p className={styles.customerText}>
                                                        Loại xe: {vehicle?.vehicle_type_id?.vehicle_type_name}
                                                    </p>
                                                    <button
                                                        className={styles.carBtn}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleVehicleSelect(vehicle);
                                                        }}
                                                        // Đổi màu sắc
                                                        style={{
                                                            backgroundColor:
                                                                selectedVehicle && selectedVehicle?._id === vehicle?._id
                                                                    ? '#2ecc71'
                                                                    : '#3498db',
                                                            color: 'white',
                                                        }}
                                                    >
                                                        {selectedVehicle && selectedVehicle?._id === vehicle?._id
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

                        {customerData ? (
                            <>
                                {servicePrice && servicePrice.length > 0 ? (
                                    <div>
                                        <h4 className="mt-4">Bảng dịch vụ </h4>
                                        <div className={styles.scroolSelect}>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th className={styles.dataTableHeadTH}>Mã dịch vụ</th>
                                                        <th className={styles.dataTableHeadTH}>Tên dịch vụ</th>
                                                        <th className={styles.dataTableHeadTH}>Loại xe</th>
                                                        <th className={styles.dataTableHeadTH}>Thời gian</th>
                                                        <th className={styles.dataTableHeadTH}>Giá cả</th>
                                                        <th className={styles.dataTableHeadTH}>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {servicePrice
                                                        .filter(
                                                            (service) =>
                                                                !selectedServices.some(
                                                                    (s) => s.priceline_id === service.priceline_id,
                                                                ),
                                                        )
                                                        .map((service) => (
                                                            <tr key={service?.priceline_id}>
                                                                <td className={styles.dataTableItem}>
                                                                    {service?.service_code}
                                                                </td>
                                                                <td className={styles.dataTableItem}>
                                                                    {service?.service}
                                                                </td>
                                                                <td className={styles.dataTableItem}>
                                                                    {service?.vehicle_type}
                                                                </td>
                                                                <td className={styles.dataTableItem}>
                                                                    {service?.time_required} phút
                                                                </td>
                                                                <td className={styles.dataTableItem}>
                                                                    {service?.price.toLocaleString('vi-VN')}
                                                                </td>
                                                                <td className={styles.dataTableIcon}>
                                                                    {selectedServices.some(
                                                                        (s) =>
                                                                            s?.priceline_id === service?.priceline_id,
                                                                    ) ? (
                                                                        <FaTrash
                                                                            onClick={() => handleServiceSelect(service)}
                                                                            style={{ color: 'red', cursor: 'pointer' }}
                                                                        />
                                                                    ) : (
                                                                        <FaPlus
                                                                            onClick={() => handleServiceSelect(service)}
                                                                            style={{
                                                                                color: 'green',
                                                                                cursor: 'pointer',
                                                                            }}
                                                                        />
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                ) : (
                                    <p className={styles.validate}>Chưa chọn xe</p>
                                )}
                            </>
                        ) : (
                            <p className="text-center"></p> // Hiển thị nếu không có thông tin khách hàng
                        )}

                        {selectedServices.length > 0 && (
                            <div>
                                <h4 className="mt-4">Bảng dịch vụ được chọn </h4>
                                <div className={styles.scroolSelect}>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th className={styles.dataTableHeadTh}>Mã dịch vụ</th>
                                                <th className={styles.dataTableHeadTh}>Tên dịch vụ</th>
                                                <th className={styles.dataTableHeadTh}>Thời gian</th>
                                                <th className={styles.dataTableHeadTh}>Giá</th>
                                                <th className={styles.dataTableHeadTh}>Tác vụ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedServices.map((service) => (
                                                <tr key={service?.priceline_id}>
                                                    <td className={styles.dataTableItem}>{service?.service_code}</td>
                                                    <td className={styles.dataTableItem}>{service?.service}</td>
                                                    <td className={styles.dataTableItem}>
                                                        {service?.time_required} phút
                                                    </td>
                                                    <td className={styles.dataTableItem}>
                                                        {service?.price.toLocaleString()}
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
                                </div>
                            </div>
                        )}
                    </Form.Group>
                    <div>
                        <h4 className={styles.totalText}>Tổng thời gian thực hiện dịch vụ: {totalTime} phút</h4>
                        <h4 className={styles.totalText}>Tổng phí dịch vụ: {totalCost.toLocaleString()} </h4>
                    </div>
                    <button
                        className={styles.btnSubmit}
                        size="lg"
                        onClick={handleSubmit}
                        disabled={!selectedVehicle || !selectedServices}
                    >
                        Đặt
                    </button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BookedModal;
