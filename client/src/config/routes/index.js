const routes = {
    // public
    home: '/',
    products: 'products',
    products_detail_slug_pid: 'products/detail/:slug/:pid',
    cart: 'cart',
    checkout: 'checkout',

    profile: 'profile',
    profile_wishlist: 'profile/wishlist',

    blogs: 'blogs',
    blogs_detail_bid: 'blogs/detail/:bid',

    login: 'login',
    register: 'register',
    forgot: 'forgot',

    //admin
    admin: 'admin',
    admin_dashboard: 'admin/dashboard',

    admin_manage_products: 'admin/manage/products',
    admin_manage_product_create: 'admin/manage/product_create',

    admin_manage_users: 'admin/manage/users',

    admin_manage_orders: 'admin/manage/orders',
    admin_manage_order_return: 'admin/manage/orders_return',
    admin_manage_order_success: 'admin/manage/orders_success',
};

export default routes;
