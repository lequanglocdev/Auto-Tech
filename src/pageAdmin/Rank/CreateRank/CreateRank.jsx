import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import React from 'react';
import styles from './CreateRank.module.css'
import { Form } from 'react-bootstrap';
import icons from '@/utils/icon';
import useCreateRank from './hooks/useCreateRank';
const CreateRank = () => {
    const { FaPlusCircle } = icons;
    const {
        formData,
        errors,
        handleChange,
        handleSubmit,
    } = useCreateRank();

    return (
        <div>
            <div className={styles.createRank}>
                <Breadcrumb items={['Quản lý hạng khách hàng', 'Thêm mới hạng khách hàng']} activeItem="Thêm mới hạng khách hàng" />
            </div>
            <div className={styles.createRankBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="rank_name">
                        <Form.Label className={styles.labelText}>Mã nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="rank_name"
                            placeholder="Nhập mã nhân viên"
                            size="lg"
                            value={formData.rank_name}
                            onChange={handleChange}
                            isInvalid={!!errors.rank_name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.rank_name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="discount_rate">
                        <Form.Label className={styles.labelText}>Tên nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="discount_rate"
                            placeholder="Nhập tên nhân viên"
                            size="lg"
                            value={formData.discount_rate}
                            onChange={handleChange}
                            isInvalid={!!errors.discount_rate}
                        />
                        <Form.Control.Feedback type="invalid">{errors.discount_rate}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label className={styles.labelText}>Mật khẩu</Form.Label>
                        <Form.Control
                            type="text"
                            name="min_spending"
                            placeholder="Nhập mật khẩu"
                            size="lg"
                            value={formData.min_spending}
                            onChange={handleChange}
                            isInvalid={!!errors.min_spending}
                        />
                        <Form.Control.Feedback type="invalid">{errors.min_spending}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label className={styles.labelText}>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Nhập description"
                            size="lg"
                            value={formData.description}
                            onChange={handleChange}
                            isInvalid={!!errors.description}
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
