import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiGetProducts } from '~/apis/products';
import { ProductCard } from '~/components/Product';
import { FilterProduct } from '~/components/common';
import withBaseComponent from '~/components/hocs/withBaseComponent';
import routes from '~/config/routes';
import icons from '~/utiles/icons';

const Products = (location) => {
    const { GoArrowLeft } = icons;
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const fetchProducts = async (queries) => {
        const response = await apiGetProducts(queries);
        if (response.success) {
            setProducts(response.products);
        }
    };

    useEffect(() => {
        const queries = Object.fromEntries([...searchParams]);
        fetchProducts(queries);
    }, [searchParams]);

    return (
        <>
            <div className="bg-black mt-[-74px] pt-[200px] pb-[50px] text-white">
                <div className="max-w-main w-full mx-auto px-[15px]">
                    <div className="flex  flex-col gap-6">
                        <Link to={routes.home} className="cursor-pointer hover:opacity-85 flex items-center gap-2">
                            <i className="p-3 border rounded-full">{<GoArrowLeft />}</i>
                            <span>Trờ về trang chủ</span>
                        </Link>

                        <Link to={location.pathname} className="cursor-pointer hover:opacity-85">
                            <span className="text-gradient text-[34px]">Tất cả</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="max-w-main w-full mx-auto px-[15px] py-[34px]">
                <div className="grid wide">
                    <div className="row">
                        <div className="col g-m-3">
                            <FilterProduct />
                        </div>
                        <div className="col g-m-9">
                            <div className="grid wide">
                                <div className="row">
                                    {products.map((product) => {
                                        return (
                                            <div
                                                key={product._id}
                                                className=" mt-3 hover:-translate-y-[2px] transitionAll col g-l-3"
                                            >
                                                <ProductCard
                                                    customStyles="relative border border-blue-500 product-card-inner w-full p-2 overflow-hidden cursor-pointer"
                                                    data={product}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withBaseComponent(Products);
