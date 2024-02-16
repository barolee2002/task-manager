/* eslint-disable no-unused-vars */
import React from "react";

import { Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import ReactStars from 'react-stars';


import Notification from "Component/Alert";
import DefaultLayout from "Component/DefaultLayout";
import { PayModal } from "Component/Modal/PayModal";
import Slider from "Component/Slider";
import { product } from "Type/Type";
import axiosClient from "api/axiosClient";

import './style.scss';
import { user } from "../../redux/selector";
export default function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const current = new Date().toString();
    const url = window.location.pathname;
    const userLogin = useSelector(user);
    const [product, setProduct] = React.useState<product>({} as product);
    const [quantity, setQuantity] = React.useState(1);
    const [show, setShow] = React.useState('');
    const [variant, setVariant] = React.useState('success');
    const [notiString, setNotiString] = React.useState("");
    const [sameProduct, setSameProduct] = React.useState<product[]>([]);
    const handleCloseModal = () => {
        setShow('');
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axiosClient.get(`product/${id}`);
            setProduct(response.data);
            const sameProduct = await axiosClient.get(`product/same-product/${response.data.category}`);
            setSameProduct(sameProduct.data);

        };
        fetchData();
    }, [id]);
    const handleAddToCard = async () => {

        try {
            userLogin.id ?
                await axiosClient.post(`card/save/${userLogin.id}`, {
                    productId: product.id,
                    quantity: quantity
                }) : navigate(`/sign-in?next=${url}`);
            setShow('noti');
            setNotiString("Success add to card");
        } catch (e) {
            console.error(e);
        }
    };
    const handleBuyNow = () => {
        userLogin.id ?setShow('buy') : navigate(`/sign-in?next=${url}`);
    };
    const handleBuy = async () => {
        console.log(1);

    };
    return (
        <div>
            <Notification variant={variant} show={show === "noti"} noti={notiString} />

            <DefaultLayout>
                <div className="product-detail">
                    <img src={product.image} alt="product" className="product-detail-img" />
                    <div className="product-detail-content">
                        <p className="product-detail-content-title">{product.title}</p>
                        <div className="product-detail-content-rating">

                            <ReactStars count={5} value={product.rating?.rate} size={24} />

                            <p className="count-rate">{product.rating?.count} rates</p>

                        </div>
                        <div className="price-wrapper">
                            <p className="price-wrapper-price">{product.price} $</p>
                            <div className="price-wrapper-quantity">
                                <p role="presentation" onClick={() => {
                                    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
                                }}>-</p>
                                <FormControl type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="quantity" />
                                <p role="presentation" onClick={() => setQuantity(quantity + 1)}>+</p>
                            </div>
                            <p className="price-wrapper-description">{product.description}</p>
                            <div className="price-wrapper-btns">
                                <Button onClick={handleAddToCard}>Add to card</Button>
                                <Button onClick={handleBuyNow}>Buy now</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slider-product">

                    <Slider products={sameProduct.filter(item => item.id !== product.id)} interval={2000} />
                </div>
                <PayModal
                    show={show === 'buy'}
                    onClose={handleCloseModal}
                    onConfirm={handleBuy}
                    order={[
                        {
                            id :0,
                            product,
                            quantity,
                            createAt : current
                        }]}
                />
            </DefaultLayout>
        </div>
    );
}