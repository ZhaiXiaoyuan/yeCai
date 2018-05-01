<template>
    <div class="login-wrap">
        <div class="ms-title">
            <span v-if="pageName=='login'">夜彩平台超级管理员</span>
            <span v-if="pageName=='adminLogin'">夜彩平台<span v-if="accountType=='marketManager'">市场</span><span v-if="accountType=='accountantManager'">财务</span>管理员</span>
        </div>
        <div class="ms-login">
            <el-radio-group v-model="accountType" style="margin-bottom: 20px;" v-if="pageName=='adminLogin'">
                <el-radio label="marketManager">市场管理员</el-radio>
                <el-radio label="accountantManager">财务管理员</el-radio>
            </el-radio-group>
            <el-form :model="ruleForm"  ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>

            </el-form>
        </div>
    </div>
</template>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
<script>
    import Vue from 'vue'

    export default {
        data: function(){
            return {
                pageName:null,
                accountType:'marketManager',//marketManager:市场管理员账号,accountantManager:财务管理员账号
                ruleForm: {
                    username: '',
                    password: ''
                },
            }
        },
        methods: {
            submitForm() {
                if(!this.ruleForm.username||this.ruleForm.username==''){
                    Vue.operationFeedback({type:'warn',text:'请输入账号'});
                    return;
                }
                if(!this.ruleForm.password||this.ruleForm.password==''){
                    Vue.operationFeedback({type:'warn',text:'请输入密码'});
                    return;
                }
                let fb=Vue.operationFeedback({text:'登录中...'});
                if(this.pageName=='login'){
                    Vue.api.superManagerLogin({...Vue.sessionInfo(),account:this.ruleForm.username,password:this.ruleForm.password}).then((resp)=>{
                        if(resp.respCode=='00'){
                            this.$router.push({name:'shop',params:{}});
                            fb.setOptions({type:'complete',text:'登录成功'});
                        }else{
                            fb.setOptions({type:'warn',text:'登录失败，'+resp.respMsg});
                        }
                    });
                }else if(this.pageName='adminLogin'){
                    if(this.accountType=='marketManager'){
                        Vue.api.marketManagerLogin({...Vue.sessionInfo(),account:this.ruleForm.username,password:this.ruleForm.password}).then((resp)=>{
                            if(resp.respCode=='00'){
                                this.$router.push({name:'benefitRank',params:{}});
                                fb.setOptions({type:'complete',text:'登录成功'});
                            }else{
                                fb.setOptions({type:'warn',text:'登录失败，'+resp.respMsg});
                            }
                        });
                    }else if(this.accountType=='accountantManager'){
                        Vue.api.accountantManagerLogin({...Vue.sessionInfo(),account:this.ruleForm.username,password:this.ruleForm.password}).then((resp)=>{
                            if(resp.respCode=='00'){
                                this.$router.push({name:'rebatesRecord',params:{}});
                                fb.setOptions({type:'complete',text:'登录成功'});
                            }else{
                                fb.setOptions({type:'warn',text:'登录失败，'+resp.respMsg});
                            }
                        });

                    }
                }
            }
        },
        mounted () {
            this.pageName=this.$route.name;
        },
    }
</script>
