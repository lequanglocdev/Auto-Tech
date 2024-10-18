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
    const [selectedVehicle, setSelectedVehicle] = useState(null);

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

        if (!selectedCustomer || !selectedVehicle) {
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
                selectedVehicle._id, // Lấy ID phương tiện đầu tiên
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
        // Giả định bạn đã có thông tin customerData
        if (customerData) {
            setSelectedCustomer(customerData.customer);
            setSelectedVehicle(selectedVehicle); // Lưu thông tin xe đã chọn
        }
    };
    const handleSelectVehicle = (vehicle) => {
        setSelectedVehicle(vehicle); // Lưu thông tin xe đã chọn
        // Nếu bạn muốn tự động chọn khách hàng đã chọn, có thể thêm dòng này
        if (customerData) {
            setSelectedCustomer(customerData.customer); // Lưu thông tin khách hàng đã chọn
        }
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
                    <h4>Ngày giờ cuộc hẹn</h4>
                    <Form.Group className="mb-3">
                        <Form.Control
                            size="lg"
                            type="datetime-local"
                            onChange={(e) => setAppointmentDatetime(e.target.value)} // Lưu ngày giờ cuộc hẹn
                        />
                    </Form.Group>
                </div>
                <div className={styles.slotInfoCustomer}>
                    <h4>Thông tin khách hàng</h4>
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
                                    <p>Khách hàng: {customerData?.customer?.name}</p>
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
                                    <p>Thông tin phương tiện:</p>
                                    {customerData?.vehicles?.length > 0 ? (
                                        customerData.vehicles.map((vehicle) => (
                                            <div key={vehicle._id}>
                                                <p>
                                                    <strong>Loại xe:</strong>
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
                                                <button
                                                    className={
                                                        selectedVehicle && selectedVehicle._id === vehicle._id
                                                            ? styles.selectedButton
                                                            : ''
                                                    }
                                                    onClick={() => handleSelectVehicle(vehicle)}
                                                >
                                                    {selectedVehicle && selectedVehicle._id === vehicle._id
                                                        ? 'Đã chọn xe'
                                                        : 'Chọn xe này'}
                                                </button>
                                                <hr />
                                            </div>
                                        ))
                                    ) : (
                                        <p>Không có thông tin phương tiện.</p>
                                    )}
                                </div>
                            </Collapse>
                        </div>
                    )}

                    {selectedCustomer && selectedVehicle && (
                        <div className={styles.selectedCustomerInfo}>
                            <div>
                                <h4>Thông tin khách hàng</h4>
                                <p>
                                    <strong>Tên khách hàng:</strong> {selectedCustomer.name}
                                </p>
                                <p>
                                    <strong>Số điện thoại:</strong> {selectedCustomer.phone_number}
                                </p>
                            </div>

                            <div>
                                <h4>Xe đã chọn:</h4>
                                <p>
                                    <strong>Biển số:</strong> {selectedVehicle.license_plate}
                                </p>
                                <p>
                                    <strong>Hãng xe:</strong> {selectedVehicle.manufacturer}
                                </p>
                                <p>
                                    <strong>Model:</strong> {selectedVehicle.model}
                                </p>
                                <p>
                                    <strong>Năm sản xuất:</strong> {selectedVehicle.year}
                                </p>
                                <p>
                                    <strong>Màu sắc:</strong> {selectedVehicle.color}
                                </p>
                                <p>
                                    <strong>Loại xe:</strong> {selectedVehicle.vehicle_type_id.vehicle_type_name}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.filterSection}>
                    <h4>Lọc giá dịch vụ</h4>
                    <Form>
                        {/* Select cho danh sách dịch vụ */}
                        <Form.Group className="mb-3">
                            <Form.Select
                                size="lg"
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
                            <Form.Select
                                size="lg"
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

                        <Button className="mt-3" size="lg" variant="primary" onClick={handleFilterPrices}>
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
                        <Table striped bordered hover className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th className={styles.dataTableHead}>Tên dịch vụ</th>
                                    <th className={styles.dataTableHead}>Loại xe</th>
                                    <th className={styles.dataTableHead}>Giá</th>
                                    <th className={styles.dataTableHead}>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPrices.length > 0 ? (
                                    filteredPrices.map((item, index) => (
                                        <tr key={index}>
                                            <td className={styles.dataTableItem}>{item.service}</td>
                                            <td className={styles.dataTableItem}>{item.vehicle_type}</td>
                                            <td className={styles.dataTableItem}>{item.price}</td>
                                            <td className={styles.dataTableItem}>
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
                                    <></>
                                )}
                            </tbody>
                        </Table>
                    )}
                </div>
                <div>
                    <h4>Giá dịch vụ đã chọn</h4>
                    <Table striped bordered hover className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th className={styles.dataTableHead}>Tên dịch vụ</th>
                                <th className={styles.dataTableHead}>Loại xe</th>
                                <th className={styles.dataTableHead}>Giá</th>
                                <th className={styles.dataTableHead}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedPriceServices.length > 0 ? (
                                selectedPriceServices.map((service, index) => (
                                    <tr key={index}>
                                        <td className={styles.dataTableItem}>{service.service}</td>
                                        <td className={styles.dataTableItem}>{service.vehicle_type}</td>
                                        <td className={styles.dataTableItem}>{service.price}</td>
                                        <td className={styles.dataTableItem}>
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
                                <></>
                            )}
                        </tbody>
                    </Table>
                </div>

                <Button size="lg" onClick={handleCreateAppointment}>
                    Tạo cuộc hẹn
                </Button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Slot;
