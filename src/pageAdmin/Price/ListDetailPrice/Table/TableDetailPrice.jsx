import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import icons from '@/utils/icon';
import styles from './TablePrice.module.css';
import { deletePriceApi, getDetailPrice} from '@/utils/api';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import ModalPrice from '../Modal/ModalPrice';
import { useNavigate } from 'react-router-dom';
const TablePrice = ({ data = [], itemsPerPage }) => {
    const { FaEye, FaTrash } = icons;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const [modalShow, setModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    const [selectedPrice, setSelectedPrice] = useState(null);
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
                console.log(error)
            } finally {
                setConfirmDeleteModalShow(false);
                setPriceToDelete(null);
            }
        }
    };
    
     const handleShowUserDetail = async (price) => {
        try {
            const response = await getDetailPrice(price);
            console.log(">>> response detail",response)
            setSelectedPrice(response);
            console.log('>> check detail response user', response);
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
                        <th className={styles.dataTableHead}>Tên bảng giá </th>
                        <th className={styles.dataTableHead}>Ngày bắt đầu</th>
                        <th className={styles.dataTableHead}>Ngày kết thúc</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr key={item._id}>
                            <td>{startIndex + index + 1}</td>
                            <td className={styles.dataTableItem}>{item.price_list_name}</td>
                            <td className={styles.dataTableItem}>{item.start_date}</td>
                            <td className={styles.dataTableItem}>{item.end_date}</td>
                            <td className={styles.dataTableItemAction}>
                            <div className={styles.dataTableIconEye} onClick={() => handleShowUserDetail(item)}>
                                    <FaEye />
                                </div>
                                <div className={styles.dataTableIconTrash} onClick={() => handleDeleteUser(item)}>
                                    <FaTrash />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {price.length > 0 && (
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

            <ModalPrice show={modalShow} onHide={() => setModalShow(false)} price={selectedPrice}/>
          
            <ConfirmDeleteModal
                show={confirmDeleteModalShow}
                onHide={() => setConfirmDeleteModalShow(false)}
                onConfirm={handleConfirmDelete}
            />
    
        </div>
    );
};

export default TablePrice;
