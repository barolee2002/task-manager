import React from "react";

import { Button, Modal, FormControl } from 'react-bootstrap';

import { cart } from "Type/Type";
import { orderValue } from "utils/OrderValue";

import './style.scss';
interface Props {
    show: boolean;
    order: cart[];
    onClose: () => void,
    onConfirm: () => void

}
export function PayModal(props: Props) {
    const { show, onClose, onConfirm, order } = props;
    return (
        <React.Fragment>
            <Modal show={show} onHide={onClose} className="pay-modal">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    {order?.map((item, index) => (
                        <div className="product-item" key={index}>
                            <img src={item?.product?.image} alt="product" className="product-item-img" />
                            <p className="product-item-title">
                                {item.product.title}
                            </p>

                            <div className="product-item-quantity">
                                <FormControl disabled type="number" value={item.quantity} className="quantity" />
                            </div>
                            <p className="product-item-price">
                                {item.product.price * item.quantity} $
                            </p>
                        </div>
                    ))}
                    <div className="total">
                        <p className="total-title">Total :</p>
                        <p className="total-value">{orderValue(order)} $</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        onConfirm();
                        onClose();
                    }}>
                        Pay
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}