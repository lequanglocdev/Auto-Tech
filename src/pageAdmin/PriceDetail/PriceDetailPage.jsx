import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { deletePriceDetailApi, getCarApi, getDetailPrice, getServicesApi, putPriceDetailApi } from '@/utils/api';
import AddPriceDetailModal from './AddPriceDetailModal/AddPriceDetailModal';
import styles from './PriceDetailPage.module.css';
import { Table, Spinner } from 'react-bootstrap'; // Import Spinner
import icons from '@/utils/icon';

import EditPriceModal from './EditPriceModal/EditPriceModal';
import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal';
import { toast } from 'react-toastify';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';

const PriceDetailPage = ({ data = [], itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const navigate = useNavigate();
    const { priceId } = useParams();
    const location = useLocation();
    const { priceListName } = location.state || {};
    const [priceDetail, setPriceDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [services, setServices] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [priceToDelete, setPriceToDelete] = useState(null);
    const [price, setPrice] = useState(data);

    const { MdArrowBackIos, FaPlusCircle, FaTrash, FaPen } = icons;

    // Fetch price details on component mount
    useEffect(() => {
        const fetchPriceDetail = async () => {
            try {
                const response = await getDetailPrice({ _id: priceId });
                setPriceDetail(response);
            } catch (error) {
                console.error('Error fetching price detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPriceDetail();
    }, [priceId]);

    // Fetch services and vehicles when the component mounts
    useEffect(() => {
        const fetchServicesAndVehicles = async () => {
            try {
                const servicesResponse = await getServicesApi();
                const vehiclesResponse = await getCarApi();
                setServices(servicesResponse);
                setVehicles(vehiclesResponse);
            } catch (error) {
                console.error('Error fetching services or vehicles:', error);
            }
        };

        fetchServicesAndVehicles();
    }, []);

    const handleAddInfo = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleListPrice = () => {
        navigate('/prices');
    };

    const handleAddPriceDetail = (newPriceDetail) => {
        const { priceLine } = newPriceDetail;
        const service = services.find((item) => item._id === priceLine.service_id);
        const vehicle = vehicles.find((item) => item._id === priceLine.vehicle_type_id);

        const updatedPriceDetail = {
            ...priceLine,
            service_id: { _id: priceLine.service_id, name: service ? service.name : 'Không tìm thấy tên dịch vụ' },
            vehicle_type_id: {
                _id: priceLine.vehicle_type_id,
                vehicle_type_name: vehicle ? vehicle.vehicle_type_name : 'Không tìm thấy tên loại xe',
            },
        };

        setPriceDetail((prevDetails) => [...prevDetails, updatedPriceDetail]);
    };

    const handleEditUser = (user) => {
        setSelectedPrice(user);
        setEditModalShow(true);
    };

    const handleDeleteUser = (user) => {
        setPriceToDelete(user);
        setConfirmDeleteModalShow(true);
    };


    const handleUpdatePrice = (updatedPrice) => {
        setPriceDetail((prevDetails) =>
            prevDetails.map((item) =>
                item._id === updatedPrice._id ? { ...item, ...updatedPrice } : item
            )
        );
        setEditModalShow(false);
    };
    

    const handleConfirmDelete = async () => {
        if (priceToDelete) {
            try {
                // Xóa giá từ API
                await deletePriceDetailApi(priceToDelete);
    
                // Cập nhật lại priceDetail để không hiển thị giá đã bị xóa
                setPriceDetail((prev) => 
                    prev.filter((item) => item._id !== priceToDelete._id)
                );
                toast.success('Xóa bảng giá thành công!'); // Thông báo thành công
            } catch (error) {
                console.error('Error deleting price detail:', error);
                toast.error('Đã xảy ra lỗi khi xóa bảng giá.');
            } finally {
                setConfirmDeleteModalShow(false);
                setPriceToDelete(null);
            }
        }
    };
    
    // Loading spinner
    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', // Optional: to center vertically
                }}
            >
                <Spinner animation="border" variant="primary" size="lg" role="status" aria-hidden="true" />
            </div>
        );
    }

    return (
        <div>
            <div className={styles.priceDetailHead}>
                <MdArrowBackIos onClick={handleListPrice} className={styles.priceDetailHeadIcon} />
                {priceListName && <h4>{priceListName} tại cửa hàng L&K TECH</h4>}
            </div>
            <div className={styles.priceDetailBtn}>
                <CommonButton onClick={handleAddInfo} icon={FaPlusCircle} label="Thêm" />
            </div>

            {priceDetail.length === 0 ? (
                <div
                    style={{
                        border: '2px solid red',
                        padding: '20px',
                        textAlign: 'center',
                        backgroundColor: '#ffe6e6',
                        borderRadius: '8px',
                        margin: '20px 0',
                        color: '#cc0000',
                    }}
                >
                    <h2>Thông Báo</h2>
                    <p>Thông tin chi tiết bảng giá này chưa có sẵn hoặc không tồn tại.</p>
                </div>
            ) : (
                <div className={styles.dataTableWrapper}>
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
                            {priceDetail.map((item) => (
                                <tr key={item._id} className={styles.dataTableRow}>
                                    <td className={styles.dataTableItem}>{item.service_id?.name}</td>
                                    <td className={styles.dataTableItem}>{item.vehicle_type_id?.vehicle_type_name}</td>
                                    <td className={styles.dataTableItem}>{item?.price}</td>
                                    <td className={styles.dataTableItemAction}>
                                        <div
                                            className={styles.dataTableIconPen}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditUser(item);
                                            }}
                                        >
                                            <FaPen />
                                        </div>
                                        <div
                                            className={styles.dataTableIconTrash}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteUser(item);
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
            )}

            <AddPriceDetailModal
                show={showModal}
                handleClose={handleCloseModal}
                priceId={priceId}
                onUpdatePriceDetail={handleAddPriceDetail}
                services={services}
                vehicles={vehicles}
            />

            <EditPriceModal
                show={editModalShow}
                priceId={selectedPrice}
                onHide={() => setEditModalShow(false)}
                onUpdate={handleUpdatePrice}
            />

            <ConfirmDeleteModal
                show={confirmDeleteModalShow}
                onHide={() => setConfirmDeleteModalShow(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default PriceDetailPage;
