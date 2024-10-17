import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import icons from '@/utils/icon';
import styles from './TablePrice.module.css';
import { deletePriceApi } from '@/utils/api';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const TablePrice = ({ data = [], itemsPerPage }) => {
    const { FaTrash } = icons;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

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
    return (
        <div className={styles.dataTableWrapper}>
            <Table striped bordered hover className={styles.dataTable}>
                <thead>
                    <tr className="">
                        <th className={styles.dataTableHead}>Tên bảng giá </th>
                        <th className={styles.dataTableHead}>Ngày bắt đầu</th>
                        <th className={styles.dataTableHead}>Ngày kết thúc</th>
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
                            <td className={styles.dataTableItemAction}>
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
