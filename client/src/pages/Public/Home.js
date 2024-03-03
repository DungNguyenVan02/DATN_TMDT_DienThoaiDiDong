import React, { useEffect } from 'react';
import Banner from '~/components/Banner';
import withBaseComponent from '~/components/hocs/withBaseComponent';
import { getCategory } from '~/redux/action';

const Home = ({ dispatch }) => {
    useEffect(() => {
        dispatch(getCategory());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="text-white bg-black h-[700px]">
            <Banner />
        </div>
    );
};

export default withBaseComponent(Home);
