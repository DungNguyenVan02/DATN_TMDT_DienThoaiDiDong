import React, { memo, useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { apiGetProducts } from '~/apis/products';
import Slider from '~/components/Slider';
import { ProductCard } from '../Product';

const BrandProduct = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [brandShow, setBrandShow] = useState('Apple');

    const fetchProducts = async () => {
        const response = await apiGetProducts({
            category: category,
            brand: brandShow,
        });

        if (response?.success) {
            setProducts(response.products);
        }
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brandShow]);
    return (
        <div className="max-w-main w-full mx-auto py-3">
            <div className="flex justify-between underline-heading">
                <h3 className="mb-4  text-[34px] font-semibold text-gradient">
                    {category === 'Ipad' ? category : brandShow}
                </h3>
                <div className="flex items-center gap-3">
                    {category !== 'Ipad' && (
                        <ul className="flex items-center gap-2">
                            <li
                                className={`py-1 px-3 border cursor-pointer hover:bg-none hover:text-blue-500 rounded-lg bg-gradient-custom-2 ${brandShow === 'Apple' ? 'border-blue-900' : ''}`}
                                onClick={() => setBrandShow('Apple')}
                            >
                                Apple
                            </li>
                            <li
                                className={`py-1 px-3 border cursor-pointer hover:bg-none hover:text-blue-500 rounded-lg bg-gradient-custom-2 ${brandShow === 'Samsung' ? 'border-blue-900' : ''}`}
                                onClick={() => setBrandShow('Samsung')}
                            >
                                Samsung
                            </li>
                            <li
                                className={`py-1 px-3 border cursor-pointer hover:bg-none hover:text-blue-500 rounded-lg bg-gradient-custom-2 ${brandShow === 'Sonny' ? 'border-blue-900' : ''}`}
                                onClick={() => setBrandShow('Sonny')}
                            >
                                Sonny
                            </li>
                            <li
                                className={`py-1 px-3 border cursor-pointer hover:bg-none hover:text-blue-500 rounded-lg bg-gradient-custom-2 ${brandShow === 'HTC' ? 'border-blue-900' : ''}`}
                                onClick={() => setBrandShow('HTC')}
                            >
                                HTC
                            </li>
                        </ul>
                    )}
                    <button className="hover:underline hover:text-blue-500">Tất cả</button>
                </div>
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

export default memo(BrandProduct);
