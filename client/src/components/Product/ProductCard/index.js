import React from 'react';
import images from '~/assets/images';
import Button from '~/components/Button';
import { formatMoney } from '~/utiles/helper';

const ProductCard = ({ data }) => {
    return (
        <div className="relative product-card-inner w-full px-3 py-2 overflow-hidden">
            {data?.discount > 0 && (
                <span className="absolute px-2 py-1 top-0 right-0 bg-gradient-custom rounded-bl-2xl ">{`${data?.discount}%`}</span>
            )}
            <img
                className="w-[230px] h-[230px] object-cover mx-auto"
                src={data?.thumb || images.noProductImage}
                alt=""
            />
            <div>
                <h3 className="line-clamp-1 text-[18px]">{data?.name}</h3>
                <p className="opacity-60 font-light text-[12px]">{data?.brand}</p>
            </div>
            <div className="flex justify-between items-center gap-2 text-[13px] mb-3">
                <span className="text-[16px] font-medium ">
                    {formatMoney(data?.price * ((100 - data?.discount) / 100))}
                </span>
                {data?.discount > 0 && (
                    <span className="line-through text-[12px] opacity-60 font-medium ">{formatMoney(data?.price)}</span>
                )}
            </div>
            <Button customStyles="text-[14px] px-4 py-2 w-full border rounded-tr-3xl rounded-bl-3xl bg-gradient-custom hover:bg-none hover:text-gray-900">
                Thêm vào giỏ hàng
            </Button>
        </div>
    );
};

export default ProductCard;
