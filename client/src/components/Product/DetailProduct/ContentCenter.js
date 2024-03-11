import React, { memo, useCallback, useState } from 'react';
import images from '~/assets/images';
import Button from '~/components/Button';
import { SelectQuantity } from '~/components/common';
import { formatMoney, renderStar } from '~/utiles/helper';
import icons from '~/utiles/icons';

const ContentCenter = ({ product }) => {
    const { VscHeart, VscHeartFilled } = icons;
    const [selectVariants, setSelectVariants] = useState({
        id: '',
        color: null,
        price: null,
    });

    const [quantity, setQuantity] = useState(1);

    // Enter quantity
    const handleQuantity = useCallback(
        (number) => {
            if (+number > selectVariants?.quantity) {
                setQuantity(selectVariants?.quantity);
            } else {
                setQuantity(+number);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [quantity, selectVariants?.quantity],
    );

    // Handle up or down quantity
    const handleChangeQuantity = useCallback(
        (number) => {
            if (number < 1) {
                setQuantity(1);
            } else if (number > selectVariants?.quantity) {
                setQuantity(selectVariants?.quantity);
            } else {
                setQuantity(number);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [quantity, selectVariants?.quantity],
    );

    return (
        <div className="flex flex-col gap-4 px-5">
            <h3 className="text-[24px] font-semibold line-clamp-2">{product?.name}</h3>
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="bg-gradient-custom px-2 py-1 rounded-md">{product?.brand}</span>
                    <span className="flex items-center gap-1 text-[14px] cursor-pointer hover:opacity-90">
                        <VscHeart size={20} />
                        Thêm vào danh sách yêu thích
                    </span>
                </div>
                <div className="flex items-center flex-col gap-2">
                    <div className="flex items-center gap-1">
                        {renderStar(product?.totalRatings)?.map((item, i) => (
                            <i key={i}>{item}</i>
                        ))}
                    </div>
                    <span className="opacity-60 text-[14px]">{product?.ratings?.length} đánh giá</span>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <span className="text-[18px]">{formatMoney((product?.price * (100 - product?.discount)) / 100)}</span>
                {product?.discount > 0 && (
                    <span className="text-[14px] opacity-60 line-through">{formatMoney(product?.price)}</span>
                )}
            </div>

            <div>
                <h3 className="font-medium text-[18px]">Phiên bản khác</h3>
                <div className="grid wide">
                    <div className="row">
                        {product?.version?.map((item, i) => {
                            return (
                                <div key={i} className="col g-l-4 g-m-4 g-c-6 mt-2">
                                    <div className="h-[40px] border flex flex-col items-center justify-center rounded-tr-3xl rounded-bl-3xl cursor-pointer bg-gradient-custom  hover:opacity-80">
                                        <span className="text-[14px]">
                                            {item.split(' ').length === 1 &&
                                                (+item.split(' ')[0].length === 1
                                                    ? item.split(' ')[0] + ' TB'
                                                    : item.split(' ')[0] + ' GB')}
                                            {item.split(' ').length === 2 && item.split(' ')[0]}
                                        </span>
                                        {item.split(' ').length === 2 && (
                                            <span className="text-[14px]">
                                                {item.split(' ')[1].length === 1
                                                    ? item.split(' ')[1] + ' TB'
                                                    : item.split(' ')[1] + ' GB'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div>
                <h3 className="font-medium text-[18px]">Màu sắc</h3>
                <div className="grid wide">
                    <div className="row">
                        <div className="col g-l-4 g-m-4 g-c-6">
                            <div className="flex items-center border p-1 rounded-md w-full cursor-pointer">
                                <img
                                    className="w-[30px] h-[30px] rounded object-cover"
                                    src={product?.thumb || images.noProductImage}
                                    alt=""
                                />
                                <span className="text-[14px] ml-1 w-[80px]">
                                    <h3>{product?.color}</h3>
                                    <span className="text-[12px]">
                                        {formatMoney(product?.price * ((100 - product?.discount) / 100))}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <h3 className="font-medium text-[18px]">Số lượng</h3>
                <SelectQuantity
                    quantity={quantity}
                    handleQuantity={handleQuantity}
                    handleChangeQuantity={handleChangeQuantity}
                />
            </div>
            <div className="flex gap-3">
                <Button>Thêm vào giỏ hàng</Button>
                <Button>Mua ngay</Button>
            </div>
        </div>
    );
};

export default memo(ContentCenter);
