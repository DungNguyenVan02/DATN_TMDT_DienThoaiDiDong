import React from 'react';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button';
import routes from '~/config/routes';
import { formatMoney, renderStar } from '~/utiles/helper';

const ProductCard = ({ data, customStyles, btnWhite }) => {
    return (
        <div
            className={
                customStyles ? customStyles : 'relative product-card-inner w-full p-2 overflow-hidden cursor-pointer'
            }
        >
            <Link to={`/${routes.products}/detail/${data?.slug}/${data?._id}`}>
                {data?.discount > 0 && (
                    <span className="absolute px-2 py-1 top-0 right-0 bg-gradient-custom rounded-bl-2xl ">{`${data?.discount}%`}</span>
                )}
                <img
                    className="max-w-[230px] w-full object-cover mx-auto"
                    src={data?.thumb || images.noProductImage}
                    alt=""
                />
                <div>
                    <div>
                        <h3 className="line-clamp-1 text-[18px]">{data?.name}</h3>
                        <p className="opacity-60 font-light text-[12px]">{data?.brand}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        {renderStar(data?.totalRatings).map((item, i) => (
                            <i key={i}>{item}</i>
                        ))}
                    </div>
                    <div className="text-[13px] mb-3 h-[34px] flex items-center justify-between">
                        <h4 className="text-[14px] font-medium ">
                            {formatMoney(data?.price * ((100 - data?.discount) / 100))}
                        </h4>
                        {data?.discount > 0 && (
                            <h4 className="line-through text-[12px] opacity-60 font-medium">
                                {formatMoney(data?.price)}
                            </h4>
                        )}
                    </div>
                </div>
            </Link>
            <Button
                customStyles={`text-[14px] px-4 py-2 w-full border rounded-tr-3xl rounded-bl-3xl bg-gradient-custom hover:bg-none ${btnWhite ? 'hover:text-white' : 'hover:text-gray-800'}`}
            >
                Thêm vào giỏ hàng
            </Button>
        </div>
    );
};

export default ProductCard;
