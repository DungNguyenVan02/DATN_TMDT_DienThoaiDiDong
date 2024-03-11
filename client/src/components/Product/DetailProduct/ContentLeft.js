import React, { memo } from 'react';
import { SwiperSlide } from 'swiper/react';
import images from '~/assets/images';
import Slider from '~/components/Slider';

const ContentLeft = ({ product, thumb, onChangeThumb }) => {
    return (
        <div>
            <div className="w-full bg-gradient-custom p-[2px] rounded-tr-3xl rounded-bl-3xl overflow-hidden">
                <div className="bg-black rounded-tr-3xl rounded-bl-3xl flex items-center justify-center">
                    <img className="max-w-[330px] object-cover mx-auto" src={thumb || images.noProductImage} alt="" />
                </div>
            </div>
            <div className="my-3 bg-gradient-custom w-full  overflow-hidden p-[2px] rounded-tr-3xl rounded-bl-3xl">
                <div className="bg-black rounded-tr-3xl rounded-bl-3xl">
                    <Slider>
                        {product?.images?.map((item, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <img
                                        onClick={() => onChangeThumb(item)}
                                        className="w-[80px] h-[80px] mx-auto border object-cover cursor-pointer"
                                        src={item}
                                        alt=""
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Slider>
                </div>
            </div>
            <div className="my-3">
                <h3 className="font-medium text-[18px]">Mô tả sản phẩm</h3>
                <p className="text-[16px] opacity-60 font-light line-clamp-[10]">{product.description}</p>
            </div>
        </div>
    );
};

export default memo(ContentLeft);
