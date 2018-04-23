/**
 * Created by Designer on 2018/1/23.
 */

import Distpicker from './Distpicker';

/*全局组件注册配置*/
export default {
  install:function(Vue){
    /*标签调度方式*/
    Vue.component('v-distpicker',Distpicker);

    /*方法调度方式*/
    const functionObject={

    }
    /**/
    Object.assign(Vue,functionObject);
    Object.assign(Vue.prototype,functionObject);
  }
};
