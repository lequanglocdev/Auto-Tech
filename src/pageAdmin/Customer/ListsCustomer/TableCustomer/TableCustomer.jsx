import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import icons from '@/utils/icon';
import styles from './TableCustomer.module.css';
import { deleteUserApi, getDetailUser, putCustomerApi } from '@/utils/api';
import ModalCustomer from '../Modal/ModalCustomer';
import EditCustomerModal from '../EditCustomerModal/EditCustomerModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { useNavigate } from 'react-router-dom';
const TableCustomer = ({ data = [], itemsPerPage }) => {
    const { FaEye, FaPen, FaTrash } = icons;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const [modalShow, setModalShow] = React.useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [customerToDelete, setCustomerToDelete] = useState(null);

    const [customer, setCustomer] = useState(data);
    const currentData = customer.slice(startIndex, startIndex + itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteUser = (user) => {
        setCustomerToDelete(user);
        setConfirmDeleteModalShow(true);
    };

    const handleConfirmDelete = async () => {
        if (customerToDelete) {
            try {
                await deleteUserApi(customerToDelete);
                console.log('Xóa thành công:', customerToDelete);
                setCustomer((prev) => prev.filter((emp) => emp._id !== customerToDelete._id));
            } catch (error) {
                console.error('Lỗi khi xóa nhân viên:', error);
            } finally {
                setConfirmDeleteModalShow(false);
                setCustomerToDelete(null);
            }
        }
    };

    // const handleShowUserDetail = async (user) => {
    //     try {
    //         const response = await getDetailUser(user);
    //         setSelectedUser(response);
    //         console.log('>> check detail response user', response);
    //         setModalShow(true);
    //     } catch (error) {
    //         console.error('Error fetching user details:', error);
    //     }
    // };

    const handleShowUserDetail = (user) => {
        navigate(`/user/${user._id}`);
    };
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setEditModalShow(true);
    };
    const handleUpdateCustomer = async (updatedCustomer) => {
        try {
            const response = await putCustomerApi(updatedCustomer);
            if (response) {
                console.log('Cập nhật thành công:', response);

                // Cập nhật danh sách customer với thông tin mới
                setCustomer((prev) =>
                    prev.map((cust) => (cust._id === updatedCustomer._id ? { ...cust, ...updatedCustomer } : cust)),
                );

                setEditModalShow(false);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật khách hàng:', error);
        }
    };

    const handleUpdateUser = (newVehicle) => {
        setSelectedUser((prev) => ({
            ...prev,
            vehicles: [...prev.vehicles, newVehicle], // Thêm phương tiện mới vào danh sách
        }));
    };
    return (
        <div className={styles.dataTableWrapper}>
            <Table striped bordered hover className={styles.dataTable}>
                <thead>
                    <tr className="">
                        <th className={styles.dataTableHead}>#</th>
                        <th className={styles.dataTableHead}>Name</th>
                        <th className={styles.dataTableHead}>Email</th>
                        <th className={styles.dataTableHead}>Phone</th>
                        <th className={styles.dataTableHead}>Đia chỉ</th>
                        <th className={styles.dataTableHead}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr key={item._id}>
                            <td>{startIndex + index + 1}</td>
                            <td className={styles.dataTableItem}>{item.name}</td>
                            <td className={styles.dataTableItem}>{item.email}</td>
                            <td className={styles.dataTableItem}>{item.phone_number}</td>
                            <td className={styles.dataTableItem}>{item.address}</td>
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

            {customer.length > 0 && (
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
                user={selectedUser}
                onUpdateUser={handleUpdateUser}
            />

            <EditCustomerModal
                show={editModalShow}
                user={selectedUser}
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

export default TableCustomer;
