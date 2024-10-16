import React, { useEffect, useState } from 'react';
import styles from './Slot.module.css';
import { findCustomerApi, getServicesApi, createAppointments } from '@/utils/api'; // Import createAppointments
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
    const [serviceData, setServiceData] = useState([]);
    const { slotId } = useParams();
   
    const [appointmentDatetime, setAppointmentDatetime] = useState(''); // State cho appointmentDatetime

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);

    const { FaPlusCircle } = icons;

    const fetchDataService = async () => {
        setIsLoading(true);
        try {
            const response = await getServicesApi();
            setServiceData(response);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Token đã hết hạn, vui lòng đăng nhập lại.');
            } else {
                toast.error('Đã xảy ra lỗi khi lấy dữ liệu dịch vụ.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataService();
    }, []);

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
    
        if (selectedServices.length === 0) {
            toast.error('Vui lòng chọn ít nhất một dịch vụ.');
            return;
        }
    
        try {
            const response = await createAppointments(
                slotId,
                selectedCustomer.vehicles[0]._id, // Lấy ID phương tiện đầu tiên
                selectedServices.map(service => service._id), // Lấy tất cả các ID dịch vụ đã chọn
                appointmentDatetime
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

    const handleRemoveService = (serviceId) => {
        setSelectedServices((prev) => prev.filter((service) => service._id !== serviceId));
    };

    const handleSelectService = (service) => {
        if (!selectedServices.includes(service)) {
            setSelectedServices([...selectedServices, service]);
        }
    };

    // Hàm để kiểm tra dịch vụ đã được chọn chưa
    const isServiceSelected = (serviceId) => {
        return selectedServices.some((service) => service._id === serviceId);
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
                <div className={styles.slotInfoServices}>
                    <h5>Lựa chọn dịch vụ sử dụng</h5>
                    <div>
                        <Table striped bordered hover className={styles.dataTable}>
                            <thead>
                                <tr className="">
                                    <th className={styles.dataTableHead}>Loại dịch vụ</th>
                                    <th className={styles.dataTableHead}>Tên dịch vụ</th>
                                    <th className={styles.dataTableHead}>Mô tả</th>
                                    <th className={styles.dataTableHead}>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceData.map((item) => (
                                    <tr key={item._id}>
                                        <td className={styles.dataTableItem}>{item.service_code}</td>
                                        <td className={styles.dataTableItem}>{item.name}</td>
                                        <td className={styles.dataTableItem}>{item.description}</td>
                                        <td className={styles.dataTableItemAction}>
                                            {isServiceSelected(item._id) ? (
                                                <span>Đã chọn</span> // Nếu dịch vụ đã được chọn
                                            ) : (
                                                <div
                                                    className={styles.dataTableIconEye}
                                                    onClick={() => handleSelectService(item)} // Chọn dịch vụ
                                                >
                                                    <FaPlusCircle />
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <h5>Dịch vụ đã chọn</h5>
                    <div>
                        <Table striped bordered hover className={styles.dataTable}>
                            <thead>
                                <tr className="">
                                    <th className={styles.dataTableHead}>Loại dịch vụ</th>
                                    <th className={styles.dataTableHead}>Tên dịch vụ</th>
                                    <th className={styles.dataTableHead}>Mô tả</th>
                                    <th className={styles.dataTableHead}>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedServices.map((service) => (
                                    <tr key={service._id}>
                                        <td className={styles.dataTableItem}>{service.service_code}</td>
                                        <td className={styles.dataTableItem}>{service.name}</td>
                                        <td className={styles.dataTableItem}>{service.description}</td>
                                        <td className={styles.dataTableItemAction}>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleRemoveService(service._id)} // Gọi hàm xóa dịch vụ
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <Button onClick={handleCreateAppointment}>Tạo cuộc hẹn</Button>
            </div>
        </div>
    );
};

export default Slot;
