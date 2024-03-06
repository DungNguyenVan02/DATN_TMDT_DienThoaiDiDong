import React, { memo } from 'react';
import Button from '../Button';
import images from '~/assets/images';

const Subscribe = () => {
    return (
        <div className="relative max-w-main w-full mx-auto">
            <img className="absolute top-[-12px] left-0 right-0 z-[-1] w-full" src={images.bgCenter} alt="" />
            <img className="absolute top-[20px] left-[10px]" src={images.tag1} alt="" />
            <img className="absolute top-[40%] right-[48%]" src={images.tag3} alt="" />
            <div className="grid wide">
                <div className="row items-center justify-center">
                    <div className="col g-l-6 g-m-6 g-c-12">
                        <div className="p-5">
                            <h3 className="text-[28px] font-semibold">
                                <strong className="text-gradient">Đăng ký</strong> ngay và nhận thông báo{' '}
                                <strong className="text-gradient">khuyến mại</strong> từ hệ thống
                            </h3>
                            <p className="opacity-60">
                                Hàng ngàn quà tặng hấp dẫn đang chờ bạn,{' '}
                                <strong className="text-gradient cursor-pointer">đăng ký ngay</strong>
                            </p>
                            <div className="relative border border-blue-500 px-4 h-[40px] rounded-tr-3xl rounded-bl-3xl mt-5">
                                <input
                                    className="bg-transparent outline-none w-full pr-[20%] pl-[2%] h-full"
                                    placeholder="Nhập email của bạn"
                                />
                                <Button customStyles="absolute top-0 right-0 text-[14px] px-[38px] h-full  rounded-tr-3xl rounded-bl-3xl bg-gradient-custom hover:bg-none hover:border hover:text-gray-700">
                                    Gửi
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col g-l-6 g-m-6 g-c-12">
                        <div className="p-4 flex justify-center">
                            <img
                                className="rounded-md object-cover shadow-2xl"
                                src="https://clickbuy.com.vn/uploads/media/610-shxoI.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Subscribe);
