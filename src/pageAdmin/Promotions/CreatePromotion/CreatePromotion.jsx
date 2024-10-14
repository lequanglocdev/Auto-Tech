import React from 'react';
import styles from './CreatePromotion.module.css';
import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import icons from '@/utils/icon';
import { Button, Form, Modal } from 'react-bootstrap';
import useCreatePromotionForm from './hooks/useCreatePromotionForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CreatePromotion = () => {
    const navigate = useNavigate();
    const { FaPlusCircle, MdArrowBackIos } = icons;

    const { formData, errors, ranks, handleChange, handleSubmit } = useCreatePromotionForm();

    const handleListCustomer = () => {
        navigate('/promotion');
    };

    return (
        <div>
            <div className={styles.createPromotion}>
                <MdArrowBackIos onClick={handleListCustomer} className={styles.createPromotionIcon} />
                <Breadcrumb
                    items={['Quản lý chương trình khuyến mãi', 'Thêm mới chương trình khuyến mãi']}
                    activeItem="Thêm mới chương trình khuyến mãi"
                />
            </div>
            <div className={styles.createPromotionBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="promotionCode">
                        <Form.Label className={styles.labelText}>Mã khuyến mãi</Form.Label>
                        <Form.Control
                            type="text"
                            name="promotionCode"
                            placeholder="Nhập mã khuyến mãi"
                            size="lg"
                            value={formData.promotionCode}
                            onChange={handleChange}
                            isInvalid={!!errors.promotionCode}
                        />
                        <Form.Control.Feedback type="invalid">{errors.promotionCode}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label className={styles.labelText}>Tên chương trình khuyến mãi</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập tên chương trình khuyến mãi"
                            size="lg"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label className={styles.labelText}>Mô tả</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Nhập mô tả"
                            size="lg"
                            value={formData.description}
                            onChange={handleChange}
                            isInvalid={!!errors.description}
                            rows={3}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="applicableRankId">
                        <Form.Label className={styles.labelText}>Hạng khách hàng áp dụng</Form.Label>
                        <Form.Control
                            size="lg"
                            as="select"
                            name="applicableRankId"
                            value={formData.applicableRankId}
                            onChange={handleChange}
                            isInvalid={!!errors.applicableRankId}
                        >
                            <option value="">Chọn hạng khách hàng</option>
                            {ranks.map((rank) => (
                                <option key={rank.id} value={rank._id}>
                                    {rank.rank_name}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.applicableRankId}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="isActive">
                        <Form.Label className={styles.labelText}>Trạng thái</Form.Label>
                        <Form.Check
                            type="checkbox"
                            name="isActive"
                            label="Kích hoạt"
                            checked={formData.isActive}
                            onChange={(e) => handleChange({ target: { name: 'isActive', value: e.target.checked } })}
                            isInvalid={!!errors.isActive}
                        />
                        <Form.Control.Feedback type="invalid">{errors.isActive}</Form.Control.Feedback>
                    </Form.Group>

                    <button type="submit" className={styles.btnAdd}>
                        <FaPlusCircle />
                        Thêm
                    </button>
                </Form>
            </div>

            <ToastContainer />
        </div>
    );
};

export default CreatePromotion;
