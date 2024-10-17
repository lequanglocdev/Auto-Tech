import React, { useEffect, useState } from 'react';
import styles from './Slot.module.css';
import { findCustomerApi, getServicesApi, createAppointments, getPriceForService, getCarApi } from '@/utils/api'; // Import createAppointments
import { Button, Form, Spinner, Collapse, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import icons from '@/utils/icon';
import { useParams } from 'react-router-dom';

const Slot = () => {
    const [query, setQuery] = useState('');
    const [customerData, setCustomerData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const { slotId } = useParams();

    const [appointmentDatetime, setAppointmentDatetime] = useState(''); // State cho appointmentDatetime

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [filteredPrices, setFilteredPrices] = useState([]);
    const [serviceName, setServiceName] = useState(''); // State cho tên dịch vụ
    const [vehicleTypeName, setVehicleTypeName] = useState('');

    const [serviceData, setServiceData] = useState([]); // Dữ liệu danh sách dịch vụ
    const [vehicleTypes, setVehicleTypes] = useState([]); // Dữ liệu danh sách loại xe
    const [selectedPriceServices, setSelectedPriceServices] = useState([]);
    const { FaPlusCircle } = icons;

    // Lấy danh sách dịch vụ và loại xe khi component mount
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Lấy danh sách dịch vụ
                const serviceResponse = await getServicesApi();
                setServiceData(serviceResponse);

                // Lấy danh sách loại xe
                const vehicleTypeResponse = await getCarApi();
                setVehicleTypes(vehicleTypeResponse);
            } catch (error) {
                toast.error('Đã xảy ra lỗi khi lấy dữ liệu.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleSelectPriceServices = (item) => {
        console.log('Đã chọn giá dịch vụ với ID:', item.priceline_id); // Log ID của giá dịch vụ
        // Thêm logic xử lý tiếp theo nếu cần
        if (!selectedPriceServices.some((priceService) => priceService.priceline_id === item.priceline_id)) {
            setSelectedPriceServices((prev) => [...prev, item]);
        }
    };

    const handleRemovePriceService = (pricelineId) => {
        setSelectedPriceServices((prev) => prev.filter((service) => service.priceline_id !== pricelineId));
    };

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const queryParam = query.trim();
            const isPhoneNumber = /^[0-9]+$/.test(queryParam);
            const queryString = isPhoneNumber ? `phone_number=${queryParam}` : `email=${queryParam}`;

            const response = await findCustomerApi(queryString);
            setCustomerData(response);
            setError('');
        } catch (err) {
            setError('Không tìm thấy khách hàng.');
            setCustomerData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleDetails = () => {
        setOpen(!open);
    };

    // Hàm tạo cuộc hẹn
   const handleCreateAppointment = async () => {
    if (!appointmentDatetime) {
        toast.error('Vui lòng chọn ngày giờ cho cuộc hẹn.');
        return;
    }

    if (!selectedCustomer || selectedCustomer.vehicles.length === 0) {
        toast.error('Vui lòng chọn khách hàng và phương tiện.');
        return;
    }

    // Kiểm tra xem có giá dịch vụ đã chọn không
    if (selectedPriceServices.length === 0) {
        toast.error('Vui lòng chọn ít nhất một giá dịch vụ.');
        return;
    }

    try {
        const response = await createAppointments(
            slotId,
            selectedCustomer.vehicles[0]._id, // Lấy ID phương tiện đầu tiên
            selectedPriceServices.map((service) => service.priceline_id), // Lấy tất cả các ID priceline đã chọn
            appointmentDatetime,
        );
        console.log('>> Đặt dịch vụ ', response);
        toast.success('Cuộc hẹn đã được tạo thành công!');
    } catch (error) {
        console.error('Error creating appointment:', error);
        toast.error('Đã xảy ra lỗi khi tạo cuộc hẹn.');
    }
};


    const handleSelectCustomer = () => {
        console.log('Khách hàng đã chọn:', customerData);
        setSelectedCustomer(customerData); // Lưu thông tin khách hàng đã chọn
    };

    const handleFilterPrices = async () => {
        setIsLoading(true);
        try {
            // Gọi API với các giá trị từ serviceName và vehicleTypeName
            const response = await getPriceForService(serviceName, vehicleTypeName);
            

            setFilteredPrices(response);
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi lấy dữ liệu.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.slot}>
            <h4 className={styles.slotHeader}>Trang đặt dịch vụ chăm sóc khách hàng tại cửa hàng L&k TECH</h4>
            <div className={styles.slotBody}>
                <div className={styles.slotInfoDateTime}>
                    <h5>Ngày giờ cuộc hẹn</h5>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="datetime-local"
                            onChange={(e) => setAppointmentDatetime(e.target.value)} // Lưu ngày giờ cuộc hẹn
                        />
                    </Form.Group>
                </div>
                <div className={styles.slotInfoCustomer}>
                    <h5>Thông tin khách hàng</h5>
                    <Form.Group className="mb-3" controlId="customerSearch">
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Tìm thông tin khách hàng"
                            size="lg"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSearch();
                                }
                            }}
                        />
                    </Form.Group>

                    <div className={styles.slotLoading}>
                        {isLoading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                variant="primary"
                                size="lg"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : !customerData ? (
                            <span className={styles.slotLoadingText}>Không có thông tin khách hàng</span>
                        ) : null}
                    </div>
                    {customerData && (
                        <div className={styles.slotCustomerDetaiWrapper}>
                            <div className={styles.slotCustomerDetaiHeader}>
                                <div>
                                    <p>Khách hàng: {customerData?.customer?.name} </p>
                                    <p>
                                        <strong>Số điện thoại:</strong> {customerData?.customer?.phone_number}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {customerData?.customer?.email}
                                    </p>
                                </div>
                                <div>
                                    <Button onClick={handleToggleDetails}>
                                        {open ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                                    </Button>
                                </div>
                            </div>
                            <Collapse in={open}>
                                <div className={styles.slotCustomerDetaiLine}>
                                    <p>
                                        <strong>Địa chỉ:</strong> {customerData?.customer?.address}
                                    </p>
                                    <p>
                                        <strong>Hạng khách hàng:</strong>{' '}
                                        {customerData?.customer?.customer_rank_id || 'Chưa xác định'}
                                    </p>
                                    <p>
                                        <strong>Tổng chi tiêu:</strong> {customerData?.customer?.total_spending} VNĐ
                                    </p>
                                    <hr />
                                    <h6>Thông tin phương tiện:</h6>
                                    {customerData?.vehicles?.length > 0 ? (
                                        customerData.vehicles.map((vehicle) => (
                                            <div key={vehicle._id}>
                                                <p>
                                                    <strong>Loại xe:</strong>{' '}
                                                    {vehicle.vehicle_type_id.vehicle_type_name}
                                                </p>
                                                <p>
                                                    <strong>Biển số:</strong> {vehicle.license_plate}
                                                </p>
                                                <p>
                                                    <strong>Hãng xe:</strong> {vehicle.manufacturer}
                                                </p>
                                                <p>
                                                    <strong>Model:</strong> {vehicle.model}
                                                </p>
                                                <p>
                                                    <strong>Năm sản xuất:</strong> {vehicle.year}
                                                </p>
                                                <p>
                                                    <strong>Màu sắc:</strong> {vehicle.color}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Không có thông tin phương tiện.</p>
                                    )}
                                </div>
                            </Collapse>
                            <Button className={styles.selectCustomerButton} onClick={handleSelectCustomer}>
                                Chọn khách hàng này
                            </Button>
                        </div>
                    )}
                    {selectedCustomer && (
                        <div className={styles.selectedCustomerInfo}>
                            <h5>Khách hàng đã chọn</h5>
                            <p>
                                <strong>Tên:</strong> {selectedCustomer.customer.name}
                            </p>
                            <p>
                                <strong>Số điện thoại:</strong> {selectedCustomer.customer.phone_number}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedCustomer.customer.email}
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong> {selectedCustomer.customer.address}
                            </p>
                            <p>
                                <strong>Tổng chi tiêu:</strong> {selectedCustomer.customer.total_spending} VNĐ
                            </p>
                            <h6>Phương tiện đã chọn:</h6>
                            {selectedCustomer.vehicles.length > 0 ? (
                                selectedCustomer.vehicles.map((vehicle) => (
                                    <div key={vehicle._id}>
                                        <p>
                                            <strong>Biển số:</strong> {vehicle.license_plate}
                                        </p>
                                        <p>
                                            <strong>Hãng xe:</strong> {vehicle.manufacturer}
                                        </p>
                                        <p>
                                            <strong>Model:</strong> {vehicle.model}
                                        </p>
                                        <p>
                                            <strong>Năm sản xuất:</strong> {vehicle.year}
                                        </p>
                                        <p>
                                            <strong>Màu sắc:</strong> {vehicle.color}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>Không có thông tin phương tiện.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.filterSection}>
                    <h5>Lọc giá dịch vụ</h5>
                    <Form>
                        {/* Select cho danh sách dịch vụ */}
                        <Form.Group className="mb-3">
                            <Form.Label>Tên dịch vụ</Form.Label>
                            <Form.Select
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)} // Lưu giá trị dịch vụ đã chọn
                            >
                                <option value="">Chọn dịch vụ</option>
                                {serviceData.map((service) => (
                                    <option key={service._id} value={service.name}>
                                        {service.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* Select cho danh sách loại xe */}
                        <Form.Group className="mb-3">
                            <Form.Label>Loại xe</Form.Label>
                            <Form.Select
                                value={vehicleTypeName}
                                onChange={(e) => setVehicleTypeName(e.target.value)} // Lưu giá trị loại xe đã chọn
                            >
                                <option value="">Chọn loại xe</option>
                                {vehicleTypes.map((vehicleType) => (
                                    <option key={vehicleType._id} value={vehicleType.vehicle_type_name}>
                                        {vehicleType.vehicle_type_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" onClick={handleFilterPrices}>
                            Tìm kiếm
                        </Button>
                    </Form>
                </div>

                <div>
                    {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Tên dịch vụ</th>
                                    <th>Loại xe</th>
                                    <th>Giá</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPrices.length > 0 ? (
                                    filteredPrices.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.service}</td>
                                            <td>{item.vehicle_type}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <div
                                                    className={styles.dataTableIconEye}
                                                    onClick={() => handleSelectPriceServices(item)} // Chọn giá cho dịch vụ lấy id console log ra
                                                >
                                                    <FaPlusCircle />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            Không có dữ liệu
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </div>
                <div>
                    <h5>Giá dịch vụ đã chọn</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Tên dịch vụ</th>
                                <th>Loại xe</th>
                                <th>Giá</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedPriceServices.length > 0 ? (
                                selectedPriceServices.map((service, index) => (
                                    <tr key={index}>
                                        <td>{service.service}</td>
                                        <td>{service.vehicle_type}</td>
                                        <td>{service.price}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleRemovePriceService(service.priceline_id)}
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                <Button onClick={handleCreateAppointment}>Tạo cuộc hẹn</Button>
            </div>
        </div>
    );
};

export default Slot;
