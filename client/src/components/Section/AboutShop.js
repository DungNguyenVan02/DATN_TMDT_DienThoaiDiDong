import React, { memo } from 'react';
import AboutOurCard from '../common/AboutOurCard';

const AboutShop = () => {
    const OurShop = [
        {
            id: 1,
            title: 'Hàng hóa',
            content: 'Sản phẩm luôn được đảm bảo về chất lượng tới tận tay khách hàng',
        },
        {
            id: 2,
            title: 'Khuyến mãi',
            content: 'Khuyến mãi lớn với nhiều ưu đãi',
        },
        {
            id: 3,
            title: 'Giao hàng',
            content: 'Sản phẩm luôn được đảm bảo về chất lượng tới tận tay khách hàng',
        },
        {
            id: 4,
            title: 'Hàng hóa',
            content: 'Miễn phí vận chuyển cho bất kỳ đơn hàng nào từ 10 triệu đồng',
        },
    ];

    return (
        <div className="max-w-main w-full mx-auto">
            <h3 className="text-[34px] mb-3">Về cửa hàng của chúng tôi</h3>
            <div className="grid wide">
                <div className="row">
                    {OurShop.map((data) => {
                        return (
                            <div key={data.id} className="col g-l-3 g-m-6 g-c-12">
                                <AboutOurCard title={data.title} content={data.content} number={data.id} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default memo(AboutShop);