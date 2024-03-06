import React, { memo } from 'react';
import { Card as CartBlog } from '../Blog';
const Blog = () => {
    return (
        <div className="bg-black text-white">
            <div className="max-w-main w-full mx-auto py-5 s">
                <div className="grid wide">
                    <div className="row items-center">
                        <div className="col g-l-4">
                            <h3 className="text-[34px] font-semibold ">
                                Tin <strong className="text-gradient">công nghệ</strong>
                            </h3>
                        </div>
                        <div className="col g-l-4">
                            <h3 className="text-[16px] opacity-60">
                                Nắm bắt nhanh chóng những đột phá công nghệ nổi bật và xu hướng mới trên thế giới
                            </h3>
                        </div>
                        <div className="col g-l-4">
                            <button className="hover:underline hover:text-blue-500 flex justify-end w-full">
                                Tất cả
                            </button>
                        </div>
                    </div>
                    <div className="row mt-6">
                        <div className="col g-l-3 g-m-6 g-c-12">
                            <CartBlog />
                        </div>
                        <div className="col g-l-3 g-m-6 g-c-12">
                            <CartBlog />
                        </div>
                        <div className="col g-l-3 g-m-6 g-c-12">
                            <CartBlog />
                        </div>
                        <div className="col g-l-3 g-m-6 g-c-12">
                            <CartBlog />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Blog);
