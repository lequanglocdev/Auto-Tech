import React, { useState } from 'react';
import styles from './ListAppointment.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Table, Spinner, Pagination } from 'react-bootstrap';
import { getAppointmentsforDate } from '@/utils/api';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';
import { useNavigate } from 'react-router-dom';

const ListsAppointment = ({ data = [],itemsPerPage}) => {

    const [appointments, setAppointments] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [loading, setLoading] = useState(false); // State để theo dõi trạng thái loading
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleSearch = async () => {
        setLoading(true); // Bắt đầu loading khi gọi API
        try {
            const response = await getAppointmentsforDate(searchDate);
            console.log('>>> lịch hẹn',response)
            setAppointments(response);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Token đã hết hạn, vui lòng đăng nhập lại.');
            } else {
                toast.error('Đã xảy ra lỗi khi lấy dữ liệu cuộc hẹn.');
            }
        } finally {
            setLoading(false); // Dừng loading khi có kết quả hoặc lỗi
        }
    };

    const handleShowAppointmentDetail = async (appointment) => {
        navigate(`/appointments/${appointment._id}`);
    };

    return (
        <div>
            <div className={styles.listsAppointment}>
                <Breadcrumb
                    items={['Quản lý lịch chăm sóc ', 'Danh sách lịch chăm sóc']}
                    activeItem="Danh sách lịch chăm sóc"
                />
            </div>
            <div className={styles.appointment}>
                <h4>Chọn thông tin ngày tháng năm cần tìm</h4>
                <Form.Group className={styles.appointmentCalender}>
                    <Form.Control
                        size="lg"
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />
                </Form.Group>
                <CommonButton onClick={handleSearch} label="Tìm" />
            </div>

            {loading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Spinner animation="border" variant="primary" size="lg" role="status" aria-hidden="true" />
                </div>
            ) : (
                appointments.length > 0 && (
                    <div className={styles.appointmentResults}>
                        <div className={styles.appointmentResultsText}>
                            <h4>Bảng danh sách khách hàng trong ngày </h4>
                        </div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className={styles.dataTableHead}>Khách hàng</th>
                                    <th className={styles.dataTableHead}>Email</th>
                                    <th className={styles.dataTableHead}>Biển số xe</th>
                                    <th className={styles.dataTableHead}>Thời gian</th>
                                    <th className={styles.dataTableHead}>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment) => (
                                    <tr key={appointment._id} onClick={() => handleShowAppointmentDetail(appointment)}>
                                        <td className={styles.dataTableItem}>{appointment.customer_id.name}</td>
                                        <td className={styles.dataTableItem}>{appointment.customer_id.email}</td>
                                        <td className={styles.dataTableItem}>{appointment.vehicle_id.license_plate}</td>
                                        <td className={styles.dataTableItem}>
                                            {new Date(appointment.appointment_datetime).toLocaleString()}
                                        </td>
                                        <td className={styles.dataTableItem}>
                                            <span className={`status ${appointment.status}`}>
                                                {appointment.status === 'scheduled' && 'Đã lên lịch'}
                                                {appointment.status === 'completed' && 'Đã hoàn thành'}
                                                {appointment.status === 'cancelled' && 'Đã hủy'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        {appointments.length > 5 && (
                            <Pagination className={styles.pagination} size="lg">
                                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                                <Pagination.Prev
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                />
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
                    </div>
                )
            )}

            <ToastContainer />
        </div>
    );
};

export default ListsAppointment;
