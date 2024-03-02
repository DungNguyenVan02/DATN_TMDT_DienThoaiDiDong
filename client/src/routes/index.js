import { Cart, Home, Products } from '~/pages/Public';

import routes from '~/config/routes';

const routesApp = [
    {
        path: routes.home,
        component: Home,
    },
    {
        path: routes.product,
        component: Products,
    },
    {
        path: routes.cart,
        component: Cart,
    },
];

export default routesApp;
