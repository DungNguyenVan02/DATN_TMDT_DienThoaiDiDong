import React from 'react';
import { footerList } from '~/utiles/contains';
import icons from '~/utiles/icons';

const Footer = () => {
    const { FaFacebookF, FaFlickr, FaLinkedinIn, FaTwitter, FaPinterest, IoLogoGoogleplus } = icons;
    return (
        <div className="py-[34px]">
            <div className="max-w-main w-full mx-auto">
                <div className="grid wide">
                    <div className="row">
                        <div className="co g-l-3 g-m-6 g-c-12 p-3">
                            <h3 className="text-[24px] font-semibold mb-5">Hệ thống</h3>
                            <ul className="flex flex-col gap-2">
                                <li className="text-[14px] hover:opacity-100 opacity-60 cursor-pointer">
                                    Địa chỉ: Duyên hải, Hưng hà, Thái bình
                                </li>
                                <li className="text-[14px] hover:opacity-100 opacity-60 cursor-pointer">
                                    Số điện thoại: <a href="tel:0268.368.6868">0268.368.6868</a>
                                </li>
                                <li className="text-[14px] hover:opacity-100 opacity-60 cursor-pointer">
                                    Email:{' '}
                                    <a href="mailto:nguyenvandung12112002@gmail.com">nguyenvandung12112002@gmail.com</a>
                                </li>
                            </ul>
                            <div className="flex gap-2 mt-3">
                                <span className="cursor-pointer hover:bg-gray-200 w-[40px] h-[40px] bg-[#f5f5f5]  rounded-md flex items-center justify-center">
                                    <FaFacebookF />
                                </span>
                                <span className="cursor-pointer hover:bg-gray-200 w-[40px] h-[40px] bg-[#f5f5f5]  rounded-md flex items-center justify-center">
                                    <FaTwitter />
                                </span>
                                <span className="cursor-pointer hover:bg-gray-200 w-[40px] h-[40px] bg-[#f5f5f5]  rounded-md flex items-center justify-center">
                                    <FaPinterest />
                                </span>
                                <span className="cursor-pointer hover:bg-gray-200 w-[40px] h-[40px] bg-[#f5f5f5]  rounded-md flex items-center justify-center">
                                    <IoLogoGoogleplus />
                                </span>
                                <span className="cursor-pointer hover:bg-gray-200 w-[40px] h-[40px] bg-[#f5f5f5]  rounded-md flex items-center justify-center">
                                    <FaLinkedinIn />
                                </span>
                                <span className="cursor-pointer hover:bg-gray-200 w-[40px] h-[40px] bg-[#f5f5f5]  rounded-md flex items-center justify-center">
                                    <FaFlickr />
                                </span>
                            </div>
                        </div>
                        {footerList.map((item, i) => {
                            return (
                                <div key={i} className="co g-l-3 g-m-6 g-c-12 p-3">
                                    <h3 className="text-[24px] font-semibold mb-5">{item.title}</h3>
                                    <ul className="flex flex-col gap-2">
                                        {item.sub.map((sub, index) => {
                                            return (
                                                <li
                                                    className="text-[14px] hover:opacity-100 opacity-60 cursor-pointer"
                                                    key={index}
                                                >
                                                    {sub}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
