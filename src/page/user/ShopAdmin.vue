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
                    <v-distpicker class="cm-area-picker" :province="areaSelect.province" :city="areaSelect.city" :area="areaSelect.area"></v-distpicker>
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
                <el-table-column prop="" label="编号" align="center"></el-table-column>
                <el-table-column prop="" label="公司名"  align="center"></el-table-column>
                <el-table-column prop="" label="社会信用代码"  align="center"></el-table-column>
                <el-table-column prop="" label="电话"  align="center"></el-table-column>
                <el-table-column prop="" label="省份"  align="center"></el-table-column>
                <el-table-column prop="" label="市区"  align="center"></el-table-column>
                <el-table-column prop="" label="县/区" align="center"></el-table-column>
                <el-table-column prop="" label="详细地址" width="200"  align="center"></el-table-column>
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>

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
    let XLSX = require('xlsx');
    export default {
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

                areaSelect: { province: '', city: '', area: '' },
                entryList:[],

                fullscreenLoading: false, // 加载中
                imFile: '', // 导入文件el
                outFile: '',  // 导出文件el
                errorDialog: false, // 错误信息弹窗
                errorMsg: '', // 错误信息内容
                excelData: [  // 测试数据
                    {
                        name: '红烧鱼', size: '大', taste: '微辣', price: '40', remain: '100'
                    },
                    {
                        name: '麻辣小龙虾', size: '大', taste: '麻辣', price: '138', remain: '200'
                    },
                    {
                        name: '清蒸小龙虾', size: '大', taste: '清淡', price: '138', remain: '200'
                    },
                    {
                        name: '香辣小龙虾', size: '大', taste: '特辣', price: '138', remain: '200'
                    },
                    {
                        name: '十三香小龙虾', size: '大', taste: '中辣', price: '138', remain: '108'
                    },
                    {
                        name: '蒜蓉小龙虾', size: '大', taste: '中辣', price: '138', remain: '100'
                    },
                    {
                        name: '凉拌牛肉', size: '中', taste: '中辣', price: '48', remain: '60'
                    },
                    {
                        name: '虾仁寿司', size: '大', taste: '清淡', price: '29', remain: '无限'
                    },
                    {
                        name: '海苔寿司', size: '大', taste: '微辣', price: '26', remain: '无限'
                    },
                    {
                        name: '金针菇寿司', size: '大', taste: '清淡', price: '23', remain: '无限'
                    },
                    {
                        name: '泡菜寿司', size: '大', taste: '微辣', price: '24', remain: '无限'
                    },
                    {
                        name: '鳗鱼寿司', size: '大', taste: '清淡', price: '28', remain: '无限'
                    },
                    {
                        name: '肉松寿司', size: '大', taste: '清淡', price: '22', remain: '无限'
                    },
                    {
                        name: '三文鱼寿司', size: '大', taste: '清淡', price: '30', remain: '无限'
                    },
                    {
                        name: '蛋黄寿司', size: '大', taste: '清淡', price: '20', remain: '无限'
                    }
                ],
            }
        },
        created(){
            this.getData();
            this.entryList=[{

            }]
        },
        computed: {
            data(){
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if(d.name === this.del_list[i].name){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if(d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                            d.address.indexOf(this.select_word) > -1)
                        ){
                            return d;
                        }
                    }
                })
            }
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
                    for(let i=0;i<$t.wb.SheetNames.length;i++){
                        let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[i]]);
                        $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
                    }
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
                    this.excelData = data
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
            }
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
        },
    }
</script>
