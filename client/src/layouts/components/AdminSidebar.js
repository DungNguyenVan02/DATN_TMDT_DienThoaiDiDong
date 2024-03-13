import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { sidebarMenuAdmin } from '~/utiles/contains';
import icons from '~/utiles/icons';

const AdminSidebar = () => {
    const [isShowSubMenu, setIsShowSubMenu] = useState([]);
    const { IoIosArrowUp, MdOutlineKeyboardArrowDown } = icons;

    const handleShowSubMenu = (tabId) => {
        if (isShowSubMenu.includes(tabId)) {
            setIsShowSubMenu(isShowSubMenu.filter((item) => item !== tabId));
        } else {
            setIsShowSubMenu((prev) => [...prev, tabId]);
        }
    };

    return (
        <div className="bg-[#1d1e27] h-screen shadowSideBar">
            <h3 className="text-gradient text-[28px] h-[64px] flex justify-center items-center border-b border-b-gray-500">
                LEO ADMIN
            </h3>
            <div className="text-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.05)] ">
                {sidebarMenuAdmin.map((item) => {
                    return item.children ? (
                        <div className="" key={item.id}>
                            <h3 className="text-[17px] pt-[16px] px-2 uppercase text-gradient font-medium">
                                {item.header}
                            </h3>
                            <div
                                className=" flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-[rgba(255,255,255,0.05)]"
                                onClick={() => handleShowSubMenu(item.id)}
                            >
                                <>
                                    <span>{item.icon}</span>
                                    <span>{item.title}</span>
                                </>
                                {isShowSubMenu.includes(item.id) ? <MdOutlineKeyboardArrowDown /> : <IoIosArrowUp />}
                            </div>
                            {isShowSubMenu.includes(item.id) &&
                                item.children.map((sub) => (
                                    <div key={sub.id}>
                                        <NavLink
                                            to={`/${sub.path}`}
                                            className={({ isActive }) =>
                                                `${isActive ? 'bg-[rgba(255,255,255,0.05)]' : ' hover:bg-[rgba(255,255,255,0.05)]'} flex items-center gap-4 py-3 pl-[60px] text-[15px] ease-in-out transition-all`
                                            }
                                        >
                                            {sub.title}
                                        </NavLink>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <Fragment key={item.id}>
                            <h3 className="text-[17px] pt-[16px] px-2 uppercase text-gradient font-medium">
                                {item.header}
                            </h3>
                            <NavLink
                                to={`/${item.path}`}
                                className={({ isActive }) =>
                                    `${isActive ? 'bg-[rgba(255,255,255,0.05)]' : ' hover:bg-[rgba(255,255,255,0.05)]'} flex items-center gap-4 py-3 px-5 text-[16px] ease-in-out transition-all`
                                }
                            >
                                <i>{item.icon}</i>
                                <span>{item.title}</span>
                            </NavLink>
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminSidebar;
