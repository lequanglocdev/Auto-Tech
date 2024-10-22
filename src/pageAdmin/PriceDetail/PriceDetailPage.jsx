import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { getCarApi, getDetailPrice, getServicesApi } from '@/utils/api';
import AddPriceDetailModal from './AddPriceDetailModal/AddPriceDetailModal';
import styles from './PriceDetailPage.module.css';
import { Table } from 'react-bootstrap';
import icons from '@/utils/icon';
import CommonButton from '@/components/UI/CommonButton/CommonButton ';

const PriceDetailPage = () => {
    const navigate = useNavigate();
    const { priceId } = useParams();
    const location = useLocation();
    const { priceListName } = location.state || {};
    const [priceDetail, setPriceDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { MdArrowBackIos, FaPlusCircle } = icons;

    useEffect(() => {
        const fetchPriceDetail = async () => {
            try {
                const response = await getDetailPrice({ _id: priceId });
                setPriceDetail(response);
            } catch (error) {
                console.error('Error fetching price detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPriceDetail();
    }, [priceId]);

    const handleAddInfo = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleListPrice = () => {
        navigate('/prices');
    };

    const [services, setServices] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    // Lấy dịch vụ và loại xe khi tải trang
    useEffect(() => {
        const fetchServicesAndVehicles = async () => {
            try {
                const servicesResponse = await getServicesApi();
                const vehiclesResponse = await getCarApi();
                setServices(servicesResponse);
                setVehicles(vehiclesResponse);
                console.log('Services:', servicesResponse); // Log để kiểm tra
                console.log('Vehicles:', vehiclesResponse); // Log để kiểm tra
            } catch (error) {
                console.error('Error fetching services or vehicles:', error);
            }
        };

        fetchServicesAndVehicles();
    }, []);

    const handleUpdatePriceDetail = (newPriceDetail) => {
        // Lấy priceLine từ phản hồi
        const { priceLine } = newPriceDetail; 
    
        // Tìm tên dịch vụ từ mảng services đã tải
        const service = services.find((item) => item._id === priceLine.service_id);
        
        // Tìm tên loại xe từ mảng vehicles đã tải
        const vehicle = vehicles.find((item) => item._id === priceLine.vehicle_type_id);
    
        // Tạo đối tượng mới với tên dịch vụ và loại xe
        const updatedPriceDetail = {
            ...priceLine, // Spread các thuộc tính của priceLine
            service_id: { _id: priceLine.service_id, name: service ? service.name : 'Không tìm thấy tên dịch vụ' },
            vehicle_type_id: { _id: priceLine.vehicle_type_id, vehicle_type_name: vehicle ? vehicle.vehicle_type_name : 'Không tìm thấy tên loại xe' }
        };
    
        // Cập nhật state với thông tin mới
        setPriceDetail((prevDetails) => [...prevDetails, updatedPriceDetail]);
    };
    

    const renderContent = () => {
        if (loading) {
            return <p>Đang tải dữ liệu...</p>;
        }

        if (priceDetail.length === 0) {
            return (
                <div
                    style={{
                        border: '2px solid red',
                        padding: '20px',
                        textAlign: 'center',
                        backgroundColor: '#ffe6e6',
                        borderRadius: '8px',
                        margin: '20px 0',
                        color: '#cc0000',
                    }}
                >
                    <h2>Thông Báo</h2>
                    <p>Thông tin chi tiết bảng giá này chưa có sẵn hoặc không tồn tại.</p>
                </div>
            );
        }

        return (
            <div className={styles.dataTableWrapper}>
                <Table striped bordered hover className={styles.dataTable}>
                    <thead>
                        <tr>
                            <th className={styles.dataTableHead}>Tên dịch vụ</th>
                            <th className={styles.dataTableHead}>Loại xe</th>
                            <th className={styles.dataTableHead}>Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {priceDetail.map((item) => (
                            <tr key={item._id} className={styles.dataTableRow}>
                                <td className={styles.dataTableItem}>{item.service_id?.name}</td>
                                <td className={styles.dataTableItem}>{item.vehicle_type_id?.vehicle_type_name}</td>
                                <td className={styles.dataTableItem}>{item?.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    };

    return (
        <div>
            <div className={styles.priceDetailHead}>
                <MdArrowBackIos onClick={handleListPrice} className={styles.priceDetailHeadIcon} />
                {priceListName && <h4>{priceListName} tại cửa hàng L&K TECH</h4>}
                <div></div>
            </div>
            <div className={styles.priceDetailBtn}>
                <CommonButton onClick={handleAddInfo} icon={FaPlusCircle} label="Thêm" />
            </div>

            {renderContent()}

            {/* Modal thêm thông tin */}
            <AddPriceDetailModal
                show={showModal}
                handleClose={handleCloseModal}
                priceId={priceId}
                onUpdatePriceDetail={handleUpdatePriceDetail} // Truyền callback để cập nhật dữ liệu
                services={services} // Truyền dịch vụ
                vehicles={vehicles} // Truyền loại xe
            />
        </div>
    );
};

export default PriceDetailPage;
