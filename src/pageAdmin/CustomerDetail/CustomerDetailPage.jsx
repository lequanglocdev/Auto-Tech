import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteVehicleForCustomer, getDetailUser, getRankApi, putCustomerRankApi, putVehicleForCustomer } from '@/utils/api';
import styles from './CustomerDetail.module.css';
import { Spinner, Form, Modal, Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AddVehicleModal from './AddVehicleModal/AddVehicleModal';
import icons from '@/utils/icon';
import EditVehicleModal from './EditVehicleModal/EditVehicleModal';
import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal';
const CustomerDetailPage = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rank, setRank] = useState('');
    const [rankOptions, setRankOptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
    const [selectedRank, setSelectedRank] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const { FaPlus, FaPen, FaTrash} = icons;

    const rankStyles = {
        Đồng: { backgroundColor: '#d35400', textColor: '#ecf0f1' },
        Bạc: { backgroundColor: '#bdc3c7', textColor: '#2c3e50' },
        Vàng: { backgroundColor: '#f1c40f', textColor: '#2c3e50' },
    };
    const currentRankName = rankOptions.find((option) => option.value === rank)?.label || 'Đồng';

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await getDetailUser({ _id: id });
                if (response.customer) {
                    setCustomer(response.customer);
                    setVehicles(response.vehicles || []);
                    const storedRank = localStorage.getItem(`customerRank_${id}`);
                    const initialRank = storedRank || response.customer.rank || 'Đồng';
                    setRank(initialRank);
                } else {
                    setError('Không tìm thấy dữ liệu khách hàng.');
                }
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setError('Lỗi khi lấy chi tiết khách hàng.');
            } finally {
                setLoading(false);
            }
        };

        const fetchRankOptions = async () => {
            try {
                const response = await getRankApi();
                const formattedRanks = response.map((rank) => ({
                    value: rank._id,
                    label: rank.rank_name,
                }));
                setRankOptions(formattedRanks);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error('Token đã hết hạn, vui lòng đăng nhập lại.');
                } else {
                    toast.error('Đã xảy ra lỗi khi lấy dữ liệu rank.');
                }
            }
        };

        fetchCustomer();
        fetchRankOptions();
    }, [id]);

    const handleRankChange = (event) => {
        const newRank = event.target.value;
        setSelectedRank(newRank);
        setShowModal(true);
    };

    const handleModalConfirm = async () => {
        setShowModal(false);
        console.log('Selected Rank:', selectedRank);
        console.log('Customer ID:', customer._id);

        try {
            await putCustomerRankApi({ _id: selectedRank, rank: selectedRank });
            setRank(selectedRank);
            localStorage.setItem(`customerRank_${id}`, selectedRank);
            toast.success('Cập nhật rank thành công!');
            const response = await getDetailUser({ _id: id });
            setCustomer(response.customer);
        } catch (error) {
            console.error('Error updating customer rank:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật rank.');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleAddVehicleClick = () => {
        setShowAddVehicleModal(true);
    };

    const handleAddVehicleModalClose = () => {
        setShowAddVehicleModal(false);
    };

    const handleAddVehicleSave = (newVehicle) => {
        setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
        setShowAddVehicleModal(false);
        toast.success('Thêm xe thành công!');
    };

    const handleEditVehicle = (vehicle) => {
        setSelectedUser(vehicle);
        setEditModalShow(true);
    };

    const handleUpdateCustomer = async (updatedVehicle) => {
        try {
            const response = await putVehicleForCustomer(id, updatedVehicle._id, updatedVehicle);  // id là customerId, updatedVehicle._id là vehicleId
            
            if (response) {
                // Cập nhật lại danh sách xe của khách hàng nếu cập nhật thành công
                setVehicles((prevVehicles) =>
                    prevVehicles.map((vehicle) =>
                        vehicle._id === updatedVehicle._id ? { ...vehicle, ...updatedVehicle } : vehicle
                    )
                );
    
                setEditModalShow(false);
                toast.success('Cập nhật xe thành công!');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật xe cho khách hàng:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật xe.');
        }
    };

    const handleDeleteUser = (user) => {
        setCustomerToDelete(user);
        setConfirmDeleteModalShow(true);
    };

    const handleConfirmDelete = async () => {
        if (customerToDelete) {
            try {
                // Xóa xe với id của khách hàng và id của xe
                await deleteVehicleForCustomer(id, customerToDelete._id);
                
                // Cập nhật lại danh sách xe sau khi xóa thành công
                setVehicles((prevVehicles) =>
                    prevVehicles.filter((vehicle) => vehicle._id !== customerToDelete._id)
                );
                toast.success('Xóa xe thành công!');
            } catch (error) {
                console.error('Lỗi khi xóa xe:', error);
                toast.error('Đã xảy ra lỗi khi xóa xe.');
            } finally {
                setConfirmDeleteModalShow(false);
                setCustomerToDelete(null);
            }
        }
    };
    

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return <div className="text-danger text-center mt-5">{error}</div>;
    }

    if (!customer) {
        return <div className="text-center mt-5">No customer data available.</div>;
    }

    return (
        <div className={`${styles.customerDetailWrapper} container mt-4`}>
            <div
                className={styles.customerDetaiProfile}
                style={{
                    backgroundColor: rankStyles[currentRankName]?.backgroundColor || '#FFFFFF', // Mặc định màu trắng nếu không có trong danh sách
                    color: rankStyles[currentRankName]?.textColor || '#000000', // Mặc định màu đen nếu không có trong danh sách
                }}
            >
                <h2 className={`mb-3 ${styles.customerDetailTextHeading}`}>Thông tin chi tiết khách hàng</h2>
                <p className={styles.customerDetailTextDes}>
                    <strong>Tên:</strong> {customer.name}
                </p>
                <p className={styles.customerDetailTextDes}>
                    <strong>Email:</strong> {customer.email}
                </p>
                <p className={styles.customerDetailTextDes}>
                    <strong>Số điện thoại:</strong> {customer.phone_number}
                </p>
                <p className={styles.customerDetailTextDes}>
                    <strong>Địa chỉ:</strong> {customer.address}
                </p>
                <div className={styles.customerDetailRank}>
                    <p className={styles.customerDetailTextDes}>
                        <strong>Hạng khách hàng:</strong> {currentRankName}
                    </p>
                    <Form.Select
                        aria-label="Chọn hạng khách hàng"
                        value={rank}
                        onChange={handleRankChange}
                        className={`mb-3 ${styles.CustomerDetailSelect}`}
                    >
                        {rankOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                </div>
            </div>
            <div className={styles.vehicleList}>
                <div className={styles.vehicleItem}>
                    <h3>Danh sách xe của khách hàng</h3>
                    <button className={styles.noVehicleBtn} onClick={handleAddVehicleClick}>
                        <FaPlus fontSize={20} />
                    </button>
                </div>
                {vehicles.length > 0 ? (
                    <div className={styles.vehicleTableWrapper}>
                        <Table striped bordered hover responsive className={styles.vehicleTable}>
                            <thead>
                                <tr>
                                    <th>Biển số xe</th>
                                    {/* <th>Loại xe</th> */}
                                    <th>Hãng</th>
                                    <th>Model</th>
                                    <th>Năm</th>
                                    <th>Màu sắc</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.map((vehicle, index) => (
                                    <tr key={vehicle._id}>
                                        <td>{vehicle.license_plate}</td>
                                        {/* <td>{vehicle?.vehicle_type_id}</td> */}
                                        <td>{vehicle.manufacturer}</td>
                                        <td>{vehicle.model}</td>
                                        <td>{vehicle.year}</td>
                                        <td>{vehicle.color}</td>
                                        <td className={styles.dataTableItemAction}>
                                            <div
                                                className={styles.dataTableIconPen}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditVehicle(vehicle);
                                                }}
                                            >
                                                <FaPen />
                                            </div>
                                            <div
                                                className={styles.dataTableIconTrash}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteUser(vehicle);
                                                }}
                                            >
                                                <FaTrash />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <div className={styles.noVehicleContainer}>
                        <p className={styles.noVehicleMessage}>Khách hàng hiện chưa có thông tin xe nào.</p>
                    </div>
                )}
            </div>

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton className={styles.modalHeaderCustom}>
                    <Modal.Title className={styles.modalTitle}>Xác nhận thay đổi rank</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBodyCustom}>
                    Bạn có chắc chắn muốn thay đổi hạng khách hàng này?
                </Modal.Body>
                <Modal.Footer className={styles.modalFooterCustom}>
                    <Button variant="secondary" onClick={handleModalClose} className={styles.buttonCustom}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleModalConfirm} className={styles.buttonCustom}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
            <AddVehicleModal
                show={showAddVehicleModal}
                onClose={handleAddVehicleModalClose}
                onSave={handleAddVehicleSave}
                customerId={customer._id}
            />
              <EditVehicleModal
                show={editModalShow}
                vehicle={selectedUser}
                onHide={() => setEditModalShow(false)}
                onUpdate={handleUpdateCustomer}
            />
             <ConfirmDeleteModal
                show={confirmDeleteModalShow}
                onHide={() => setConfirmDeleteModalShow(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default CustomerDetailPage;
