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
    //临时测试
    let basicUrl=false&&process.env.NODE_ENV=='development'?'http://zyu-server.wicp.net:19356/yecai':'http://api.yeahcai.com/yecai';
     /* let basicUrl=false&&process.env.NODE_ENV=='development'?'http://api.yeahcai.com/yecai':'http://api.yeahcai.cn/yecai';*/
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
        //设置门店账号状态
        setShopState:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/shop/setShopState',
                params: params
            });
        },
        //更新门店信息
        updateShopInfo:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/shop/updateShopInfo',
                params: params
            });
        },
        //上传公司照片
        uploadShopPic:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/shop/uploadPic',
                params: params
            });
        },
        //添加门店账户
        addShop:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/shop/addShop',
                params: params
            });
        },
        //超级管理员登陆
        superManagerLogin:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/superManagerLogin',
                params: params
            });
        },
        //获取系统开放时间
        getQRTime:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/sys/getQRTime',
                params: params
            });
        },
        //设置二维码开始时间
        setQRStartTime:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/sys/setQRStartTime',
                params: params
            });
        },
        //设置二维码关闭时间
        setQREndTime:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/sys/setQREndTime',
                params: params
            });
        },
        //获取市场管理员列表
        getMarketManagerList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/getMarketManagerList',
                params: params
            });
        },
        //添加市场管理员
        addMarketManager:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/addMarketManager',
                params: params
            });
        },
        //设置市场管理员状态
        setMarketManagerState:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/setMarketManagerState',
                params: params
            });
        },
        //更新市场管理员
        updateMarketManager:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/updateMarketManager',
                params: params
            });
        },
        //获取财务管理员列表
        getAccountantManagerList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/getAccountantManagerList',
                params: params
            });
        },
        //添加财务管理员
        addAccountantManager:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/addAccountantManager',
                params: params
            });
        },
        //更新财务管理员
        updateAccountantManager:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl + '/admin/updateAccountantManager',
                params: params
            });
        },
        //设置财务管理员状态
        setAccountantManagerState:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl + '/admin/setAccountantManagerState',
                params: params
            });
        },
        //管理人员登录
        adminLogin:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl + '/admin/adminLogin',
                params: params
            });
        },
        //获取收益排名(只返回前10,不用分页)
        getEarningsRanking:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl + '/ranking/getEarningsRanking',
                params: params
            });
        },
        //获取销售排名(只返回前10,不用分页)
        getSaleRanking:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl + '/ranking/getSaleRanking',
                params: params
            });
        },
        //获取手机验证码
        genPhoneCode:function (params,url) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl + url,
                params: params
            });
        },
        //获取门店订单列表
        getShopOrderList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl + '/user/getUserShopOrderList',
                params: params
            });
        },
        //获取中奖列表
        getUserShopWinInfoList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl + '/user/getUserShopWinInfoList',
                params: params
            });
        },
        //获取平台订单列表
        getPlatformOderList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl + '/order/getOrderList',
                params: params
            });
        },
        //获取平台中奖信息
        getPlatforWinInfoList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl + '/order/getWinInfoList',
                params: params
            });
        },
        //校验短信
        checkPhoneCode:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl + '/sms/verifySms',
                params: params
            });
        },
        //修改超级管理员密码
        updateSuperManagerPassword:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl + '/admin/updateSuperManagerPassword',
                params: params
            });
        },
    }
  },

}
