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
                    path: '/',
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
                    component: resolve => require(['../page/user/UserAdmin'], resolve)
                },
                {
                    path: '/userDetail/:id',
                    component: resolve => require(['../page/user/UserDetail.vue'], resolve)
                },
                {
                    path: '/benefitRank',
                    component: resolve => require(['../page/rank/BenefitRank.vue'], resolve)
                },
                {
                    path: '/oddsRank',
                    component: resolve => require(['../page/rank/OddsRank.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../page/account/Login.vue'], resolve)
        },
    ]
})
