import React, { memo } from 'react';

import { useSelector } from 'react-redux';
import { productSelector } from '~/redux/selector';
import images from '~/assets/images';
import { QuickProduct } from '../Product';

const Bestsellers = () => {
    const { bestSellers } = useSelector(productSelector);
    return (
        <div className="relative pb-[34px]">
            <img className="absolute top-[-20%] left-[45%] translate-x-[-50%] z-[-1]" src={images.blurCircle} alt="" />
            <div className="max-w-main w-full mx-auto px-[15px] pb-[34px] z-10">
                <div className="grid wide">
                    <div className="row">
                        <div className="col g-l-3">{/* <DailySale /> */}</div>
                        <div className="col g-l-9">
                            <QuickProduct />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Bestsellers);
