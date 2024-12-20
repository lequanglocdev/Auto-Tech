import React, { useEffect, useState } from 'react';
import { Modal, Form, Spinner, Table } from 'react-bootstrap';
import { createAppointments, findCustomerApi, getPriceForService } from '@/utils/api'; // Giả sử bạn có hàm này
import styles from './BookedModal.module.css';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

const BookedModal = ({ show, handleClose, slotId, onUpdateSlot }) => {
    const [query, setQuery] = useState('');
    const [customerData, setCustomerData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [isLoadingService, setIsLoadingService] = useState(false);
    const [errorService, setErrorService] = useState('');

    const [selectedVehicleType, setSelectedVehicleType] = useState('');
    const [servicePrice, setServicePrice] = useState(null);
    const [serviceQuery, setServiceQuery] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState(null); // Thêm state mới để theo dõi xe đã chọn

    const [selectedServices, setSelectedServices] = useState([]);
    const [serviceError, setServiceError] = useState('');

    const totalTime = selectedServices.reduce((acc, service) => acc + service?.time_required, 0);
    const totalCost = selectedServices.reduce((acc, service) => acc + service?.price, 0);

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

    // Tự động gọi API tìm kiếm khách hàng khi nhập thông tin
    useEffect(() => {
        const handleDebouncedSearchCustomer = debounce(async () => {
            if (query.trim()) await searchCustomer();
        }, 500);

        handleDebouncedSearchCustomer();

        return () => handleDebouncedSearchCustomer.cancel();
    }, [query]);

    // Tự động gọi API tìm kiếm dịch vụ khi nhập thông tin
    useEffect(() => {
        const handleDebouncedSearchService = debounce(async () => {
            if (serviceQuery.trim() && selectedVehicleType) {
                await searchService(serviceQuery, selectedVehicleType);
            }
        }, 500); // 500ms delay

        handleDebouncedSearchService();

        return () => handleDebouncedSearchService.cancel();
    }, [serviceQuery, selectedVehicleType]);

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
            setError(
                <p className={styles.validate}>
                    Không tìm thấy khách hàng.
                </p>
            );
            setCustomerData(null);
            setSelectedVehicle(null); // Reset xe đã chọn
            setSelectedServices([]); // Xóa danh sách dịch vụ
            // toast.warning('Không tìm thấy khách hàng!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVehicleSelect = async (vehicle) => {
        setSelectedVehicle(vehicle);
        setSelectedVehicleType(vehicle?.vehicle_type_id?.vehicle_type_name);

        // Bắt đầu tải dữ liệu
        setIsLoadingService(true);
        setErrorService('');
        try {
            const response = await getPriceForService(null, vehicle?.vehicle_type_id?.vehicle_type_name);
            if (response.length > 0) {
                setServicePrice(response);
            } else {
                setServicePrice([]);
                setErrorService('Không tìm thấy dịch vụ nào cho loại xe này.');
            }
        } catch (err) {
            console.error('Không thể lấy giá dịch vụ:', err);
            setServicePrice([]);
            setErrorService('Đã xảy ra lỗi khi lấy giá dịch vụ.');
        } finally {
            setIsLoadingService(false); // Kết thúc quá trình tải
        }
    };

    const searchService = async (serviceName, vehicleType) => {
        setIsLoadingService(true);
        setErrorService('');
        try {
            const response = await getPriceForService(serviceName, vehicleType);
            if (response.length > 0) {
                setServicePrice(response);
            } else {
                setServicePrice([]);
                setErrorService('Không tìm thấy dịch vụ nào.');
            }
        } catch (err) {
            console.error('Không thể tìm kiếm dịch vụ:', err);
            setServicePrice([]);
            setErrorService('Đã xảy ra lỗi khi tìm kiếm dịch vụ.');
        } finally {
            setIsLoadingService(false);
        }
    };

    const handleServiceSelect = (service) => {
        console.log('dịch vụ chọn', service);
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

        if (!selectedVehicle || !servicePrice) {
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
                <Modal.Title>Đặt dịch vụ</Modal.Title>
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
                            {/* <button className={styles.customerBtn} onClick={handleSearchClick}>
                                Tìm kiếm
                            </button> */}
                        </div>
                        {isLoading && (
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ minHeight: '30px' }}
                            >
                                <Spinner
                                    animation="border"
                                    variant="primary"
                                    size="lg"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </div>
                        )}
                        {error && <p>{error}</p>}

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
                                    <h4 style={{ textAlign: 'center' }}>Thông tin xe:</h4>
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
                                                            e.preventDefault(); // Ngăn không để sự kiện lan truyền đóng modal
                                                            handleVehicleSelect(vehicle);
                                                        }}
                                                        style={{
                                                            backgroundColor:
                                                                selectedVehicle && selectedVehicle?._id === vehicle?._id
                                                                    ? '#2ecc71'
                                                                    : '#3498db', // Đổi màu sắc
                                                            color: 'white', // Màu chữ
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
                    </Form.Group>
                    <Form.Group className="mb-4 mt-4">
                        <Form.Label className={styles.labelForm}>Tìm kiếm dịch vụ</Form.Label>
                        <div className={styles.formCustomer}>
                            <Form.Control
                                size="lg"
                                type="text"
                                onChange={(e) => setServiceQuery(e.target.value)} // Cập nhật state
                                placeholder="Tìm kiếm dịch vụ"
                            />
                        </div>
                        {isLoadingService && (
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ minHeight: '30px' }}
                            >
                                <Spinner
                                    animation="border"
                                    variant="primary"
                                    size="lg"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </div>
                        )}
                        {errorService && <p>{errorService}</p>}
                        {customerData ? (
                            <>
                                {errorService && <p>{errorService}</p>}
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
                                                        <th className={styles.dataTableHeadTH}>Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {servicePrice.map((service) => (
                                                        <tr key={service.priceline_id}>
                                                            <td className={styles.dataTableItem}>
                                                                {service?.service_code}
                                                            </td>
                                                            <td className={styles.dataTableItem}>{service?.service}</td>
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
                                                                    (s) => s.priceline_id === service?.priceline_id,
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
                                        </div>
                                    </div>
                                ) : (
                                    <p className={styles.validate}>Chưa chọn xe</p> // Hiển thị nếu không có dịch vụ
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
                                                <th className={styles.dataTableHeadTh}>Chọn</th>
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
                    <button className={styles.btnSubmit} size="lg" onClick={handleSubmit}>
                        Đặt
                    </button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BookedModal;
