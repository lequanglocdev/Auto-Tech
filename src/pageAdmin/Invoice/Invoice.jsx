import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Invoice.module.css';
import { geEmployeesApi, createPaymentCustomer, getInvoiceDetails } from '@/utils/api'; // Import hàm lấy thông tin hóa đơn
import { Button, Form } from 'react-bootstrap';
import {toast } from 'react-toastify';


const Invoice = () => {
    const { appointmentId } = useParams();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState({ id: '', name: '' });
    const [invoiceDetails, setInvoiceDetails] = useState(null); // State để lưu thông tin hóa đơn

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await geEmployeesApi();
                setEmployees(response);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleSelectChange = (event) => {
        const employeeId = event.target.value;
        const employee = employees.find((emp) => emp._id === employeeId);
        setSelectedEmployee({ id: employeeId, name: employee ? employee.name : '' });
        console.log('Selected Employee:', {
            id: employeeId,
            name: employee ? employee.name : '',
        });
    };

    const handleCreateInvoice = async () => {
        if (!selectedEmployee.id) {
            toast.error('Vui lòng chọn nhân viên trước!');
            return;
        }

        try {
            const response = await createPaymentCustomer(appointmentId, selectedEmployee.id);
            console.log('Create Invoice Response:', response);
            const invoiceId = response.invoice._id;
            toast.success('Hóa đơn đã được tạo thành công!');

            const invoiceResponse = await getInvoiceDetails(invoiceId);
            setInvoiceDetails(invoiceResponse);
            console.log('Invoice Details:', invoiceResponse);
        } catch (err) {
            toast.error('Tạo hóa đơn thất bại: ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
         
            <div>
                <h4 className={styles.slotHeader}>Trang đặt tạo hóa đơn khách hàng tại cửa hàng L&k TECH</h4>
            </div>
            <div className={styles.invoiceBody}>
                <label htmlFor="employeeSelect" className={styles.invoiceEmploy}>
                    Nhân viên thanh toán:
                </label>
                <Form.Select
                    size="lg"
                    className={styles.invoiceEmploySelect}
                    id="employeeSelect"
                    onChange={handleSelectChange}
                    value={selectedEmployee.id}
                >
                    <option value="">-- Chọn nhân viên --</option>
                    {employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                            {employee.name}
                        </option>
                    ))}
                </Form.Select>
            </div>
            <div className={styles.invoiceBtn}>
                <Button size="lg" onClick={handleCreateInvoice}>
                    Tạo hóa đơn
                </Button>
            </div>

            {invoiceDetails && ( 
                <div className={styles.invoiceDetails}>
                    <h3>Thông tin hóa đơn:</h3>

                    <div>
                        <p>
                            <strong>Email</strong>: {invoiceDetails?.invoice?.customer_id?.email}
                        </p>
                        <p>
                            <strong>Tên</strong>: {invoiceDetails?.invoice?.customer_id?.name}
                        </p>
                        <p>
                            <strong>Địa chỉ</strong>: {invoiceDetails?.invoice?.customer_id?.address}
                        </p>
                        <p>
                            <strong>Số điện thoại</strong>: {invoiceDetails?.invoice?.customer_id?.phone_number}
                        </p>
                        <p>
                            <strong>Tổng số tiền dịch vụ</strong>: {invoiceDetails?.invoice?.total_amount}
                        </p>
                        <p>
                            <strong>Khuyến mãi</strong>: {invoiceDetails?.invoice?.discount_amount}
                        </p>
                        <p>
                            <strong>Tổng số tền khách phải trả</strong>: {invoiceDetails?.invoice?.final_amount}
                        </p>
                        <p>
                            <strong>Trạng thái</strong>:Chờ thanh toán
                        </p>
                        {/* <h3>Thông tin chi tiết hóa đơn:</h3>
                      <p><strong>Mã khách hàng</strong>: {invoiceDetails?.invoice?.customer_id?.user_id}</p>
                      <p><strong>Email</strong>: {invoiceDetails?.invoice?.customer_id?.email}</p>
                      <p><strong>Tên</strong>: {invoiceDetails?.invoice?.customer_id?.name}</p>
                      <p><strong>Địa chỉ</strong>: {invoiceDetails?.invoice?.customer_id?.address}</p>
                      <p><strong>Số điện thoại</strong>: {invoiceDetails?.invoice?.customer_id?.phone_number}</p> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invoice;
