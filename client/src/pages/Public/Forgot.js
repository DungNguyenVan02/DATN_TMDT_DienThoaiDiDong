import { InputCustom } from '~/components/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaForgot } from '~/utiles/schemaYup';
import { apiResetPassword, apiTakeCode } from '~/apis';
import { toast } from 'react-toastify';
import withBaseComponent from '~/components/hocs/withBaseComponent';
import routes from '~/config/routes';
import { Link } from 'react-router-dom';
import icons from '~/utiles/icons';
import Swal from 'sweetalert2';

const Forgot = ({ navigate }) => {
    const { IoIosEyeOff, IoIosEye } = icons;
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaForgot),
    });

    const formSubmit = async (data) => {
        const response = await apiResetPassword({
            email: data?.email,
            codeForgotPassword: data?.codeVerified,
            password: data?.password,
        });
        if (response.success) {
            Swal.fire({
                title: 'Hệ thống thông báo',
                text: 'Đã đổi mật khẩu thành công!',
                icon: 'success',
            }).then(() => {
                navigate(`/${routes.login}`);
            });
        } else {
            toast.error(response.mes);
        }
    };

    const HandleTakeCode = async () => {
        if (!watch('email') && !watch('password') && !watch('passwordConfirm')) {
            toast.warning('Vui lòng nhập đủ các trường còn trống');
        } else {
            const response = await apiTakeCode({ email: watch('email') });
            if (response.success) {
                Swal.fire({
                    title: 'Hệ thống thông báo',
                    text: 'Mã xác thực đã được gửi, vui lòng kiểm tra email!',
                    icon: 'info',
                });
            } else {
                Swal.fire({
                    title: 'Hệ thống thông báo',
                    text: 'Email chưa được đăng ký tại hệ thống!',
                    icon: 'info',
                });
            }
        }
    };

    return (
        <div>
            <div className="bg-black mt-[-74px] pt-[200px]"></div>
            <div className="min-h-[400px] bg-gradient-custom-2 flex justify-center">
                <form
                    onSubmit={handleSubmit(formSubmit)}
                    className="my-[5%] min-w-[400px] bg-white shadow-custom p-5 rounded-lg"
                >
                    <h3 className="text-center text-gradient text-[28px] my-4">Lấy lại mật khẩu</h3>
                    <InputCustom
                        id="email"
                        label="Email"
                        register={{ ...register('email') }}
                        error={errors.email?.message}
                        isValue={watch('email')}
                    />
                    <InputCustom
                        id="password"
                        label="Password"
                        type="password"
                        icons={[<IoIosEyeOff size={20} color="gray" />, <IoIosEye size={20} color="gray" />]}
                        register={{ ...register('password') }}
                        error={errors.password?.message}
                        isValue={watch('password')}
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
                    <div className=" flex items-start  gap-5 w-full">
                        <InputCustom
                            id="codeVerified"
                            label="codeVerified"
                            register={{ ...register('codeVerified') }}
                            error={errors.codeVerified?.message}
                            isValue={watch('codeVerified')}
                        />
                        <span
                            onClick={HandleTakeCode}
                            className=" cursor-pointer  text-[14px] px-5 py-[10px] border rounded-tr-3xl rounded-bl-3xl bg-gradient-custom hover:bg-none hover:text-gray-900"
                        >
                            Lấy mã
                        </span>
                    </div>

                    <button className="py-2 w-full rounded-md bg-gradient-custom mt-4 hover:translate-y-[-4px] shadow-custom">
                        Đổi mật khẩu
                    </button>
                    <div className="flex justify-between gap-5 items-center mt-4">
                        <Link
                            to={`/${routes.login}`}
                            className="opacity-60 hover:text-blue-500 hover:opacity-100 cursor-pointer"
                        >
                            Quay lại trang đăng nhập
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default withBaseComponent(Forgot);
