/* eslint-disable import/order */
import React from "react";

import { Form, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import DefaultLayout from "Component/DefaultLayout";
import { ConfirmModal } from "Component/Modal/ConfirmModal";
import { PayModal } from "Component/Modal/PayModal";
import { cart } from "Type/Type";
import axiosClient from "api/axiosClient";
import { orderValue } from "utils/OrderValue";

import { cartSelector } from "../../redux/selector";


import './style.scss';
import { deleteCart, updateCart } from "./CartSlice";
export default function Cart() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(cartSelector);
    // const [products, setProducts] = React.useState<cart[]>([]);
    const [order, setOder] = React.useState<cart[]>([]);
    const [show, setShow] = React.useState('');
    const [deleteItem, setDeleteItem] = React.useState(0);
    const handleCloseModal = () => {
        setShow('');
        setDeleteItem(0);
    };
    const changeValue = (id: number, title: string, value: unknown) => {
        console.log(id);
        dispatch(updateCart(products.map((product, index) => {
            return index === id ? {
                ...product,
                [title]: value
            } : product;
        })));

    };
    const handleDeleteOrder = async () => {
        try {
            await axiosClient.delete(`card/delete/${deleteItem}`);
            dispatch(deleteCart(deleteItem));
        } catch (e) {
            console.error(e);
        }
    };
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`card/list-all/${id}`);
                dispatch(updateCart(response.data));
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);
    console.log(order.length);
    const handlePay = async () => {
        console.log(1);

    };
    const handleOpenDeleteModal = (id: number) => {
        setDeleteItem(id);
        setShow('delete');
    };
    return (
        <div className="cart">
            <DefaultLayout>
                <div className="">
                    {products?.map((product, index) => (
                        <div className="product-item" key={index}>
                            <Form.Check onChange={(e) => {
                                e.target.checked ? setOder([...order, product]) : setOder(() => {
                                    return order.filter((item) => item.product.id !== product.product.id);
                                });
                            }} />
                            <img src={product?.product?.image} alt="product" className="product-item-img" />
                            <p className="product-item-title">
                                {product.product.title}
                            </p>
                            <div className="product-item-quantity">
                                <p role="presentation" onClick={() => {
                                    product.quantity > 1 ? changeValue(index, 'quantity', product.quantity - 1) : changeValue(index, 'qauntity', 1);
                                }}>-</p>
                                <FormControl type="number" value={product.quantity} onChange={(e) => changeValue(index, 'quantity', parseInt(e.target.value))} className="quantity" />
                                <p role="presentation" onClick={() => changeValue(index, 'quantity', product.quantity + 1)}>+</p>
                            </div>
                            <p className="product-item-price">
                                {product.product.price * product.quantity} $
                            </p>
                            <Button variant="danger" onClick={() => handleOpenDeleteModal(product.id)}>Delete</Button>
                        </div>
                    ))}

                </div>
                <PayModal show={show === 'order'} onClose={handleCloseModal} order={order} onConfirm={handlePay} />
                <ConfirmModal show={show === 'delete'} onClose={handleCloseModal} onConfirm={handleDeleteOrder} modalContent="Are you sure delete this product ?" />
            </DefaultLayout>
            {
                order.length > 0 ?
                    <div className="order">
                        <p className="order-title">Total order value</p>
                        <p className="order-value">{orderValue(order)} $</p>
                        <p className="order-product">Total {order.length} products</p>
                        <Button onClick={() => setShow('order')}>Order</Button>
                    </div>
                    : <></>
            }
        </div>
    );
}