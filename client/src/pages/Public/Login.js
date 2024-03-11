import { InputCustom } from '~/components/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin } from '~/utiles/schemaYup';
import { apiLogin } from '~/apis';
import { toast } from 'react-toastify';
import withBaseComponent from '~/components/hocs/withBaseComponent';
import { login } from '~/redux/slice/userSlide';
import routes from '~/config/routes';
import { Link } from 'react-router-dom';
import icons from '~/utiles/icons';

const Login = ({ dispatch, navigate }) => {
    const { IoIosEyeOff, IoIosEye } = icons;
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaLogin),
    });

    const formSubmit = async (data) => {
        const response = await apiLogin(data);
        if (response.success) {
            dispatch(login(response));
            navigate(routes.home);
            toast.info('Chào mừng bạn đến với LEO phone');
        } else {
            toast.error(response.mes);
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
                    <h3 className="text-center text-gradient text-[28px] my-4">Đăng nhập</h3>
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
                    <button className="py-2 w-full rounded-md bg-gradient-custom mt-4 hover:translate-y-[-4px] shadow-custom">
                        Đăng nhập
                    </button>
                    <div className="flex justify-between gap-5 items-center mt-4">
                        <Link
                            to={`/${routes.register}`}
                            className="opacity-60 hover:text-blue-500 hover:opacity-100 cursor-pointer"
                        >
                            Đăng ký tài khoản
                        </Link>
                        <span
                            onClick={() => navigate(`/${routes.forgot}`)}
                            className="opacity-60 hover:text-blue-500 hover:opacity-100 cursor-pointer"
                        >
                            Quên mật khẩu
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default withBaseComponent(Login);
