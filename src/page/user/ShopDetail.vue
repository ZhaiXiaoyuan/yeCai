<template>
    <div class="shop-detail">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>账户系统</el-breadcrumb-item>
                <el-breadcrumb-item>门店管理</el-breadcrumb-item>
                <el-breadcrumb-item>门店详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row class="container-hd">
                <el-col :span="12">
                    <el-button type="primary" icon="el-icon-back" @click="$router.go(-1)">返回</el-button>
                </el-col>
                <el-col :span="12" style="text-align: right;">
                    <el-button type="primary" icon="el-icon-delete" v-if="shopDetail.accountState=='enable'">删除</el-button>
                    <el-button type="primary" icon="el-icon-edit" v-if="shopDetail.accountState=='enable'" @click="dialogFormVisible=true">编辑</el-button>
                </el-col>
            </el-row>
            <div class="container-bd">
                <el-row class="block">
                    <el-col :span="16">
                        <el-row class="info-row">
                            <el-col :span="12">门店编号：{{shopDetail.channelId}}</el-col>
                            <el-col :span="12">
                                状态:
                                <span v-if="shopDetail.accountState=='enable'">可用</span>
                                <span v-if="shopDetail.accountState=='disable'">禁止</span>
                                <span v-if="shopDetail.accountState=='del'">已删除</span>
                            </el-col>
                        </el-row>
                        <el-row class="info-row">公司：{{shopDetail.companyName}}</el-row>
                        <el-row class="info-row">社会信用代码：{{shopDetail.socialCreditCode}}</el-row>
                        <el-row class="info-row">电话：{{shopDetail.telephoneNums}}</el-row>
                        <el-row class="info-row">省份：{{shopDetail.province}}</el-row>
                        <el-row class="info-row">市区：{{shopDetail.city}}</el-row>
                        <el-row class="info-row">县：{{shopDetail.county}}</el-row>
                        <el-row class="info-row">详细地址：{{shopDetail.address}}</el-row>
                    </el-col>
                    <el-col :span="8">
                        <el-col :span="11" class="img-item">
                            <img :src="basicConfig.basicUrl+shopDetail.qRCodeId" alt="">
                            <el-row style="text-align: center">
                                二维码
                            </el-row>
                        </el-col>
                        <el-col :span="11" :offset="2"  class="img-item">
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524415666192&di=24c71624961635ba415eb793ce2998e9&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170228%2Fb2cc4e3e929f4bc5a822ff8e99f95d9f_th.jpeg" alt="">
                            <el-row style="text-align: center">
                                <el-col :span="12">营业执照</el-col>
                                <el-col :span="12" class="cm-link-btn" style="text-align: right;">设置</el-col>
                            </el-row>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row class="block">
                    <el-row class="info-row">日时销售额 2018.04.18: {{shopDetail.daySale}}元</el-row>
                    <el-row class="info-row">月销售额 2018.04: {{shopDetail.monthSale}}元</el-row>
                    <el-row class="info-row">年销售额 2018: {{shopDetail.yearSale}}元</el-row>
                </el-row>
                <el-row class="block">
                    <el-row class="info-row">
                        <el-col :span="8">门店账户:</el-col>
                        <el-col :span="16">返点比例:{{shopDetail.shopRebates}}% </el-col>
                    </el-row>
                    <el-row class="info-row">
                        <el-col :span="8">渠道账户:</el-col>
                        <el-col :span="16">返点比例:{{shopDetail.marketingRebates}}%</el-col>
                    </el-row>
                    <el-row class="info-row">
                        <el-col :span="8">店家账户:</el-col>
                        <el-col :span="16">返点比例:{{shopDetail.otherRebates}}% </el-col>
                    </el-row>
                </el-row>
            </div>
        </div>
        <el-dialog title="编辑" class="edit-dialog" :visible.sync="dialogFormVisible" width="40%">
            <el-row type="flex">
                <el-col :sm="24" :md="22" :lg="20">
                    <el-form :model="form">
                        <el-form-item label="门店编号" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="公司" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="社会信用代码" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="地区" :label-width="formLabelWidth">
                            <v-distpicker class="cm-area-picker" :province="areaSelect.province" :city="areaSelect.city" :area="areaSelect.area"></v-distpicker>
                        </el-form-item>
                        <el-form-item label="详细地址" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="状态" :label-width="formLabelWidth">
                            <el-select v-model="form.region" placeholder="请选择状态">
                                <el-option label="可用" value="shanghai"></el-option>
                                <el-option label="禁用" value="beijing"></el-option>
                                <el-option label="失效" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .shop-detail{
        max-width: 1000px;
    }
   .block{
       padding: 10px;
       &+.block{
           border-top: 1px solid #E4E7ED;
       }
   }
    .info-row{
        font-size: 16px;
        color: #606266;
        &+.info-row{
            margin-top: 10px;
        }
    }
    .img-item{
        color: #606266;
        font-size: 14px;
        img{
            width: 140px;
            height: 140px;
            margin-bottom: 5px;
        }
    }
    .edit-dialog{
        .el-dialog{
            width: 500px;
        }
    }
</style>
<script>
    import Vue from 'vue'
    export default {
        data() {
            return {
                dialogFormVisible: false,
                areaSelect: { province: '', city: '', area: '' },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    id:null,
                },
                formLabelWidth: '120px',

                shopDetail:{},
            }
        },
        created(){

        },
        computed: {

        },
        methods: {
            getShopDetail:function () {
                Vue.api.getShopDetail({...Vue.sessionInfo(),shopId:this.id}).then((resp)=>{
                    if(resp.respCode=='00'){
                    this.shopDetail=JSON.parse(resp.respMsg);
                    this.form=Object.assign({},this.shopDetail);
                    console.log('this.form:',this.form);
                }
            });
            },
        },
        mounted () {
            /**/
            this.id=this.$route.params.id;
            /**/
            this.getShopDetail();
        },
    }
</script>
