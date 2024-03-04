import React, { useEffect, useState } from 'react';
import Search from '~/components/Search';
import Headroom from 'react-headroom';
import { LeftHeader, RightHeader } from '~/components/Header';

const Header = () => {
    // eslint-disable-next-line no-unused-vars
    const [isGim, setIsGim] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            setScrollY(currentPosition);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className="relative z-50 ">
            <Headroom
                onPin={() => setIsGim(true)}
                onUnpin={() => setIsGim(false)}
                style={{
                    WebkitTransition: 'all .5s ease-in-out',
                    MozTransition: 'all .5s ease-in-out',
                    OTransition: 'all .5s ease-in-out',
                    transition: 'all .5s ease-in-out',
                }}
            >
                <div className={` ${isGim && scrollY > 30 ? 'bg-black' : ''} border-gray-300`}>
                    <div className="h-header max-w-main w-full px-[15px]  mx-auto text-white flex items-center justify-between ">
                        <div className="flex items-center flex-1">
                            <LeftHeader />
                        </div>
                        <h3 className="text-gradient text-[28px]">LEO phone shop</h3>
                        <div className="flex-1">
                            <RightHeader />
                        </div>
                    </div>
                </div>
            </Headroom>
            <div className="absolute top-[74px] left-0 right-0 text-white h-headerBottom">
                <hr className="opacity-30" />
                <div className="max-w-main w-full h-full mx-auto px-[15px] flex items-center justify-between">
                    <h3 className="flex-1">Sản phẩm hót giảm giá lên tới 30%</h3>
                    <Search />
                    <h3 className="flex flex-1 justify-end">Bộ sưu tập mới</h3>
                </div>
                <hr className="opacity-30" />
            </div>
        </header>
    );
};

export default Header;
