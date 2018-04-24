/**
 * Created by Designer on 2017/12/21.
 */
import router from '../router'


export default {
  install: function (Vue, options) {


    Vue.http.options.emulateJSON = true;
    Vue.http.interceptors.push((request, next)  =>{

      next((response) => {
        //对于有作登录状态的接口你，未未登录时跳转到登录页
        if(response.status==401){
         /* router.push({name:''});*/
        }
        return response
      });

    });
    /*自定义ajax函数，自带的不好用*/
    Vue.http.ajax = async function (options) {
      if(options.method.toUpperCase() == 'GET'){
        let res = await Vue.http.get(options.url, {params: options.params});
        if(typeof res.body == 'string'){
          return JSON.parse(res.body);
        }else{
          return res.body;
        }
      }else if(options.method.toUpperCase() == 'POST'){
        let res = await Vue.http.post(options.url, options.params);
        if(typeof res.body == 'string'){
          return JSON.parse(res.body);
        }else{
          return res.body;
        }
      }
    }

    /**/
    let basicUrl='http://zyu-server.wicp.net:19356/yecai';
    Vue.api={
        //获取用户详细信息
      getUserDetail:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/user/getUserDetail',
          params: params
        });
      },
        //获取门店账户列表
        getShopList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/shop/getShopList',
                params: params
            });
        },
        //获取用户账号列表
        getUserList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/getUserList',
                params: params
            });
        },
        //批量添加门店账户
        addShopBatch:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/shop/addShopBatch',
                params: params
            });
        },
        //获取门店详细信息
        getShopDetail:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/shop/getShopDetail',
                params: params
            });
        },
        //批量添加用户
        addUserBatch:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/addUserBatch',
                params: params
            });
        },
        //获取用户账号列表
        getUserList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/getUserList',
                params: params
            });
        },
        //获取用户详细信息
        getUserDetail:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/getUserDetail',
                params: params
            });
        },
        //设置用户账号状态
        setUserState:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/setUserState',
                params: params
            });
        },
        //编辑用户信息
        updateUserInfo:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/updateUserInfo',
                params: params
            });
        },
        //新建用户账号
        addUser:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/addUser',
                params: params
            });
        },
    }
  },

}
