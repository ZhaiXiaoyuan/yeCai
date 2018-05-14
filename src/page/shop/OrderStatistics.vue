<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>订单统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row class="handle-box">
                <el-col :span="14">
                    <span style="padding-right: 5px;">日期</span>
                    <el-date-picker
                        v-model="dateStr"
                        type="date"
                        @change="getList()"
                        placeholder="选择日期">
                    </el-date-picker>
                    <el-button size="small" style="margin-left: 5px;" @click="getAll()">全部</el-button>
                </el-col>
            </el-row>
            <el-table :data="entryList" border style="width: 100%;" ref="multipleTable" v-loading="pager.loading">
                <el-table-column label="序号" align="center" width="50">
                    <template slot-scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column prop="tpOrder.outOrderId" label="订单号" align="center"></el-table-column>
                <el-table-column prop="tpOrder.lotteryNo" label="彩票号"  align="center"></el-table-column>
                <el-table-column label="金额"  align="center">
                    <template slot-scope="scope">
                       {{scope.row.tpOrder.lotteryAmount|moneyFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="是否中奖"  align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.win">是</span>
                        <span v-if="!scope.row.win">否</span>
                    </template>
                </el-table-column>
                <el-table-column label="中奖金额"  align="center">
                    <template slot-scope="scope">
                        {{(scope.row.winInfo.prizeMoney?scope.row.winInfo.prizeMoney:0)|moneyFormat}}
                    </template>
                </el-table-column>
                <el-table-column prop="winInfo.mobile" label="中奖号码" align="center"></el-table-column>
                <el-table-column prop="winInfo.createdAt" label="时间" width="200"  align="center"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @current-change ="getList"
                    layout="prev, pager, next"
                    :total="pager.total">
                </el-pagination>
            </div>
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
                  loading:false
                },
                keyword:null,
                entryList:[],
                dateStr:'all'
            }
        },
        created(){
        },
        watch: {
            dateStr(value) {
                console.log('value:',value);
                if(value){
                    this.dateStr=Vue.formatDate(value,'yyyy-MM-dd');
                }else{
                    this.dateStr='all';
                }
                this.getList();
            },
        },
        computed: {
        },
        methods: {
            getList:function (pageIndex) {
                let that=this;
                this.pager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    ...Vue.sessionInfo(),
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    dateString:this.dateStr,
                }
                this.pager.loading=true;
                Vue.api.getShopOrderList(params).then((resp)=>{
                    if(resp.respCode=='00'){
                        let data=JSON.parse(resp.respMsg);
                        let list=JSON.parse(data.orderList);
                        that.entryList=[];
                        list.forEach(function (item,i) {
                            that.entryList.push({
                                tpOrder:JSON.parse(item.tpOrder),
                                win:item.winInfo?true:false,
                                winInfo:item.winInfo?JSON.parse(item.winInfo):{}
                            });
                        })
                     /*   console.log('this.entryList:',this.entryList);*/
                        this.pager.total=data.orderCount;
                    }
                    this.pager.loading=false;
                });
            },
            getAll:function () {
                this.dateStr='all';
                this.getList();
            }
        },
        mounted () {
            let account=JSON.parse(this.$cookie.get('account'));
            /**/
      /*      this.dateStr=Vue.formatDate(new Date(),'yyyy-MM-dd')*/
            /**/
            this.getList();
        },
    }
</script>
