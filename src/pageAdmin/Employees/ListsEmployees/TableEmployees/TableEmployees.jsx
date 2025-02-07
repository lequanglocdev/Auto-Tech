import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import styles from './TableEmployees.module.css';
import icons from '@/utils/icon';
import EditEmployeeModal from '../EditEmployeeModal/EditEmployeeModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { deleteEmployeeApi, putEmployeeApi } from '@/utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TableEmployees = ({ data = [], itemsPerPage }) => {
    const { FaPen, FaTrash } = icons;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const [employees, setEmployees] = useState(data);
    const currentData = employees.slice(startIndex, startIndex + itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteUser = (user) => {
        setEmployeeToDelete(user);
        setConfirmDeleteModalShow(true);
    };

    const handleConfirmDelete = async () => {
        if (employeeToDelete) {
            try {
                await deleteEmployeeApi(employeeToDelete);
                toast.success('Xóa thành công');
                setEmployees((prev) => prev.filter((emp) => emp._id !== employeeToDelete._id));
            } catch (error) {
                console.error('Lỗi khi xóa nhân viên:', error);
            } finally {
                setConfirmDeleteModalShow(false);
                setEmployeeToDelete(null);
            }
        }
    };

    const handleShowUserDetail = async (user) => {
        navigate(`/employess/${user._id}`);
    };

    const handleEditUser = (user) => {
        setSelectedEmployee(user);
        setEditModalShow(true);
    };

    const handleUpdateEmployee = async (updatedEmployee) => {
        try {
           await putEmployeeApi(updatedEmployee);
            toast.success('Cập nhật thành công');
            setEditModalShow(false);
            setEmployees((prevEmployees) =>
                prevEmployees.map((emp) => (emp._id === updatedEmployee._id ? updatedEmployee : emp)),
            );
        } catch (error) {
            console.error('Lỗi khi cập nhật nhân viên:', error);
        }
    };

    return (
        <div className={styles.dataTableWrapper}>
            <Table striped bordered hover className={styles.dataTable}>
                <thead>
                    <tr className="">
                        <th className={styles.dataTableHead}>Họ tên</th>
                        <th className={styles.dataTableHead}>Email</th>
                        <th className={styles.dataTableHead}>Số điện thoại</th>
                        <th className={styles.dataTableHead}>Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr key={item?._id} onClick={() => handleShowUserDetail(item)}>
                            <td className={styles.dataTableItem}>{item?.name}</td>
                            <td className={styles.dataTableItem}>{item?.email}</td>
                            <td className={styles.dataTableItem}>{item?.phone_number}</td>
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
            {employees.length > 5 && (
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
            <EditEmployeeModal
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                user={selectedEmployee}
                onUpdate={handleUpdateEmployee}
            />
            <ConfirmDeleteModal
                show={confirmDeleteModalShow}
                onHide={() => setConfirmDeleteModalShow(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default TableEmployees;
