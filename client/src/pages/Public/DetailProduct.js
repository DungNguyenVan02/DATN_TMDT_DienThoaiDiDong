import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { apiGetProduct, apiGetProducts } from '~/apis/products';
import images from '~/assets/images';
import Button from '~/components/Button';
import { ProductCard } from '~/components/Product';
import { ContentCenter, ContentLeft, ContentRight } from '~/components/Product/DetailProduct';
import { FormReview, SectionLeft, SectionRight, Comment } from '~/components/Review';
import Slider from '~/components/Slider';
import WrapperTippy from '~/components/WrapperTippy';
import { Modal } from '~/components/common';
import withBaseComponent from '~/components/hocs/withBaseComponent';
import routes from '~/config/routes';
import { appSelector } from '~/redux/selector';
import { showModal } from '~/redux/slice/appSlice';
import icons from '~/utiles/icons';

const DetailProduct = ({ dispatch }) => {
    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [isRerender, setIsRerender] = useState(false);
    const [thumb, setThumb] = useState('');
    const { isShowModal } = useSelector(appSelector);

    const { GoArrowLeft } = icons;

    const { pid } = useParams();

    const fetchProduct = async () => {
        const response = await apiGetProduct(pid);
        if (response?.success) {
            setProduct(response.data);
            setThumb(response.data.thumb);
        }
    };
    const fetchProducts = async () => {
        const response = await apiGetProducts({ brand: product?.brand });
        if (response?.success) {
            setProducts(response.products);
        }
    };

    useEffect(() => {
        fetchProducts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    useEffect(() => {
        fetchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pid, isRerender]);

    return (
        <>
            {isShowModal && (
                <Modal>
                    <div className="w-[600px]">
                        <WrapperTippy>
                            <FormReview name={product?.name} pid={pid} onRerender={setIsRerender} />
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
                        <div className="py-5 ">
                            <div className="grid wide">
                                <div className="row">
                                    <div className="col g-l-5 g-m-5">
                                        <SectionLeft data={product} />
                                    </div>
                                    <div className="col g-l-7 g-m-7">
                                        <SectionRight data={product} />
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="mx-auto py-4 text-center">
                                        <h3 className="mb-2 opacity-60 text-[20px]">
                                            Bạn đánh giá sao về sản phẩm này?
                                        </h3>
                                        <Button
                                            customStyles="text-[14px] px-[20px] py-[12px] border rounded-tr-3xl rounded-bl-3xl bg-gradient-custom hover:bg-none hover:text-gray-800"
                                            onClick={() => dispatch(showModal(true))}
                                        >
                                            Đánh giá sản phẩm
                                        </Button>
                                    </div>
                                </div>
                                <div className="row border-t-[3px] py-5">
                                    {product?.ratings?.length > 0 ? (
                                        product.ratings?.map((item) => {
                                            return <Comment key={item._id} data={item} />;
                                        })
                                    ) : (
                                        <div className="flex flex-col items-center w-full">
                                            <h3 className="text-[34px] font-semibold text-gradient">
                                                Hiện tại chưa có đánh giá nào về sản phẩm này
                                            </h3>
                                            <img className="w-[400px] object-cover" src={images.review} alt="" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-black text-white py-2 mt-5">
                    <div className="max-w-main w-full mx-auto px-[15px] mt-5">
                        <div className="flex justify-between underline-heading">
                            <h3 className="mb-4  text-[34px] font-semibold text-gradient">Sản phẩm liên quan</h3>
                            <button className="hover:underline hover:text-blue-500">Tất cả</button>
                        </div>
                        <div>
                            <Slider showLg={5}>
                                {products?.map((product) => {
                                    return (
                                        <SwiperSlide key={product._id}>
                                            <div className="w-full">
                                                <ProductCard data={product} btnWhite />
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withBaseComponent(DetailProduct);
