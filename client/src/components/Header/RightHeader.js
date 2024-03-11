import React, { useState } from 'react';
import Button from '../Button';
import icons from '~/utiles/icons';
import WrapperTippy from '~/components/WrapperTippy';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import routes from '~/config/routes';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';
import withBaseComponent from '../hocs/withBaseComponent';
import { logout } from '~/redux/slice/userSlide';

const RightHeader = ({ navigate, dispatch }) => {
    const { PiGlobeSimple, BsCart2 } = icons;
    const infoOption = [
        { title: 'Thông tin cá nhân', path: routes.profile },
        { title: 'Danh sách yêu thích', path: routes.profile_wishlist },
        { title: 'Đăng xuất', dispatch: true },
    ];
    const { currentUser } = useSelector(userSelector);

    const [isShow, setIsShow] = useState(false);

    return (
        <>
            {currentUser ? (
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
                                                        onClick={() => {
                                                            if (item.dispatch) {
                                                                dispatch(logout());
                                                            } else {
                                                                navigate('/' + item?.path);
                                                            }
                                                        }}
                                                        key={i}
                                                        className={` ${item.dispatch ? 'hover:bg-red-500 hover:text-white' : 'hover:bg-gray-100'} p-1 cursor-pointer last:border-t`}
                                                    >
                                                        {item.title}
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
                        <div className="subCart">{currentUser.cart.length}</div>
                    </span>
                </div>
            ) : (
                <div className="flex gap-3 items-center justify-end flex-1">
                    <Button
                        to={`/${routes.register}`}
                        customStyles={'text-[14px] px-[10px] py-[4px] border rounded-md bg-gradient-custom '}
                    >
                        Đăng ký
                    </Button>
                    <Button
                        to={`/${routes.login}`}
                        customStyles={'text-[14px] px-[10px] py-[4px] border rounded-md bg-gradient-custom '}
                    >
                        Đăng nhập
                    </Button>
                </div>
            )}
        </>
    );
};

export default withBaseComponent(RightHeader);
