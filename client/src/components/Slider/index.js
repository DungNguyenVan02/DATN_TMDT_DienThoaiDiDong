import React from 'react';
import { ProductCard } from '../Product';

import { Pagination, Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Slider = ({ data, showLg, showMd, showSm }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={15}
            loop={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            pagination={{
                dynamicBullets: true,
            }}
            speed={600}
            allowTouchMove={false}
            scrollbar={{ draggable: false }}
            navigation={true}
            breakpoints={{
                0: {
                    slidesPerView: showSm && showSm,
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: showMd && showMd,
                    spaceBetween: 30,
                },
                // when window width is >= 640px
                1000: {
                    slidesPerView: showLg && showLg,
                    spaceBetween: 40,
                },
            }}
            className="mySwiper"
        >
            {data?.map((item) => {
                return (
                    <SwiperSlide key={item._id}>
                        <div className="w-[200px]">
                            <ProductCard data={item} />
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default Slider;
