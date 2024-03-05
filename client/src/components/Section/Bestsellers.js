import React, { memo } from 'react';

import { useSelector } from 'react-redux';
import { productSelector } from '~/redux/selector';
import images from '~/assets/images';
import { QuickProduct } from '../Product';

const Bestsellers = () => {
    const { bestSellers } = useSelector(productSelector);
    return (
        <div className="relative max-w-main w-full mx-auto py-3 overflow-hidden">
            <img className="absolute top-[-26%] left-[60%] z-[-1]" src={images.blurCircle} alt="" />
            <div className="max-w-main w-full mx-auto z-10">
                <div className="grid wide">
                    <div className="row">
                        <div className="col g-l-3 g-m-3">{/* <DailySale /> */}sale</div>
                        <div className="col g-l-9 g-m-9">
                            <QuickProduct />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Bestsellers);
