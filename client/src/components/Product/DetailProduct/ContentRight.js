import React, { memo } from 'react';
import icons from '~/utiles/icons';

const ContentRight = () => {
    const { FaCircleCheck } = icons;
    return (
        <div className="flex flex-col gap-3 border p-1 rounded-md">
            <h3 className="text-[18px] text-gradient">Chính sách bảo hành</h3>
            <ul>
                <li className="flex gap-2">
                    <i className="mt-1">
                        <FaCircleCheck color="#007eaf" />
                    </i>
                    <p className="text-[14px] font-light opacity-65">
                        Bảo hành chính hãng 12 tháng ( Miễn phí ). Bao test đổi sản phẩm lỗi 30 ngày.
                    </p>
                </li>
                <li className="flex gap-2">
                    <i className="mt-1">
                        <FaCircleCheck color="#007eaf" />
                    </i>
                    <p className="text-[14px] font-light opacity-65">
                        Bảo hành rơi vỡ, vào nước 12 tháng ( +500.000đ): Hỗ trợ khắc phục miễn phí các lỗi rơi vỡ, vào
                        nước 12 tháng.
                    </p>
                </li>
                <li className="flex gap-2">
                    <i className="mt-1">
                        <FaCircleCheck color="#007eaf" />
                    </i>
                    <p className="text-[14px] font-light opacity-65">
                        Gia hạn bảo hành 24 tháng ( + 1.500.000đ): Năm đầu bảo hành chính hãng, năm 2 bảo hành 1 đổi 1
                        máy tương đương. Bảo hành rơi vỡ, vào nước 24 tháng.
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default memo(ContentRight);
