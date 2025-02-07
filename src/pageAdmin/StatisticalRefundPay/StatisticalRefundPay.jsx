import React, { useEffect, useState } from 'react';
import icons from '@/utils/icon';
import { getAllTableStatisticRefundPay, getExportStatisticReturnInvoice } from '@/utils/api';
import { Form, Table, Pagination } from 'react-bootstrap';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';
import 'react-calendar/dist/Calendar.css';
import styles from './StatisticalRefundPay.module.css';

const StatisticalRefundPay = () => {
    const { FaFileExport } = icons;
    const [showExportModal, setShowExportModal] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statisticsData, setStatisticsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Trạng thái hiện tại của trang
    const [itemsPerPage] = useState(5); // Số lượng bản ghi trên mỗi trang
    const totalPages = Math.ceil(statisticsData.length / itemsPerPage); // Tính tổng số trang

    // Hàm xử lý thay đổi trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Lọc dữ liệu theo trang hiện tại
    const currentData = statisticsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleExport = async () => {
        if (!startDate || !endDate) {
            toast.error('Vui lòng chọn ngày bắt đầu và ngày kết thúc');
            return;
        }

        try {
            const response = await getExportStatisticReturnInvoice(startDate, endDate);

            if (response && response.msg) {
                toast.error(response.msg);
                return;
            }

            const blob = new Blob([response], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `thong-ke-doanh-thu_${startDate}_to_${endDate}.xlsx`);
            document.body.appendChild(link);
            link.click();

            setShowExportModal(false);
        } catch (error) {
            toast.error('Không tìm thấy dữ liệu trong khoảng thời gian này');
        }
    };

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await getAllTableStatisticRefundPay(startDate, endDate);
                const decodedData = new TextDecoder().decode(response); // Decode array buffer
                const parsedData = JSON.parse(decodedData);

                if (Array.isArray(parsedData)) {
                    setStatisticsData(parsedData);
                } else {
                    setStatisticsData([]);
                }
            } catch (error) {
                setStatisticsData([]);
            }
        };

        fetchStatistics();
    }, [startDate, endDate]);

    return (
        <div className={styles.statisticalWrapper}>
            <div className={styles.createRank}>
                <Breadcrumb items={['Quản lý thống kê hóa đơn trả']} activeItem="Quản lý thống kê hóa đơn trả" />
            </div>
            <div className={styles.statisticalDate}>
                <Form.Group className={styles.customerGroup} controlId="startDate">
                    <Form.Label className={styles.customerLabel}>Ngày bắt đầu</Form.Label>
                    <Form.Control
                        className={styles.customerControl}
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="endDate" className={styles.customerGroup}>
                    <Form.Label className={styles.customerLabel}>Ngày kết thúc</Form.Label>
                    <Form.Control
                        className={styles.customerControl}
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Form.Group>
            </div>

            <div className={styles.statisticalBody}>
                <div className={styles.headTable}>
                    <h4>BÁO CÁO HÓA ĐƠN TRẢ</h4>
                    <p className={styles.headeTableDate}>
                        <p>
                            Thời gian xuất báo cáo:{' '}
                            {new Date().toLocaleString('vi-VN', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}
                        </p>
                        <p>User xuất báo cáo: Admin</p>
                    </p>
                    <div className={styles.export}>
                        <div className={styles.statisticalHeaderExport} onClick={handleExport}>
                            <FaFileExport className={styles.statisticalHeaderExportIcon} />
                            <p className={styles.statisticalHeaderExportText}>Xuất thống kê</p>
                        </div>
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Hóa Đơn Mua</th>
                                <th>Ngày Đơn Hàng Mua</th>
                                <th>Hóa Đơn Trả</th>
                                <th>Ngày Đơn Hàng Trả</th>
                                <th>Tên Khách Hàng</th>
                                <th>Mã Sản Phẩm</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Số Lượng</th>
                                <th>Giá Trước Chiết Khấu</th>
                                <th>Giá Sau Chiết Khấu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statisticsData.map((item, index) => {
                                return (
                                    <React.Fragment key={item.invoice_id}>
                                        <tr>
                                            <td className={styles.bodyTableDateTd} rowSpan={item.services.length + 1}>
                                                {index + 1}
                                            </td>
                                            <td className={styles.bodyTableDateTd} rowSpan={item.services.length + 1}>
                                                {item.purchase_code}
                                            </td>
                                            <td className={styles.bodyTableDateTd} rowSpan={item.services.length + 1}>
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </td>
                                            <td className={styles.bodyTableDateTd} rowSpan={item.services.length + 1}>
                                                {item.return_code}
                                            </td>
                                            <td className={styles.bodyTableDateTd} rowSpan={item.services.length + 1}>
                                                {new Date(item.updated_at).toLocaleDateString()}
                                            </td>
                                            <td className={styles.bodyTableDateTd} rowSpan={item.services.length + 1}>
                                                {item.customer_name}
                                            </td>
                                        </tr>
                                        {item.services.map((service, serviceIndex) => {
                                            return (
                                                <tr key={`${item.invoice_id}-service-${serviceIndex}`}>
                                                    {serviceIndex === 0 ? (
                                                        <>
                                                            <td className={styles.bodyTableDateTd}>
                                                                {service.service_code}
                                                            </td>
                                                            <td className={styles.bodyTableDateTd}>
                                                                {service.service_name}
                                                            </td>
                                                            <td className={styles.bodyTableDateTd}>{1}</td>{' '}
                                                            {/* Assuming quantity is 1 for simplicity */}
                                                            <td className={styles.bodyTableDateTd}>
                                                                {service.price_before_discount.toLocaleString('vi-VN')}
                                                            </td>
                                                            <td className={styles.bodyTableDateTd}>
                                                                {service.price_after_discount.toLocaleString('vi-VN')}
                                                            </td>
                                                        </>
                                                    ) : null}
                                                </tr>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>

                {/* Hiển thị phân trang khi có nhiều hơn 5 mục */}
                {/* {statisticsData.length > 5 && (
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
                )} */}
            </div>
        </div>
    );
};

export default StatisticalRefundPay;
