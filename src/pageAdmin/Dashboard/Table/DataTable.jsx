import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import styles from './DataTable.module.css';
import icons from '@/utils/icon';
import ReactPaginate from 'react-paginate';
import { deleteUserApi, getDetailUser } from '@/utils/api';
import ModalWatch from '../Modal/ModalWatch';
const DataTable = ({ data = [], itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { FaEye, FaPen, FaTrash } = icons;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // const handlePageClick = (event) => {

    //   };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

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
            const response = await getDetailUser(user); // Gọi API lấy chi tiết người dùng
            setSelectedUser(response); // Lưu thông tin người dùng
            console.log(">> check detail response",response)
            setModalShow(true); // Hiển thị modal
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
            {/* <div>
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={20}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div> */}
            <ModalWatch show={modalShow} onHide={() => setModalShow(false)} user={selectedUser} />
        </div>
    );
};

export default DataTable;
