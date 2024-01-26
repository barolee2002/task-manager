/* eslint-disable no-unused-vars */
import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import AutoComplete from "Component/AutoComplete";
import { task } from "Type/Type";
interface Props {
    show: boolean;
    modalTitle: string;
    onClose: () => void;
    task: task;
    onChangeInfo: (title: string, value: unknown) => void;
    categories: string[];
    onConfirm: () => void;
}
export default function TaskModal(props: Props) {

    const { show, onClose, modalTitle, onChangeInfo, onConfirm, task ,categories} = props;
    return (
        <React.Fragment>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="machine learning" value={task.title} onChange={(e) => onChangeInfo('title', e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Category</Form.Label>
                            <AutoComplete 
                                value={task.category} 
                                options={categories} 
                                onChange={(e) => onChangeInfo('category', e)} 
                                onInputChange={(e) => onChangeInfo('category', e)} 
                                placeholder="Enter category" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
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