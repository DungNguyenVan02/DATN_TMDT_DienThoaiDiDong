import React, { memo, useEffect, useState } from 'react';
import { apiGetProducts } from '~/apis/products';

import Slider from '../Slider';
import { SwiperSlide } from 'swiper/react';
import { ProductCard } from '../Product';

const FeaturedProduct = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await apiGetProducts({
            limit: 20,
            sort: '-totalRatings',
        });

        if (response.success) {
            setProducts(response.products);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className="max-w-main w-full mx-auto py-3">
            <div className="flex justify-between underline-heading">
                <h3 className="mb-4  text-[34px] font-semibold text-gradient">Sản phẩm nổi bật</h3>
                <button className="hover:underline hover:text-blue-500">Tất cả</button>
            </div>
            <div className="mt-5">
                <Slider isLoop={false} showLg={5}>
                    {products.map((item) => {
                        return (
                            <SwiperSlide key={item._id}>
                                <div className="w-full">
                                    <ProductCard data={item} />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
};

export default memo(FeaturedProduct);
