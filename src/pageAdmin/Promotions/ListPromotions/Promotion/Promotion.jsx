import React, { useEffect, useState } from 'react';

import {
    createPromotionLine,
    deletePromotionApi,
    deletePromotionDetailApi,
    deletePromotionHeaderApi,
    getPromotionApi,
    getPromotionDetaiHeaderLineDetailApi,
    putActivePromotionDetail,
    putActivePromotionHeader,
    putActivePromotionLine,
    putPromotionDetail,
    putPromotionHeader,
    putPromotionLine,
} from '@/utils/api';
import styles from './Promotion.module.css';
import { toast } from 'react-toastify';
import icons from '@/utils/icon';
import EditCustomerModal from '../EditPromotionModal/EditPromotionModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import EditPromotionLine from '../EditPromotionLineModal/EditPromotionLineModal';
import ConfirmDeleteModalLine from '../ConfirmDeleteModalLine/ConfirmDeleteModalLine';
import EditPromotionDetailModal from '../../EditPromotionDetailModal/EditPromotionDetailModal';
import ConfirmDeleteModalDetail from '../../ConfirmDeleteModalDetail/ConfirmDeleteModalDetail';
import AddPromotionLine from '../AddPromotionLine/AddPromotionLine';
import AddPromotionDetail from '../AddPromotionDetail/AddPromotionDetail';
import { Form, Table } from 'react-bootstrap';
const TestComponent = () => {
    const { FaPen, FaTrash, FaEye, FaPlusCircle } = icons;

    // State lưu trữ dữ liệu khuyến mãi và trạng thái mở/đóng của mỗi cấp
    const [promotions, setPromotions] = useState([]);
    const [openHeaders, setOpenHeaders] = useState({});
    const [openLines, setOpenLines] = useState({});

    //  HEADER
    const [activeStatusHeader, setActiveStatusHeader] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [editModalShow, setEditModalShow] = useState(false);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    // LINE
    const [activeStatusLine, setActiveStatusLine] = useState([]);
    const [selectedPromotionLine, setSelectedPromotionLine] = useState(null);
    const [editPromotionLineModalShow, setEditPromotionLineModalShow] = useState(false);
    const [selectedPromotionHeader, setSelectedPromotionHeader] = useState({});
    const [confirmDeletePromotionLineModalShow, setConfirmDeletePromotionLineModalShow] = useState(false);
    const [addPromotionModalShow, setAddPromotionModalShow] = useState(false);
    // DETAIL
    const [activeStatusDetail, setActiveStatusDetail] = useState({});
    const [selectedPromotionDetail, setSelectedPromotionDetail] = useState(null);
    const [editPromotionDetailModalShow, setEditPromotionDetailModalShow] = useState(false);
    const [confirmDeletePromotionDetailModalShow, setconfirmDeletePromotionDetailModalShow] = useState(false);
    const [addPromotionDetailModalShow, setAddPromotionDetailModalShow] = useState(false);
    // Hàm gọi API để lấy dữ liệu khuyến mãi
    // const [activeStatusDetail, setActiveStatusDetail] = useState(
    //     line?.promotionDetails?.map(detail => detail?.is_active || false) || [] // Khởi tạo giá trị mặc định là false nếu không có giá trị is_active
    // );
    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await getPromotionApi(); // Thay đổi đường dẫn API nếu cần
                const promotionsWithLines = response.map((header) => ({
                    ...header,
                    lines: header?.lines || [], // Nếu không có lines, khởi tạo thành mảng rỗng
                }));
                setPromotions(promotionsWithLines);
                setActiveStatusHeader(promotionsWithLines.map((item) => item?.is_active || false)); // Cập nhật trạng thái ban đầu
            } catch (error) {
                console.error('Error fetching promotions:', error);
            }
        };

        fetchPromotions();
    }, []);

    const toggleHeader = async (headerId) => {
        if (!openHeaders[headerId]) {
            // Nếu header chưa mở, gọi API để lấy dữ liệu
            try {
                const response = await getPromotionDetaiHeaderLineDetailApi(headerId);

                setPromotions((prevPromotions) => {
                    return prevPromotions.map((header) => {
                        if (header?._id === headerId) {
                            return { ...header, lines: response?.promotionLines };
                        }
                        return header;
                    });
                });
            } catch (error) {
                console.error('Error fetching promotion details:', error);
            }
        }
        setOpenHeaders((prev) => ({ ...prev, [headerId]: !prev[headerId] }));
    };

    const toggleLine = (headerId, lineId) => {
        setOpenLines((prev) => ({
            ...prev,
            [headerId]: {
                ...prev[headerId],
                [lineId]: !prev[headerId]?.[lineId], // Chuyển đổi trạng thái của dòng
            },
        }));
    };

    // Toggle Active header

    const handleToggleActiveHeader = async (promotionHeader) => {
        try {
            // Lưu trạng thái ban đầu
            const currentStatus = promotionHeader?.is_active;
            const updatedStatus = !currentStatus;
    
            // Tạm thời cập nhật giao diện (Optimistic UI)
            setPromotions((prev) =>
                prev.map((p) =>
                    p?._id === promotionHeader?._id
                        ? { ...p, is_active: updatedStatus }
                        : p,
                ),
            );
    
            // Gọi API để cập nhật
            const response = await putActivePromotionHeader(promotionHeader?._id, updatedStatus);
    
            // Kiểm tra phản hồi từ API
            if (response?.promotionHeader?.is_active !== updatedStatus) {
                throw new Error('Trạng thái không được cập nhật chính xác từ API');
            }
    
            // Cập nhật lại giao diện dựa trên phản hồi từ API
            setPromotions((prev) =>
                prev.map((p) =>
                    p?._id === promotionHeader?._id
                        ? { ...p, is_active: response.promotionHeader?.is_active }
                        : p,
                ),
            );
    
            toast.success('Cập nhật trạng thái thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
    
            // Nếu có lỗi, khôi phục trạng thái ban đầu
            setPromotions((prev) =>
                prev.map((p) =>
                    p?._id === promotionHeader?._id
                        ? { ...p, is_active: promotionHeader?.is_active }
                        : p,
                ),
            );
    
          //  toast.error('Đã xảy ra lỗi khi cập nhật trạng thái. Vui lòng thử lại.');
        }
    };
    
    // Eidt header
    const handleEditHeader = (promotionHeader) => {
        setSelectedPromotion(promotionHeader);
        setEditModalShow(true);
    };
    const handleUpdateHeaderPromotion = async (updatedPromotion) => {
        try {
            const response = await putPromotionHeader(updatedPromotion);
            if (response) {
                setPromotions((prevPromotions) =>
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
    // DELETE HEADER
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
                setPromotions((prevPromotions) =>
                    prevPromotions.filter((promo) => promo?._id !== selectedPromotion?._id),
                );
                toast.success('Xóa chương trình khuyến mãi thành công'); // Hiển thị thông báo thành công
            } else {
                toast.error('Xóa chương trình khuyến mãi thất bại'); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Lỗi khi xóa chương trình khuyến mãi:', error);
            toast.error(error.response?.data?.msg); // Hiển thị thông báo lỗi
        } finally {
            setConfirmDeleteModalShow(false); // Đóng modal xác nhận xóa
        }
    };

    //_________________________________________________________________

    // Toggle Active LINE

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
                setPromotions((prevPromotions) =>
                    prevPromotions.map((header) =>
                        header?._id === selectedPromotion?._id
                            ? { ...header, lines: [...header?.lines, newPromotionLine] }
                            : header,
                    ),
                );

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
    const handleToggleActiveLine = async (promotionLine, index) => {
        const newActiveStatus = !activeStatusLine[index];
        try {
            //const updatedItem = { ...promotionLine, is_active: !promotionLine?.is_active };

            const response = await putActivePromotionLine(promotionLine?._id, newActiveStatus);

            if (response) {
                setPromotions((prev) =>
                    prev.map((p) => (p?._id === promotionLine?._id ? { ...p, is_active: newActiveStatus } : p)),
                );

                // const newActiveStatus = [...activeStatusLine];
                // newActiveStatus[index] = updatedItem?.is_active; // Chỉ cập nhật trạng thái của dòng hiện tại
                setActiveStatusLine((prevStatus) => {
                    const updatedStatus = [...prevStatus];
                    updatedStatus[index] = newActiveStatus;
                    return updatedStatus;
                }); // Cập nhật state với trạng thái mới

                toast.success(response.msg);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);

            // Kiểm tra và in ra lỗi từ response nếu có
            if (error.response && error.response?.data && error.response?.data?.msg) {
                toast.error(error.response?.data?.msg);
            } else {
                toast.error('Bạn không có quyền thực hiện hành động này');
            }
        }
    };

    const handleEditPromotionLine = (promotionLine) => {
        setSelectedPromotionLine(promotionLine); // Lưu dòng khuyến mãi cần chỉnh sửa
        setEditPromotionLineModalShow(true);
    };

    const handleUpdateLinePromotion = async (updatedLine) => {
        try {
            const response = await putPromotionLine(updatedLine);

            if (response && response.promotionLine) {
                const updatedPromotionLine = response.promotionLine; // Dữ liệu dòng khuyến mãi đã cập nhật

                setPromotions((prevPromotions) =>
                    prevPromotions.map((header) => {
                        if (header?._id === updatedPromotionLine?.promotion_header_id) {
                            // Tìm header tương ứng
                            return {
                                ...header,
                                lines: header?.lines.map(
                                    (line) =>
                                        line?._id === updatedPromotionLine?._id
                                            ? { ...line, ...updatedPromotionLine }
                                            : line, // Cập nhật dòng cụ thể
                                ),
                            };
                        }
                        return header; // Trả lại các header khác không thay đổi
                    }),
                );

                toast.success('Cập nhật dòng khuyến mãi thành công');
                setEditPromotionLineModalShow(false);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dòng khuyến mãi:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật dòng khuyến mãi. Vui lòng thử lại sau.');
        }
    };

    const handleDeletePromotionLine = (promotionLine) => {
        setSelectedPromotionHeader(promotionLine);
        setConfirmDeletePromotionLineModalShow(true);
    };
    const handleConfirmDeleteLine = async () => {
        console.log('Before deletion - Current Selected Promotion Line:', selectedPromotionHeader);
        try {
            const response = await deletePromotionApi(selectedPromotionHeader?._id); // Xóa dòng khuyến mãi theo ID
            if (response) {
                // Cập nhật state 'promotions' để xóa dòng khuyến mãi
                setPromotions((prevPromotions) =>
                    prevPromotions.map((header) => {
                        if (header?._id === selectedPromotionHeader?.promotion_header_id) {
                            // Tìm header tương ứng
                            return {
                                ...header,
                                lines: header?.lines.filter((line) => line?._id !== selectedPromotionHeader?._id), // Xóa dòng cụ thể
                            };
                        }
                        return header; // Trả lại các header khác không thay đổi
                    }),
                );

                toast.success('Xóa dòng khuyến mãi thành công'); // Hiển thị thông báo thành công
            } else {
                toast.error('Xóa dòng khuyến mãi thất bại'); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Lỗi khi xóa dòng khuyến mãi:', error);
            toast.error('Có lỗi xảy ra khi xóa dòng khuyến mãi'); // Hiển thị thông báo lỗi
        } finally {
            setConfirmDeletePromotionLineModalShow(false); // Đóng modal xác nhận xóa
        }
    };

    //_________________________________________________
    const handleToggleActiveDetail = async (detail) => {
        const detailId = detail?._id;
        const newActiveStatus = !activeStatusDetail[detailId];
        try {
            // Gọi API để cập nhật trạng thái
            const response = await putActivePromotionDetail(detailId, newActiveStatus);
    
            if (response) {
                // Cập nhật trạng thái `is_active` của `promotions`
                setPromotions((prev) =>
                    prev.map((p) => ({
                        ...p,
                        promotionDetails: p.promotionDetails
                            ? p.promotionDetails.map((d) =>
                                  d?._id === detailId ? { ...d, is_active: newActiveStatus } : d
                              )
                            : [], // Giá trị mặc định là mảng rỗng nếu `promotionDetails` không tồn tại
                    }))
                );
    
                // Cập nhật `activeStatusDetail` cho `detail` hiện tại bằng `detailId`
                setActiveStatusDetail((prevStatus) => ({
                    ...prevStatus,
                    [detailId]: newActiveStatus,
                }));
    
                toast.success('Cập nhật trạng thái thành công!');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật trạng thái. Vui lòng thử lại sau.');
        }
    };
    
    const handleEditPromotionDetail = (detail) => {
        setSelectedPromotionDetail(detail);
        setEditPromotionDetailModalShow(true);
    };
    const handleUpdatePromotionDetail = async (updatedDetail) => {
        try {
            await putPromotionDetail(updatedDetail);

            // Update the promotion detail in state
            setPromotions((prevPromotions) =>
                prevPromotions.map((header) => ({
                    ...header,
                    lines: header?.lines.map((line) => ({
                        ...line,
                        promotionDetails: line.promotionDetails.map((detail) =>
                            detail?._id === updatedDetail?._id ? updatedDetail : detail,
                        ),
                    })),
                })),
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
            await deletePromotionDetailApi(selectedPromotionDetail);

            // Remove the promotion detail from state
            setPromotions((prevPromotions) =>
                prevPromotions.map((header) => ({
                    ...header,
                    lines: header?.lines.map((line) => ({
                        ...line,
                        promotionDetails: line.promotionDetails.filter(
                            (detail) => detail?._id !== selectedPromotionDetail,
                        ),
                    })),
                })),
            );

            toast.success('Xóa chi tiết chương trình khuyến mãi thành công');
            setconfirmDeletePromotionDetailModalShow(false);
        } catch (error) {
            console.error('Xóa thất bại', error);
        }
    };

    const handleAddPromotionDetail = (line) => {
        console.log('Selected Promotion Line:', selectedPromotionLine);
        setSelectedPromotionLine(line); // Chọn dòng khuyến mãi để thêm chi tiết
        setAddPromotionDetailModalShow(true); // Hiện modal
    };

    const handleAddSuccess = (newDetail) => {
        console.log('Adding new detail:', newDetail);

        // Cập nhật selectedPromotionLine
        setSelectedPromotionLine((prevLine) => ({
            ...prevLine,
            details: [...(prevLine.details || []), newDetail.promotionDetail],
        }));

        // Cập nhật promotions
        setPromotions((prevPromotions) => {
            return prevPromotions.map((header) => {
                if (header?._id === selectedPromotionLine.promotion_header_id) {
                    return {
                        ...header,
                        lines: header.lines.map((line) => {
                            if (line?._id === selectedPromotionLine?._id) {
                                return {
                                    ...line,
                                    promotionDetails: [...(line.promotionDetails || []), newDetail.promotionDetail],
                                };
                            }
                            return line;
                        }),
                    };
                }
                return header;
            });
        });
    };
    const [clickedRows, setClickedRows] = useState({});

    const handleRowClick = (id) => {
        setClickedRows((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle trạng thái click
        }));
    };

    const [searchCode, setSearchCode] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredPromotions = promotions.filter((header) => {
        const isCodeMatch = header.promotion_code.includes(searchCode);
        const isActiveMatch = isActive ? header.is_active === 'true' : true;
        const isStartDateMatch = startDate ? new Date(header.start_date) >= new Date(startDate) : true;
        const isEndDateMatch = endDate ? new Date(header.end_date) <= new Date(endDate) : true;

        return isCodeMatch && isActiveMatch && isStartDateMatch && isEndDateMatch;
    });
    return (
        <div>
            <div className={styles.searchPromotion}>
                <div className={styles.searchCode}>
                    <Form.Label className={styles.labelSearch} htmlFor="inputPassword5">
                        Nhập mã chương trình
                    </Form.Label>
                    <Form.Control size="lg" type="text" onChange={(e) => setSearchCode(e.target.value)} />
                </div>
                <div>
                    <Form.Label className={styles.labelSearch}>Trạng thái</Form.Label>
                    <Form.Select
                        size="lg"
                        value={isActive ? 'active' : 'inactive'}
                        onChange={(e) => setIsActive(e.target.value === 'active')}
                    >
                        <option value="active">Ngừng hoạt động</option>
                        <option value="inactive">Hoạt động</option>
                    </Form.Select>
                </div>
                <div>
                    <Form.Label className={styles.labelSearch} htmlFor="inputPassword5">
                        Ngày bắt đầu
                    </Form.Label>
                    <Form.Control size="lg" type="date" onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                    <Form.Label className={styles.labelSearch} htmlFor="inputPassword5">
                        Ngày kết thúc
                    </Form.Label>
                    <Form.Control size="lg" type="date" onChange={(e) => setEndDate(e.target.value)} />
                </div>
            </div>
            <div className={styles.tableWrapperTb}>
                <table  border="1" cellPadding="10" cellSpacing="0" className={styles.tableWrapper}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeadTh}>Mã khuyến mãi</th>
                            <th className={styles.tableHeadTh}>Tên </th>
                            <th className={styles.tableHeadTh}>Mô tả</th>
                            <th className={styles.tableHeadTh}>Ngày bắt đầu</th>
                            <th className={styles.tableHeadTh}>Ngày kết thúc</th>
                            <th className={styles.tableHeadTh}>Trạng thái</th>
                            <th className={styles.tableHeadTh}>Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPromotions.map((header, index) => (
                            <React.Fragment key={header?._id}>
                                {/* Cấp 1: Header */}
                                <tr
                                     onClick={() => {
                                        toggleHeader(header?._id);
                                        handleRowClick(header?._id);
                                    }}
                                    className={`${styles.headerRow} ${openHeaders[header?._id] ? styles.open : ''} ${
                                        clickedRows[header?._id] ? styles.clicked : ''
                                    }`}
                                >
                                    <td className={styles.tableBodyTd}>{header?.promotion_code}</td>
                                    <td className={styles.tableBodyTd}>{header?.name}</td>
                                    <td className={styles.tableBodyTd}>{header?.description}</td>
                                    <td className={styles.tableBodyTd}>
                                        {new Date(header?.start_date).toLocaleDateString()}
                                    </td>
                                    <td className={styles.tableBodyTd}>
                                        {new Date(header?.end_date).toLocaleDateString()}
                                    </td>
                                    <td className={styles.tableBodyTd}>
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <label className={styles.switch}>
                                                <input
                                                    type="checkbox"
                                                    checked={header?.is_active}
                                                    onChange={() => {
                                                        const newStatus = [...activeStatusHeader];
                                                        newStatus[index] = !newStatus[index];
                                                        setActiveStatusHeader(newStatus);
                                                        handleToggleActiveHeader(header);
                                                    }}
                                                />
                                                <span className={`${styles.slider} ${styles.round}`}></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td className={styles.tableTh}>
                                        <div className={styles.dataTableIcon}>
                                            <FaPen
                                                className={styles.iconActionPen}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditHeader(header);
                                                }}
                                            />
                                            <FaTrash
                                                className={styles.iconActionTrash}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteHeader(header);
                                                }}
                                            />
                                            <FaPlusCircle
                                                className={styles.iconActionAdd}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddPromotionLine(header);
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                {openHeaders[header?._id] && (
                                    <tr>
                                        <td colSpan="7">
                                            {/* Bảng cấp 2: Line */}
                                            <div>
                                                <table
                                                    border="1"
                                                    cellPadding="8"
                                                    cellSpacing="0"
                                                    style={{
                                                        width: '100%',
                                                        marginLeft: '20px',
                                                        maxHeight: '200px',
                                                        overflowY: 'auto',
                                                    }}
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th className={styles.tableHeadLineTh}>Loại giảm giá </th>
                                                            <th className={styles.tableHeadLineTh}>
                                                                Mô tả dòng khuyến mãi
                                                            </th>
                                                            <th className={styles.tableHeadLineTh}>Ngày bắt đầu</th>
                                                            <th className={styles.tableHeadLineTh}>Ngày kết thúc</th>
                                                            <th className={styles.tableHeadLineTh}>Trạng thái</th>
                                                            <th className={styles.tableHeadLineTh}>Tác vụ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {header?.lines.map((line, index) => (
                                                            <React.Fragment key={line?._id}>
                                                                <tr
                                                                    onClick={() => toggleLine(header?._id, line?._id)}
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        backgroundColor: '#e9e9e9',
                                                                    }}
                                                                >
                                                                    <td className={styles.tableBodyLineTd}>
                                                                        {line?.discount_type === 1
                                                                            ? 'Giảm giá theo phần trăm'
                                                                            : 'Giảm giá cố định'}
                                                                    </td>
                                                                    <td className={styles.tableBodyLineTd}>
                                                                        {line?.description}
                                                                    </td>
                                                                    <td className={styles.tableBodyLineTd}>
                                                                        {new Date(
                                                                            line?.start_date,
                                                                        ).toLocaleDateString()}
                                                                    </td>

                                                                    <td className={styles.tableBodyLineTd}>
                                                                        {new Date(line?.end_date).toLocaleDateString()}
                                                                    </td>
                                                                    <td className={styles.tableBodyLineTd}>
                                                                        <div onClick={(e) => e.stopPropagation()}>
                                                                            {/* Ngăn chặn sự kiện click lan ra ngoài */}
                                                                            <label className={styles.switch}>
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={activeStatusLine[index] ?? false}
                                                                                    onChange={() => {
                                                                                        // const newStatus = [
                                                                                        //     ...activeStatusLine,
                                                                                        // ];
                                                                                        // newStatus[index] =
                                                                                        //     !newStatus[index]; 
                                                                                        // setActiveStatusLine(newStatus);
                                                                                        handleToggleActiveLine(
                                                                                            line,
                                                                                            index,
                                                                                        );
                                                                                    }}
                                                                                />
                                                                                <span
                                                                                    className={`${styles.slider} ${styles.round}`}
                                                                                ></span>
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className={styles.dataTableIcon}>
                                                                            <FaPen
                                                                                className={styles.iconActionPen}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleEditPromotionLine(line);
                                                                                }}
                                                                            />
                                                                            <FaTrash
                                                                                className={styles.iconActionTrash}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleDeletePromotionLine(line);
                                                                                }}
                                                                            />
                                                                            <FaPlusCircle
                                                                                className={styles.iconActionAdd}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleAddPromotionDetail(line);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                {openLines[header?._id]?.[line?._id] && ( // Sử dụng line._id
                                                                    <tr>
                                                                        <td colSpan="6">
                                                                            {/* Bảng cấp 3: Detail */}
                                                                            <div>
                                                                                <table
                                                                                    border="1"
                                                                                    cellPadding="6"
                                                                                    cellSpacing="0"
                                                                                    style={{
                                                                                        width: '100%',
                                                                                        marginLeft: '40px',
                                                                                    }}
                                                                                >
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th
                                                                                                className={
                                                                                                    styles.tableHeadLineTh
                                                                                                }
                                                                                            >
                                                                                                Cấp bậc
                                                                                            </th>
                                                                                            <th
                                                                                                className={
                                                                                                    styles.tableHeadLineTh
                                                                                                }
                                                                                            >
                                                                                                Phần trăm giảm giá
                                                                                            </th>
                                                                                            <th
                                                                                                className={
                                                                                                    styles.tableHeadLineTh
                                                                                                }
                                                                                            >
                                                                                                Số tiền tối thiểu
                                                                                            </th>
                                                                                            <th
                                                                                                className={
                                                                                                    styles.tableHeadLineTh
                                                                                                }
                                                                                            >
                                                                                                Trạng thái
                                                                                            </th>
                                                                                            <th
                                                                                                className={
                                                                                                    styles.tableHeadLineTh
                                                                                                }
                                                                                            >
                                                                                                Tác vụ
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {line?.promotionDetails?.map(
                                                                                            (
                                                                                                detail,  indexDetails
                                                                                            ) => (
                                                                                                <tr
                                                                                                    key={detail?._id}
                                                                                                    style={{
                                                                                                        backgroundColor:
                                                                                                            '#f9f9f9',
                                                                                                    }}
                                                                                                >
                                                                                                    <td
                                                                                                        className={
                                                                                                            styles.tableBodyLineTd
                                                                                                        }
                                                                                                    >
                                                                                                        {detail
                                                                                                            ?.applicable_rank_id
                                                                                                            ?.rank_name ||
                                                                                                            'Không có cấp bậc'}
                                                                                                    </td>
                                                                                                    <td
                                                                                                        className={
                                                                                                            styles.tableBodyLineTd
                                                                                                        }
                                                                                                    >
                                                                                                        {
                                                                                                            detail?.discount_value
                                                                                                        }
                                                                                                    </td>{' '}
                                                                                                    {/* Ví dụ hiển thị discount_value */}
                                                                                                    <td
                                                                                                        className={
                                                                                                            styles.tableBodyLineTd
                                                                                                        }
                                                                                                    >
                                                                                                        {
                                                                                                            detail?.min_order_value
                                                                                                        }
                                                                                                    </td>
                                                                                                    <td
                                                                                                        className={
                                                                                                            styles.tableBodyLineTd
                                                                                                        }
                                                                                                    >
                                                                                                        <div
                                                                                                            onClick={(
                                                                                                                e,
                                                                                                            ) =>
                                                                                                                e.stopPropagation()
                                                                                                            }
                                                                                                        >
                                                                                                            {/* Ngăn chặn sự kiện click lan ra ngoài */}
                                                                                                            <label
                                                                                                                className={
                                                                                                                    styles.switch
                                                                                                                }
                                                                                                            >
                                                                                                                <input
                                                                                                                    type="checkbox"
                                                                                                                    checked={activeStatusDetail[detail?._id] ?? detail.is_active}
                                                                                                                    onChange={() => {
                                                                                                                        handleToggleActiveDetail(
                                                                                                                            detail,
                                                                                                                            indexDetails,
                                                                                                                        );
                                                                                                                    }}
                                                                                                                />
                                                                                                                <span
                                                                                                                    className={`${styles.slider} ${styles.round}`}
                                                                                                                ></span>
                                                                                                            </label>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <div
                                                                                                            className={
                                                                                                                styles.dataTableIcon
                                                                                                            }
                                                                                                        >
                                                                                                            <FaPen
                                                                                                                className={
                                                                                                                    styles.iconActionPen
                                                                                                                }
                                                                                                                onClick={(
                                                                                                                    e,
                                                                                                                ) => {
                                                                                                                    e.stopPropagation();
                                                                                                                    handleEditPromotionDetail(
                                                                                                                        detail,
                                                                                                                    );
                                                                                                                }}
                                                                                                            />
                                                                                                            <FaTrash
                                                                                                                className={
                                                                                                                    styles.iconActionTrash
                                                                                                                }
                                                                                                                onClick={(
                                                                                                                    e,
                                                                                                                ) => {
                                                                                                                    e.stopPropagation();
                                                                                                                    handleDeletePromotionDetail(
                                                                                                                        detail,
                                                                                                                    );
                                                                                                                }}
                                                                                                            />
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            ),
                                                                                        )}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
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
            <AddPromotionLine
                show={addPromotionModalShow}
                promotionHeader={selectedPromotion} // Truyền promotion header đã chọn
                onHide={() => setAddPromotionModalShow(false)}
                onSubmit={handleAddPromotionLineSubmit} // Hàm này để xử lý gửi form
            />
            <AddPromotionDetail
                show={addPromotionDetailModalShow}
                onHide={() => setAddPromotionDetailModalShow(false)}
                promotionHeader={selectedPromotionLine}
                onSuccess={handleAddSuccess} // Đảm bảo hàm này được gọi khi thêm thành công
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

export default TestComponent;
