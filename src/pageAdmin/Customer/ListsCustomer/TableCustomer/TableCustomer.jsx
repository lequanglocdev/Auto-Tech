import React, { useState } from 'react';
import { Table, Pagination, Form, Row, Col, Button } from 'react-bootstrap';
import icons from '@/utils/icon';
import styles from './TableCustomer.module.css';
import { deleteUserApi, findCustomerApi, putCustomerApi } from '@/utils/api';
import EditCustomerModal from '../EditCustomerModal/EditCustomerModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { useNavigate } from 'react-router-dom';
const TableCustomer = ({ data = [], itemsPerPage }) => {
    const { FaPen, FaTrash } = icons;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    
    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    
    const [customer, setCustomer] = useState(data);
    const totalPages = Math.ceil(customer.length / itemsPerPage);
    const currentData = customer.slice(startIndex, startIndex + itemsPerPage);

    const [searchQuery, setSearchQuery] = useState("");
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = async () => {
        try {
            const queryParam = searchQuery.trim();
            const isPhoneNumber = /^[0-9]+$/.test(queryParam);
            const queryString = isPhoneNumber ? `phone_number=${queryParam}` : `email=${queryParam}`;
    
            const response = await findCustomerApi(queryString);
            console.log('Dữ liệu trả về từ API:', response); // Kiểm tra dữ liệu
    
            // Cập nhật state với customer
            if (response.customer) {
                setCustomer([response.customer]); // Chuyển customer thành mảng
                setCurrentPage(1); // Đặt lại trang về 1
            } else {
                console.error('Không tìm thấy thông tin khách hàng');
                setCustomer([]); // Nếu không tìm thấy, đặt customer là mảng rỗng
            }
        } catch (error) {
            console.error('Lỗi khi tìm kiếm khách hàng:', error);
        }
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
                setCustomer((prev) => prev.filter((emp) => emp?._id !== customerToDelete?._id));
                if (currentPage > totalPages) {
                    setCurrentPage(totalPages > 0 ? totalPages : 1); 
                }
            } catch (error) {
                console.error('Lỗi khi xóa nhân viên:', error);
            } finally {
                setConfirmDeleteModalShow(false);
                setCustomerToDelete(null);
            }
        }
    };

    const handleShowUserDetail = (user) => {
        navigate(`/customer/${user?._id}`);
    };
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setEditModalShow(true);
    };
    const handleUpdateCustomer = async (updatedCustomer) => {
        try {
            const response = await putCustomerApi(updatedCustomer);
            if (response) {
                setCustomer((prev) =>
                    prev.map((cust) => (cust?._id === updatedCustomer?._id ? { ...cust, ...updatedCustomer } : cust)),
                );

                setEditModalShow(false);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật khách hàng:', error);
        }
    };

    return (
        <div className={styles.dataTableWrapper}>
            <Form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
                <Form.Control
                    className={styles.searchFormInput}
                    type="text"
                    size='lg'
                    placeholder="Nhập từ khóa tìm kiếm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="primary" onClick={handleSearch} className={styles.btn}>
                    Tìm Kiếm
                </Button>
            </Form>
            <Table bordered className={styles.dataTable}>
                <thead>
                    <tr className="">
                        <th className={styles.dataTableHead}>Họ tên</th>
                        <th className={styles.dataTableHead}>Email</th>
                        <th className={styles.dataTableHead}>Số điện thoại</th>
                        <th className={styles.dataTableHead}>Đia chỉ</th>
                        <th className={styles.dataTableHead}>Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item) => (
                        <tr key={item?._id} className={styles.dataTableRow} onClick={() => handleShowUserDetail(item)}>
                            <td className={styles.dataTableItem}>{item?.name}</td>
                            <td className={styles.dataTableItem}>{item?.email}</td>
                            <td className={styles.dataTableItem}>{item?.phone_number}</td>
                            <td className={styles.dataTableItem}>{item?.address}</td>
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

            {customer.length >= 5 && (
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
