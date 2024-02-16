import React from 'react';

import { useNavigate } from 'react-router';
import ReactStars from 'react-stars';

import { product } from "Type/Type";

import './style.scss';
interface Props {
    products: product[],
    interval: number;
}
export default function Slider({ products, interval = 3000 }: Props) {
    const navigate = useNavigate();
    const [showProducts, setShowProducts] = React.useState([0, 1, 2, 3, 4]);
    const nextProduct = () => {
        showProducts[4] >= products.length - 1 ?
            setShowProducts([0, 1, 2, 3, 4]) :
            setShowProducts(showProducts.flatMap(x => x + 1));
    };

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            nextProduct();
        }, interval);

        return () => {
            clearInterval(intervalId);
        };
    }, [showProducts, interval]);

    return (
        <div className="slider">
            {showProducts?.map((itemNumber, index) => (
                <React.Fragment key={index}>
                    {
                        products[itemNumber] !== undefined ?
                            < div role='presentation' className="slider-item" key={index} onClick={() => navigate(`/admin/home/product/${products[itemNumber].id}`)}>
                                <img src={products[itemNumber]?.image} alt="" className="slider-item-img" />
                                <p className='slider-item-title'>{products[itemNumber]?.title}</p>
                                <p className='slider-item-price'>{products[itemNumber]?.price} $</p>
                                <ReactStars count={5} value={products[itemNumber]?.rating?.rate} size={16} className='slider-item-rate' />
                            </div> : null
                    }
                </React.Fragment>
            ))}
        </div >
    );
}