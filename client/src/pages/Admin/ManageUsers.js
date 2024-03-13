import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiDeleteUser, apiGetUsers, apiUpdateUserByAdmin } from '~/apis';
import { Pagination } from '~/components/common';
import withBaseComponent from '~/components/hocs/withBaseComponent';
import { useDebounce } from '~/components/hooks';

import icons from '~/utiles/icons';

const ManageUsers = ({ navigate, location }) => {
    const { CiSearch, ImBin, LiaUserTimesSolid, LiaUserCheckSolid, BsSortDown, BsSortUp } = icons;
    const [params] = useSearchParams();
    const [users, setUser] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isRerender, setIsRerender] = useState(false);
    const [sortName, setSortName] = useState(false);
    const [sortCreatedAt, setSortCreatedAt] = useState(false);

    const fetchUsers = async (params) => {
        const response = await apiGetUsers(params);
        if (response?.success) {
            setUser(response);
        }
    };

    const debounceValue = useDebounce(searchText, 500);

    const handleSearchText = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchText(searchValue);
        }
    };

    useEffect(() => {
        const queries = Object.fromEntries([...params]);
        if (debounceValue) {
            queries.q = debounceValue;
            queries.page = 1;
            navigate({
                pathname: location.pathname,
                search: createSearchParams(queries).toString(),
            });
        }
        if (debounceValue === '') {
            params.get('q') &&
                navigate({
                    pathname: location.pathname,
                    search: createSearchParams('').toString(),
                });
        }

        fetchUsers(queries);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue, params, isRerender]);

    const handleRemove = (uid) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa tài khoản này?',
            text: 'Tài khoản này sẽ bị xóa khỏi hệ thống',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận xóa',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUser(uid);
                if (response.success) {
                    setIsRerender((prev) => !prev);
                    Swal.fire({
                        title: 'Xóa thành công!',
                        text: 'Tài khoản đã bị xóa',
                        icon: 'success',
                    });
                } else {
                    Swal.fire({
                        title: 'Hệ thống thông báo',
                        text: 'Có lỗi xảy ra, vui lòng thử lại sau',
                        icon: 'warning',
                    });
                }
            }
        });
    };

    const handleToggleBlocked = (uid, isBlocked) => {
        Swal.fire({
            title: `${!isBlocked ? 'Bạn có chắc chắn muốn mở khóa tài khoản này?' : 'Bạn có chắc chắn muốn khóa tài khoản này?'}`,
            text: `${!isBlocked ? 'Tài khoản sẽ được hoạt động bình thường' : 'Tài khoản sẽ không sử dụng được tại hệ thống'}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiUpdateUserByAdmin(uid, isBlocked);
                if (response.success) {
                    setIsRerender((prev) => !prev);
                    Swal.fire({
                        title: 'Cập nhật thành công!',
                        text: `Tài khoản đã được ${isBlocked ? 'khóa' : 'mở'}`,
                        icon: 'success',
                    });
                } else {
                    Swal.fire({
                        title: 'Hệ thống thông báo',
                        text: 'Có lỗi xảy ra, vui lòng thử lại sau',
                        icon: 'warning',
                    });
                }
            }
        });
    };

    const handleSort = (sort) => {
        let isSort = false;
        if (sort.key === 'name') {
            setSortName(!sortName);
            setSortCreatedAt(false);
            isSort = !sortName;
        }
        if (sort.key === 'createdAt') {
            setSortCreatedAt(!sortCreatedAt);
            setSortName(false);
            isSort = !sortCreatedAt;
        }
        navigate({
            pathname: location.pathname,
            search: createSearchParams(isSort ? { sort: `-${sort.key}` } : '').toString(),
        });
    };

    return (
        <div className="bg-[#181924] min-h-screen  text-white  px-5 pt-[80px]  ">
            <div className="px-3 py-5 bg-[#2a2b36]  rounded-lg">
                <div className="flex h-[60px] bg-[#2a2b36] items-center py-3 gap-5">
                    <div className="h-full flex items-center border rounded-md ">
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleSearchText}
                            placeholder="Tìm kiếm theo tên hoặc số điện thoại"
                            className="w-[300px] bg-transparent pl-3 h-full outline-none rounded-md placeholder:text-[14px]"
                        />
                        <CiSearch size={20} className="mx-3 cursor-pointer opacity-80 hover:opacity-100" />
                    </div>
                </div>
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 flex items-center gap-2 cursor-pointer"
                                    onClick={() => {
                                        handleSort({ key: 'name' });
                                    }}
                                >
                                    Họ tên {sortName ? <BsSortDown size={22} /> : <BsSortUp size={22} />}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số điện thoại
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quyền tài khoản
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Tình trạng
                                </th>

                                <th
                                    scope="col"
                                    className="px-6 py-3 flex items-center gap-2 cursor-pointer"
                                    onClick={() => {
                                        handleSort({ key: 'createdAt' });
                                    }}
                                >
                                    createdAt {sortCreatedAt ? <BsSortDown size={22} /> : <BsSortUp size={22} />}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tùy chọn
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.data?.map((user, index) => {
                                return (
                                    <tr
                                        key={user._id}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    >
                                        <td className="px-6 py-3">
                                            {((+params.get('page') || 1) - 1) * process.env.REACT_APP_LIMIT + index + 1}
                                        </td>
                                        <td className="px-6 py-3">{user?.fullName}</td>

                                        <td className="px-6 py-3">{user?.email}</td>
                                        <td className="px-6 py-3">{user?.phone}</td>

                                        <td className="px-6 py-3 text-center">
                                            {user?.role === 12 ? 'Admin' : 'User'}
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            {user?.isBlocked ? 'Blocked' : 'Active'}
                                        </td>
                                        <td className="px-6 py-3">{moment(user?.createdAt).format('DD-MM-YYYY')}</td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center justify-center gap-3">
                                                {user?.isBlocked ? (
                                                    <i
                                                        className="cursor-pointer opacity-80 hover:opacity-100"
                                                        onClick={() =>
                                                            handleToggleBlocked(user._id, { isBlocked: false })
                                                        }
                                                    >
                                                        <LiaUserCheckSolid size={22} color="#22ba40" />
                                                    </i>
                                                ) : (
                                                    <i
                                                        className="cursor-pointer opacity-80 hover:opacity-100"
                                                        onClick={() =>
                                                            handleToggleBlocked(user._id, { isBlocked: true })
                                                        }
                                                    >
                                                        <LiaUserTimesSolid size={22} color="#ba8925" />
                                                    </i>
                                                )}
                                                <i
                                                    className="cursor-pointer opacity-80 hover:opacity-100"
                                                    onClick={() => handleRemove(user._id)}
                                                >
                                                    <ImBin size={20} color="#de3737" />
                                                </i>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-end">
                    <Pagination totalCount={users.counts} />
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(ManageUsers);
