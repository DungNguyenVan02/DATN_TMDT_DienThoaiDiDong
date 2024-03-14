import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Pagination } from '~/components/common';
import { apiDeleteProduct, apiGetProducts } from '~/apis';
import withBaseComponent from '~/components/hocs/withBaseComponent';
import { useDebounce } from '~/components/hooks';
import { formatMoney } from '~/utiles/helper';
import icons from '~/utiles/icons';

const ManageProducts = ({ navigate, location }) => {
    const { CiSearch, ImBin, LuFileEdit, LiaCubesSolid, BsSortDown, BsSortUp } = icons;

    const [params] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isRerender, setIsRerender] = useState(false);
    const [sortName, setSortName] = useState(false);
    const [sortCreatedAt, setSortCreatedAt] = useState(false);

    const fetchUsers = async (params) => {
        const response = await apiGetProducts(params);
        if (response?.success) {
            setProducts(response);
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

    const handleDelete = (pid) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
            text: 'Sản phẩm này sẽ bị xóa khỏi hệ thống',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteProduct(pid);
                if (response.success) {
                    setIsRerender((prev) => !prev);
                    Swal.fire({
                        title: 'Xóa thành công!',
                        text: 'Sản phẩm đã bị xóa',
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
        if (sort.key === 'updatedAt') {
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
        <div>
            <div className="bg-[#181924] min-h-screen  text-white  px-5 pt-[80px] w-[1300px]">
                <div className="px-3 py-5 bg-[#2a2b36]  rounded-lg">
                    <div className="flex h-[60px] bg-[#2a2b36] items-center py-3 gap-5">
                        <div className="h-full flex items-center border rounded-md ">
                            <input
                                type="text"
                                value={searchText}
                                onChange={handleSearchText}
                                placeholder="Tìm kiếm theo tên sản phẩm"
                                className="w-[300px] bg-transparent pl-3 h-full outline-none rounded-md placeholder:text-[14px]"
                            />
                            <CiSearch size={20} className="mx-3 cursor-pointer opacity-80 hover:opacity-100" />
                        </div>
                    </div>
                    <div className="overflow-x-auto  shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-white uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Hình ảnh
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 flex items-center gap-2 cursor-pointer"
                                        onClick={() => {
                                            handleSort({ key: 'name' });
                                        }}
                                    >
                                        Tên sản phẩm {sortName ? <BsSortDown size={22} /> : <BsSortUp size={22} />}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Hãng sản xuất
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Danh mục
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Số lượng
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Giá
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Giảm giá
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Lượt bán
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 flex items-center gap-2 cursor-pointer"
                                        onClick={() => {
                                            handleSort({ key: 'updatedAt' });
                                        }}
                                    >
                                        updatedAt {sortCreatedAt ? <BsSortDown size={22} /> : <BsSortUp size={22} />}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tùy chọn
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.products?.map((product, index) => {
                                    return (
                                        <tr
                                            key={product._id}
                                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                        >
                                            <td className="px-6 py-3">
                                                {((+params.get('page') || 1) - 1) * process.env.REACT_APP_LIMIT +
                                                    index +
                                                    1}
                                            </td>
                                            <td className="px-6 py-3">
                                                <img
                                                    className="w-[60px h-[60px] object-cover"
                                                    src={product?.thumb}
                                                    alt=""
                                                />
                                            </td>
                                            <td className="px-6 py-3">
                                                <h3 className="line-clamp-2">{product?.name}</h3>
                                            </td>

                                            <td className="px-6 py-3">{product?.brand}</td>
                                            <td className="px-6 py-3">{product?.category}</td>

                                            <td className="px-6 py-3 text-center">{product?.quantity}</td>
                                            <td className="px-6 py-3 text-center">{formatMoney(product?.price)}</td>
                                            <td className="px-6 py-3 text-center">{product?.discount}%</td>
                                            <td className="px-6 py-3 text-center">{product?.sold}</td>
                                            <td className="px-6 py-3">
                                                {moment(product?.updatedAt).format('DD-MM-YYYY')}
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center justify-center gap-3">
                                                    <i className="cursor-pointer opacity-80 hover:opacity-100">
                                                        <LuFileEdit size={20} color="#4285f4" />
                                                    </i>
                                                    <i className="cursor-pointer opacity-80 hover:opacity-100">
                                                        <LiaCubesSolid size={24} color="#34a853" />
                                                    </i>
                                                    <i
                                                        className="cursor-pointer opacity-80 hover:opacity-100"
                                                        onClick={() => handleDelete(product._id)}
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
                    <div className="mt-4 flex justify-end">{<Pagination totalCount={products.counts} />}</div>
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(ManageProducts);
