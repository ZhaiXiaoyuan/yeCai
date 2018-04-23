<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>账户系统</el-breadcrumb-item>
                <el-breadcrumb-item>门店管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row class="handle-box">
                <el-col :span="14">
                    <v-distpicker class="cm-area-picker" :callback="changeArea"></v-distpicker>
                </el-col>
                <el-col :span="10" style="text-align: right">
                    <el-button type="primary" class="mr10" @click="uploadFile()">
                        批量导入
                        <input type="file" @change="importFile(this)" id="imFile" style="display: none"
                               accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                    </el-button>
                    <el-button type="primary" class="mr10">导出二维码</el-button>
                </el-col>
            </el-row>
            <el-table :data="entryList" border style="width: 100%;" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="channelId" label="编号" align="center"></el-table-column>
                <el-table-column prop="companyName" label="公司名"  align="center"></el-table-column>
                <el-table-column prop="socialCreditCode" label="社会信用代码"  align="center"></el-table-column>
                <el-table-column prop="telephoneNums" label="电话"  align="center"></el-table-column>
                <el-table-column prop="province" label="省份"  align="center"></el-table-column>
                <el-table-column prop="city" label="市区"  align="center"></el-table-column>
                <el-table-column prop="county" label="县/区" align="center"></el-table-column>
                <el-table-column prop="address" label="详细地址" width="200"  align="center"></el-table-column>
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope">
                        <router-link :to="'/shopDetail/'+scope.row.id" size="small" @click="handleEdit(scope.$index, scope.row)">查看详情</router-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
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
   /* import Distpicker from '../../components/Distpicker'*/
    let XLSX = require('xlsx');
    export default {
        components: {

        },
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,

                province:null,
                city:null,
                county:null,
                regionKeyword:null,
                entryList:[],
                timer:null,
                previous:null,

                fullscreenLoading: false, // 加载中
                imFile: '', // 导入文件el
                outFile: '',  // 导出文件el
                errorDialog: false, // 错误信息弹窗
                errorMsg: '', // 错误信息内容
                excelData: [],
            }
        },
        created(){
            this.getData();
            this.entryList=[{

            }]
        },
        watch:{

        },
        computed: {
        },
        methods: {
            // 分页导航
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData(){
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if(process.env.NODE_ENV === 'development'){
                    this.url = '/ms/table/list';
                };
                this.$axios.post(this.url, {page:this.cur_page}).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            delAll(){
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了'+str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            uploadFile: function () { // 按钮导入
                this.imFile.click()
            },
            downloadFile: function (rs) { // 按钮导出
                let data = [{}]
                for (let k in rs[0]) {
                    data[0][k] = k
                }
                data = data.concat(rs)
                this.downloadExl(data, '菜单')
            },
            importFile: function () { // 导入excel
                this.fullscreenLoading = true
                let obj = this.imFile
                if (!obj.files) {
                    this.fullscreenLoading = false
                    return
                }
                var f = obj.files[0]
                var reader = new FileReader()
                let $t = this
                reader.onload = function (e) {
                    var data = e.target.result
                    if ($t.rABS) {
                        $t.wb = XLSX.read(btoa(this.fixdata(data)), {  // 手动转化
                            type: 'base64'
                        })
                    } else {
                        $t.wb = XLSX.read(data, {
                            type: 'binary'
                        })
                    }
                 /*   for(let i=0;i<$t.wb.SheetNames.length;i++){
                        let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[i]]);
                        $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
                    }*/
                    let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]]);
                    $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
                }
                if (this.rABS) {
                    reader.readAsArrayBuffer(f)
                } else {
                    reader.readAsBinaryString(f)
                }
            },
            downloadExl: function (json, downName, type) {  // 导出到excel
                let keyMap = [] // 获取键
                for (let k in json[0]) {
                    keyMap.push(k)
                }
                console.info('keyMap', keyMap, json)
                let tmpdata = [] // 用来保存转换好的json
                json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                    v: v[k],
                    position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
                }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
                    tmpdata[v.position] = {
                        v: v.v
                    }
                })
                let outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
                let tmpWB = {
                    SheetNames: ['mySheet'], // 保存的表标题
                    Sheets: {
                        'mySheet': Object.assign({},
                            tmpdata, // 内容
                            {
                                '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
                            })
                    }
                }
                let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
                    {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
                ))], {
                    type: ''
                })  // 创建二进制对象写入转换好的字节流
                var href = URL.createObjectURL(tmpDown)  // 创建对象超链接
                this.outFile.download = downName + '.xlsx'  // 下载名称
                this.outFile.href = href  // 绑定a标签
                this.outFile.click()  // 模拟点击实现下载
                setTimeout(function () {  // 延时释放
                    URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
                }, 100)
            },
            analyzeData: function (data) {  // 此处可以解析导入数据
                return data
            },
            dealFile: function (data) {   // 处理导入的数据
                console.log(data)
                this.imFile.value = ''
                this.fullscreenLoading = false
                if (data.length <= 0) {
                    this.errorDialog = true
                    this.errorMsg = '请导入正确信息'
                } else {
                    this.excelData = [];
                    data.forEach((item,key)=>{
                     /*   console.log('item:',item);*/
                        if(parseInt(item['夜彩门店信息'])>=1&&item.__EMPTY){
                            console.log('item:',item);
                            this.excelData.push({
                              /*  "accountState":"enable",*/
                              /*  "monthSale":0.0,*/
                                "marketingRebates":item.__EMPTY_12,
                                "address":item.__EMPTY_6,
                                "marketingChannelsId":item.__EMPTY_11,
                                "telephoneNums":item.__EMPTY_2,
                                "otherId":item.__EMPTY_14,
                                "city":item.__EMPTY_4,
                               /* "daySale":0.0,*/
                                "companyName":item.__EMPTY,
                                "county":item.__EMPTY_5,
                              /*  "qRCodeId":"6729ecdba5b248069628fffe2905da39",*/
                             /*   "monthRankings":-1,*/
                                "socialCreditCode":item.__EMPTY_1,
                                "otherRebates":item.__EMPTY_15,
                              /*  "dayRankings":-1,*/
                              /*  "yearSale":0.0,*/
                              /*  "companyPic":"",*/
                                "province":item.__EMPTY_3,
                                "shopRebates":item.__EMPTY_9,
                            /*    "id":"6729ecdba5b248069628fffe2905da39",*/
                               /* "yearRankings":-1,*/
                                "channelId":item.__EMPTY_8,
                            });
                        }
                    });
                    console.log('test:', this.excelData);
                   /**/
                   if(this.excelData.length>0){
                       Vue.api.addShopBatch({...Vue.sessionInfo(),shopData:JSON.stringify(this.excelData)}).then((resp)=>{
                           if(resp.respStatus=='success'){

                           }else{

                           }
                       });
                   }
                }
            },
            s2ab: function (s) { // 字符串转字符流
                var buf = new ArrayBuffer(s.length)
                var view = new Uint8Array(buf)
                for (var i = 0; i !== s.length; ++i) {
                    view[i] = s.charCodeAt(i) & 0xFF
                }
                return buf
            },
            getCharCol: function (n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
                let s = ''
                let m = 0
                while (n > 0) {
                    m = n % 26 + 1
                    s = String.fromCharCode(m + 64) + s
                    n = (n - m) / 26
                }
                return s
            },
            fixdata: function (data) {  // 文件流转BinaryString
                var o = ''
                var l = 0
                var w = 10240
                for (; l < data.byteLength / w; ++l) {
                    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
                }
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
                return o
            },

            getList:function () {
                let params={
                    ...Vue.sessionInfo(),
                    pageIndex:1,
                    pageSize:20,
                    searchContent:this.regionKeyword?this.regionKeyword:null,
                }
                Vue.api.getShopList(params).then((resp)=>{
                    if(resp.respStatus=='success'){
                        this.entryList=JSON.parse(resp.respMsg);
                    }
                });
            },
            changeArea:function (data) {
                console.log('data:',data);
                let that=this;
                var now = +new Date();
                if (!this.previous) this.previous = now;
                if (1000 && now - this.previous > 1000) {
                    that.regionKeyword=data.value;
                    that.getList();
                    // 重置上一次开始时间为本次结束时间
                    this.previous = now;
                    clearTimeout(this.timer);
                } else {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(function() {
                        that.regionKeyword=data.value;
                        that.getList();
                        this.previous = null;
                    }, 500);
                }
            },
        },
        mounted () {
            this.imFile = document.getElementById('imFile');
            this.outFile = document.getElementById('downlink');
            //临时测试
            let testObj=[
                {"bankAccount":"1234567890",
                    "address":"xxxx",
                    "city":"广州",
                    "idCard":"440602199302262151",
                    "county":"海珠区",
                    "bankName":"中国建设银行",
                    "userCode":"0",
                    "password":"00000002",
                    "phoneNums":"13700000000",
                    "province":"广东",
                    "name":"bbb",
                    "subbranch":"地球分行",
                    "email":"aaa@qq.com"
                },
                {
                    "bankAccount":"1234567890",
                    "address":"xxxx",
                    "city":"广州",
                    "idCard":"440602199302262151",
                    "county":"海珠区",
                    "bankName":"中国建设银行",
                    "userCode":"0",
                    "password":"00000002",
                    "phoneNums":"13700000001",
                    "province":"广东",
                    "name":"bbb",
                    "subbranch":"地球分行",
                    "email":"aaa@qq.com"
                }]

            //
            this.getList();

           let test=[
                {"accountState":"enable",
                    "monthSale":0.0,
                    "marketingRebates":3.15,
                    "address":"地球村",
                    "marketingChannelsId":"223b4de2161743d0aa4521fb8bb81fff",
                    "telephoneNums":"13700000005",
                    "otherId":"aa264325ecfc4370b66ba0b6dd55c451",
                    "city":"深圳",
                    "daySale":0.0,
                    "companyName":"地球科技",
                    "county":"南山区",
                    "qRCodeId":"6729ecdba5b248069628fffe2905da39",
                    "monthRankings":-1,
                    "socialCreditCode":"123456789",
                    "otherRebates":1.37,
                    "dayRankings":-1,
                    "yearSale":0.0,
                    "companyPic":"",
                    "province":"广东省",
                    "shopRebates":4.15,
                    "id":"6729ecdba5b248069628fffe2905da39",
                    "yearRankings":-1,
                    "channelId":"482013a527964df68ce7a92d4584fb52"},
                {"accountState":"enable",
                    "monthSale":0.0,
                    "marketingRebates":3.15,
                    "address":"地球村",
                    "marketingChannelsId":"4a9e84b697ef4d35adb9b6926747337f",
                    "telephoneNums":"13700000002",
                    "otherId":"76a6e0ef8a124a5ab6fa27af7b3af3b8",
                    "city":"深圳",
                    "daySale":0.0,
                    "companyName":"地球科技",
                    "county":"南山区",
                    "qRCodeId":"8b00076c4b85451988806f1d9b101bb0",
                    "monthRankings":-1,
                    "socialCreditCode":"123456789",
                    "otherRebates":1.37,
                    "dayRankings":-1,
                    "yearSale":0.0,
                    "companyPic":"",
                    "province":"广东省",
                    "shopRebates":4.15,
                    "id":"8b00076c4b85451988806f1d9b101bb0",
                    "yearRankings":-1,
                    "channelId":"db1afecea8bc484fa0034e951ac4eb43"},
                {"accountState":"enable",
                    "monthSale":0.0,
                    "marketingRebates":3.15,
                    "address":"地球村",
                    "marketingChannelsId":"4f0714e968e44a2ba3afaa37936d99b4",
                    "telephoneNums":"13700000003",
                    "otherId":"3764029e65fb4b2189e84156d8c068ba",
                    "city":"深圳",
                    "daySale":0.0,
                    "companyName":"地球科技",
                    "county":"南山区",
                    "qRCodeId":"a13579b46c4e408681b1eb74cb5ec7de",
                    "monthRankings":-1,
                    "socialCreditCode":"123456789",
                    "otherRebates":1.37,
                    "dayRankings":-1,
                    "yearSale":0.0,
                    "companyPic":"",
                    "province":"广东省",
                    "shopRebates":4.15,
                    "id":"a13579b46c4e408681b1eb74cb5ec7de",
                    "yearRankings":-1,
                    "channelId":"c9dfe145de5046a193cc3fe2b5b99d15"}]

        },
    }
</script>
