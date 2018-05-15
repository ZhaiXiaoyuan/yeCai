import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/shop',
                    name:'shop',
                    component: resolve => require(['../page/user/ShopAdmin.vue'], resolve)
                },
                {
                    path: '/shopDetail/:id',
                    name:'shopDetail',
                    component: resolve => require(['../page/user/ShopDetail'], resolve)
                },
                {
                    path: '/user',
                    name:'user',
                    component: resolve => require(['../page/user/UserAdmin'], resolve)
                },
                {
                    path: '/userDetail/:id',
                    name:'userDetail',
                    component: resolve => require(['../page/user/UserDetail.vue'], resolve)
                },
                {
                    path: '/benefitRank',
                    name:'benefitRank',
                    component: resolve => require(['../page/rank/BenefitRank.vue'], resolve)
                },
                {
                    path: '/saleRank',
                    name:'saleRank',
                    component: resolve => require(['../page/rank/SaleRank.vue'], resolve)
                },
                {
                    path: '/oddsRank',
                    name:'oddsRank',
                    component: resolve => require(['../page/rank/OddsRank.vue'], resolve)
                },
                {
                    path: '/setting',
                    name:'setting',
                    component: resolve => require(['../page/setting/SystemSetting.vue'], resolve)
                },
                {
                    path: '/log',
                    name:'log',
                    component: resolve => require(['../page/financial/HandleRecord.vue'], resolve)
                },
                {
                    path: '/rebatesRecord',
                    name:'rebatesRecord',
                    component: resolve => require(['../page/financial/RebatesRecord.vue'], resolve)
                },
                {
                    path: '/permission',
                    name:'permission',
                    component: resolve => require(['../page/permission/Permission.vue'], resolve)
                },
                {
                    path: '/saleStatistics/:id?',
                    name:'saleStatistics',
                    component: resolve => require(['../page/shop/SaleStatistics.vue'], resolve)
                },
                {
                    path: '/orderStatistics/:id?',
                    name:'orderStatistics',
                    component: resolve => require(['../page/shop/OrderStatistics.vue'], resolve)
                },
                {
                    path: '/statistics/:id?',
                    name:'statistics',
                    component: resolve => require(['../page/shop/Statistics.vue'], resolve)
                },
                {
                    path: '/setPassword',
                    name:'statistics',
                    component: resolve => require(['../page/account/setPassword.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            name:'login',
            component: resolve => require(['../page/account/Login.vue'], resolve)
        },
        {
            path: '/adminLogin',
            name:'adminLogin',
            component: resolve => require(['../page/account/Login.vue'], resolve)
        },
        {
            path: '/shopLogin',
            name:'shopLogin',
            component: resolve => require(['../page/account/Login.vue'], resolve)
        },
        {
            path: '/userLogin',
            name:'userLogin',
            component: resolve => require(['../page/account/Login.vue'], resolve)
        },
    ]
})
