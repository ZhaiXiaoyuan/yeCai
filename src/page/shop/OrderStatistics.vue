<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>订单统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="activeName">
                <el-tab-pane label="订单报表" name="first">
                    <el-row class="handle-box">
                        <el-col :span="14">
                            <span style="padding-right: 5px;">日期</span>
                            <el-date-picker
                                v-model="orderDateStr"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <el-button size="small" style="margin-left: 5px;" @click="getAllOrder()">全部</el-button>
                        </el-col>
                    </el-row>
                    <el-table :data="orderList" border style="width: 100%;" ref="multipleTable" v-loading="orderPage.loading">
                        <el-table-column label="序号" align="center" width="50">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="outOrderId" label="订单号" align="center"></el-table-column>
                        <el-table-column prop="lotteryNo" label="彩票编号"  align="center"></el-table-column>
                        <el-table-column label="购彩金额"  align="center">
                            <template slot-scope="scope">
                                <span class="cm-amount">{{scope.row.lotteryAmount|moneyFormat}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="lotteryNoteCode" label="购彩注码" align="center"></el-table-column>
                        <el-table-column label="订单状态" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.orderState=='success'||scope.row.orderState=='SUCCESS'">成功</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="channel" label="商户号" align="center"></el-table-column>
                        <el-table-column prop="shop" label="公司名" align="center"></el-table-column>
                        <el-table-column label="时间" width="200"  align="center">
                            <template slot-scope="scope">
                                {{scope.row.createdAt|formatDate('yyyy-MM-dd hh:mm:ss')}}
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                            @current-change ="getOrderList"
                            layout="prev, pager, next"
                            :page-size="orderPage.pageSize"
                            :total="orderPage.total">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="中奖报表" name="second">
                    <el-row class="handle-box">
                        <el-col :span="14">
                            <span style="padding-right: 5px;">日期</span>
                            <el-date-picker
                                v-model="winDateStr"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <el-button size="small" style="margin-left: 5px;" @click="getAllWin()">全部</el-button>
                        </el-col>
                    </el-row>
                    <el-table :data="winList" border style="width: 100%;" ref="multipleTable" v-loading="winPage.loading">
                        <el-table-column label="序号" align="center" width="50">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="outOrderId" label="订单号" align="center"></el-table-column>
                        <el-table-column prop="lotteryNo" label="彩票编号"  align="center"></el-table-column>
                        <el-table-column label="中奖金额"  align="center">
                            <template slot-scope="scope">
                                <span class="cm-amount">{{(scope.row.prizeMoney?scope.row.prizeMoney:0)|moneyFormat}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="mobile" label="用户手机号" align="center"></el-table-column>
                        <el-table-column prop="userId" label="商户号" align="center"></el-table-column>
                        <el-table-column prop="shop" label="公司名" align="center"></el-table-column>
                        <el-table-column label="时间" width="200"  align="center">
                            <template slot-scope="scope">
                                {{scope.row.prizeTime?(scope.row.prizeTime|formatDate('yyyy-MM-dd hh:mm:ss')):''}}
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                            @current-change ="getWinList"
                            layout="prev, pager, next"
                            :page-size="winPage.pageSize"
                            :total="winPage.total">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
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
                account:null,

                activeName: 'first',
                orderPage:{
                  pageIndex:1,
                  pageSize:20,
                  total:0,
                  loading:false
                },
                orderList:[],
                orderDateStr:'all',

                winPage:{
                    pageIndex:1,
                    pageSize:20,
                    total:0,
                    loading:false
                },
                winList:[],
                winDateStr:'all'
            }
        },
        created(){
        },
        watch: {
            orderDateStr(value) {
                if(value){
                    this.orderDateStr=Vue.formatDate(value,'yyyy-MM-dd');
                }else{
                    this.orderDateStr='all';
                }
                if(!this.orderPage.loading){
                    this.getOrderList();
                }
            },
            winDateStr(value) {
                if(value){
                    this.winDateStr=Vue.formatDate(value,'yyyy-MM-dd');
                }else{
                    this.winDateStr='all';
                }
                if(!this.winPage.loading){
                    this.getWinList();
                }
            },
        },
        computed: {
        },
        methods: {
            getOrderList:function (pageIndex) {
                let that=this;
                this.orderPage.pageIndex=pageIndex?pageIndex:1;
                let params={
                    ...Vue.sessionInfo(),
                    userId:this.account.id,
                    pageIndex:this.orderPage.pageIndex,
                    pageSize:this.orderPage.pageSize,
                    dateString:this.orderDateStr,
                }
                this.orderPage.loading=true;
                Vue.api.getShopOrderList(params).then((resp)=>{
                    if(resp.respCode=='00'){
                        let data=JSON.parse(resp.respMsg);
                        let list=JSON.parse(data.orderList);
                        that.orderList=[];
                        list.forEach(function (item,i) {
                            that.orderList.push({
                               ...JSON.parse(item.tpOrder),
                                shop:item.shop,
                            });
                        })
                     /*   console.log('this.orderList:',this.orderList);*/
                        this.orderPage.total=data.orderCount;
                    }
                    this.orderPage.loading=false;
                });
            },
            getAllOrder:function () {
                this.orderDateStr='all';
                this.getOrderList();
            },

            getWinList:function (pageIndex) {
                let that=this;
                this.winPage.pageIndex=pageIndex?pageIndex:1;
                let params={
                    ...Vue.sessionInfo(),
                      userId:this.account.id,
                    pageIndex:this.winPage.pageIndex,
                    pageSize:this.winPage.pageSize,
                    dateString:this.winDateStr,
                }
                this.winPage.loading=true;
                Vue.api.getUserShopWinInfoList(params).then((resp)=>{
                    if(resp.respCode=='00'){
                        let data=JSON.parse(resp.respMsg);
                        let list=JSON.parse(data.winInfoList);
                        this.winList=[];
                        list.forEach(function (item,i) {
                            that.winList.push({
                                shop:item.shop,
                                ...JSON.parse(item.winInfo),
                            });
                        })
                      /*  console.log('this.winList:',this.winList);*/
                        this.winPage.total=data.winInfoCount;
                    }
                    this.winPage.loading=false;
                });
            },
            getAllWin:function () {
                this.winDateStr='all';
                this.getWinList();
            }
        },
        mounted () {
            this.account=JSON.parse(this.$cookie.get('account'));
            /**/
      /*      this.dateStr=Vue.formatDate(new Date(),'yyyy-MM-dd')*/
            /**/
            this.getOrderList();
            /**/
            this.getWinList();

        },
    }
</script>
