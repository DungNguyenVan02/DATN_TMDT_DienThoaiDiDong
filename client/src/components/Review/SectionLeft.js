import React from 'react';
import { renderStar } from '~/utiles/helper';

const SectionLeft = ({ data }) => {
    return (
        <div className="h-[200px] flex flex-col items-center justify-center border-r-[3px] mx-5">
            <h3 className="text-[34px] font-semibold">{data?.totalRatings}/5</h3>
            <div className="flex gap-3">
                {renderStar(data?.totalRatings)?.map((item, i) => (
                    <i key={i}>{item}</i>
                ))}
            </div>
            <p className="text-[#0c53b7] underline">{data?.ratings?.length} đánh giá</p>
        </div>
    );
};

export default SectionLeft;
