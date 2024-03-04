import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Slider from '~/components/Slider';
import { productSelector } from '~/redux/selector';

const QuickProduct = () => {
    const { newProducts, bestSellers } = useSelector(productSelector);
    const [data, setData] = useState(newProducts);
    const [active, setActive] = useState(1);
    useEffect(() => {
        if (active === 1) {
            setData(newProducts);
        }
        if (active === 2) {
            setData(bestSellers);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);
    return (
        <div>
            <div className="flex gap-3  underline-heading">
                <span
                    className={`px-4 py-2 text-[24px] font-semibold cursor-pointer hover:text-blue-600 ${active === 1 ? 'text-blue-600' : ''}`}
                    onClick={() => setActive(1)}
                >
                    Sản phẩm bán chạy
                </span>
                <span
                    className={`px-4 py-2 text-[24px] font-semibold cursor-pointer hover:text-blue-600 ${active === 2 ? 'text-blue-600' : ''}`}
                    onClick={() => setActive(2)}
                >
                    Sản phẩm mới
                </span>
            </div>
            <div className="py-4">
                <Slider data={data} showLg={4} showMd={2} showSm={1} />
            </div>
        </div>
    );
};

export default QuickProduct;
