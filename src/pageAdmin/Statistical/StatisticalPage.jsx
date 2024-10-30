import React, { useEffect, useState } from 'react';

import { Bar, Pie } from 'react-chartjs-2';
import { getRevenueStatistics } from '@/utils/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import './Statistical.css'; // Nhập file CSS nếu cần

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const StatisticalPage = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState({});
  const [growthRates, setGrowthRates] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2024');

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

  const chartData = {
      labels: Object.keys(monthlyRevenue),
      datasets: [
          {
              label: 'Doanh thu hàng tháng',
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
              backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
              borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
              borderWidth: 1,
          },
      ],
  };

  return (
      <div className="statistical-container">
          <h2 className="statistical-header">Thống Kê Doanh Thu</h2>
          <h3 className="total-revenue">Tổng doanh thu: {Object.values(monthlyRevenue).reduce((a, b) => a + b, 0)} VNĐ</h3>

          <div className="year-selection">
              <label htmlFor="year-input">
                  Chọn năm:
                  <input
                      type="number"
                      id="year-input"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      min="2020"
                      max="2100"
                  />
              </label>
          </div>

          <div className="charts-container">
              <div className="chart">
                  <h3>Biểu đồ cột</h3>
                  <Bar data={chartData} options={{ responsive: true }} />
              </div>

              <div className="chart">
                  <h3>Biểu đồ tròn</h3>
                  <Pie data={pieData} options={{ responsive: true }} />
              </div>
          </div>
      </div>
  );
}

export default StatisticalPage
