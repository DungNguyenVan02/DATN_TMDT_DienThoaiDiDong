import routes from '~/config/routes';
import icons from './icons';

const { TfiDashboard, TiGroupOutline, HiOutlineClipboardDocumentList, RiProductHuntLine } = icons;

export const footerList = [
    {
        title: 'LEO phone shop',
        sub: ['Giới thiệu', 'Liên hệ', 'Điều khoản', 'Bảo mật'],
    },
    {
        title: 'Sản phẩm kinh doanh',
        sub: ['Điện thoại', 'Ipad', 'Linh kiện, phụ tùng'],
    },
    {
        title: 'Công ty cổ phần LEO phone shop',
        sub: [
            'Mã số thuế: 0122977668',
            'Ngày thành lập: 03/03/2024',
            'Điều khoản',
            'Lĩnh vực: Kinh doanh sản phẩm công nghệ',
        ],
    },
];

export const voteOptions = [
    {
        id: 1,
        vote: 'Rất tệ',
    },
    {
        id: 2,
        vote: 'Tệ',
    },
    {
        id: 3,
        vote: 'Bình thường',
    },
    {
        id: 4,
        vote: 'Tốt',
    },
    {
        id: 5,
        vote: 'Rất tốt',
    },
];

export const sidebarMenuAdmin = [
    {
        id: 1,
        title: 'Dashboard',
        header: 'Điều khiển',
        path: routes.admin_dashboard,
        icon: <TfiDashboard size={20} />,
    },
    {
        id: 2,
        title: 'Quản lý người dùng',
        header: 'Người dùng',

        path: routes.admin_manage_users,

        icon: <TiGroupOutline size={20} />,
    },
    {
        id: 3,
        title: 'Quản lý sản phẩm',
        header: 'Sản phẩm',

        icon: <RiProductHuntLine size={20} />,
        children: [
            {
                id: 1,
                title: 'Danh sách sản phẩm',
                path: routes.admin_manage_products,
            },
            {
                id: 2,
                title: 'Thêm sản phẩm',
                path: routes.admin_manage_product_create,
            },
        ],
    },
    {
        id: 4,
        title: 'Quản lý đơn hàng',
        header: 'Đơn hàng',
        path: routes.admin_manage_orders,
        icon: <HiOutlineClipboardDocumentList size={20} />,
        children: [
            {
                id: 1,
                title: 'Danh sách đơn hàng',
                path: routes.admin_manage_orders,
            },
            {
                id: 2,
                title: 'Danh sách đơn hoàn',
                path: routes.admin_manage_order_return,
            },
            {
                id: 3,
                title: 'Đơn hàng thành công',
                path: routes.admin_manage_order_success,
            },
        ],
    },
];

export const optionsRam = [
    { value: '4 GB', label: '4 GB' },
    { value: '6 GB', label: '6 GB' },
    { value: '8 GB', label: '8 GB' },
    { value: '16 GB', label: '16 GB' },
];

export const optionsInternalMemory = [
    { value: '32 GB', label: '32 GB' },
    { value: '64 GB', label: '64 GB' },
    { value: '128 GB', label: '128 GB' },
    { value: '256 GB', label: '256 GB' },
    { value: '512 GB', label: '512 GB' },
    { value: '1 T', label: '1 T' },
];
