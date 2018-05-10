<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>订单统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <p style="font-size:20px;padding:40px;color:#666;text-align:center">敬请期待</p>
          <!--  <el-row class="handle-box">
                <el-col :span="14">
                    <span style="padding-right: 5px;">日期</span>
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-col>
            </el-row>
            <el-table :data="entryList" border style="width: 100%;" ref="multipleTable">
                <el-table-column label="序号" align="center" width="50">
                    <template slot-scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column prop="phoneNums" label="订单号" align="center"></el-table-column>
                <el-table-column prop="name" label="彩票号"  align="center"></el-table-column>
                <el-table-column prop="idCard" label="金额"  align="center"></el-table-column>
                <el-table-column prop="email" label="是否中奖"  align="center"></el-table-column>
                <el-table-column prop="bankName" label="中奖金额"  align="center"></el-table-column>
                <el-table-column prop="subbranch" label="中奖号码" align="center"></el-table-column>
                <el-table-column prop="bankAccount" label="时间" width="200"  align="center"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @current-change ="getList"
                    layout="prev, pager, next"
                    :total="pager.total">
                </el-pagination>
            </div>-->
        </div>
    </div>
</template>
<style scoped>
    .handle-box{
        margin-bottom: 20px;
    }
    .handle-select{
        width: 120px;
    }
    .handle-input{
        width: 300px;
        display: inline-block;
    }
</style>
<script>
    import Vue from 'vue'
    export default {
        data() {
            return {


                pager:{
                  pageIndex:1,
                  pageSize:20,
                  total:0,
                },
                keyword:null,
                entryList:[],

            }
        },
        created(){
        },
        computed: {
        },
        methods: {
            getList:function (pageIndex) {
                this.pager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    ...Vue.sessionInfo(),
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    searchContent:this.keyword,
                }
                Vue.api.getUserList(params).then((resp)=>{
                    if(resp.respCode=='00'){
                        let data=JSON.parse(resp.respMsg);
                        this.entryList=JSON.parse(data.userList);
                        this.pager.total=data.userCount;
                    }
                });
            },

        },
        mounted () {
            /**/
            this.getList();

        },
    }
</script>
