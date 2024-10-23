import React, { useState, useEffect } from 'react';
import { Table, Alert, Form } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import styles from './PromotionLine.module.css';
import { getPromotionDetaiLinelApi, createPromotionLine, putPromotionLine, deletePromotionApi } from '@/utils/api';
import { ToastContainer, toast } from 'react-toastify';
import icons from '@/utils/icon';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import EditPromotionLine from './EditPromotionModal/EditPromotionLineModal';
import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal';
const PromotionLine = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { FaPen, FaTrash, MdArrowBackIos, FaPlusCircle } = icons;
    const [formData, setFormData] = useState({
        discount_type: true,
        description: '',
        start_date: '',
        end_date: '',
    });

    const [promotionLines, setPromotionLines] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null); // Thêm state cho promotion được chọn
    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);
    const [promotion, setpromotion] = useState(null);

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const promotionCode = query.get('code'); // Lấy promotion_code từ query params

    // Sử dụng promotionCode như bạn muốn, ví dụ:
    console.log('Promotion Code:', promotionCode);

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
        const { discount_type, description, start_date, end_date } = formData;

        try {
            const response = await createPromotionLine(
                id,
                discount_type,
                description,
                new Date(start_date).toISOString(),
                new Date(end_date).toISOString(),
            );

            console.log('Response from API:', response); // Kiểm tra phản hồi từ API

            if (response && response.promotionLine) {
                const newPromotionLine = response.promotionLine;


                setPromotionLines((prev) => [...prev, newPromotionLine]);
                toast.success('Thêm khuyến mãi thành công');
                setFormData({
                    discount_type: 1, // Đặt lại mặc định là `true` (hoặc 1 cho phần trăm)
                    description: '',
                    start_date: '',
                    end_date: '',
                });
            } else {
                toast.error('Lỗi');
            }
        } catch (error) {
            console.error('Error creating promotion line:', error);
            toast.error('Chương trình khuyến mãi đã hết');
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
        navigate(`/promotions/${lineId}`);
    };

    const handleEditPromotionLine = (line) => {
        setSelectedPromotion(line);
        setEditModalShow(true);
    };
    const handleUpdateLinePromotion = async (updatedLine) => {
        try {
            const response = await putPromotionLine(updatedLine);
            const updatedLines = promotionLines.map((line) => (line._id === updatedLine._id ? updatedLine : line));
            setPromotionLines(updatedLines); // Cập nhật danh sách với promotion line mới
            toast.success('Cập nhật thành công');
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error);
            toast.error('Cập nhật thất bại');
        } finally {
            setEditModalShow(false); // Đóng modal sau khi cập nhật
        }
    };

    const handleDeleteUser = (line) => {
        setSelectedPromotion(line); 
        setConfirmDeleteModalShow(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedPromotion) {
            // Kiểm tra nếu promotion đã được chọn
            try {
                await deletePromotionApi(selectedPromotion); // Gọi API xóa promotion
                setPromotionLines(
                    (prev) => prev.filter((line) => line._id !== selectedPromotion._id), // Loại bỏ promotion vừa xóa khỏi danh sách
                );
                toast.success('Xóa thành công');
            } catch (error) {
                console.error('Lỗi khi xóa:', error);
                toast.error('Xóa thất bại');
            } finally {
                setConfirmDeleteModalShow(false); // Đóng modal
                setSelectedPromotion(null); // Xóa promotion khỏi state
            }
        }
    };
    return (
        <div className={styles.promotionLineWrapper}>
            <div className={styles.promotionDetaiHead}>
                <MdArrowBackIos onClick={handleListPrmotion} className={styles.promotionIcon} />
                <h3>Nội dung cho chương trình khuyến mãi {promotionCode}</h3>
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
                        <option value={1}>Giảm giá theo phần trăm</option>
                        <option value={2}>Giảm giá cố định</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label className={styles.labelText}>Mô tả</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={formData.description}
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
                            <th className={styles.dataTableHead}>Mô tả</th>
                            <th className={styles.dataTableHead}>Ngày bắt đầu</th>
                            <th className={styles.dataTableHead}>Ngày kết thúc</th>
                            <th className={styles.dataTableHead}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promotionLines.map((line) => (
                            <tr key={line._id} onClick={() => handleRowClick(line._id)}
>
                                <td className={styles.dataTableItem}>
                                    {line?.discount_type === 1 ? 'Giảm giá theo phần trăm' : 'Giảm giá cố định'}
                                </td>
                                <td className={styles.dataTableItem}>{line?.description}</td>
                                <td className={styles.dataTableItem}>
                                    {new Date(line?.start_date).toLocaleDateString()}
                                </td>
                                <td className={styles.dataTableItem}>{new Date(line.end_date).toLocaleDateString()}</td>
                                <td className={styles.dataTableItemAction}>
                                    <div
                                        className={styles.dataTableIconPen}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditPromotionLine(line);
                                        }}
                                    >
                                        <FaPen />
                                    </div>
                                    <div
                                        className={styles.dataTableIconTrash}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteUser(line);
                                        }}
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

            <EditPromotionLine
                show={editModalShow}
                promotion={selectedPromotion} // Truyền promotion được chọn vào modal
                onHide={() => setEditModalShow(false)}
                onUpdate={handleUpdateLinePromotion}
            />
            <ConfirmDeleteModal
                show={confirmDeleteModalShow}
                onHide={() => setConfirmDeleteModalShow(false)}
                onConfirm={handleConfirmDelete}
            />
            <ToastContainer />
        </div>
    );
};

export default PromotionLine;
