import React, { useEffect, useState } from 'react';
import { Table, Accordion } from 'react-bootstrap';
import styles from './TablePromotion.module.css';
import icons from '@/utils/icon';
import EditCustomerModal from '../EditPromotionModal/EditPromotionModal';
import { createPromotionLine, getPromotionDetaiLinelApi, putPromotionHeader, putPromotionLine } from '@/utils/api';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import AddPromotionLine from '../AddPromotionLine/AddPromotionLine';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPromotionLine from '../EditPromotionLineModal/EditPromotionLineModal';
const TablePromotion = ({ data = [], itemsPerPage }) => {
    const { FaPen, FaTrash, FaEye, FaPlusCircle } = icons;
    const [selectedPromotionHeader, setSelectedPromotionHeader] = useState({});

    const [promotion, setPromotion] = useState(data);
    const [selectedPromotion, setSelectedPromotion] = useState(null);

    const [editPromotionLineModalShow, setEditPromotionLineModalShow] = useState(false);
    const [selectedPromotionLine, setSelectedPromotionLine] = useState(null);

    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);
    const [addPromotionModalShow, setAddPromotionModalShow] = useState(false);

    const [activeIndex, setActiveIndex] = useState(null); // Theo dõi mục accordion đang mở

    const handleAccordionClick = async (id) => {
        if (!selectedPromotionHeader[id]) {
            try {
                const response = await getPromotionDetaiLinelApi({ _id: id });
                // console.log('>>> response', response);
                setSelectedPromotionHeader((prevHeaders) => ({
                    ...prevHeaders,
                    [id]: response,
                }));
            } catch (error) {
                console.error('Error fetching promotion details:', error);
            }
        } else {
            console.log(`Dữ liệu cho mục ${id} đã có sẵn!`);
        }
        setActiveIndex(id);
    };

    const handleEditHeader = (promotionHeader) => {
        setSelectedPromotion(promotionHeader);
        setEditModalShow(true);
    };

    const handleUpdateHeaderPromotion = async (updatedPromotion) => {
        try {
            const response = await putPromotionHeader(updatedPromotion);
            if (response) {
                setPromotion((prevPromotions) =>
                    prevPromotions.map((promo) =>
                        promo._id === updatedPromotion._id ? { ...promo, ...updatedPromotion } : promo,
                    ),
                );

                // Nếu data được truyền từ props và không thể sửa tại nguồn
                // ta cần cập nhật lại data
                setSelectedPromotion(null);
                setEditModalShow(false);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật khuyến mãi:', error);
        }
    };

    const handleDeleteHeader = (promotionHeader) => {
        setSelectedPromotion(promotionHeader);
        setConfirmDeleteModalShow(true);
    };

    const handleAddPromotionLine = (promotionHeader) => {
        setSelectedPromotion(promotionHeader); // Lưu promotion header cho dòng mới
        setAddPromotionModalShow(true);
    };

    const handleAddPromotionLineSubmit = async (formData) => {
        const { discount_type, description, start_date, end_date } = formData;
        try {
            const response = await createPromotionLine(
                selectedPromotion._id, // ID của promotion header
                discount_type,
                description,
                new Date(start_date).toISOString(),
                new Date(end_date).toISOString(),
            );

            if (response && response.promotionLine) {
                const newPromotionLine = response.promotionLine;

                // Thêm dòng khuyến mãi mới vào promotion header tương ứng
                setSelectedPromotionHeader((prevHeaders) => ({
                    ...prevHeaders,
                    [selectedPromotion._id]: [...(prevHeaders[selectedPromotion._id] || []), newPromotionLine],
                }));

                toast.success('Thêm khuyến mãi thành công');
                setAddPromotionModalShow(false);
            } else {
                toast.error('Lỗi khi thêm khuyến mãi');
            }
        } catch (error) {
            console.error('Lỗi khi tạo dòng khuyến mãi:', error);
            toast.error('Chương trình khuyến mãi đã hết');
        }
    };

    const handleEditPromotionLine = (promotionLine) => {
        setSelectedPromotionLine(promotionLine); // Lưu dòng khuyến mãi cần chỉnh sửa
        setEditPromotionLineModalShow(true);
    };

    const handleUpdateLinePromotion = async (updatedLine) => {
        try {
            const response = await putPromotionLine(updatedLine); // Gọi API để cập nhật dòng khuyến mãi
            if (response) {
                // Cập nhật danh sách promotion lines trong selectedPromotionHeader
                setSelectedPromotionHeader((prevHeaders) => ({
                    ...prevHeaders,
                    [updatedLine.promotion_header_id]: prevHeaders[updatedLine.promotion_header_id].map((line) =>
                        line._id === updatedLine._id ? updatedLine : line,
                    ),
                }));
                toast.success('Cập nhật thành công');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dòng khuyến mãi:', error);
            toast.error('Cập nhật thất bại');
        } finally {
            setEditPromotionLineModalShow(false); // Đóng modal sau khi cập nhật
        }
    };

    return (
        <div className={styles.appointmentCard}>
            <div>
                <Table className={styles.tableHeader}>
                    <tbody>
                        <tr className={styles.appointmentCardHeader}>
                            <td className={styles.appointmentCardTd}>MÃ KHUYẾN MÃI</td>
                            <td className={styles.appointmentCardTd}>tên chương trình</td>
                            <td className={styles.appointmentCardTd}>mô tả</td>
                            <td className={styles.appointmentCardTd}></td>
                            <td className={styles.appointmentCardTd}></td>
                            <td className={styles.appointmentCardTd}>NGÀY BẮT ĐẦU</td>
                            <td className={styles.appointmentCardTd}>NGÀY KẾT THÚC</td>
                            <td className={styles.appointmentCardTd}>Trạng thái</td>
                            <td className={styles.appointmentCardTd}>Tác vụ</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Accordion>
                {promotion.map((promotionHeader, index) => (
                    <Accordion.Item
                        eventKey={index.toString()}
                        key={promotionHeader?._id + activeIndex}
                        onClick={() => handleAccordionClick(promotionHeader?._id)}
                    >
                        <Accordion.Header className={styles.appointmentCardText}>
                            <Table className={styles.tableHeader}>
                                <tbody>
                                    <tr>
                                        <td className={styles.tableTh}>{promotionHeader.promotion_code}</td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}>{promotionHeader.name}</td>
                                        <td className={styles.tableTh}>{promotionHeader.description}</td>
                                        <td className={styles.tableTh}>
                                            {new Date(promotionHeader.start_date).toLocaleString('vi-VN', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                        </td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>

                                        <td className={styles.tableTh}>
                                            {new Date(promotionHeader.end_date).toLocaleString('vi-VN', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                        </td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}>
                                            {promotionHeader.active ? 'hoạt động' : 'ngưng hoạt động'}
                                        </td>
                                        <td className={styles.tableTh}>
                                            <div className={styles.dataTableIcon}>
                                                <FaPen
                                                    className={styles.iconActionPen}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditHeader(promotionHeader);
                                                    }}
                                                />
                                                <FaTrash
                                                    className={styles.iconActionTrash}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteHeader(promotionHeader);
                                                    }}
                                                />
                                                <FaPlusCircle
                                                    className={styles.iconActionAdd}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddPromotionLine(promotionHeader);
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td className={styles.tableTh}></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table>
                                <thead>
                                    <tr>
                                        <th className={styles.appointmentCardTh}>Mã dòng khuyến mãi</th>
                                        <th className={styles.appointmentCardTh}>Loại giảm giá</th>
                                        <th className={styles.appointmentCardTh}></th>
                                        <th className={styles.appointmentCardTh}></th>
                                        <th className={styles.appointmentCardTh}></th>
                                        <th className={styles.appointmentCardTh}></th>
                                        <th className={styles.appointmentCardTh}>Mô tả</th>
                                        <th className={styles.appointmentCardTh}></th>
                                        <th className={styles.appointmentCardTh}></th>
                                        <th className={styles.appointmentCardTh}></th>
                                        <th className={styles.appointmentCardTh}></th>
                                        <th className={styles.appointmentCardTh}></th>
                                        <th className={styles.appointmentCardTh}></th>
                                        <th className={styles.appointmentCardTh}>NGÀY BẮT ĐẦU</th>
                                        <th className={styles.appointmentCardTh}>NGÀY KẾT THÚC</th>
                                        <th className={styles.appointmentCardTh}>KÍCH HOẠT</th>
                                        <th className={styles.appointmentCardTh}>TÁC VỤ</th>
                                    </tr>
                                </thead>
                            </Table>
                            {selectedPromotionHeader[promotionHeader._id]?.map((promotionLine, index) => (
                                <Table>
                                    <tbody>
                                        <td className={styles.tableBodyTh}>{promotionLine?.promotion_header_id}</td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}>
                                            {promotionLine?.discount_type === 1
                                                ? 'Giảm giá theo phần trăm'
                                                : 'Giảm giá cố định'}
                                        </td>
                                        <td className={styles.tableBodyTh}>{promotionLine?.description}</td>
                                        <td className={styles.tableBodyTh}>
                                            {new Date(promotionLine?.start_date).toLocaleDateString()}
                                        </td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}>
                                            {new Date(promotionLine.end_date).toLocaleDateString()}
                                        </td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}></td>
                                        <td className={styles.tableBodyTh}>
                                            {promotionLine.active ? 'hoạt động' : 'ngưng hoạt động'}
                                        </td>
                                        <td className={styles.tableBodyTh}>
                                            <div className={styles.dataTableIcon}>
                                                <FaPen
                                                    className={styles.iconActionPen}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditPromotionLine(promotionLine);  // Truyền dòng khuyến mãi đã chọn
                                                    }}
                                                
                                                />
                                                <FaTrash
                                                    className={styles.iconActionTrash}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // handleDeleteUser(item);
                                                    }}
                                                />
                                                <FaEye
                                                    className={styles.iconActionEye}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // handleDeleteUser(item);
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tbody>
                                </Table>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            <EditCustomerModal
                show={editModalShow}
                user={selectedPromotion}
                onHide={() => setEditModalShow(false)} // Đóng modal khi người dùng nhấn 'X' hoặc ngoài modal
                onUpdate={handleUpdateHeaderPromotion}
            />
            <ConfirmDeleteModal
                show={confirmDeleteModalShow}
                onHide={() => setConfirmDeleteModalShow(false)}
                // onConfirm={handleConfirmDelete}
            />

            <AddPromotionLine
                show={addPromotionModalShow}
                promotionHeader={selectedPromotion} // Truyền promotion header đã chọn
                onHide={() => setAddPromotionModalShow(false)}
                onSubmit={handleAddPromotionLineSubmit} // Hàm này để xử lý gửi form
            />

            <EditPromotionLine
                show={editPromotionLineModalShow}
                promotionLine={selectedPromotionLine} // Truyền dòng khuyến mãi đã chọn
                onHide={() => setEditPromotionLineModalShow(false)} // Đóng modal
                onUpdate={handleUpdateLinePromotion} // Hàm này để xử lý khi gửi form
            />
        </div>
    );
};

export default TablePromotion;
