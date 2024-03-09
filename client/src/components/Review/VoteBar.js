import React, { useEffect, useRef } from 'react';
import icons from '~/utiles/icons';

const VoteBar = ({ ratingCount, ratingTotal, number }) => {
    console.log(ratingTotal);
    const { BsStarFill } = icons;
    const innerPercent = useRef();

    useEffect(() => {
        const percent = (ratingCount / ratingTotal) * 100 + '%';
        innerPercent.current.style.width = percent;

        return () => {
            if (innerPercent.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                innerPercent.current.style.width = 0;
            }
        };
    }, [ratingTotal, ratingCount]);
    return (
        <div className="flex w-full items-center gap-3 text-sm text-gray-700">
            <div className="flex items-center">
                <p className="w-4 text-center">{number}</p>
                <BsStarFill color="orange" />
            </div>
            <div className="flex-1">
                <div className="w-full h-2 bg-gray-300 rounded-xl overflow-hidden relative">
                    <span ref={innerPercent} className="absolute left-0 h-full bg-gradient-custom"></span>
                </div>
            </div>
            <div>{`${ratingTotal || 0} reviewers`}</div>
        </div>
    );
};

export default VoteBar;
