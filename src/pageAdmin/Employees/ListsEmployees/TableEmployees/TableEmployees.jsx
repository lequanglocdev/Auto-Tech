import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import styles from './TableEmployees.module.css';
import icons from '@/utils/icon';
import ModalEmployees from '../Modal/ModalEmployees';
import EditEmployeeModal from '../EditEmployeeModal/EditEmployeeModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { deleteEmployeeApi, getDetailEmployee, putEmployeeApi } from '@/utils/api';

const TableEmployees = ({ data = [], itemsPerPage }) => {
    const { FaEye, FaPen, FaTrash } = icons;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const [modalShow, setModalShow] = React.useState(false);
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
                console.log('Xóa thành công:', employeeToDelete);
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
        try {
            const response = await getDetailEmployee(user);
            setSelectedEmployee(response);
            console.log('>> check detail response employee', response);
            setModalShow(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleEditUser = (user) => {
        setSelectedEmployee(user);
        setEditModalShow(true);
    };

    const handleUpdateEmployee = async (updatedEmployee) => {
        try {
            const response = await putEmployeeApi(updatedEmployee);
            console.log('Cập nhật thành công:', response);
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
                        <th className={styles.dataTableHead}>Name</th>
                        <th className={styles.dataTableHead}>Email</th>
                        <th className={styles.dataTableHead}>Phone</th>
                        <th className={styles.dataTableHead}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr key={item._id}>
                            <td className={styles.dataTableItem}>{item.name}</td>
                            <td className={styles.dataTableItem}>{item.email}</td>
                            <td className={styles.dataTableItem}>{item.phone_number}</td>
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

            <ModalEmployees show={modalShow} onHide={() => setModalShow(false)} user={selectedEmployee} />
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
