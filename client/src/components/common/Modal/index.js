import React, { memo } from 'react';
import withBaseComponent from '~/components/hocs/withBaseComponent';
import { showModal } from '~/redux/slice/appSlice';

const Modal = ({ dispatch, children }) => {
    return (
        <div
            className="absolute top-0 left-0 bottom-0 right-0 bg-overlay z-[9999999] flex items-center justify-center"
            onClick={() => dispatch(showModal(false))}
        >
            {children}
        </div>
    );
};

export default withBaseComponent(memo(Modal));
