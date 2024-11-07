import React, { useState, useEffect } from 'react';
import { Accordion, Table } from 'react-bootstrap';
import styles from './Price.module.css';
import icons from '@/utils/icon';
import {
    deletePriceApi,
    deletePriceDetailApi,
    getCarApi,
    getDetailPrice,
    getServicesApi,
    putActivePriceApi,
    putActivePriceDetailApi,
    putPriceApi,
    putPriceDetailApi,
} from '@/utils/api';
import EditPriceModal from '../ListsPrice/EditPriceModal/EditPriceModal';
import { toast } from 'react-toastify';
import ConfirmDeleteModal from '../ListDetailPrice/ConfirmDeleteModal/ConfirmDeleteModal';
import AddPriceDetailModal from '../AddPriceDetailModal/AddPriceDetailModal';
import EditPriceDetailModal from '../EditPriceDetailModal/EditPriceDetailModal';
import ConfirmDeleteDetailPriceModal from '../ConfirmDeletePriceDetailModal/ConfirmDeletePriceDetailModal';
const Price = ({ data = [] }) => {
    const { FaPen, FaTrash, FaEye, FaPlusCircle } = icons;

    const [priceData, setPriceData] = useState(data);
    //toggle
    const [activeStatus, setActiveStatus] = useState(priceData?.map((item) => item?.is_active || false));
    const [activeStatusDetail, setActiveStatusDetail] = useState(priceData?.map((item) => item?.is_active || false));
    const [priceId, setPriceId] = useState(null); // State to hold the selected price ID
    const [priceDetail, setPriceDetail] = useState([]);
    const [loading, setLoading] = useState(false);

    // edit
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [editModalShow, setEditModalShow] = useState(false);

    // delete
    const [priceToDelete, setPriceToDelete] = useState(null);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    // ADD PRICE LINE
    const [selecpriceLine, setSelecpriceLine] = useState(null);
    const [addPriceLineModalShow, setaddPriceLineModalShow] = useState(false);
    const [services, setServices] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const [editPriceLineModalShow, setEditPriceLineModalShow] = useState(false);

    // delete price line
    const [priceDetailToDelete, setPriceDetailToDelete] = useState(null);
    const [confirmDeleteDetailModalShow, setConfirmDeleteDetailModalShow] = useState(false);
    // Fetch price details whenever priceId changes
    useEffect(() => {
        if (!priceId) return;

        const fetchPriceDetail = async () => {
            setLoading(true);
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
    
    const handleEditPriceHeader = (priceLine) => {
        setSelectedPrice(priceLine);
        setEditModalShow(true);
    };
    const handleUpdatePrice = async (updatedPrice) => {
        try {
            const response = await putPriceApi(updatedPrice);
            if (response) {
                setPriceData((prev) =>
                    prev.map((cust) => (cust._id === updatedPrice._id ? { ...cust, ...updatedPrice } : cust)),
                );
                setEditPriceLineModalShow(false);
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.msg || 'Đã xảy ra lỗi khi cập nhật';
                console.error('Lỗi:', errorMessage);

                toast.error(errorMessage, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                console.error('Lỗi không xác định:', error);
                toast.error('Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.');
            }
        }
    };

    // deletePriceHeader
    const handleDeletePrice = (priceDataHeader) => {
        setPriceToDelete(priceDataHeader);
        setConfirmDeleteModalShow(true);
    };

    const handleConfirmDelete = async () => {
        if (priceToDelete) {
            try {
                await deletePriceApi(priceToDelete);
                setPriceData((prev) => prev.filter((emp) => emp?._id !== priceToDelete?._id));
            } catch (error) {
                toast.error(error.response.data.msg);
            } finally {
                setConfirmDeleteModalShow(false);
                setPriceToDelete(null);
            }
        }
    };

    //Edit toggle active
    const handleToggleActive = async (priceDataHeader) => {
        try {
            const updatedItem = { ...priceDataHeader, is_active: !priceDataHeader?.is_active };

            const response = await putActivePriceApi(priceDataHeader?._id, updatedItem?.is_active);

            // Log phản hồi từ API
            // console.log('Phản hồi từ API:', response);

            if (response) {
                setPriceData((prev) =>
                    prev.map((p) => (p._id === priceDataHeader._id ? { ...p, is_active: updatedItem.is_active } : p)),
                );
                toast.success('Cập nhật trạng thái thành công!'); // Sử dụng toast
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật trạng thái. Vui lòng thử lại sau.'); // Sử dụng toast
        }
    };

    const handleToggleActiveDetail = async (item) => {
        console.log('Trạng thái hiện tại của is_active trước khi cập nhật:', item?.is_active);
        try {
            const updatedItemDetail = { ...item, is_active: !item?.is_active };

            const response = await putActivePriceDetailApi(item?._id, updatedItemDetail?.is_active);

            // Log phản hồi từ API
            // console.log('Phản hồi từ API:', response);

            if (response) {
                setPriceData((prev) => {
                    const updatedPriceData = prev.map((p) =>
                        p._id === item._id ? { ...p, is_active: updatedItemDetail.is_active } : p,
                    );
                    // console.log('Danh sách priceData sau khi cập nhật:', updatedPriceData);
                    return updatedPriceData;
                });
                console.log('Trạng thái của is_active sau khi cập nhật:', updatedItemDetail.is_active);
                toast.success('Cập nhật trạng thái thành công!');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật trạng thái. Vui lòng thử lại sau.'); // Sử dụng toast
        }
    };

    // add price line

    const fetchServices = async () => {
        try {
            const response = await getServicesApi();
            setServices(response);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const fetchCars = async () => {
        try {
            const response = await getCarApi();
            setVehicles(response);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchCars();
    }, []);

    useEffect(() => {
        setActiveStatusDetail(priceData?.map((item) => item.is_active || false));
    }, [priceData]);

    const handleAddPriceLine = (priceDataHeader) => {
        setSelecpriceLine(priceDataHeader);
        setaddPriceLineModalShow(true);
    };

    const handleAddPriceDetail = (priceDataHeader) => {
        const { priceLine } = priceDataHeader;

        if (!services.length || !vehicles.length) {
            toast.warn('Dữ liệu dịch vụ hoặc phương tiện chưa sẵn sàng.');
            return; // Không thực hiện gì nếu dữ liệu chưa sẵn sàng
        }
        const service = services.find((item) => item._id === priceLine?.service_id);
        const vehicle = vehicles.find((item) => item._id === priceLine?.vehicle_type_id);

        const updatedPriceDetail = {
            ...priceLine,
            service_id: { _id: priceLine?.service_id, name: service ? service?.name : 'Không tìm thấy tên dịch vụ' },
            vehicle_type_id: {
                _id: priceLine?.vehicle_type_id,
                vehicle_type_name: vehicle ? vehicle?.vehicle_type_name : 'Không tìm thấy tên loại xe',
            },
        };

        setPriceDetail((prevDetails) => [...prevDetails, updatedPriceDetail]);
    };

    // edit price line
    const handleEditPriceDetail = (item) => {
        setSelecpriceLine(item);
        setEditPriceLineModalShow(true);
    };

    const handleUpdatePriceDetail = (updatedPrice) => {
        setPriceDetail((prevDetails) =>
            prevDetails.map((item) => (item._id === updatedPrice._id ? { ...item, ...updatedPrice } : item)),
        );
        setEditModalShow(false);
    };

    const handleDeletePriceDetail = (item) => {
        setPriceDetailToDelete(item);
        setConfirmDeleteDetailModalShow(true);
    };

    const handleConfirmDeletePriceLine = async () => {
        if (priceDetailToDelete) {
            try {
                // Xóa giá từ API
                await deletePriceDetailApi(priceDetailToDelete);

                // Cập nhật lại priceDetail để không hiển thị giá đã bị xóa
                setPriceDetail((prev) => prev.filter((item) => item._id !== priceDetailToDelete._id));
                toast.success('Xóa bảng giá thành công!'); // Thông báo thành công
            } catch (error) {
                console.error('Error deleting price detail:', error);
                toast.error('Đã xảy ra lỗi khi xóa bảng giá.');
            } finally {
                setConfirmDeleteDetailModalShow(false);
                setPriceToDelete(null);
            }
        }
    };

    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Table className={styles.tableHeader}>
                    <thead>
                        <tr>
                            <th className={styles.dataTableHead}>Tên bảng giá </th>
                            <th className={styles.dataTableHead}>Ngày bắt đầu</th>
                            <th className={styles.dataTableHead}>Ngày kết thúc</th>
                            <th className={styles.dataTableHead}>Trạng thái</th>
                            <th className={styles.dataTableHead}>Tác vụ</th>
                        </tr>
                    </thead>
                </Table>
                {priceData?.map((priceDataHeader, index) => (
                    <Accordion.Item
                        key={priceDataHeader._id}
                        eventKey={index.toString()}
                        onClick={() => setPriceId(priceDataHeader._id)} // Set the selected priceId
                    >
                        <Accordion.Header className={styles.appointmentCardText}>
                            <Table className={styles.tableHeader}>
                                <tbody>
                                    <tr>
                                        <td className={styles.dataTablepriceDataHeader}>
                                            {priceDataHeader.price_list_name}
                                        </td>
                                        <td className={styles.dataTablepriceDataHeader}>
                                            {new Date(priceDataHeader.start_date).toLocaleString('vi-VN', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                        </td>
                                        <td className={styles.dataTablepriceDataHeader}>
                                            {new Date(priceDataHeader.end_date).toLocaleString('vi-VN', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                        </td>

                                        <td className={styles.dataTablepriceDataHeader}>
                                            <label className={styles.switch}>
                                                <input
                                                    type="checkbox"
                                                    checked={activeStatus[index]} // Sử dụng state để kiểm soát giá trị
                                                    onChange={() => {
                                                        const newStatus = [...activeStatus];
                                                        newStatus[index] = !newStatus[index]; // Đổi trạng thái
                                                        setActiveStatus(newStatus);
                                                        handleToggleActive(priceDataHeader);
                                                    }}
                                                />
                                                <span className={`${styles.slider} ${styles.round}`}></span>
                                            </label>
                                        </td>

                                        <td className={styles.dataTablepriceDataHeader}>
                                            <div className={styles.dataTableIcon}>
                                                <FaPen
                                                    className={styles.iconActionPen}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditPriceHeader(priceDataHeader);
                                                    }}
                                                />
                                                <FaTrash
                                                    className={styles.iconActionTrash}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeletePrice(priceDataHeader);
                                                    }}
                                                />
                                                <FaPlusCircle
                                                    className={styles.iconActionAdd}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddPriceLine(priceDataHeader);
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className={styles.scrollTable}>
                                <Table className={styles.tableBody}>
                                    <thead>
                                        <tr>
                                            <th className={styles.tableBodyTh}>Tên dịch vụ</th>
                                            <th className={styles.tableBodyTh}>Loại xe</th>

                                            <th className={styles.tableBodyTh}>Giá</th>

                                            <th className={styles.tableBodyTh}>Trạng thái</th>
                                            <th className={styles.tableBodyTh}>Tác vụ</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {priceDetail.map((item, indexDetail) => (
                                            <tr key={item._id}>
                                                <td className={styles.tableBodyTd}>{item.service_id?.name}</td>
                                                <td className={styles.tableBodyTd}>
                                                    {item.vehicle_type_id?.vehicle_type_name}
                                                </td>
                                                <td className={styles.tableBodyTd}>{item?.price}</td>
                                                <td className={styles.tableBodyTd}>
                                                    <label className={styles.switch}>
                                                        <input
                                                            type="checkbox"
                                                            checked={activeStatusDetail[indexDetail] || false} // Sử dụng state để kiểm soát giá trị
                                                            onChange={() => {
                                                                const newStatus = [...activeStatusDetail];
                                                                newStatus[indexDetail] = !newStatus[indexDetail]; // Đổi trạng thái
                                                                setActiveStatusDetail(newStatus);
                                                                handleToggleActiveDetail(item);
                                                            }}
                                                        />
                                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                                    </label>
                                                </td>
                                                <td className={styles.tableBodyIcon}>
                                                    <FaPen
                                                        className={styles.iconActionPen}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditPriceDetail(item);
                                                        }}
                                                    />
                                                    <FaTrash
                                                        className={styles.iconActionTrash}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeletePriceDetail(item);
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

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

            {/* __________________________*/}
            <AddPriceDetailModal
                show={addPriceLineModalShow}
                onHide={() => setaddPriceLineModalShow(false)}
                priceId={selecpriceLine?._id}
                onUpdatePriceDetail={handleAddPriceDetail}
                services={services}
                vehicles={vehicles}
            />
            <EditPriceDetailModal
                show={editPriceLineModalShow}
                priceId={selecpriceLine}
                onHide={() => setEditPriceLineModalShow(false)}
                onUpdate={handleUpdatePriceDetail}
            />
            <ConfirmDeleteDetailPriceModal
                show={confirmDeleteDetailModalShow}
                onHide={() => setConfirmDeleteDetailModalShow(false)}
                onConfirm={handleConfirmDeletePriceLine}
            />
        </div>
    );
};

export default Price;
