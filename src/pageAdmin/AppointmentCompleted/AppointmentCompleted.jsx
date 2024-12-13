import { getAppointmentCompleted } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import AppointmentCard from './AppointmentCard/AppointmentCard';
import styles from './AppointmentCompleted.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';

const AppointmentCompleted = () => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [searchPhone, setSearchPhone] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const today = new Date();
    const defaultDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
        today.getDate(),
    ).padStart(2, '0')}`;

    useEffect(() => {
        handleFilterChange();
    }, [filterStatus, searchPhone, filterDate,appointments]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await getAppointmentCompleted();
                console.log('abc', response);
                const sortedAppointments = response.sort((a, b) => {
                    // Cuộc hẹn đã thanh toán sẽ nằm đầu danh sách
                    if (a.invoice?.status === 'paid' && b.invoice?.status === 'paid') return 1;
                    if (b.invoice?.status === 'paid' && a.invoice?.status === 'paid') return -1;

                    // Cuộc hẹn không có invoice sẽ nằm sau các cuộc hẹn có invoice
                    if (!a.invoice && b.invoice) return 1;
                    if (a.invoice && !b.invoice) return -1;

                    // Mặc định giữ nguyên thứ tự
                    return 0;
                });
                setAppointments(sortedAppointments);
                setFilteredAppointments(sortedAppointments);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const updateAppointment = (updatedAppointment) => {
        setAppointments((prevAppointments) => {
            const filteredAppointments = prevAppointments.filter((app) => app?._id !== updatedAppointment?._id);
            return [updatedAppointment, ...filteredAppointments]; // Đưa cuộc hẹn mới lập hóa đơn lên đầu
        });

        setFilteredAppointments((prevAppointments) => {
            const filteredAppointments = prevAppointments.filter((app) => app?._id !== updatedAppointment?._id);
            return [updatedAppointment, ...filteredAppointments];
        });
    };

    const handleFilterChange = () => {
        let filtered = appointments;

        // Lọc theo trạng thái
        if (filterStatus !== '') {
            filtered = filtered.filter((appointment) => {
                if (filterStatus === 'no_invoice') return !appointment.invoice;
                if (filterStatus === 'paid') return appointment.invoice?.status === 'paid';
                if (filterStatus === 'pending') return appointment.invoice?.status === 'pending';
                if (filterStatus === 'back') return appointment.invoice?.status === 'back';
                return false;
            });
        }

        // Tìm kiếm theo số điện thoại
        if (searchPhone) {
            filtered = filtered.filter((appointment) => appointment.customer_id?.phone_number?.includes(searchPhone));
        }

        // Lọc theo ngày
        if (filterDate) {
            filtered = filtered.filter((appointment) => {
                const appointmentDate = new Date(appointment?.updated_at);
                const filter = new Date(filterDate);

                return (
                    appointmentDate.getFullYear() === filter.getFullYear() &&
                    appointmentDate.getMonth() === filter.getMonth() &&
                    appointmentDate.getDate() === filter.getDate()
                );
            });
        }

        setFilteredAppointments(filtered);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Spinner animation="border" variant="primary" size="lg" role="status" aria-hidden="true" />
            </div>
        );
    }


    // Phân loại các cuộc hẹn dựa trên `invoice`
  const appointmentsWithInvoice = filteredAppointments.filter((appointment) => appointment?.invoice !== null);
    const appointmentsWithoutInvoice = filteredAppointments.filter((appointment) => appointment?.invoice === null);
    // console.log("Ko có null",appointmentsWithoutInvoice)

    return (
        <Container>
            <div className={styles.appointmentHeader}>
                <Breadcrumb
                    items={['Quản lý lịch chăm sóc', 'Danh sách lịch hẹn hoàn thành']}
                    activeItem="Danh sách lịch hẹn hoàn thành"
                />
            </div>
            <div>
                <div className={styles.filterContainer}>
                    <Form.Group controlId="filterStatus" className={styles.filterGroup}>
                        {/* <Form.Label className={styles.filterLabel}>Lọc trạng thái</Form.Label> */}
                        <Form.Select
                            size="lg"
                            as="select"
                            value={filterStatus}
                            onChange={(e) => {
                                setFilterStatus(e.target.value); // Cập nhật trạng thái `filterStatus`
                            }}
                        >
                            <option value="">Tất cả</option>
                            <option value="no_invoice">Chưa lập hóa đơn</option>
                            <option value="paid">Đã thanh toán</option>
                            <option value="pending">Chưa thanh toán</option>
                            <option value="back">Hóa đơn trả</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="searchPhone" className={styles.filterGroup}>
                        {/* <Form.Label className={styles.filterLabel}>Tìm theo số điện thoại</Form.Label> */}
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Nhập số điện thoại"
                            value={searchPhone}
                            onChange={(e) => setSearchPhone(e.target.value)}
                        />
                    </Form.Group>

                    {/* Lọc theo ngày */}
                    <Form.Group controlId="filterDate" className={styles.filterGroup}>
                        {/* <Form.Label className={styles.filterLabel}>Lọc theo ngày</Form.Label> */}
                        <Form.Control
                            type="date"
                            size="lg"
                            value={filterDate || defaultDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                    </Form.Group>

                    <button
                        type="button"
                        className={styles.resetButton} 
                        onClick={() => {
                            setFilterDate(''); // Xóa giá trị filterDate
                            setFilteredAppointments(appointments); // Reset danh sách hiển thị
                        }}
                    >
                        Xóa bộ lọc
                    </button>
                </div>
            </div>

            <div className={styles.appointmentBody}>
                {filteredAppointments.length === 0 ? (
                    <div className={styles.noResults}>
                        <p className={styles.noResultsText}>Không tìm thấy kết quả phù hợp.</p>
                    </div>
                ) : (
                    <>
                        {/* Phần hiển thị các cuộc hẹn không có invoice */}
                        {appointmentsWithoutInvoice.length > 0 && (
                            <Row>
                                {appointmentsWithoutInvoice.map((appointment, index) => (
                                    <Col key={appointment?._id} xs={12} md={6} lg={4}>
                                        <AppointmentCard
                                            appointment={appointment}
                                            updateAppointment={updateAppointment}
                                            isLatest={index === 0}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        )}

                        {/* Phần hiển thị các cuộc hẹn có invoice */}
                        <Row>
                            {filteredAppointments
                                .filter((appointment) => appointment?.invoice !== null) // Chỉ lấy các cuộc hẹn có invoice
                                .map((appointment, index) => (
                                    <Col key={appointment?._id} xs={12} md={6} lg={4}>
                                        <AppointmentCard
                                            appointment={appointment}
                                            updateAppointment={updateAppointment}
                                            isLatest={appointmentsWithoutInvoice.length === 0 && index === 0} // Đánh dấu thẻ đầu tiên là mới nhất nếu không có cuộc hẹn không có invoice
                                        />
                                    </Col>
                                ))}
                        </Row>
                    </>
                )}
            </div>
        </Container>
    );
};

export default AppointmentCompleted;
