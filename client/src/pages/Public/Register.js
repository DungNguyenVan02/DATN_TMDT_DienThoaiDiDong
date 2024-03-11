import React, { useState } from 'react';
import { InputCustom } from '~/components/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRegister } from '~/utiles/schemaYup';
import { apiRegister, apiFinalRegister } from '~/apis';
import { toast } from 'react-toastify';
import withBaseComponent from '~/components/hocs/withBaseComponent';

import routes from '~/config/routes';
import { Link } from 'react-router-dom';
import icons from '~/utiles/icons';
import Button from '~/components/Button';
import Swal from 'sweetalert2';

const Register = ({ navigate }) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [codeVerified, setCodeVerified] = useState('');

    const { IoIosEyeOff, IoIosEye } = icons;
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaRegister),
    });

    const formSubmit = async (data) => {
        console.log(data);
        const response = await apiRegister(data);
        if (response?.success) {
            Swal.fire({
                title: 'Thông báo',
                text: 'Mã xác thực đã được gửi, vui lòng kiểm tra email và xác thực!',
                icon: 'info',
            }).then(() => {
                setIsShowModal(true);
            });
        } else {
            toast.error('Có lỗi sảy ra, vui lòng thử lại sau!');
        }
    };

    const handleCompleted = async () => {
        const response = await apiFinalRegister({ codeVerified });

        if (response?.success) {
            setIsShowModal(false);
            Swal.fire({
                title: 'Thành công',
                text: 'Tài khoản đã được xác thực, vui lòng đăng nhập vào hệ thống',
                icon: 'success',
            }).then(() => {
                navigate(`/${routes.login}`);
            });
        }
    };

    return (
        <div>
            {isShowModal && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-overlay z-[9999999] flex justify-center items-center">
                    <div className="text-gray-800 bg-white w-[400px] p-4 rounded-md shadow-xl flex flex-col gap-5">
                        <h3 className="text-center text-[34px] text-gradient">Xác thực</h3>
                        <input
                            value={codeVerified}
                            onChange={(e) => setCodeVerified(e.target.value)}
                            className="placeholder:text-[14px] px-2 h-[40px] rounded-md outline-none bg-transparent shadow-custom"
                            placeholder="Nhập mã xác thực tài khoản"
                        />
                        <Button
                            onClick={handleCompleted}
                            customStyles="w-full text-[14px] px-[20px] py-[12px] border rounded-tr-3xl rounded-bl-3xl bg-gradient-custom hover:bg-none hover:text-gray-800"
                        >
                            Gửi
                        </Button>
                    </div>
                </div>
            )}
            <div className="bg-black mt-[-74px] pt-[200px]"></div>
            <div className="min-h-[400px] bg-gradient-custom-2 flex justify-center">
                <form
                    onSubmit={handleSubmit(formSubmit)}
                    className="my-[5%] min-w-[400px] bg-white shadow-custom p-5 rounded-lg"
                >
                    <h3 className="text-center text-gradient text-[28px] my-4">Đăng ký tài khoản</h3>
                    <InputCustom
                        id="fullName"
                        label="Tên tài khoản"
                        register={{ ...register('fullName') }}
                        error={errors.fullName?.message}
                        isValue={watch('fullName')}
                    />
                    <InputCustom
                        id="email"
                        label="Email"
                        register={{ ...register('email') }}
                        error={errors.email?.message}
                        isValue={watch('email')}
                    />
                    <InputCustom
                        id="phone"
                        label="Số điện thoại"
                        register={{ ...register('phone') }}
                        error={errors.phone?.message}
                        isValue={watch('phone')}
                    />
                    <InputCustom
                        id="password"
                        label="Password"
                        type="password"
                        register={{ ...register('password') }}
                        error={errors.password?.message}
                        isValue={watch('password')}
                        icons={[<IoIosEyeOff size={20} color="gray" />, <IoIosEye size={20} color="gray" />]}
                    />
                    <InputCustom
                        id="passwordConfirm"
                        label="Password confirm"
                        type="password"
                        register={{ ...register('passwordConfirm') }}
                        error={errors.passwordConfirm?.message}
                        isValue={watch('passwordConfirm')}
                        icons={[<IoIosEyeOff size={20} color="gray" />, <IoIosEye size={20} color="gray" />]}
                    />

                    <button className="py-2 w-full rounded-md bg-gradient-custom mt-4 hover:translate-y-[-4px] shadow-custom">
                        Đăng ký
                    </button>
                    <div className="flex justify-center gap-2 items-center mt-4">
                        <h3>Bạn đã có tài khoản, đăng nhập</h3>
                        <Link
                            to={`/${routes.register}`}
                            className="opacity-60 hover:text-blue-500 hover:opacity-100 cursor-pointer"
                        >
                            tại đây
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default withBaseComponent(Register);
