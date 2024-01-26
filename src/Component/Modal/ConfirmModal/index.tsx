import React from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
interface Props {
    show :boolean;
    modalContent: string;
    onClose : () => void,
    onConfirm : () => void
    
}
export function ConfirmModal(props : Props) {
    const {show, onClose,onConfirm,modalContent} = props;
    return (
        <React.Fragment>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        onConfirm();
                        onClose();
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}