import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import icons from '@/utils/icon';
import styles from './TableCustomer.module.css'
import { deleteUserApi, getDetailUser } from '@/utils/api';
import ModalCustomer from '../Modal/ModalCustomer';
const TableCustomer = ({ data = [], itemsPerPage }) => {
    const { FaEye, FaPen, FaTrash } = icons;
    
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteUser = async (user) => {
        console.log('Check user delete', user);
        try {
            const res = await deleteUserApi(user);
            console.log('Delete response:', res);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleShowUserDetail = async (user) => {
        try {
            const response = await getDetailUser(user); 
            setSelectedUser(response); 
            console.log(">> check detail response user",response)
            setModalShow(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
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
                                <div className={styles.dataTableIconPen}>
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
          
            <ModalCustomer show={modalShow} onHide={() => setModalShow(false)} user={selectedUser} />
        </div>
    );
};

export default TableCustomer;
