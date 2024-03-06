import React from 'react';
import { ProductCard } from '../Product';

import { Pagination, Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Slider = ({ data, showLg, showMd, showSm, isLoop = true }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            autoplay={
                isLoop
                    ? {
                          delay: 2000,
                          disableOnInteraction: false,
                      }
                    : false
            }
            pagination={{
                dynamicBullets: true,
            }}
            speed={600}
            allowTouchMove={false}
            scrollbar={{ draggable: false }}
            navigation={true}
            breakpoints={{
                0: {
                    slidesPerView: showSm || 1,
                    spaceBetween: 2,
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: showMd || 2,
                    spaceBetween: 5,
                },
                // when window width is >= 640px
                1000: {
                    slidesPerView: showLg || 4,
                    spaceBetween: 10,
                },
            }}
            className="mySwiper"
        >
            {data?.map((item) => {
                return (
                    <SwiperSlide key={item._id}>
                        <div className="w-full">
                            <ProductCard data={item} />
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default Slider;
