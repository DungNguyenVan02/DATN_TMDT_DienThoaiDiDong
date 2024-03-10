import React, { useState } from 'react';

const InputCustom = ({ id, label, type = 'text', placeholder = '', register, error, isValue }) => {
    const [isFocus, setIsFocus] = useState(false);
    return (
        <div className="relative flex flex-col justify-center mb-4">
            <label
                htmlFor={id}
                className={` absolute ${isFocus || isValue ? 'top-[-1px] leading-none bg-white z-10 animate-slideT' : 'top-[-1px] animate-slideB'} left-2 text-[16px] text-gray-500 font-light ml-1 `}
            >
                {label}
            </label>
            <input
                id={id}
                {...register}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                type={type}
                placeholder={placeholder}
                className="placeholder:text-[14px] px-2 h-[40px] rounded-md outline-none bg-transparent shadow-custom"
            />
            {error && <p className="ml-1 mt-[2px] text-[14px] text-red-600">{error}</p>}
        </div>
    );
};

export default InputCustom;
