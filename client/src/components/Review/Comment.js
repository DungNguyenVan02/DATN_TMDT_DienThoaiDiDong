import { memo } from 'react';
import { renderStar } from '~/utiles/helper';
import icons from '~/utiles/icons';

const Comment = ({ data }) => {
    const { GoClock } = icons;

    return (
        <div className="col g-m-12 g-l-12 g-c-12 border-b py-5">
            <div className="flex justify-between items-center px-5">
                <div className="flex items-center gap-2">
                    {data?.postedBy?.avatar ? (
                        <img
                            className="w-[40px] h-[40px] object-cover shadow-md rounded-md"
                            src={data?.postedBy?.avatar}
                            alt=""
                        />
                    ) : (
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-md bg-gradient-custom">
                            {data?.postedBy?.fullName.slice(0, 1)}
                        </div>
                    )}
                    <div>
                        <h3 className="text-[18px] text-gradient font-semibold">{data?.postedBy?.fullName}</h3>
                        <div className="flex items-center gap-1">
                            {renderStar(data?.star).map((star, i) => (
                                <i key={i}>{star}</i>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 opacity-60 text-[14px]">
                    <span className="flex items-center gap-1">
                        <GoClock />
                        <span>{data?.time}</span>
                    </span>
                    <span>{data?.date}</span>
                </div>
            </div>
            <p className="ml-[64px] mt-4 line-clamp-[10]">{data?.comment}</p>
        </div>
    );
};

export default memo(Comment);
