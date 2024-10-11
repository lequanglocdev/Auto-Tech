import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import React from 'react';
import styles from './CreateRank.module.css';
import { Form } from 'react-bootstrap';
import icons from '@/utils/icon';
import useCreateRank from './hooks/useCreateRank';
import { useNavigate } from 'react-router-dom';
const CreateRank = () => {
    const navigate = useNavigate();
    const { FaPlusCircle, MdArrowBackIos } = icons;
    const { formData, errors, handleChange, handleSubmit } = useCreateRank();
    const handleListRank = () => {
        navigate('/rank');
    };
    return (
        <div>
            <div className={styles.createRank}>
                <MdArrowBackIos onClick={handleListRank} className={styles.createRankIcon} />
                <Breadcrumb
                    items={['Quản lý hạng khách hàng', 'Thêm mới hạng khách hàng']}
                    activeItem="Thêm mới hạng khách hàng"
                />
            </div>
            <div className={styles.createRankBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="rank_name">
                        <Form.Label className={styles.labelText}>Hạng</Form.Label>
                        <Form.Control
                            type="text"
                            name="rank_name"
                            placeholder="nhập thứ hạng"
                            size="lg"
                            value={formData.rank_name}
                            onChange={handleChange}
                            isInvalid={!!errors.rank_name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.rank_name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="discount_rate">
                        <Form.Label className={styles.labelText}>Giảm giá</Form.Label>
                        <Form.Control
                            type="text"
                            name="discount_rate"
                            placeholder="nhập giảm giá"
                            size="lg"
                            value={formData.discount_rate}
                            onChange={handleChange}
                            isInvalid={!!errors.discount_rate}
                        />
                        <Form.Control.Feedback type="invalid">{errors.discount_rate}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="min_spending">
                        <Form.Label className={styles.labelText}>Phí tối thiểu</Form.Label>
                        <Form.Control
                            type="text"
                            name="min_spending"
                            placeholder="Nhập phí tối thiểu"
                            size="lg"
                            value={formData.min_spending}
                            onChange={handleChange}
                            isInvalid={!!errors.min_spending}
                        />
                        <Form.Control.Feedback type="invalid">{errors.min_spending}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label className={styles.labelText}>Mô tả</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Nhập mô tả"
                            size="lg"
                            value={formData.description}
                            onChange={handleChange}
                            isInvalid={!!errors.description}
                            as="textarea"
                            rows={3}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>

                    <button type="submit" className={styles.btnAdd}>
                        <FaPlusCircle />
                        Thêm
                    </button>
                </Form>
            </div>
        </div>
    );
};

export default CreateRank;
