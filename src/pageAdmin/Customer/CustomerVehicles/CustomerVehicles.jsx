import { getDetailUser } from '@/utils/api';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'

const CustomerVehicles = () => {
  
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getDetailUser(); // Lấy danh sách khách hàng từ API
                console.log(">>> data customer",data)
                setCustomers(data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách khách hàng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const handleAddVehicle = async (customerId) => {
        // Mở form thêm xe cho khách hàng
        // Bạn có thể mở modal hoặc điều hướng đến trang thêm xe ở đây
        console.log('Thêm phương tiện cho khách hàng:', customerId);
    };

    if (loading) {
        return <div>Đang tải danh sách khách hàng...</div>;
    }

    return (
        <div>
            <h2>Danh sách khách hàng chưa có phương tiện</h2>
            <ul>
                {customers.filter(customer => !customer.hasVehicle).map(customer => (
                    <li key={customer.id}>
                        {customer.name} - {customer.email}
                        <Button variant="primary" onClick={() => handleAddVehicle(customer.id)}>
                            Thêm phương tiện
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    
  )
}

export default CustomerVehicles
