import React, { useEffect } from 'react';

import Banner from '~/components/Banner';
import { AboutShop, Bestsellers, Blog, BrandProduct, FeaturedProduct, Subscribe } from '~/components/Section';
import withBaseComponent from '~/components/hocs/withBaseComponent';
import { getBestSellers, getCategory, getNewProduct } from '~/redux/action';

const Home = ({ dispatch }) => {
    useEffect(() => {
        dispatch(getCategory());
        dispatch(getBestSellers());
        dispatch(getNewProduct());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="text-white bg-black">
                <Banner />
                <Bestsellers />
            </div>
            <div className="">
                <FeaturedProduct />
                <BrandProduct category="Điện thoại" />
                <BrandProduct category="Ipad" />
                <Subscribe />
                <AboutShop />
                <Blog />
            </div>
        </div>
    );
};

export default withBaseComponent(Home);
