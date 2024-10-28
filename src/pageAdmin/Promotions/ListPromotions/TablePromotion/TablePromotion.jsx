import React, { useEffect, useState } from 'react';
import { Table, Accordion } from 'react-bootstrap';
import styles from './TablePromotion.module.css';
import icons from '@/utils/icon';
import EditCustomerModal from '../EditPromotionModal/EditPromotionModal';
import {
    createPromotionLine,
    deletePromotionApi,
    deletePromotionHeaderApi,
    getPromotionDetaiLinelApi,
    putPromotionHeader,
    putPromotionLine,
    getPromotionDetaiHeaderLineDetailApi,
    getPromotionDetaiApi,
    putPromotionDetail,
    deletePromotionDetailApi,
    putActivePromotionHeader,
    putActivePromotionLine,
    putActivePromotionDetail,
} from '@/utils/api';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import AddPromotionLine from '../AddPromotionLine/AddPromotionLine';
import { toast } from 'react-toastify';

import EditPromotionLine from '../EditPromotionLineModal/EditPromotionLineModal';
import ConfirmDeleteModalLine from '../ConfirmDeleteModalLine/ConfirmDeleteModalLine';
import AddPromotionDetail from '../AddPromotionDetail/AddPromotionDetail';
import { style } from '@mui/system';
import EditPromotionDetailModal from '../../EditPromotionDetailModal/EditPromotionDetailModal';
import ConfirmDeleteModalDetail from '../../ConfirmDeleteModalDetail/ConfirmDeleteModalDetail';
const TablePromotion = ({ data = [], itemsPerPage }) => {
    const { FaPen, FaTrash, FaEye, FaPlusCircle } = icons;
    const [selectedPromotionHeader, setSelectedPromotionHeader] = useState({});

    const [promotion, setPromotion] = useState(data);

    // Toggle header
    const [activeStatusHeader, setActiveStatusHeader] = useState(promotion?.map((item) => item.is_active || false));
    const handleToggleActiveHeader = async (promotionHeader) => {
        try {
            const updatedItem = { ...promotionHeader, is_active: !promotionHeader.is_active };

            const response = await putActivePromotionHeader(promotionHeader._id, updatedItem.is_active);

            // Log phản hồi từ API
            // console.log('Phản hồi từ API:', response);

            if (response) {
                setPromotion((prev) =>
                    prev.map((p) => (p._id === promotionHeader._id ? { ...p, is_active: updatedItem.is_active } : p)),
                );
                toast.success('Cập nhật trạng thái thành công!'); // Sử dụng toast
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật trạng thái. Vui lòng thử lại sau.'); // Sử dụng toast
        }
    };
    // Toggle Line handleToggleActiveLine
    const [activeStatusLine, setActiveStatusLine] = useState(promotion?.map((item) => item.is_active || false));
    const handleToggleActiveLine = async (promotionLine, index) => {
        try {
            const updatedItem = { ...promotionLine, is_active: !promotionLine.is_active };

            const response = await putActivePromotionLine(promotionLine._id, updatedItem.is_active);

            if (response) {
                setPromotion((prev) =>
                    prev.map((p) => (p._id === promotionLine._id ? { ...p, is_active: updatedItem.is_active } : p)),
                );

                const newActiveStatus = [...activeStatusLine];
                newActiveStatus[index] = updatedItem.is_active; // Chỉ cập nhật trạng thái của dòng hiện tại
                setActiveStatusLine(newActiveStatus); // Cập nhật state với trạng thái mới

                toast.success('Cập nhật trạng thái thành công!');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật trạng thái. Vui lòng thử lại sau.');
        }
    };

    // Toggle Detail
    const [activeStatusDetail, setActiveStatusDetail] = useState(promotion?.map((item) => item.is_active || false));
    const handleToggleActiveDetail = async (detail,index) => {
        try {
            const updatedItem = { ...detail, is_active: !detail.is_active };

            const response = await putActivePromotionDetail(detail._id, updatedItem.is_active);

            // Log phản hồi từ API
            // console.log('Phản hồi từ API:', response);

            if (response) {
                setPromotion((prev) =>
                    prev.map((p) => (p._id === detail._id ? { ...p, is_active: updatedItem.is_active } : p)),
                );
                const newActiveStatus = [...activeStatusLine];
                newActiveStatus[index] = updatedItem.is_active; // Chỉ cập nhật trạng thái của dòng hiện tại
                setActiveStatusLine(newActiveStatus); // Cập nhật state với trạng thái mới

                toast.success('Cập nhật trạng thái thành công!'); // Sử dụng toast
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật trạng thái. Vui lòng thử lại sau.'); // Sử dụng toast
        }
    };
    // edit promotionHeader , add promotion
    const [selectedPromotion, setSelectedPromotion] = useState(null);

    // edit promotion line
    const [selectedPromotionLine, setSelectedPromotionLine] = useState(null);

    // header
    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    //line
    const [editPromotionLineModalShow, setEditPromotionLineModalShow] = useState(false);
    const [confirmDeletePromotionLineModalShow, setConfirmDeletePromotionLineModalShow] = useState(false);
    const [addPromotionModalShow, setAddPromotionModalShow] = useState(false);

    //detail
    const [addPromotionDetailModalShow, setAddPromotionDetailModalShow] = useState(false);
    const [promotionDetails, setPromotionDetails] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null); // Theo dõi mục accordion đang mở
    const [editPromotionDetailModalShow, setEditPromotionDetailModalShow] = useState(false);
    const [selectedPromotionDetail, setSelectedPromotionDetail] = useState(null);
    const [confirmDeletePromotionDetailModalShow, setconfirmDeletePromotionDetailModalShow] = useState(false);

    const handleAccordionClick = async (id) => {
        if (!selectedPromotionHeader[id]) {
            try {
                const response = await getPromotionDetaiLinelApi({ _id: id });
                console.log('>>> response', response);
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
                        promo?._id === updatedPromotion?._id ? { ...promo, ...updatedPromotion } : promo,
                    ),
                );

                // Nếu data được truyền từ props và không thể sửa tại nguồn
                // ta cần cập nhật lại data
                setSelectedPromotion(null);
                toast.success(response.msg);
                setEditModalShow(false);
            }
        } catch (error) {
            toast.error('Lỗi khi cập nhật khuyến mãi:', error);
        }
    };

    const handleDeleteHeader = (promotionHeader) => {
        // console.log('lấy id', promotionHeader?._id);
        setSelectedPromotion(promotionHeader);
        setConfirmDeleteModalShow(true);
    };

    const handleConfirmDelete = async () => {
        // console.log('selectedPromotion:', selectedPromotion?._id);
        try {
            const response = await deletePromotionHeaderApi(selectedPromotion?._id); // Xóa chương trình khuyến mãi theo ID
            if (response) {
                // Xóa chương trình khuyến mãi khỏi state 'promotion'
                setPromotion((prevPromotions) =>
                    prevPromotions.filter((promo) => promo?._id !== selectedPromotion?._id),
                );
                toast.success('Xóa chương trình khuyến mãi thành công'); // Hiển thị thông báo thành công
            } else {
                toast.error('Xóa chương trình khuyến mãi thất bại'); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Lỗi khi xóa chương trình khuyến mãi:', error);
            toast.error('Có lỗi xảy ra khi xóa chương trình khuyến mãi'); // Hiển thị thông báo lỗi
        } finally {
            setConfirmDeleteModalShow(false); // Đóng modal xác nhận xóa
        }
    };

    // -------------------------------------------------------

    const handleDeletePromotionLine = (promotionLine) => {
        setSelectedPromotionHeader(promotionLine);
        setConfirmDeletePromotionLineModalShow(true);
    };

    const handleConfirmDeleteLine = async () => {
        // console.log('selectedPromotion:', selectedPromotion?._id);
        console.log('Before deletion - Current Selected Promotion Header:', selectedPromotionHeader);
        try {
            const response = await deletePromotionApi(selectedPromotionHeader?._id); // Xóa chương trình khuyến mãi theo ID
            if (response) {
                // Cập nhật state 'promotion'
                setPromotion((prevPromotions) =>
                    prevPromotions.filter((promo) => promo?._id !== selectedPromotionHeader?._id),
                );

                toast.success('Xóa chương trình khuyến mãi thành công'); // Hiển thị thông báo thành công
            } else {
                toast.error('Xóa chương trình khuyến mãi thất bại'); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Lỗi khi xóa chương trình khuyến mãi:', error);
            toast.error('Có lỗi xảy ra khi xóa chương trình khuyến mãi'); // Hiển thị thông báo lỗi
        } finally {
            setConfirmDeletePromotionLineModalShow(false); // Đóng modal xác nhận xóa
        }
    };

    const handleAddPromotionLine = (promotionHeader) => {
        console.log('Selected promotion header:', promotionHeader);
        setSelectedPromotion(promotionHeader); // Lưu promotion header cho dòng mới
        setAddPromotionModalShow(true);
    };

    const handleAddPromotionLineSubmit = async (formData) => {
        const { discount_type, description, start_date, end_date } = formData;
        try {
            const response = await createPromotionLine(
                selectedPromotion?._id, // ID của promotion header
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
                    [selectedPromotion?._id]: [...(prevHeaders[selectedPromotion?._id] || []), newPromotionLine],
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
                setSelectedPromotionHeader((prevSelected) => {
                    const updatedSelected = { ...prevSelected };

                    // Tìm và thay thế promotion line được cập nhật
                    Object.keys(updatedSelected).forEach((headerId) => {
                        if (Array.isArray(updatedSelected[headerId])) {
                            updatedSelected[headerId] = updatedSelected[headerId].map((line) =>
                                line?._id === updatedLine?._id ? updatedLine : line,
                            );
                        } else {
                            console.warn(
                                `Expected an array for headerId ${headerId}, but received:`,
                                updatedSelected[headerId],
                            );
                        }
                    });

                    return updatedSelected;
                });
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dòng khuyến mãi:', error);
            toast.error('Cập nhật thất bại');
        } finally {
            setEditPromotionLineModalShow(false); // Đóng modal sau khi cập nhật
        }
    };

    // useEffect(() => {
    //     console.log('Updated Promotions:', promotion);
    // }, [promotion]);

    // useEffect(() => {
    //     console.log('Updated Selected Promotion Header:', selectedPromotionHeader);
    // }, [selectedPromotionHeader]);

    const handleAddPromotionDetail = (promotionLine) => {
        setAddPromotionDetailModalShow(true);
        setSelectedPromotionLine(promotionLine);
    };
    const handleAddSuccess = (newDetail) => {
        setPromotionDetails((prevDetails) => [
            ...prevDetails,
            {
                ...newDetail,
                applicable_rank_id: {
                    _id: newDetail.applicableRankId,
                    rank_name: newDetail.applicableRankName, // Thêm tên cấp bậc để hiển thị
                },
                discount_value: newDetail.discountValue, // Thêm discountValue
                min_order_value: newDetail.minOrderValue, // Thêm minOrderValue
            },
        ]);
    };

    const handleClickDetail = async (promotionId) => {
        console.log('>> id', promotionId);
        try {
            // Gọi API với promotionId
            const response = await getPromotionDetaiApi({ _id: promotionId });
            setPromotionDetails(response);
        } catch (error) {
            toast.error('Error fetching promotion details:', error);
        }
    };

    const handleEditPromotionDetail = (detail) => {
        setSelectedPromotionDetail(detail);
        setEditPromotionDetailModalShow(true);
    };

    const handleUpdatePromotionDetail = async (updatedDetail) => {
        try {
            await putPromotionDetail(updatedDetail);
            setPromotionDetails((prevDetails) =>
                prevDetails.map((detail) => (detail._id === updatedDetail._id ? updatedDetail : detail)),
            );
            toast.success('Cập nhật chương trình khuyến mãi thành công');
            setEditPromotionDetailModalShow(false);
        } catch (error) {
            console.error('Cập nhật thất bại', error);
        }
    };

    const handleDeletePromotionDetail = (detail) => {
        setSelectedPromotionDetail(detail?._id);
        setconfirmDeletePromotionDetailModalShow(true);
    };

    const handleConfirmDeleteDetail = async () => {
        try {
            await deletePromotionDetailApi(selectedPromotionDetail); // Gọi API với ID đã lưu
            setPromotionDetails((prevDetails) =>
                prevDetails.filter((detail) => detail._id !== selectedPromotionDetail),
            );
            toast.success('Xóa chi tiết chương trình khuyến mãi thành công');
            setconfirmDeletePromotionDetailModalShow(false); // Đóng modal
        } catch (error) {
            console.error('Xóa thất bại', error);
        }
    };
    return (
        <div className={styles.appointmentCard}>
            <div className={styles.appointmentCardSearch}>
                <h4>Tìm kiếm</h4>
            </div>
            <div>
                <Table className={styles.tableHeader}>
                    <tbody>
                        <tr className={styles.appointmentCardHeader}>
                            <td className={styles.appointmentCardTd}>MÃ KHUYẾN MÃI</td>
                            <td className={styles.appointmentCardTd}>tên chương trình</td>
                            <td className={styles.appointmentCardTd}>mô tả</td>
                            <td className={styles.appointmentCardTd}></td>
                            <td className={styles.appointmentCardTd}></td>
                            <td className={styles.appointmentCardTd}></td>
                            <td className={styles.appointmentCardTd}></td>
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
                {promotion?.map((promotionHeader, index) => (
                    <Accordion.Item
                        eventKey={index.toString()}
                        key={promotionHeader?._id + activeIndex}
                        onClick={() => handleAccordionClick(promotionHeader?._id)}
                    >
                        <Accordion.Header className={styles.appointmentCardText}>
                            <Table className={styles.tableHeader}>
                                <tbody>
                                    <tr>
                                        <td className={styles.tableTh}>{promotionHeader?.promotion_code}</td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}></td>
                                        <td className={styles.tableTh}>{promotionHeader?.name}</td>
                                        <td className={styles.tableTh}>{promotionHeader?.description}</td>
                                        <td className={styles.tableTh}>
                                            {new Date(promotionHeader?.start_date).toLocaleString('vi-VN', {
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
                                            {new Date(promotionHeader?.end_date).toLocaleString('vi-VN', {
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
                                            <label className={styles.switch}>
                                                <input
                                                    type="checkbox"
                                                    checked={activeStatusHeader[index]} // Sử dụng state để kiểm soát giá trị
                                                    onChange={() => {
                                                        const newStatus = [...activeStatusHeader];
                                                        newStatus[index] = !newStatus[index]; // Đổi trạng thái
                                                        setActiveStatusHeader(newStatus);
                                                        handleToggleActiveHeader(promotionHeader);
                                                    }}
                                                />
                                                <span className={`${styles.slider} ${styles.round}`}></span>
                                            </label>
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
                                    <tr className={styles.tableLine}>
                                        <th className={styles.appointmentCardTh}>Loại giảm giá</th>
                                        <th className={styles.appointmentCardTh}>Mô tả dòng khuyến mãi</th>
                                        <th className={styles.appointmentCardTh}>NGÀY BẮT ĐẦU</th>
                                        <th className={styles.appointmentCardTh}>NGÀY KẾT THÚC</th>
                                        <th className={styles.appointmentCardTh}>KÍCH HOẠT</th>
                                        <th className={styles.appointmentCardTh}>TÁC VỤ</th>
                                    </tr>
                                </thead>
                            </Table>
                            <Accordion>
                                {selectedPromotionHeader[promotionHeader?._id]?.map((promotionLine, index) => (
                                    <Accordion.Item eventKey={promotionLine?._id} key={promotionLine?._id}>
                                        <Accordion.Header
                                            className={styles.appointmentCardText}
                                            onClick={() => handleClickDetail(promotionLine?._id)}
                                        >
                                            <Table className={styles.tableHeader}>
                                                <tbody>
                                                    <tr>
                                                        <td className={styles.tableBodyTh}>
                                                            {promotionLine?.discount_type === 1
                                                                ? 'Giảm giá theo phần trăm'
                                                                : 'Giảm giá cố định'}
                                                        </td>
                                                        <td className={styles.tableBodyTh}>
                                                            {promotionLine?.description}
                                                        </td>
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
                                                        <td className={styles.tableBodyTh}>
                                                            {new Date(promotionLine?.end_date).toLocaleDateString()}
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

                                                        <td className={styles.tableBodyTh}>
                                                            <label className={styles.switch}>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={activeStatusLine[index]} // Sử dụng state để kiểm soát giá trị
                                                                    onChange={() => {
                                                                        const newStatus = [...activeStatusLine];
                                                                        newStatus[index] = !newStatus[index]; // Đổi trạng thái
                                                                        setActiveStatusLine(newStatus);
                                                                        handleToggleActiveLine(promotionLine, index);
                                                                    }}
                                                                />
                                                                <span
                                                                    className={`${styles.slider} ${styles.round}`}
                                                                ></span>
                                                            </label>
                                                        </td>
                                                        <td className={styles.tableBodyTh}>
                                                            <div className={styles.dataTableIcon}>
                                                                <FaPen
                                                                    className={styles.iconActionPen}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleEditPromotionLine(promotionLine);
                                                                    }}
                                                                />
                                                                <FaTrash
                                                                    className={styles.iconActionTrash}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleDeletePromotionLine(promotionLine);
                                                                    }}
                                                                />
                                                                <FaPlusCircle
                                                                    className={styles.iconActionEye}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleAddPromotionDetail(promotionLine);
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {promotionDetails.length > 0 ? (
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <th className={styles.tableBodyTh}>Cấp bậc</th>

                                                            <th className={styles.tableBodyTh}>Số tiền giảm giá</th>
                                                            <th className={styles.tableBodyTh}>Số tiền tối thiểu</th>
                                                            <th className={styles.tableBodyTh}>Trạng thái</th>
                                                            <th className={styles.tableBodyTh}>Tác vụ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {promotionDetails.map((detail,index) => (
                                                            <tr key={detail._id}>
                                                                <td className={styles.detailTd}>
                                                                    {detail.applicable_rank_id?.rank_name}
                                                                </td>

                                                                <td className={styles.detailTd}>
                                                                    {detail?.discount_value}
                                                                </td>
                                                                <td className={styles.detailTd}>
                                                                    {detail?.min_order_value}
                                                                </td>
                                                                <td className={styles.detailTd}>
                                                                    <label className={styles.switch}>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={activeStatusDetail[index]} // Sử dụng state để kiểm soát giá trị
                                                                            onChange={() => {
                                                                                const newStatus = [
                                                                                    ...activeStatusDetail,
                                                                                ];
                                                                                newStatus[index] = !newStatus[index]; // Đổi trạng thái
                                                                                setActiveStatusDetail(newStatus);
                                                                                handleToggleActiveDetail(
                                                                                    detail,
                                                                                );
                                                                            }}
                                                                        />
                                                                        <span
                                                                            className={`${styles.slider} ${styles.round}`}
                                                                        ></span>
                                                                    </label>
                                                                </td>
                                                                <td className={styles.tableIcon}>
                                                                    <FaPen
                                                                        className={styles.iconActionPen}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleEditPromotionDetail(detail);
                                                                        }}
                                                                    />
                                                                    <FaTrash
                                                                        className={styles.iconActionTrash}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleDeletePromotionDetail(detail);
                                                                        }}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            ) : (
                                                <p>Không có chi tiết cho dòng khuyến mãi này</p>
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
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
                onConfirm={handleConfirmDelete}
            />
            {/* ----------------------------------------- */}
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

            <ConfirmDeleteModalLine
                show={confirmDeletePromotionLineModalShow}
                onHide={() => setConfirmDeletePromotionLineModalShow(false)}
                onConfirm={handleConfirmDeleteLine}
            />
            {/* ----------------------------------------- */}
            <AddPromotionDetail
                show={addPromotionDetailModalShow}
                onHide={() => setAddPromotionDetailModalShow(false)}
                promotionHeader={selectedPromotionLine}
                onSuccess={handleAddSuccess}
            />
            <EditPromotionDetailModal
                show={editPromotionDetailModalShow}
                onHide={() => setEditPromotionDetailModalShow(false)}
                detail={selectedPromotionDetail}
                onSave={handleUpdatePromotionDetail}
            />
            <ConfirmDeleteModalDetail
                show={confirmDeletePromotionDetailModalShow}
                onHide={() => setconfirmDeletePromotionDetailModalShow(false)}
                onConfirm={handleConfirmDeleteDetail}
            />
        </div>
    );
};

export default TablePromotion;
