import React from 'react';
import VoteBar from './VoteBar';

const SectionRight = ({ data }) => {
    // console.log(data);
    return (
        <div className="flex flex-col-reverse items-center justify-center gap-3 h-[200px]">
            {Array.from(Array(5).keys()).map((item, i) => {
                return (
                    <VoteBar
                        key={item}
                        number={item + 1}
                        ratingCount={data?.ratings?.length}
                        ratingTotal={data?.ratings?.filter((item) => item.star === i + 1)?.length}
                    />
                );
            })}
        </div>
    );
};

export default SectionRight;
