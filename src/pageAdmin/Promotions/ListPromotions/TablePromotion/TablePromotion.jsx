import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import icons from '@/utils/icon';
import styles from './TablePromotion.module.css';
import { deleteUserApi, putCustomerApi, putPromotionHeader } from '@/utils/api';
import EditCustomerModal from '../EditPromotionModal/EditPromotionModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { useNavigate } from 'react-router-dom';
const TablePromotion = ({ data = [], itemsPerPage }) => {
    const {FaPen, FaTrash } = icons;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

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

   
    const handleShowUserDetail = (promotion) => {
        navigate(`/promotion/${promotion._id}`);
    };
    const handleEditUser = (user) => {
        setSelectedPromotion(user);
        setEditModalShow(true);
    };
    const handleUpdateHeaderPromotion = async (updatedCustomer) => {
        try {
            const response = await putPromotionHeader(updatedCustomer);
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

    return (
        <div className={styles.dataTableWrapper}>
            <Table striped bordered hover className={styles.dataTable}>
                <thead>
                    <tr className="">
                        <th className={styles.dataTableHead}>Mã chương trình khuyến mãi</th>
                        <th className={styles.dataTableHead}>Tên chương trình khuyến mãi</th>
                        <th className={styles.dataTableHead}>Mô tả</th>
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

            <EditCustomerModal
                show={editModalShow}
                user={selectedPromotion}
                onHide={() => setEditModalShow(false)}
                onUpdate={handleUpdateHeaderPromotion}
            />
          
        </div>
    );
};

export default TablePromotion;
