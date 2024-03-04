import React from 'react';
import WrapperTippy from '~/components/WrapperTippy';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import icons from '~/utiles/icons';
import { useSelector } from 'react-redux';
import { appSelector } from '~/redux/selector';
const LeftHeader = () => {
    const { MdOutlineKeyboardArrowDown } = icons;
    const { category, resizeScreen } = useSelector(appSelector);

    const navOption = ['Sản phẩm', 'Bài viết'];
    return (
        <div className="flex items-center justify-between">
            {resizeScreen < 430 ? (
                <div>icon</div>
            ) : (
                <>
                    <div>
                        <Tippy
                            interactive
                            placement="bottom-start"
                            offset={[-10, 8]}
                            delay={[0, 400]}
                            render={(attrs) => (
                                <div className="relative min-w-[160px]" tabIndex="-1" {...attrs}>
                                    <WrapperTippy>
                                        <ul>
                                            {category?.map((el) => {
                                                return (
                                                    <li className="p-1 cursor-pointer hover:bg-gray-100" key={el?._id}>
                                                        {el?.name}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </WrapperTippy>
                                </div>
                            )}
                        >
                            <div
                                className={` flex items-center cursor-pointer hover:text-blue-500 ${resizeScreen > 1113 ? ' pr-5 ' : resizeScreen >= 740 && resizeScreen <= 1113 ? 'pr-2' : ''}`}
                            >
                                <span>Danh mục</span>
                                <MdOutlineKeyboardArrowDown />
                            </div>
                        </Tippy>
                    </div>
                    {navOption?.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className={` flex items-center cursor-pointer hover:text-blue-500 ${resizeScreen > 1113 ? ' pr-5 ' : resizeScreen >= 740 && resizeScreen <= 1113 ? 'pr-2' : ''}`}
                            >
                                <span>{item}</span>
                                <MdOutlineKeyboardArrowDown />
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default LeftHeader;
