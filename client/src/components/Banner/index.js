import React from 'react';
import images from '~/assets/images';
import Button from '../Button';

const Banner = () => {
    return (
        <div className="flex relative mt-[-74px] h-full overflow-hidden">
            <img className="absolute top-0 left-0 max-w-[500px]" src={images.bgLeft} alt="" />
            <img className="absolute top-0 left-[12%] " src={images.bgCenter} alt="" />
            <img className="absolute max-w-[500px] top-[-8%] right-[17%] " src={images.bgRight} alt="" />
            <img className="absolute top-[56%] left-[90px]" src={images.tag1} alt="" />
            <img className="absolute top-[28%] right-[50%]" src={images.tag2} alt="" />
            <img className="absolute bottom-[30%] right-[46%]" src={images.tag3} alt="" />
            <img className="absolute top-[46%] right-[22%]" src={images.tag4} alt="" />
            <div className="absolute bottom-[22%] left-[13%] text-white max-w-[600px] w-full">
                <h2 className="text-[65px] font-semibold">
                    Hệ thống điện thoại <span className="text-gradient">hàng đầu Việt Nam</span>
                </h2>
                <p className="text-[14px] text-[#838383] mb-5">Mua càng nhiều - khuyến mãi càng lớn</p>
                <Button>Xem ngay</Button>
            </div>
        </div>
    );
};

export default Banner;
