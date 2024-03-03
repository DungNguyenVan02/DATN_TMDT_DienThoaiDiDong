import React from 'react';
import icons from '~/utiles/icons';
import { Spinner } from '~/components/Animation';
const Search = () => {
    const { CiSearch, IoCloseOutline } = icons;
    return (
        <div className="relative max-w-[354px] border border-[#838383] flex items-center rounded-tr-3xl rounded-bl-3xl px-[8px] py-2">
            <CiSearch size={26} />
            <input
                className="flex-1 px-3 text-[14] outline-none bg-transparent placeholder:text-[14px]"
                placeholder="Tìm sản phẩm yêu thích của bạn..."
            />
            <span className="mr-[18px]">
                <Spinner />
            </span>
            <span className="absolute top-[50%] right-[28px] translate-y-[-50%]">
                <IoCloseOutline size={24} />
            </span>
        </div>
    );
};

export default Search;
