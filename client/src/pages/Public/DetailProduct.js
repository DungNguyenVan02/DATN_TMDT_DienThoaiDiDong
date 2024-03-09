import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { apiGetProduct } from '~/apis/products';
import Button from '~/components/Button';
import { ContentCenter, ContentLeft, ContentRight } from '~/components/Product/DetailProduct';
import { FormReview, SectionLeft, SectionRight } from '~/components/Review';
import WrapperTippy from '~/components/WrapperTippy';
import { Modal } from '~/components/common';
import withBaseComponent from '~/components/hocs/withBaseComponent';
import routes from '~/config/routes';
import { appSelector } from '~/redux/selector';
import { showModal } from '~/redux/slice/appSlice';
import icons from '~/utiles/icons';

const DetailProduct = ({ location, dispatch }) => {
    const [product, setProduct] = useState([]);
    const [thumb, setThumb] = useState('');
    const { isShowModal } = useSelector(appSelector);

    console.log(isShowModal);

    const { GoArrowLeft } = icons;

    const { pid } = useParams();

    const fetchProduct = async () => {
        const response = await apiGetProduct(pid);
        if (response?.success) {
            setProduct(response.data);
            setThumb(response.data.thumb);
        }
    };

    useEffect(() => {
        fetchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pid]);

    return (
        <>
            {isShowModal && (
                <Modal>
                    <div className="w-[600px]">
                        <WrapperTippy>
                            <FormReview name={product?.name} pid={pid} />
                        </WrapperTippy>
                    </div>
                </Modal>
            )}
            <div>
                <div className="bg-black mt-[-74px] pt-[180px] min-h-[600px] text-white z-[-1]">
                    <div className="max-w-main w-full mx-auto px-[15px]">
                        <div className="py-[24px]">
                            <Link to={routes.home} className="cursor-pointer hover:opacity-85 inline-block ">
                                <div className="flex items-center gap-2">
                                    <i className="p-1 border rounded-full">{<GoArrowLeft />}</i>
                                    <span className="text-[14px]">Trờ về trang chủ</span>
                                </div>
                            </Link>
                        </div>
                        <div className="grid wide">
                            <div className="row">
                                <div className="col g-m-6 g-l-5 g-c-12">
                                    <ContentLeft product={product} thumb={thumb} onChangeThumb={setThumb} />
                                </div>
                                <div className="col g-m-6 g-l-5 g-c-12">
                                    <ContentCenter product={product} />
                                </div>
                                <div className="col g-m-6 g-l-2 g-c-12">
                                    <ContentRight />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-main w-full mx-auto px-[15px] mt-5">
                    <div className="shadow-custom p-3 rounded-xl">
                        <h3 className="text-[20px] font-semibold">Đánh giá & nhận xét {product?.name}</h3>
                        <div className="py-5 border-b-[3px]">
                            <div className="grid wide">
                                <div className="row">
                                    <div className="col g-l-5 g-m-5">
                                        <SectionLeft data={product} />
                                    </div>
                                    <div className="col g-l-7 g-m-7">
                                        <SectionRight data={product} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mx-auto py-4">
                                        <Button onClick={() => dispatch(showModal(true))}>Đánh giá sản phẩm</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withBaseComponent(DetailProduct);
