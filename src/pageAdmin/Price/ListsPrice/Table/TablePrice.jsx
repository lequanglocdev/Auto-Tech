import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import icons from '@/utils/icon';
import styles from './TablePrice.module.css';
import { deletePriceApi, putActivePriceApi, putPriceApi } from '@/utils/api';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import EditPriceModal from '../EditPriceModal/EditPriceModal';
const TablePrice = ({ data = [], itemsPerPage }) => {
    const { FaTrash, FaPen } = icons;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    const [selectedPrice, setSelectedPrice] = useState(null);
    const [priceToDelete, setPriceToDelete] = useState(null);

    const [price, setPrice] = useState(data);
    const currentData = price.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteUser = (user) => {
        setPriceToDelete(user);
        setConfirmDeleteModalShow(true);
    };

    const handleEditUser = (user) => {
        setSelectedPrice(user);
        setEditModalShow(true);
    };
    const handleUpdatePrice = async (updatedPrice) => {
        try {
            const response = await putPriceApi(updatedPrice);
            if (response) {
                setPrice((prev) =>
                    prev.map((cust) => (cust._id === updatedPrice._id ? { ...cust, ...updatedPrice } : cust)),
                );
                setEditModalShow(false);
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data || 'Đã xảy ra lỗi khi cập nhật';
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
                toast.error('Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };
    const handleConfirmDelete = async () => {
        if (priceToDelete) {
            try {
                await deletePriceApi(priceToDelete);
                setPrice((prev) => prev.filter((emp) => emp._id !== priceToDelete._id));
            } catch (error) {
                console.log(error);
            } finally {
                setConfirmDeleteModalShow(false);
                setPriceToDelete(null);
            }
        }
    };

    const handleShowUserDetail = (price) => {
        navigate(`/price-detail/${price._id}`, { state: { priceListName: price.price_list_name } });
    };

    const handleToggleActive = async (item) => {
        try {
            const updatedItem = { ...item, is_active: !item.is_active };
            
            // Log giá trị của item và updatedItem
            console.log('Item hiện tại:', item);
            console.log('Item sau khi cập nhật is_active:', updatedItem);
    
            const response = await putActivePriceApi(item._id, updatedItem.is_active);
            
            // Log phản hồi từ API
            console.log('Phản hồi từ API:', response);
            
            if (response) {
                setPrice((prev) => prev.map((p) => (p._id === item._id ? { ...p, is_active: updatedItem.is_active } : p)));
                alert('Cập nhật trạng thái thành công!');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            alert('Đã xảy ra lỗi khi cập nhật trạng thái. Vui lòng thử lại sau.');
        }
    };
    
    
    return (
        <div className={styles.dataTableWrapper}>
            <Table striped bordered hover className={styles.dataTable}>
                <thead>
                    <tr className="">
                        <th className={styles.dataTableHead}>Tên bảng giá </th>
                        <th className={styles.dataTableHead}>Ngày bắt đầu</th>
                        <th className={styles.dataTableHead}>Ngày kết thúc</th>
                        <th className={styles.dataTableHead}>Trạng thái</th>
                        <th className={styles.dataTableHead}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr key={item._id} className={styles.dataTableRow} onClick={() => handleShowUserDetail(item)}>
                            <td className={styles.dataTableItem}>{item.price_list_name}</td>
                            <td className={styles.dataTableItem}>
                                {new Date(item.start_date).toLocaleString('vi-VN', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                            </td>
                            <td className={styles.dataTableItem}>
                                {new Date(item.end_date).toLocaleString('vi-VN', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                            </td>
                            <td className={styles.dataTableItem}>
                                <label className={styles.switch} onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        checked={item.is_active || false} // Đảm bảo luôn có giá trị hợp lệ
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            handleToggleActive(item); // Truyền item đã được kiểm tra
                                        }}
                                    />
                                    <span className={`${styles.slider} ${styles.round}`}></span>
                                </label>
                            </td>
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

            {price.length > 5 && (
                <Pagination className={styles.pagination} size="lg">
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPages).keys()].map((pageNumber) => (
                        <Pagination.Item
                            key={pageNumber + 1}
                            active={pageNumber + 1 === currentPage}
                            onClick={() => handlePageChange(pageNumber + 1)}
                        >
                            {pageNumber + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            )}
            <EditPriceModal
                show={editModalShow}
                price={selectedPrice}
                onHide={() => setEditModalShow(false)}
                onUpdate={handleUpdatePrice}
            />

            <ConfirmDeleteModal
                show={confirmDeleteModalShow}
                onHide={() => setConfirmDeleteModalShow(false)}
                onConfirm={handleConfirmDelete}
            />
            <ToastContainer />
        </div>
    );
};

export default TablePrice;
