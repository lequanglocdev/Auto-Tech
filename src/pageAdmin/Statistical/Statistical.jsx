import React, { useEffect, useState } from 'react';
import icons from '@/utils/icon';
import { Bar, Pie } from 'react-chartjs-2';
import {
    getAllTableStatistic,
    getExportStatistic,
    getExportStatisticMY,
    getRevenueStatistics,
    getStatisticAppointmentTotal,
} from '@/utils/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Statistical.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Statistical = () => {
    const { AiOutlineSchedule, FaMoneyBillWave, FaFileExport } = icons;
    const [monthlyRevenue, setMonthlyRevenue] = useState({});
    const [growthRates, setGrowthRates] = useState([]);
    const currentYear = new Date().getFullYear();
    const years = [currentYear - 2, currentYear - 1, currentYear];
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [statistics, setStatistics] = useState({ appointmentsCount: 0, totalRevenue: 0 });

    const [showExportModal, setShowExportModal] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statisticsData, setStatisticsData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRevenueStatistics(`${selectedYear}-01-01`, `${selectedYear}-12-31`);
                console.log('thong ke', response);
                setMonthlyRevenue(response.monthlyRevenue);
                setGrowthRates(response.growthRates);
            } catch (error) {
                console.error('Error fetching revenue statistics:', error);
            }
        };

        fetchData();
    }, [selectedYear]);

    useEffect(() => {
        const fetchData = async () => {
            if (!month || !year) return;

            try {
                const response = await getStatisticAppointmentTotal(month, year);
                console.log('Thông kê 2', response);
                setStatistics(response || { appointmentsCount: 0, totalRevenue: 0 });
            } catch (error) {
                toast.error('Lỗi khi lấy dữ liệu thống kê:', error);
                setStatistics({ appointmentsCount: 0, totalRevenue: 0 });
            }
        };

        fetchData();
    }, [month, year]);

   

    const handleExport = async () => {
        if (!startDate || !endDate) {
            toast.error('Vui lòng chọn ngày bắt đầu và ngày kết thúc');
            return;
        }

        try {
            const response = await getExportStatistic(startDate, endDate);

            if (response && response.msg) {
                toast.error(response.msg);
                return;
            }

            const blob = new Blob([response], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // MIME type for Excel
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `thong-ke-doanh-thu_${startDate}_to_${endDate}.xlsx`);
            document.body.appendChild(link);
            link.click();

            setShowExportModal(false); // Close modal after export
        } catch (error) {
            toast.error('Không tìm thấy dữ liệu trong khoảng thời gian này');
        }
    };
    useEffect(() => {
        // Tự động gọi API khi `startDate` hoặc `endDate` thay đổi
        const fetchStatistics = async () => {
            if (!startDate || !endDate) return;

            try {
                const response = await getAllTableStatistic(startDate, endDate);
                const decodedData = new TextDecoder().decode(response); // Decode array buffer
                const parsedData = JSON.parse(decodedData);
                setStatisticsData(parsedData.data || []);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
                toast.error('Không tìm thấy dữ liệu trong khoảng thời gian này');
            }
        };

        fetchStatistics();
    }, [startDate, endDate]);
    const chartData = {
        labels: Object.keys(monthlyRevenue),
        datasets: [
            {
                label: 'Doanh thu hằng tháng',
                data: Object.values(monthlyRevenue),
                backgroundColor: ['rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: Object.keys(monthlyRevenue),
        datasets: [
            {
                label: 'Doanh thu hàng tháng',
                data: Object.values(monthlyRevenue),
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={styles.statisticalWrapper}>
            <div className={styles.createRank}>
                <Breadcrumb items={['Quản lý thống kê doanh thu']} activeItem="Quản lý thống kê doanh thu" />
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

            {/* <div className={styles.selectContainer}>
                <Form.Group className={styles.selectContainerForm}>
                    <Form.Select value={month} onChange={(e) => setMonth(e.target.value)} required size="lg">
                        <option value="">Chọn tháng</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                Tháng {i + 1}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className={styles.selectContainerForm}>
                    <Form.Select value={year} onChange={(e) => setYear(e.target.value)} required size="lg">
                        <option value="">Chọn năm</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </div>
            <div className={styles.statisticalHeader}>
                <div className={styles.statisticalHeaderItem}>
                    <div className={styles.statisticalHeaderIcon}>
                        <AiOutlineSchedule />
                    </div>
                    <div>
                        <p className={styles.statisticalHeaderText}>Tổng số lịch hẹn</p>
                        <p className={styles.statisticalHeaderText}>{statistics.appointmentsCount}</p>
                    </div>
                </div>
                <div className={styles.statisticalHeaderItem}>
                    <div className={styles.statisticalHeaderIcon}>
                        <FaMoneyBillWave />
                    </div>
                    <div>
                        <p className={styles.statisticalHeaderText}>Tổng số doanh thu</p>
                        <p className={styles.statisticalHeaderText}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                statistics.totalRevenue,
                            )}
                        </p>
                    </div>
                </div>
            </div> */}
            <div className={styles.statisticalBody}>
                {/* <div className="">
                    <Form.Group className={styles.statisticalBodyForm} controlId="year-select">
                        <Form.Label className={styles.statisticalBodyFormText}>Chọn năm:</Form.Label>
                        <Form.Select
                            value={selectedYear}
                            size="lg"
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className={styles.formSelect}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </div>
                <div className={styles.statisticalBodyChart}>
                    <div className={styles.chartContainer}>
                        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                    <div className={styles.chartContainer}>
                       
                    </div>
                </div> */}
                <div className={styles.headTable}>
                    <h4>Doanh số bán hàng theo ngày</h4>
                    <p className={styles.headeTableDate}>
                        <p>
                            Từ ngày: <b>{startDate}</b>
                        </p>
                        <p>
                            Đến ngày: <b>{endDate}</b>{' '}
                        </p>
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
                                <th style={{ width: '150px', fontSize: '14px' }}>STT</th>
                                <th className={styles.bodyTableDateTh}>NVBH</th>
                                <th className={styles.bodyTableDateTh}>Tên NVBH</th>
                                <th className={styles.bodyTableDateTh}>Ngày</th>
                                <th className={styles.bodyTableDateTh}>Chiết khấu</th>
                                <th className={styles.bodyTableDateTh}>Doanh số trước CK</th>
                                <th className={styles.bodyTableDateTh}>Doanh số sau CK</th>
                            </tr>
                        </thead>
                        <tbody className={styles.scrollableTableBody}>
                            {statisticsData.map((dayData, index) => {
                                // Tính tổng cho từng ngày
                                const totalDiscount = dayData.transactions.reduce(
                                    (sum, transaction) => sum + transaction.discount,
                                    0,
                                );
                                const totalRevenueBefore = dayData.transactions.reduce(
                                    (sum, transaction) => sum + transaction.revenueBeforeDiscount,
                                    0,
                                );
                                const totalRevenueAfter = dayData.transactions.reduce(
                                    (sum, transaction) => sum + transaction.revenueAfterDiscount,
                                    0,
                                );

                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td colSpan={7} className={styles.bodyTableDateTd}>
                                                <strong>Ngày: {dayData.date}</strong>
                                            </td>
                                        </tr>
                                        {dayData.transactions.map((transaction, idx) => (
                                            <tr key={`${index}-${idx}`}>
                                                <td className={styles.bodyTableDateTd}>{idx + 1}</td>
                                                <td className={styles.bodyTableDateTd}>{transaction.employeeCode}</td>
                                                <td className={styles.bodyTableDateTd}>{transaction.employeeName}</td>
                                                <td className={styles.bodyTableDateTd}>{dayData.date}</td>
                                                <td className={styles.bodyTableDateTd}>
                                                    {transaction.discount.toLocaleString('vi-VN')}
                                                </td>
                                                <td className={styles.bodyTableDateTd}>
                                                    {transaction.revenueBeforeDiscount.toLocaleString('vi-VN')}
                                                </td>
                                                <td className={styles.bodyTableDateTd}>
                                                    {transaction.revenueAfterDiscount.toLocaleString('vi-VN')}
                                                </td>
                                            </tr>
                                        ))}
                                        {/* Hàng tổng cuối mỗi ngày */}
                                        <tr style={{ fontWeight: 'bold' }}>
                                            <td
                                                className={styles.bodyTableDateTd}
                                                colSpan={4}
                                                style={{ textAlign: 'right' }}
                                            >
                                                Tổng cộng theo ngày:
                                            </td>
                                            <td className={styles.bodyTableDateTd}>
                                                {totalDiscount.toLocaleString('vi-VN')}
                                            </td>
                                            <td className={styles.bodyTableDateTd}>
                                                {totalRevenueBefore.toLocaleString('vi-VN')}
                                            </td>
                                            <td className={styles.bodyTableDateTd}>
                                                {totalRevenueAfter.toLocaleString('vi-VN')}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}

                            {/* Tính tổng cho tất cả các ngày */}
                            <tr style={{ fontWeight: 'bold', backgroundColor: '#f7f7f7' }}>
                                <td colSpan={4} style={{ textAlign: 'left', fontSize: '14px' }}>
                                    Tổng cộng tất cả:
                                </td>
                                <td className={styles.bodyTableDateTd}>
                                    {statisticsData
                                        .flatMap((day) => day.transactions)
                                        .reduce((sum, transaction) => sum + transaction.discount, 0)
                                        .toLocaleString('vi-VN')}
                                </td>
                                <td className={styles.bodyTableDateTd}>
                                    {statisticsData
                                        .flatMap((day) => day.transactions)
                                        .reduce((sum, transaction) => sum + transaction.revenueBeforeDiscount, 0)
                                        .toLocaleString('vi-VN')}
                                </td>
                                <td className={styles.bodyTableDateTd}>
                                    {statisticsData
                                        .flatMap((day) => day.transactions)
                                        .reduce((sum, transaction) => sum + transaction.revenueAfterDiscount, 0)
                                        .toLocaleString('vi-VN')}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Statistical;
