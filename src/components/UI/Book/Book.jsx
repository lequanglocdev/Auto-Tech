import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Book = ({setShow,show}) => {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
           
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Book;
