import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Slider from '~/components/Slider';
import { productSelector } from '~/redux/selector';

const QuickProduct = () => {
    const { newProducts, bestSellers } = useSelector(productSelector);

    const [active, setActive] = useState(1);

    return (
        <div>
            <div className="flex mb-4  underline-heading">
                <span
                    className={`px-4 py-2 text-[24px] font-semibold cursor-pointer hover:text-blue-600  ${active === 1 ? 'text-blue-600' : ''}`}
                    onClick={() => setActive(1)}
                >
                    Sản phẩm bán chạy
                </span>
                <span
                    className={`px-4 py-2 text-[24px] font-semibold cursor-pointer hover:text-blue-600  ${active === 2 ? 'text-blue-600' : ''}`}
                    onClick={() => setActive(2)}
                >
                    Sản phẩm mới
                </span>
            </div>
            <div className="w-full">
                <Slider data={active === 1 ? bestSellers : newProducts} showLg={4} showMd={2} showSm={1} />
            </div>
        </div>
    );
};

export default QuickProduct;
