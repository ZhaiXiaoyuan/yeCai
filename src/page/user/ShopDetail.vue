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
                    <el-button type="primary" icon="el-icon-back">返回</el-button>
                </el-col>
                <el-col :span="12" style="text-align: right;">
                    <el-button type="primary" icon="el-icon-delete">删除</el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">编辑</el-button>
                </el-col>
            </el-row>
            <div class="container-bd">
                <el-row class="block">
                    <el-col :span="16">
                        <el-row class="info-row">
                            <el-col :span="12">门店编号：001</el-col>
                            <el-col :span="12">状态:可用</el-col>
                        </el-row>
                        <el-row class="info-row">公司：xxxx</el-row>
                        <el-row class="info-row">社会信用代码：xxxx</el-row>
                        <el-row class="info-row">电话：xxxx</el-row>
                        <el-row class="info-row">省份：xxxx</el-row>
                        <el-row class="info-row">市区：xxxx</el-row>
                        <el-row class="info-row">县：xxxx</el-row>
                        <el-row class="info-row">详细地址：xxxx</el-row>
                    </el-col>
                    <el-col :span="8">
                        <el-col :span="11" class="img-item">
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524415666192&di=24c71624961635ba415eb793ce2998e9&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170228%2Fb2cc4e3e929f4bc5a822ff8e99f95d9f_th.jpeg" alt="">
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
                    <el-row class="info-row">日时销售额 2018.04.18: 10000元</el-row>
                    <el-row class="info-row">社月销售额 2018.04: 100000元</el-row>
                    <el-row class="info-row">年销售额 2018: 100000000元</el-row>
                </el-row>
                <el-row class="block">
                    <el-row class="info-row">
                        <el-col :span="8">门店账户:xxx</el-col>
                        <el-col :span="16">返点比例:5% </el-col>
                    </el-row>
                    <el-row class="info-row">
                        <el-col :span="8">渠道账户:xxxx</el-col>
                        <el-col :span="16">返点比例:5%</el-col>
                    </el-row>
                    <el-row class="info-row">
                        <el-col :span="8">店家账户:xxxx  </el-col>
                        <el-col :span="16">返点比例:5% </el-col>
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
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        },
        created(){

        },
        computed: {

        },
        methods: {

        },
        mounted () {

        },
    }
</script>
