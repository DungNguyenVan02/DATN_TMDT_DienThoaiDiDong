import React, { useState } from 'react';
import Button from '../Button';
import icons from '~/utiles/icons';
import WrapperTippy from '~/components/WrapperTippy';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional

const RightHeader = () => {
    const { PiGlobeSimple, BsCart2 } = icons;
    const infoOption = ['Thông tin cá nhân', 'Danh sách yêu thích', 'Đăng xuất'];

    const [isLogin, setIsLogin] = useState(false);
    const [isShow, setIsShow] = useState(false);

    return (
        <>
            {isLogin ? (
                <div className="flex gap-3 items-center justify-end flex-1">
                    <div>
                        <Tippy
                            interactive
                            placement="bottom-end"
                            offset={[10, 10]}
                            delay={[0, 400]}
                            render={(attrs) => (
                                <div className="min-w-[100px]" tabIndex="-1" {...attrs}>
                                    <WrapperTippy>
                                        <ul>
                                            {infoOption.map((item, i) => {
                                                return (
                                                    <li
                                                        key={i}
                                                        className="hover:bg-gray-100 p-1 cursor-pointer last:border-t"
                                                    >
                                                        {item}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </WrapperTippy>
                                </div>
                            )}
                        >
                            <img
                                className="cursor-pointer hover:opacity-90 w-[24px] h-[24px] rounded-full object-contain"
                                src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                                alt=""
                            />
                        </Tippy>
                    </div>
                    <div
                        className="relative cursor-pointer spHover"
                        onMouseEnter={() => setIsShow(true)}
                        onMouseLeave={() => setIsShow(false)}
                    >
                        <PiGlobeSimple size={24} />
                        {isShow && (
                            <ul className="absolute top-[34px] right-[-6px] w-[100px] bg-white text-gray-800 rounded-md overflow-hidden transition-all">
                                <li className="text-[14px] p-2 hover:bg-gray-100">Tiếng việt</li>
                                <li className="text-[14px] p-2 hover:bg-gray-100">English</li>
                            </ul>
                        )}
                    </div>
                    <span className="relative cursor-pointer hover:opacity-90" title="Giỏ hàng">
                        <BsCart2 size={24} />
                        <div className="subCart">2</div>
                    </span>
                </div>
            ) : (
                <div className="flex gap-3 items-center justify-end flex-1">
                    <Button customStyles={'text-[14px] px-[10px] py-[4px] border rounded-md bg-gradient-custom '}>
                        Đăng ký
                    </Button>
                    <Button customStyles={'text-[14px] px-[10px] py-[4px] border rounded-md bg-gradient-custom '}>
                        Đăng nhập
                    </Button>
                </div>
            )}
        </>
    );
};

export default RightHeader;
