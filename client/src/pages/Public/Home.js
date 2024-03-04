import React, { useEffect } from 'react';

import Banner from '~/components/Banner';
import { Bestsellers } from '~/components/Section';
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
            </div>
            <Bestsellers />
        </div>
    );
};

export default withBaseComponent(Home);
