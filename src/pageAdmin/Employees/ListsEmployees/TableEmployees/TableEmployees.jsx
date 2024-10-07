import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import styles from './TableEmployees.module.css';
import icons from '@/utils/icon';
import ModalEmployees from '../Modal/ModalEmployees';
import { deleteEmployeeApi, getDetailEmployee, putEmployeeApi } from '@/utils/api';
import EditEmployeeModal from '../EditEmployeeModal/EditEmployeeModal';

const TableEmployees = ({ data = [], itemsPerPage }) => {
    const { FaEye, FaPen, FaTrash } = icons;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editModalShow, setEditModalShow] = useState(false);
    const [employees, setEmployees] = useState(data);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const handleDeleteUser = async (user) => {
        console.log('Check user delete', user);
        try {
            const res = await deleteEmployeeApi(user);
            console.log('Delete response:', res);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleShowUserDetail = async (user) => {
        try {
            const response = await getDetailEmployee(user); 
            setSelectedEmployee(response); 
            console.log(">> check detail response employee",response)
            setModalShow(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleEditUser = (user) => {
        setSelectedEmployee(user);
        setEditModalShow(true);
    };
    
    const handleUpdateEmployee = async (updatedUser) => {
        try {
            const response = await putEmployeeApi(updatedUser); // Gọi API để cập nhật thông tin nhân viên
            if (response && response.data) {
                console.log('Updated Employee:', response.data);
                // Cập nhật lại danh sách nhân viên
                const updatedData = data.map((item) =>
                    item._id === response.data._id ? response.data : item
                );
                // Cập nhật lại state với danh sách nhân viên đã cập nhật
                setSelectedEmployee(null); // Reset selected employee
                setEditModalShow(false); // Đóng modal chỉnh sửa
            } else {
                console.error('No data returned from update API');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
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
                            <td className={styles.dataTableItemAction}>
                                <div className={styles.dataTableIconEye} onClick={() => handleShowUserDetail(item)}>
                                    <FaEye />
                                </div>
                                <div className={styles.dataTableIconPen}>
                                    <FaPen  onClick={() => handleEditUser(item)} />
                                </div>
                                <div className={styles.dataTableIconTrash}  onClick={() => handleDeleteUser(item)}>
                                    <FaTrash />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination className={styles.pagination}>
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
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>

            <ModalEmployees show={modalShow} onHide={() => setModalShow(false)} user={selectedEmployee}/>
            <EditEmployeeModal show={editModalShow} onHide={() => setEditModalShow(false)} user={selectedEmployee}  onUpdate={handleUpdateEmployee} />
        </div>
    );
};

export default TableEmployees;
