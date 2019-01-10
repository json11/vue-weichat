
export default [
    {
        path: '/',
        redirect: {
            path: '/home'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home/Home.vue'),
        meta: {
            pageTitle: '首页',
            keepAlive: false
        }
    },
    {
        path: '/listView',
        name: 'ListView',
        component: () => import(/* webpackChunkName: "listView" */ '../views/ListView/ListView.vue'),
        meta: {
            pageTitle: '列表页',
            keepAlive: true
        }
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import(/* webpackChunkName: "detail" */ '../views/Detail/Detail.vue'),
        meta: {
            pageTitle: '详情页',
            keepAlive: false
        }
    },
    {
        path: '/query',
        name: 'Query',
        component: () => import(/* webpackChunkName: "query" */ '../views/Query/Query.vue'),
        meta: {
            pageTitle: '查询预约',
            keepAlive: false
        }
    },
    {
        path: '/myBook',
        name: 'MyBook',
        component: () => import(/* webpackChunkName: "myBook" */ '../views/MyBook/MyBook.vue'),
        meta: {
            pageTitle: '预约列表',
            keepAlive: false
        }
    },
    {
        path: '/carModel',
        name: 'CarModel',
        component: () => import(/* webpackChunkName: "carModel" */ '../views/CarModel/CarModel.vue'),
        meta: {
            pageTitle: '车型参数',
            keepAlive: false
        }
    }
]