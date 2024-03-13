import { Blogs, Cart, DetailProduct, Home, Login, Products, Register, Forgot } from '~/pages/Public';

import routes from '~/config/routes';
import { Dashboard, ManageOrders, ManageProducts, ManageUsers } from '~/pages/Admin';

const routesApp = [
    {
        path: routes.home,
        component: Home,
    },
    {
        path: routes.login,
        component: Login,
    },
    {
        path: routes.forgot,
        component: Forgot,
    },
    {
        path: routes.register,
        component: Register,
    },
    {
        path: routes.products,
        component: Products,
    },
    {
        path: routes.products_detail_slug_pid,
        component: DetailProduct,
    },
    {
        path: routes.blogs,
        component: Blogs,
    },
    {
        path: routes.cart,
        component: Cart,
    },

    // Admin
    {
        path: routes.admin_dashboard,
        component: Dashboard,
        adminLayout: true,
    },
    {
        path: routes.admin_manage_orders,
        component: ManageOrders,
        adminLayout: true,
    },
    {
        path: routes.admin_manage_products,
        component: ManageProducts,
        adminLayout: true,
    },
    {
        path: routes.admin_manage_users,
        component: ManageUsers,
        adminLayout: true,
    },
];

export default routesApp;
