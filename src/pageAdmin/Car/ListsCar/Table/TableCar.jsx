import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import icons from '@/utils/icon';
import styles from './TableCar.module.css';
import { deleteCarApi, deleteUserApi, putCarApi } from '@/utils/api';
import EditCarModal from '../EditCarModal/EditCarModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TableCar = ({ data = [], itemsPerPage }) => {
    const { FaPen, FaTrash } = icons;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    const [selectedCar, setSelectedCar] = useState(null);
    const [carToDelete, setCarToDelete] = useState(null);

    const [car, setCar] = useState(data);
    const currentData = car.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteUser = (user) => {
        setCarToDelete(user);
        setConfirmDeleteModalShow(true);
    };

    const handleConfirmDelete = async () => {
        if (carToDelete) {
            try {
                await deleteCarApi(carToDelete);
                setCar((prev) => prev.filter((emp) => emp._id !== carToDelete._id));
            } catch (error) {
                console.log(error)
            } finally {
                setConfirmDeleteModalShow(false);
                setCarToDelete(null);
            }
        }
    };

    const handleEditUser = (user) => {
        setSelectedCar(user);
        setEditModalShow(true);
    };

    const handleUpdateCustomer = async (updatedCar) => {
        try {
            const response = await putCarApi(updatedCar);
            if (response) {
                setCar((prev) => prev.map((cust) => (cust._id === updatedCar._id ? { ...cust, ...updatedCar } : cust)));
                setEditModalShow(false);
               
            }
        } catch (error) {
           console.log(error)
        }
    };
    return (
        <div className={styles.dataTableWrapper}>
            <Table striped bordered hover className={styles.dataTable}>
                <thead>
                    <tr className="">
                        <th className={styles.dataTableHead}>#</th>
                        <th className={styles.dataTableHead}>Name</th>
                        <th className={styles.dataTableHead}>mô tả</th>
                        <th className={styles.dataTableHead}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr key={item._id}>
                            <td>{startIndex + index + 1}</td>
                            <td className={styles.dataTableItem}>{item.vehicle_type_name}</td>
                            <td className={styles.dataTableItem}>{item.description}</td>
                            <td className={styles.dataTableItemAction}>
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

            {car.length > 0 && (
                <Pagination className={styles.pagination} size='lg'>
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
            <EditCarModal
                show={editModalShow}
                car={selectedCar}
                onHide={() => setEditModalShow(false)}
                onUpdate={handleUpdateCustomer}
            />
            <ConfirmDeleteModal
                show={confirmDeleteModalShow}
                onHide={() => setConfirmDeleteModalShow(false)}
                onConfirm={handleConfirmDelete}
            />
            <ToastContainer />
        </div>
    );
};

export default TableCar;