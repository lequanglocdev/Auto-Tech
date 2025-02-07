import React, { useEffect, useState } from 'react';
import icons from '@/utils/icon';
import { getAllTableStatisticPromotion, getExportStatisticPromotion } from '@/utils/api';
import { Form, Table } from 'react-bootstrap';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';
import 'react-calendar/dist/Calendar.css';
import styles from './StatisticalPromotion.module.css';

const StatisticalPromotion = () => {
    const { FaFileExport } = icons;
    const [showExportModal, setShowExportModal] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statisticsData, setStatisticsData] = useState([]);
    const totalDiscount = statisticsData.reduce((sum, item) => sum + item.total_value, 0);
    const handleExport = async () => {
        if (!startDate || !endDate) {
            toast.error('Vui lòng chọn ngày bắt đầu và ngày kết thúc');
            return;
        }

        try {
            const response = await getExportStatisticPromotion(startDate, endDate);

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
                const response = await getAllTableStatisticPromotion(startDate, endDate);
                const decodedData = new TextDecoder().decode(response); // Decode array buffer
                const parsedData = JSON.parse(decodedData);

                // Đảm bảo dữ liệu là mảng
                if (Array.isArray(parsedData)) {
                    setStatisticsData(parsedData);
                } else {
                    //  toast.error('Không có dữ liệu', parsedData);
                    setStatisticsData([]); // Gán giá trị mặc định
                }
            } catch (error) {
                // toast.error('Lỗi khi lấy dữ liệu:', error);
                setStatisticsData([]); // Gán giá trị mặc định khi lỗi xảy ra
            }
        };

        fetchStatistics();
    }, [startDate, endDate]);

    return (
        <div className={styles.statisticalWrapper}>
            <div className={styles.createRank}>
                <Breadcrumb
                    items={['Quản lý thống kê chương trình khuyến mãi']}
                    activeItem="Quản lý thống kê chương trình khuyến mãi"
                />
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
                    <h4>BÁO CÁO TỔNG KẾT CTKM</h4>
                    <p className={styles.headeTableDate}>
                        <p>
                            Thời gian xuất báo cáo::{' '}
                            {new Date().toLocaleString('vi-VN', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}
                        </p>
                        {/* <p>Nhân viên xuất báo cáo: Lê Thành Dương</p> */}
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
                                <th>Mã CTKM</th>
                                <th>Tên CTKM</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Số tiền chiết khấu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statisticsData.map((item, index) => {
                                console.log(`Row ${index}:`, item);
                                return (
                                    <tr key={item.promotion_line_id}>
                                        <td className={styles.bodyTableDateTd}>{item.promotion_code}</td>
                                        <td className={styles.bodyTableDateTd}>{item.promotion_header_name}</td>
                                        <td className={styles.bodyTableDateTd}>
                                            {new Date(item.start_date).toLocaleDateString()}
                                        </td>
                                        <td className={styles.bodyTableDateTd}>
                                            {new Date(item.end_date).toLocaleDateString()}
                                        </td>
                                        <td className={styles.bodyTableDateTd}>
                                            {item.total_value.toLocaleString('vi-VN')}
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colSpan={4} className={styles.bodyTableDateTd}>
                                    <b>Tổng số tiền chiết khấu</b>
                                </td>
                                <td className={styles.bodyTableDateTd}>
                                    <b>{totalDiscount.toLocaleString('vi-VN')}</b>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default StatisticalPromotion;
