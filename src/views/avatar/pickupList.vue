<template>
    <div class="app-container calendar-list-container">
        <h3 class="box-title">提货记录</h3>

        <el-table id="tbid" :data="list"  v-loading.body="listLoading" border fit highlight-current-row style="width: 98%">
            <el-table-column align="center" label="序号" prop="id">
                <template slot-scope="scope"><span>{{scope.row.id}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="提货企业" prop="companyName">
                <template slot-scope="scope"><span>{{scope.row.companyName}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="货品名称" prop="commodityName">
                <template slot-scope="scope"><span>{{scope.row.commodityName}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="货品金额(元)" prop="salesPrice">
                <template slot-scope="scope"><span>{{scope.row.salesPrice}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="车牌号" prop="carNum">
                <template slot-scope="scope"><span>{{scope.row.carNum}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="起始时间" prop="inTime">
                <template slot-scope="scope"><span>{{scope.row.inTime}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="结束时间" prop="outTime">
                <template slot-scope="scope"><span>{{scope.row.outTime}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="空重" prop="nullWeight">
                <template slot-scope="scope"><span>{{scope.row.nullWeight}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="总重" prop="totalWeight">
                <template slot-scope="scope"><span>{{scope.row.totalWeight}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="净重" prop="weight">
                <template slot-scope="scope"><span>{{scope.row.weight}}</span></template>
            </el-table-column>

<!--            <el-table-column align="center" label="出库单" >
                <template slot-scope="scope">

                    <router-link :to="{name:'chukudan',params:scope.row}">打印预览</router-link>
                </template>
            </el-table-column>-->
        </el-table>
        <div v-show="!listLoading" class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 50]" :page-size="list.size" layout="total,  prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    // import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
    import { parseTime } from '@/utils'
    export default {
        data() {
            return {
                imgSrc:'./static/images/pic1.png',
                carNum:'苏D.SB110',
                carNumShow:true,
                barrierIN:false, //道闸
                barrierOut:false,
                weighbridgeNum:28,
                weighbridgeNumShow:true,
                list: null, //数据
                total: null,
                px: null, //最大序号
                listLoading: false,
                listQuery: {
                    page: 1,
                    size: 10, //每页几条
                    number: 0, //当前页为第0页
                    commodityName:undefined,
                    carNum:'',
                    fromTime:'',
                    toTime:'',
                    sort: '+id'
                },
                //弹出层
                dialogFormVisible: false,
                dialogStatus: '',
                formTemp: {
                    id: '',
                    companyName:'石门354',
                    carUser:'张小三',
                    carNum:'111333',
                    inTime:'2018-01-18 11:33',
                    outTime:'2018-01-18 12:56',
                    commodityName:'石灰石',
                    nullWeight:'0',
                    weight:'0',
                    totalWeight:'0',
                    salesPrice:'0',
                    haveMoney:'0',
                    remark:''
                }
            }
        },
        dateFormat(){

        },

        created() {
            this.getList()
        },
        methods: {

            changeInStatus(){
                this.carNumShow=true;
                this.barrierIN=true;
                setTimeout(()=>{
                    this.barrierIN=false
                },5000)
            },
            changeOutStatus(){
                this.weighbridgeNumShow=true;
                this.barrierOut=true;
                setTimeout(()=> {
                    this.barrierOut = false
                    this.handleCreate();

                },5000)
            },
            getList() {
                // this.listLoading = true
                let items = [
                    {
                        "id": 1,
                        "companyName":'石门测试有限公司',
                        "carUser":'白一',
                        "carNum":'苏D.SB110,浙C.3B450',
                        "inTime":'2018-01-18 11:33',
                        "outTime":'2018-01-18 12:56',
                        "commodityName":'石灰石',
                        "nullWeight":'1t',
                        "weight":'3t',
                        "totalWeight":'4t',
                        "salesPrice":'1200',
                        "haveMoney":'500',
                        "remark":'已出厂'
                    },
                    {
                        "id": 2,
                        "companyName":'石2门3',
                        "carUser":'李小二',
                        "carNum":'浙C.3B450,浙C.SB110',
                        "inTime":'2018-01-18 11:33',
                        "outTime":'2018-01-18 12:56',
                        "commodityName":'石灰石',
                        "nullWeight":'1t',
                        "weight":'3t',
                        "totalWeight":'4t',
                        "salesPrice":'1200',
                        "haveMoney":'500',
                        "remark":'已出厂'
                    },
                    {
                        "id": 3,
                        "companyName":'石门35',
                        "carUser":'张小三',
                        "carNum":'苏A.13410,苏C.F3410',
                        "inTime":'2018-01-18 11:33',
                        "outTime":'2018-01-18 12:56',
                        "commodityName":'石灰石',
                        "nullWeight":'1t',
                        "weight":'3t',
                        "totalWeight":'4t',
                        "salesPrice":'1200',
                        "haveMoney":'500',
                        "remark":'已出厂'
                    }
                ];
                this.list =items;
                this.listLoading = false

            },
            onSubmit() {
                this.$message('submit!')
            },
            onCancel() {
                this.$message({
                    message: 'cancel!',
                    type: 'warning'
                })
            },
/*            handleDownload() {
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
                    const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
                    const data = this.formatJson(filterVal, this.list)
                    excel.export_json_to_excel(tHeader, data, 'table-list')
                    this.downloadLoading = false
                })
            },*/
            resetTemp() {
                this.formTemp = {
                    id: this.list.length+1,
                    companyName:'新天地矿业',
                    carUser:'梅苏',
                    carNum:  this.carNum ,
                    inTime:new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+' '+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds(),
                    // inTime:new Date(parseInt(new Date().getFullYear())).toLocaleString(),
                    // inTime:new Date(parseInt(new Date().getTime()) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '),
                    outTime:new Date(),
                    commodityName:'石灰石',
                    nullWeight:'2',
                    weight:this.weighbridgeNum-3,
                    totalWeight:this.weighbridgeNum,
                    salesPrice:'800',
                    haveMoney:'1600',
                    remark:'测试加入'
                }
            },
            //添加
            handleCreate() {
                this.resetTemp();
                this.list.unshift(this.formTemp);
                this.dialogFormVisible = false
                this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 1000
                })

            },
            //node_modules  中直接把file-saver文件夹copy过来
            handleDownload() {
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['企业名称', '驾驶员', '车牌号', '进厂时间', '出厂时间','货品名称','空重','总重','净重','总金额','账户余额','备注']
                    const filterVal = ['companyName', 'carUser', 'carNum', 'inTime', 'outTime', 'commodityName', 'nullWeight', 'weight', 'totalWeight', 'salesPrice', 'haveMoney', 'remark']
                    const data = this.formatJson(filterVal, this.list)
                    excel.export_json_to_excel(tHeader, data, 'table-list')
                    this.downloadLoading = false
                })
            },

            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            }
            ,            //分页
            handleSizeChange(val) {
                this.listQuery.size = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },

        }
    }
</script>

<style scoped>
    .line{
        text-align: center;
    }
    .fade-enter {
        opacity:0;
    }
    .fade-leave{
        opacity:1;
    }
    .fade-enter-active{
        transition:opacity .5s;
    }
    .fade-leave-active{
        opacity:0;
        transition:opacity .5s;
    }

</style>

