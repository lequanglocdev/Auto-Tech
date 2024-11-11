import React, { useEffect, useState } from 'react';
import icons from '@/utils/icon';
import { Bar, Pie } from 'react-chartjs-2';
import {
    getExportStatistic,
    getExportStatisticMY,
    getRevenueStatistics,
    getStatisticAppointmentTotal,
} from '@/utils/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Button, Form, Modal } from 'react-bootstrap';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRevenueStatistics(`${selectedYear}-01-01`, `${selectedYear}-12-31`);
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
                setStatistics(response || { appointmentsCount: 0, totalRevenue: 0 });
            } catch (error) {
                toast.error('Lỗi khi lấy dữ liệu thống kê:', error);
                setStatistics({ appointmentsCount: 0, totalRevenue: 0 });
            }
        };

        fetchData();
    }, [month, year]);

    const handleOpenExportModal = () => {
        setShowExportModal(true);
    };

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

    const chartData = {
        labels: Object.keys(monthlyRevenue),
        datasets: [
            {
                label: 'Doanh thu hằng tháng',
                data: Object.values(monthlyRevenue),
                backgroundColor: ['rgba(75, 192, 192, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
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
            <div className={styles.export}>
                <div className={styles.statisticalHeaderExport} onClick={handleOpenExportModal}>
                    <FaFileExport className={styles.statisticalHeaderExportIcon} />
                    <p className={styles.statisticalHeaderExportText}>Xuất thống kê</p>
                </div>
            </div>

            <div className={styles.selectContainer}>
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

                {/* <div>
                    <Calendar onChange={onChange} value={date} />
                </div> */}
            </div>
            <div className={styles.statisticalBody}>
                <div className="">
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
                        {/* <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} /> */}
                    </div>
                </div>
            </div>
            <Modal centered show={showExportModal} onHide={() => setShowExportModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.customerTitle}>Chọn khoảng thời gian xuất thống kê</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className={styles.customerGroup} controlId="startDate">
                        <Form.Label className={styles.customerLabel}>Ngày bắt đầu</Form.Label>
                        <Form.Control
                            className={styles.customerControl}
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="endDate" className="mt-3">
                        <Form.Label className={styles.customerLabel}>Ngày kết thúc</Form.Label>
                        <Form.Control
                            className={styles.customerControl}
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Form.Group>
                    <div className={styles.btn}>
                        <Button className={`mt-2 ${styles.customerBtn}`} variant="primary" onClick={handleExport}>
                            Xuất file
                        </Button>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowExportModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleExport}>
                        Xuất file
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    );
};

export default Statistical;
