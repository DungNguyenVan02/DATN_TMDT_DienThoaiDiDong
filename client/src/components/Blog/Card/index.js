import React from 'react';

const Card = () => {
    return (
        <div className="relative px-4 py-2 mt-5 w-full border border-blue-500 rounded-tr-3xl rounded-bl-3xl overflow-hidden">
            <div className="absolute z-10 top-2 left-[10px] right-[22px] flex items-center justify-between text-white">
                <span className="bg-gradient-custom rounded-md px-2 py-1">news</span>
                <span className="text-[14px] opacity-60">12/11/2002</span>
            </div>
            <div className="overflow-hidden cursor-pointer">
                <img
                    className="w-full object-cover hover:scale-110 transitionAll"
                    src="https://gaming-workdo.myshopify.com/cdn/shop/articles/10.png?v=1670910756"
                    alt=""
                />
            </div>
            <div className="mt-3">
                <h3 className=" text-[16px] line-clamp-2 hover:underline cursor-pointer">
                    Gaming Product means any intangible asset, good or interest that can be bought or sold or otherwise
                    is the subject of an activity constituting a Gaming Business
                </h3>
                <p className="opacity-60">Tác giả: ADMIN</p>
            </div>
        </div>
    );
};

export default Card;
