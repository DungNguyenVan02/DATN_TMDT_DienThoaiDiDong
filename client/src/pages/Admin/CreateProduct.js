import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputCustom } from '~/components/Form';
import { schemaCreateProduct } from '~/utiles/schemaYup';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { appSelector } from '~/redux/selector';
import Button from '~/components/Button';
import icons from '~/utiles/icons';
import { optionsInternalMemory, optionsRam } from '~/utiles/contains';
import MarkdownEditor from '~/components/MarkdownEditor';
import { toast } from 'react-toastify';
import { apiCreateProduct } from '~/apis';
import { Uploading } from '~/components/Animation';
import Swal from 'sweetalert2';

const CreateProduct = () => {
    const { IoCloseOutline } = icons;
    const { category } = useSelector(appSelector);

    const [isLoading, setIsLoading] = useState(false);
    const [selectCategory, setSelectCategory] = useState(null);
    const [selectBrand, setSelectBrand] = useState(null);
    const [selectRam, setSelectRam] = useState(null);
    const [selectInternalMemory, setSelectInternalMemory] = useState(null);
    const [resetImages, setResetImages] = useState(false);

    const selectBranRef = useRef();
    const selectCategoryRef = useRef();
    const selectRamRef = useRef();
    const selectInternalMemoryRef = useRef();
    const inputFileRef = useRef();

    const [images, setImages] = useState({
        thumb: null,
        images: [],
    });

    const [preview, setPreview] = useState({
        thumb: null,
        images: [],
    });

    const [optionCategory, setOptionCategory] = useState([]);
    const [optionBrand, setOptionBrand] = useState([]);
    const [description, setDescription] = useState('');

    const [invalidField, setInvalidField] = useState({
        category: false,
        brand: false,
        description: false,
        thumb: false,
        images: false,
        ram: false,
        internalMemory: false,
    });

    useEffect(() => {
        let result = [];
        if (category) {
            category.forEach((cate) => {
                result.push({
                    value: cate.name,
                    label: cate.name,
                });
            });
        }
        setOptionCategory(result);
    }, [category]);

    useEffect(() => {
        let result = [];
        if (selectCategory) {
            const brands = category.find((cate) => cate.name === selectCategory.value);

            brands?.brand?.forEach((item) =>
                result.push({
                    value: item,
                    label: item,
                }),
            );

            setOptionBrand(result);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectCategory]);

    const {
        watch,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaCreateProduct),
    });

    // Thêm sản phẩm
    const handleSubmitForm = async (data) => {
        const invalidFields = handleValidateFrom();
        if (invalidFields) {
            const payload = {
                ...data,
                category: selectCategory.value,
                brand: selectBrand.value,
                ram: selectRam.value,
                internalMemory: selectInternalMemory.value,
                description: description,
            };

            const formData = new FormData();

            for (let i of Object.entries(payload)) {
                formData.append(i[0], i[1]);
            }
            if (images?.thumb) formData.append('thumb', images.thumb);
            if (images.images) {
                for (let i of images.images) {
                    formData.append('images', i);
                }
            }

            setIsLoading(true);
            const response = await apiCreateProduct(formData);
            if (response?.success) {
                setIsLoading(false);

                const resetImages = {
                    thumb: null,
                    images: [],
                };
                setImages(resetImages);
                setPreview(resetImages);
                selectCategoryRef.current.clearValue();
                selectBranRef.current.clearValue();
                selectRamRef.current.clearValue();
                selectInternalMemoryRef.current.clearValue();
                setDescription('');
                reset();
                toast.success('Sản phẩm đã được tạo mới');
            } else {
                setIsLoading(false);
                Swal.fire({
                    title: 'Hệ thống thông báo',
                    text: 'Có lỗi sảy ra, vui lòng thử lại sau',
                    icon: 'error',
                });
            }
        }
    };
    const handleValidateFrom = () => {
        let result = true;
        if (!selectRam) {
            result = false;
            setInvalidField((prev) => ({ ...prev, ram: true }));
        }
        if (!selectInternalMemory) {
            result = false;
            setInvalidField((prev) => ({ ...prev, internalMemory: true }));
        }
        if (!selectCategory) {
            result = false;
            setInvalidField((prev) => ({ ...prev, category: true }));
        }
        if (!selectBrand) {
            result = false;
            setInvalidField((prev) => ({ ...prev, brand: true }));
        }
        if (!description) {
            result = false;
            setInvalidField((prev) => ({ ...prev, description: true }));
        }
        if (!images.thumb) {
            result = false;
            setInvalidField((prev) => ({ ...prev, thumb: true }));
        }
        if (images.images.length === 0) {
            result = false;
            setInvalidField((prev) => ({ ...prev, images: true }));
        }
        return result;
    };

    const handleChooseThumb = (e) => {
        const checkInvalidFiles = Array.from(e.target.files).some((file) => {
            return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        });
        if (checkInvalidFiles) {
            setImages((prev) => ({ ...prev, thumb: e.target.files[0] }));
            setPreview((prev) => ({
                ...prev,
                thumb: URL.createObjectURL(e.target.files[0]),
            }));
        } else {
            toast.warning('Định dạng file chưa được hỗ trợ, vui lòng chọn lại');
        }
    };
    const handleChooseImages = (e) => {
        const checkInvalidFiles = Array.from(e.target.files).some((file) => {
            return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        });

        if (checkInvalidFiles) {
            setResetImages(!resetImages);

            setImages((prev) => ({
                ...prev,
                images: [...e.target.files],
            }));

            const previewImg = [];
            for (let i of e.target.files) {
                const createLink = URL.createObjectURL(i);
                previewImg.push({ name: i.name, path: createLink });
            }

            setPreview((prev) => ({
                ...prev,
                images: previewImg,
            }));
        } else {
            toast.warning('Định dạng file chưa được hỗ trợ, vui lòng chọn lại');
        }
    };

    useEffect(() => {
        selectRam && setInvalidField((prev) => ({ ...prev, ram: false }));
        selectInternalMemory && setInvalidField((prev) => ({ ...prev, internalMemory: false }));
        selectCategory && setInvalidField((prev) => ({ ...prev, category: false }));
        selectBrand && setInvalidField((prev) => ({ ...prev, brand: false }));
        images.thumb && setInvalidField((prev) => ({ ...prev, thumb: false }));
        images.images.length > 0 && setInvalidField((prev) => ({ ...prev, images: false }));
    }, [selectBrand, selectCategory, selectRam, selectInternalMemory, description, images]);

    useEffect(() => {
        return () => preview.thumb && URL.revokeObjectURL(preview.thumb);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images.thumb]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => (inputFileRef.current.value = '');
    }, [images.images]);

    useEffect(() => {
        return () => {
            if (preview.images?.length > 0) {
                for (let i of preview.images) {
                    URL.revokeObjectURL(i.path);
                }
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetImages]);

    const handleRemoveFile = (file) => {
        URL.revokeObjectURL(file.path);

        console.log(file);
        setImages((prev) => ({
            ...prev,
            images: prev.images.filter((item) => item.name !== file.name),
        }));

        setPreview((prev) => ({
            ...prev,
            images: prev.images.filter((item) => item.name !== file.name),
        }));
    };

    return (
        <div>
            {isLoading && (
                <div className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(10,10,10,0.5)] flex items-center justify-center z-[9999999999]">
                    <Uploading />
                </div>
            )}
            <div className="bg-[#181924] min-h-screen  text-white  px-5 pt-[80px] ">
                <form onSubmit={handleSubmit(handleSubmitForm)} className="px-3 py-5 bg-white text-gray-800 rounded-lg">
                    <div className="grid wide">
                        <div className="row">
                            <div className="col g-l-6">
                                <InputCustom
                                    id="name"
                                    label="Tên sản phẩm"
                                    register={{ ...register('name') }}
                                    error={errors.name?.message}
                                    isValue={watch('name')}
                                />
                            </div>
                            <div className="col g-l-6">
                                <div className="grid wide">
                                    <div className="row text-gray-800">
                                        <div className="col g-l-6">
                                            <Select
                                                ref={selectCategoryRef}
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        border: 'none',
                                                        boxShadow:
                                                            'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
                                                    }),
                                                }}
                                                placeholder="Danh mục sản phẩm"
                                                value={selectCategory}
                                                onChange={setSelectCategory}
                                                options={optionCategory}
                                            />
                                            {invalidField.category && (
                                                <p className="ml-1 mt-[2px] text-[14px] text-red-600">
                                                    Vui lòng nhập trường này!
                                                </p>
                                            )}
                                        </div>
                                        <div className="col g-l-6">
                                            <Select
                                                ref={selectBranRef}
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        border: 'none',
                                                        boxShadow:
                                                            'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
                                                    }),
                                                }}
                                                placeholder="Thương hiệu sản phẩm"
                                                onChange={setSelectBrand}
                                                options={optionBrand}
                                            />
                                            {invalidField.brand && (
                                                <p className="ml-1 mt-[2px] text-[14px] text-red-600">
                                                    Vui lòng nhập trường này!
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col g-l-3">
                                <InputCustom
                                    id="price"
                                    label="Giá sản phẩm"
                                    register={{ ...register('price') }}
                                    error={errors.price?.message}
                                    isValue={watch('price')}
                                />
                            </div>
                            <div className="col g-l-3">
                                <InputCustom
                                    id="quantity"
                                    label="Số lượng sản phẩm"
                                    register={{ ...register('quantity') }}
                                    error={errors.quantity?.message}
                                    isValue={watch('quantity')}
                                />
                            </div>
                            <div className="col g-l-3">
                                <Select
                                    ref={selectRamRef}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            border: 'none',
                                            boxShadow:
                                                'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
                                        }),
                                    }}
                                    placeholder="Dung lượng Ram"
                                    onChange={setSelectRam}
                                    options={optionsRam}
                                />
                                {invalidField.ram && (
                                    <p className="ml-1 mt-[2px] text-[14px] text-red-600">Vui lòng nhập trường này!</p>
                                )}
                            </div>
                            <div className="col g-l-3">
                                <Select
                                    ref={selectInternalMemoryRef}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            border: 'none',
                                            boxShadow:
                                                'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
                                        }),
                                    }}
                                    placeholder="Dung lượng bộ nhớ trong"
                                    onChange={setSelectInternalMemory}
                                    options={optionsInternalMemory}
                                />
                                {invalidField.internalMemory && (
                                    <p className="ml-1 mt-[2px] text-[14px] text-red-600">Vui lòng nhập trường này!</p>
                                )}
                            </div>
                            <div className="col g-l-3">
                                <h4 className="opacity-60 px-3 text-[16px]">Hình nền sản phẩm</h4>
                                <label
                                    htmlFor="selectThumb"
                                    className="cursor-pointer border h-[40px] flex items-center bg-white shadow-custom px-5 rounded-md"
                                >
                                    <span className="opacity-80">{`Đã chọn ${preview.thumb ? 1 : 0}`}</span>
                                    <input
                                        id="selectThumb"
                                        type="file"
                                        onChange={handleChooseThumb}
                                        className="hidden"
                                    />
                                </label>
                                {invalidField.thumb && (
                                    <p className="ml-1 mt-[2px] text-[14px] text-red-600">Vui lòng nhập trường này!</p>
                                )}
                                <div className="mt-5">
                                    {images.thumb && (
                                        <img className="w-[140px] object-cover" src={preview?.thumb} alt="" />
                                    )}
                                </div>
                            </div>
                            <div className="col g-l-9">
                                <h4 className="opacity-60 px-3 text-[16px]">Hình ảnh sản phẩm</h4>
                                <label
                                    htmlFor="selectImages"
                                    className=" cursor-pointer border h-[40px] flex items-center bg-white shadow-custom px-5 rounded-md"
                                >
                                    <span className="opacity-80">{`Đã chọn ${preview.images.length}`}</span>
                                    <input
                                        ref={inputFileRef}
                                        id="selectImages"
                                        className="hidden"
                                        type="file"
                                        multiple
                                        onChange={handleChooseImages}
                                    />
                                </label>
                                {invalidField.images && (
                                    <p className="ml-1 mt-[2px] text-[14px] text-red-600">Vui lòng nhập trường này!</p>
                                )}
                                <div className="mt-5 flex gap-3 overflow-x-auto w-full">
                                    {images.images.length > 0 &&
                                        preview.images.map((image, i) => {
                                            return (
                                                <div key={i} className="relative min-w-[140px]">
                                                    <img className="w-[140px] object-cover" src={image.path} alt="" />
                                                    <i
                                                        className="absolute top-0 right-[10px] cursor-pointer hover:opacity-90"
                                                        onClick={() => handleRemoveFile(image)}
                                                    >
                                                        <IoCloseOutline size={20} />
                                                    </i>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        <MarkdownEditor
                            label="Mô tả sản phẩm"
                            onChangeValue={setDescription}
                            invalidField={invalidField}
                            setInvalidField={setInvalidField}
                        />
                    </div>
                    <Button
                        customStyles="text-[14px] px-[20px] py-[12px] border rounded-tr-3xl rounded-bl-3xl bg-gradient-custom hover:bg-none hover:text-gray-900"
                        onClick={handleValidateFrom}
                    >
                        Tạo mới
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
