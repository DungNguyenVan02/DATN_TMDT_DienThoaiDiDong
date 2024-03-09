import { Blogs, Cart, DetailProduct, Home, Products } from '~/pages/Public';

import routes from '~/config/routes';

const routesApp = [
    {
        path: routes.home,
        component: Home,
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
