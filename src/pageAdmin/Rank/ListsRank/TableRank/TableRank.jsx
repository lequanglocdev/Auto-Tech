import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import icons from '@/utils/icon';
import styles from './TableRank..module.css';
import { deleteRankApi, deleteUserApi, getDetailRank, putCustomerRankApi } from '@/utils/api';
import ModalRank from '../Modal/ModalRank';
import EditRankModal from '../EditRankModal/EditRankModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
const TableRank = ({ data = [], itemsPerPage }) => {
    const { FaEye, FaPen, FaTrash } = icons;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const [modalShow, setModalShow] = React.useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    const [selectedRank, setSelectedRank] = useState(null);
    const [rankToDelete, setRankToDelete] = useState(null);

    const [rank, setRank] = useState(data);
    const currentData = rank.slice(startIndex, startIndex + itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteUser = (rank) => {
        setRankToDelete(rank);
        setConfirmDeleteModalShow(true);
    };

    const handleConfirmDelete = async () => {
        if (rankToDelete) {
            try {
                await deleteRankApi(rankToDelete);
                console.log('Xóa thành công:', rankToDelete);
                setRank((prev) => prev.filter((emp) => emp._id !== rankToDelete._id));
            } catch (error) {
                console.error('Lỗi khi xóa nhân viên:', error);
            } finally {
                setConfirmDeleteModalShow(false);
                setRankToDelete(null);
            }
        }
    };

    const handleShowUserDetail = async (rank) => {
        try {
            const response = await getDetailRank(rank);
            setSelectedRank(response);
            console.log('>> check detail response user', response);
            setModalShow(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleEditUser = (rank) => {
        setSelectedRank(rank);
        setEditModalShow(true);
    };

    const handleUpdateRank = async (updateRank) => {
        try {
            const response = await putCustomerRankApi(updateRank);
            console.log('Cập nhật thành công:', response);
            setEditModalShow(false);
            setRank((prev) => prev.map((emp) => (emp._id === updateRank._id ? updateRank : emp)));
        } catch (error) {
            console.error('Lỗi khi cập nhật nhân viên:', error);
        }
    };

    return (
        <div className={styles.dataTableWrapper}>
            <Table striped bordered hover className={styles.dataTable}>
                <thead>
                    <tr className="">
                        <th className={styles.dataTableHead}>Thứ hạng</th>
                        <th className={styles.dataTableHead}>Giảm giá</th>
                        <th className={styles.dataTableHead}>Phí tối thiểu</th>
                        <th className={styles.dataTableHead}>Mô tả</th>
                        <th className={styles.dataTableHead}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr key={item._id}>
                            <td className={styles.dataTableItem}>{item.rank_name}</td>
                            <td className={styles.dataTableItem}>{item.discount_rate}</td>
                            <td className={styles.dataTableItem}>{item.min_spending}</td>
                            <td className={styles.dataTableItem}>{item.description}</td>
                            <td className={styles.dataTableItemAction}>
                                <div className={styles.dataTableIconEye} onClick={() => handleShowUserDetail(item)}>
                                    <FaEye />
                                </div>
                                <div className={styles.dataTableIconPen} onClick={() => handleEditUser(item)}>
                                    <FaPen />
                                </div>
                                <div className={styles.dataTableIconTrash} onClick={() => handleDeleteUser(item)}>
                                    <FaTrash />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {rank.length > 0 && (
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

            <ModalRank show={modalShow} onHide={() => setModalShow(false)} rank={selectedRank} />
            <EditRankModal
                show={editModalShow}
                rank={selectedRank}
                onHide={() => setEditModalShow(false)}
                onUpdate={handleUpdateRank}
            />
            <ConfirmDeleteModal
                show={confirmDeleteModalShow}
                onHide={() => setConfirmDeleteModalShow(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default TableRank;
