/* eslint-disable no-unused-vars */
import React from "react";

import { InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

import DefaultLayout from "Component/DefaultLayout";
import PaginationBasic from "Component/Pagination";
import { metadata, product } from "Type/Type";
import axiosClient from "api/axiosClient";

import './style.scss';
import { useDebounce } from "../../hook";

export default function Home() {
    const navigate = useNavigate();
    const [searchString, setSeachString] = React.useState('');
    const debounceValue = useDebounce(searchString, 500);
    const [products, setProducts] = React.useState<product[]>([]);
    const [metadata, setMetadata] = React.useState<metadata>({} as metadata);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const handleChangePage = (page: number) => {
        setPage(page);
        setPageSize(pageSize);
    };
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axiosClient.get(`product/get-all`,
                {
                    params: {
                        searchString: searchString,
                        page: page,
                        pageSize: pageSize
                    }
                });
            setProducts(response.data.data);
            setMetadata({
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
                elements: response.data.elements,
            });
        };
        fetchData();
    }, [debounceValue,page, pageSize]);
    return (
        <div className="home">
            <DefaultLayout>
                <div>
                    
                    <div className="search-box">
                        <InputGroup>
                            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                            <Form.Control
                                placeholder="Enter title or category"
                                onChange={(e) => {
                                    setTimeout(() => {
                                        setSeachString(e.target.value);
                                    }, 500);
                                }}
                            />
                        </InputGroup>
                    </div>
                    <div className="products">
                        {products?.map((product, index) => (
                            <div
                                role="presentation"
                                className="products-product-item"
                                key={index}
                                onClick={() => navigate(`product/${product.id}`)}
                            >
                                <img src={product.image} className="products-product-item-img" alt="product" />
                                <div className="products-product-item-content">
                                    <p className="product-title">{product.title}</p>
                                    <p className="product-price">{product.price} $</p>
                                    <p className="product-rating">rate : {product.rating?.rate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pagination d-flex justify-content-center">
                        <PaginationBasic totalPages={metadata.totalPages} onChangePage={(page: number) => handleChangePage(page)} currentPage={page} />
                    </div>
                </div>
            </DefaultLayout>
        </div>
    );
}