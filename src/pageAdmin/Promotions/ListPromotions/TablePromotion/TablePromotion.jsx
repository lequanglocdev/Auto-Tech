import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import icons from '@/utils/icon';
import styles from './TablePromotion.module.css';
import { deleteUserApi, putCustomerApi } from '@/utils/api';
import ModalCustomer from '../Modal/ModalCustomer';
import EditCustomerModal from '../EditPromotionModal/EditPromotionModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { useNavigate } from 'react-router-dom';
const TablePromotion = ({ data = [], itemsPerPage }) => {
    const {FaPen, FaTrash } = icons;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const [modalShow, setModalShow] = React.useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [promotionToDelete, setPromotionToDelete] = useState(null);

    const [promotion, setPromotion] = useState(data);
    const currentData = promotion.slice(startIndex, startIndex + itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteUser = (user) => {
        setPromotionToDelete(user);
        setConfirmDeleteModalShow(true);
    };

    const handleConfirmDelete = async () => {
        if (promotionToDelete) {
            try {
                await deleteUserApi(promotionToDelete);
                console.log('Xóa thành công:', promotionToDelete);
                setPromotion((prev) => prev.filter((emp) => emp._id !== promotionToDelete._id));
            } catch (error) {
                console.error('Lỗi khi xóa nhân viên:', error);
            } finally {
                setConfirmDeleteModalShow(false);
                setPromotionToDelete(null);
            }
        }
    };

    const handleShowUserDetail = (user) => {
        navigate(`/customer/${user._id}`);
    };
    const handleEditUser = (user) => {
        setSelectedPromotion(user);
        setEditModalShow(true);
    };
    const handleUpdateCustomer = async (updatedCustomer) => {
        try {
            const response = await putCustomerApi(updatedCustomer);
            if (response) {
                setPromotion((prev) =>
                    prev.map((cust) => (cust._id === updatedCustomer._id ? { ...cust, ...updatedCustomer } : cust)),
                );

                setEditModalShow(false);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật khách hàng:', error);
        }
    };

    const handleUpdateUser = (newVehicle) => {
        setSelectedPromotion((prev) => ({
            ...prev,
            vehicles: [...prev.vehicles, newVehicle], // Thêm phương tiện mới vào danh sách
        }));
    };
    return (
        <div className={styles.dataTableWrapper}>
            <Table striped bordered hover className={styles.dataTable}>
                <thead>
                    <tr className="">
                        <th className={styles.dataTableHead}>promotion_code</th>
                        <th className={styles.dataTableHead}>name</th>
                        <th className={styles.dataTableHead}>description</th>
                        <th className={styles.dataTableHead}>Hành động</th>
                    </tr>
                </thead>
                <tbody >
                    {currentData.map((item) => (
                        <tr key={item._id} className={styles.dataTableRow} onClick={() => handleShowUserDetail(item)}>
                            <td className={styles.dataTableItem}>{item.promotion_code}</td>
                            <td className={styles.dataTableItem}>{item.name}</td>
                            <td className={styles.dataTableItem}>{item.description}</td>
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

            {promotion.length > 5 && (
                <Pagination size="lg" className={styles.pagination}>
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

            <ModalCustomer
                show={modalShow}
                onHide={() => setModalShow(false)}
                user={selectedPromotion}
                onUpdateUser={handleUpdateUser}
            />

            <EditCustomerModal
                show={editModalShow}
                user={selectedPromotion}
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

export default TablePromotion;
