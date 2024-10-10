import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import icons from '@/utils/icon';
import styles from './TableServices.module.css'
import { deleteUserApi, getDetailServices} from '@/utils/api';
import ModalServices from '../Modal/ModalServices';
import EditServicesModal from '../EditServicesModal/EditServicesModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
const TableServices = ({ data = [], itemsPerPage }) => {
    const { FaEye, FaPen, FaTrash } = icons;
    
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteUser = (user) => {
        setConfirmDeleteModalShow(true);
    };

    const handleShowUserDetail = async (services) => {
        try {
            const response = await getDetailServices(services); 
            setSelectedUser(response); 
            console.log(">> check detail response user",response)
            setModalShow(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleEditUser = (user) => {
        // setSelectedUser(user);
        setEditModalShow(true);
    };

    return (
        <div className={styles.dataTableWrapper}>
            <Table striped bordered hover className={styles.dataTable}>
                <thead>
                    <tr className="">
                        <th className={styles.dataTableHead}>#</th>
                        <th className={styles.dataTableHead}>Loại dịch vụ</th>
                        <th className={styles.dataTableHead}>Tên dịch vụ</th>
                        <th className={styles.dataTableHead}>Mô tả</th>
                        <th className={styles.dataTableHead}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr key={item._id}>
                            <td>{startIndex + index + 1}</td>
                            <td className={styles.dataTableItem}>{item.service_code}</td>
                            <td className={styles.dataTableItem}>{item.name}</td>
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
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
          
            <ModalServices show={modalShow} onHide={() => setModalShow(false)} services={selectedUser} />
            <EditServicesModal show={editModalShow} user={selectedUser} onHide={() => setEditModalShow(false)} />
            <ConfirmDeleteModal show={confirmDeleteModalShow} onHide={() => setConfirmDeleteModalShow(false)} />
        </div>
    );
};

export default TableServices;
