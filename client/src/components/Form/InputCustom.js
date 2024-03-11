import React, { useState } from 'react';

const InputCustom = ({ id, label, type = 'text', placeholder = '', register, error, isValue, icons }) => {
    const [isFocus, setIsFocus] = useState(false);
    const [isShow, setIsShow] = useState(0);
    return (
        <div className="relative flex flex-col justify-center mb-4">
            <label
                htmlFor={id}
                className={` absolute ${isFocus || isValue ? 'text-blue-400 top-[-1px] leading-none bg-white z-10 animate-slideT' : 'top-[-1px] animate-slideB'} left-2 text-[16px] text-gray-500 font-light ml-1 `}
            >
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    {...register}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    type={type === 'password' && isShow === 1 ? 'text' : type}
                    placeholder={placeholder}
                    className="w-full placeholder:text-[14px] px-2 h-[40px] rounded-md outline-none bg-transparent shadow-custom"
                />
                {icons && (
                    <i
                        onClick={() => {
                            if (isShow === 0) {
                                setIsShow(1);
                            } else {
                                setIsShow(0);
                            }
                        }}
                        className="absolute top-[50%] right-[14px] translate-y-[-50%] cursor-pointer"
                    >
                        {icons[isShow]}
                    </i>
                )}
            </div>

            {error && <p className="ml-1 mt-[2px] text-[14px] text-red-600">{error}</p>}
        </div>
    );
};

export default InputCustom;
