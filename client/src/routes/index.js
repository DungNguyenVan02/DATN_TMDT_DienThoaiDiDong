import { Blogs, Cart, DetailProduct, Home, Login, Products, Register, Forgot } from '~/pages/Public';

import routes from '~/config/routes';

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
];

export default routesApp;
