import React, { useState, useEffect } from 'react';
import { Table, Alert, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styles from './PromotionLine.module.css';
import { getPromotionDetaiLinelApi, createPromotionLine } from '@/utils/api';
import { ToastContainer, toast } from 'react-toastify';
import icons from '@/utils/icon';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const PromotionLine = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [promotionLines, setPromotionLines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { FaPen, FaTrash, MdArrowBackIos, FaPlusCircle } = icons;
    const [formData, setFormData] = useState({
        discount_type: 'percentage',
        discount_value: '',
        min_order_value: '',
        start_date: '',
        end_date: '',
    });

    useEffect(() => {
        const fetchPromotionLines = async () => {
            try {
                const response = await getPromotionDetaiLinelApi({ _id: id });
                console.log('>>> response', response);
                setPromotionLines(response);
            } catch (error) {
                console.error('Error fetching promotion details:', error);
                setError('Không thể tải dữ liệu chi tiết.');
            } finally {
                setLoading(false);
            }
        };

        fetchPromotionLines();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { discount_type, discount_value, min_order_value, start_date, end_date } = formData;

        try {
            const response = await createPromotionLine(
                id,
                discount_type,
                parseFloat(discount_value),
                parseInt(min_order_value),
                new Date(start_date).toISOString(),
                new Date(end_date).toISOString(),
            );
            const newPromotionLine = response.data.promotionLine;
            setPromotionLines((prev) => [...prev, newPromotionLine]);
            setFormData({
                discount_type: 'percentage',
                discount_value: '',
                min_order_value: '',
                start_date: '',
                end_date: '',
            });
        } catch (error) {
            console.error('Error creating promotion line:', error);
            setError('Không thể thêm chi tiết khuyến mãi mới.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }
    const handleListPrmotion = () => {
        navigate('/promotion');
    };
    const handleRowClick = (lineId) => {
        navigate(`/line/${lineId}`);
    };
    return (
        <div className={styles.promotionLineWrapper}>
            <div className={styles.promotionDetaiHead}>
                <MdArrowBackIos onClick={handleListPrmotion} className={styles.promotionIcon} />
                <h3>Chi tiết khuyến mãi</h3>
            </div>
            <Form onSubmit={handleSubmit} className={styles.promotionForm}>
                <Form.Group className="mb-3" controlId="discountType">
                    <Form.Label className={styles.labelText}>Loại giảm giá</Form.Label>
                    <Form.Control
                        as="select"
                        name="discount_type"
                        value={formData.discount_type}
                        onChange={handleChange}
                        placeholder="Nhập mô tả"
                        size="lg"
                    >
                        <option value="percentage">Phần trăm</option>
                        <option value="fixed">Giá trị cố định</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="discountValue">
                    <Form.Label className={styles.labelText}>Giá trị giảm</Form.Label>
                    <Form.Control
                        type="number"
                        name="discount_value"
                        value={formData.discount_value}
                        onChange={handleChange}
                        placeholder="Nhập mô tả"
                        size="lg"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="minOrderValue">
                    <Form.Label className={styles.labelText}>Giá trị đơn hàng tối thiểu</Form.Label>
                    <Form.Control
                        type="number"
                        name="min_order_value"
                        value={formData.min_order_value}
                        onChange={handleChange}
                        required
                        placeholder="Nhập mô tả"
                        size="lg"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="startDate">
                    <Form.Label className={styles.labelText}>Ngày bắt đầu</Form.Label>
                    <Form.Control
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                        placeholder="Nhập mô tả"
                        size="lg"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="endDate">
                    <Form.Label className={styles.labelText}>Ngày kết thúc</Form.Label>
                    <Form.Control
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                        placeholder="Nhập mô tả"
                        size="lg"
                    />
                </Form.Group>
                <button type="submit" className={styles.btnAdd}>
                    <FaPlusCircle />
                    Thêm
                </button>
            </Form>
            {promotionLines.length > 0 ? (
                <Table striped bordered hover className={styles.promotionTable}>
                    <thead>
                        <tr>
                            <th className={styles.dataTableHead}>Loại giảm giá</th>
                            <th className={styles.dataTableHead}>Giá trị giảm</th>
                            <th className={styles.dataTableHead}>Giá trị đơn hàng tối thiểu</th>
                            <th className={styles.dataTableHead}>Ngày bắt đầu</th>
                            <th className={styles.dataTableHead}>Ngày kết thúc</th>
                            <th className={styles.dataTableHead}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promotionLines.map((line) => (
                            <tr key={line._id} onClick={() => handleRowClick(line._id)}>
                                <td className={styles.dataTableItem}>
                                    {line.discount_type === 'percentage' ? 'Phần trăm' : 'Giá trị cố định'}
                                </td>
                                <td className={styles.dataTableItem}>{line.discount_value}</td>
                                <td className={styles.dataTableItem}>{line.min_order_value}</td>
                                <td className={styles.dataTableItem}>
                                    {new Date(line.start_date).toLocaleDateString()}
                                </td>
                                <td className={styles.dataTableItem}>{new Date(line.end_date).toLocaleDateString()}</td>
                                <td className={styles.dataTableItemAction}>
                                    <div
                                        className={styles.dataTableIconPen}
                                        // onClick={(e) => {
                                        //     e.stopPropagation();
                                        //     handleEditUser(item);
                                        // }}
                                    >
                                        <FaPen />
                                    </div>
                                    <div
                                        className={styles.dataTableIconTrash}
                                        // onClick={(e) => {
                                        //     e.stopPropagation();
                                        //     handleDeleteUser(item);
                                        // }}
                                    >
                                        <FaTrash />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="info">Không có dữ liệu chi tiết cho khuyến mãi này. Hãy thêm chi tiết mới.</Alert>
            )}
        </div>
    );
};

export default PromotionLine;
