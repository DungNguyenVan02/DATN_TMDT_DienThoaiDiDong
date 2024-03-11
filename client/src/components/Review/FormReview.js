import React, { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { showModal } from '~/redux/slice/appSlice';
import withBaseComponent from '../hocs/withBaseComponent';
import icons from '~/utiles/icons';
import images from '~/assets/images';
import { voteOptions } from '~/utiles/contains';
import { apiRatingsProduct } from '~/apis/products';

const FormReview = ({ dispatch, name, pid, onRerender }) => {
    const formModalRef = useRef();
    const { IoCloseOutline, BsStarFill } = icons;
    const [starHover, setStarHover] = useState(5);
    const [starVote, setStarVote] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        formModalRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
    }, []);

    const handleRatingsSubmit = async () => {
        const date = new Date();
        await apiRatingsProduct({
            star: starVote,
            comment,
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            time: `${date.getHours()}:${date.getMinutes()}`,
            pid,
        });
        dispatch(showModal(false));
        onRerender((prev) => !prev);
    };

    return (
        <div
            ref={formModalRef}
            className="relative bg-white w-[600px] px-[20px] py-[10px] rounded-xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
        >
            <div className=" flex justify-between items-center">
                <h3 className="font-semibold text-[20px]">Đánh giá và nhận xét</h3>
                <i className="p-1 hover:opacity-75 cursor-pointer" onClick={() => dispatch(showModal(false))}>
                    <IoCloseOutline size={24} />
                </i>
            </div>
            <div className="flex gap-4 items-center">
                <div className="shadow-2xl w-[120px] h-[120px] rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover " src={images.reviewPRoduct} alt={name} />
                </div>
                <h3 className="text-[16px] font-medium opacity-80">{name}</h3>
            </div>
            <div>
                <h3 className="font-semibold text-[18px] mb-3">Đánh giá chung</h3>
                <div className="flex border-b pb-4 gap-4">
                    {voteOptions?.map((el) => (
                        <div
                            key={el.id}
                            className="cursor-pointer w-1/5 h-[70px] rounded-md flex justify-center items-center flex-col bg-gray-300 gap-1"
                            onMouseEnter={() => setStarHover(el.id)}
                            onMouseLeave={() => setStarHover(5)}
                            onClick={() => {
                                if (el.id === starVote) {
                                    setStarVote(null);
                                } else {
                                    setStarVote(el.id);
                                }
                            }}
                        >
                            {starVote ? (
                                <BsStarFill size={20} color={el.id <= starVote ? 'orange' : 'gray'} />
                            ) : (
                                <BsStarFill
                                    size={20}
                                    color={el.id <= starHover ? 'orange' : 'gray'}
                                    onClick={() => setStarVote(el.id)}
                                />
                            )}

                            <span className="text-[13px] font-medium text-gray-700">{el.vote}</span>
                        </div>
                    ))}
                </div>
            </div>
            <textarea
                placeholder="Enter your review about product"
                className="border rounded-md p-2 placeholder:text-sm placeholder:text-gray-400 outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button
                customStyles="border px-4 py-2 text-white bg-gradient-custom text-[14px] rounded-md w-full hover:bg-none hover:text-gray-800"
                onClick={handleRatingsSubmit}
            >
                Gửi đánh giá
            </Button>
        </div>
    );
};

export default withBaseComponent(FormReview);
