<template>
    <div class="app-container calendar-list-container">


            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="100px" style='width: 60%; margin-left:50px;float: left;'>
                <el-form-item label="公司" prop="companyName">
                  <el-select class="filter-item" v-model="temp.companyName" placeholder="请选择">
                    <el-option v-for="item in compOptions" :key="item.value" @click.native="changeComp(item.value)" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="剩余金额">
                    <span class="car_detail">{{temp.haveMoney}}元</span>
                </el-form-item>
                <el-form-item label="货品" prop="goods">
                    <el-input v-model="temp.goods"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="goodNum">
                    <el-input v-model="temp.goodNum"></el-input>
                </el-form-item>
                <el-form-item label="次数" prop="driverName">
                    <el-input v-model="temp.driverName"></el-input>
                </el-form-item>
                <el-form-item label="计划时间" prop="time">
                    <el-date-picker
                            v-model="timeRange"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="选择车辆" prop="car">
                    <el-select  v-model="plateNums" multiple placeholder="请选择" >
                        <el-option v-for="item2 in carOptions" :key="item2.id" @click.native="changeCar(item2)" :label="item2.plateNumber" :value="item2.plateNumber">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.remark">
                    </el-input>
                </el-form-item>
            </el-form>
            <div id="addhtml" style="border:0px solid red; width:20%;height: 80%;float:left;margin: 300px 0  0 -25%;" v-show="carDetailShow" >
                <div class="col-md-12">
                    <div class="box box-info">
                        <div class="box-header with-border" @click="hideCar">
                            <h3 class="box-title">{{carTemp.plateNumber}}</h3>
                            <i class="el-icon-close" style="margin-left: 40px"></i>
                        </div>

                        <div class="box-body">
                            <div class="form-group">
                                <label>车牌号:</label>
                                <span class="car_detail">{{carTemp.plateNumber}}</span>
                            </div>
                            <div class="form-group">
                                <label>司机:</label>
                                <span class="car_detail">{{carTemp.driverName}}</span>
                            </div>
                            <div class="form-group">
                                <label>载重:</label>
                                <span class="car_detail">{{carTemp.burden}}</span>
                            </div>
                            <div class="form-group">
                                <label>手机:</label>
                                <span class="car_detail">{{carTemp.mobile}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <p style="clear:both;"></p>
            <div slot="footer" class="dialog-footer">
                <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                <el-button  type="primary" @click="createData"  style="margin-left: 20%">确 定</el-button>
            </div>

    </div>
</template>

<script>
    /* eslint-disable */
    import waves from '@/directive/waves' // 水波纹指令
    export default {
        name: 'pickup',
        directives: {waves},
        data() {
            return {
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    companyName: undefined,
                    sort: '+id'
                },
                plateNums:[],
                timeRange: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
                carDetailShow:false,
                temp: {
                    id: 1,
                    companyName: '芍药居公司',
                    plateNumber: "苏A.12346",
                    driverName: "王小明2",
                    address: '朝阳区世纪大道',
                    weighty: "2t",
                    burden: "10t",
                    length: "5m",
                    witch: "2m",
                    height: "2.5m",
                    identityCard: '320481123456782202',
                    drivingLicence: 18888888888,
                    mobile: 18888888888,
                    date: '2017-9-18',
                    haveMoney:'2222',
                    remark: 1
                },
                carTemp: {
                    id: 0,
                    plateNumber:"苏A.QX306",
                    driverName: "小张",
                    mobile: 18888888888,
                    burden: "10t",
                    label: '芍药居公司'
                },
                compOptions: [{
                    value: 0,
                    label: '芍药居公司'
                }, {
                    value: 1,
                    label: '西二旗公司'
                }, {
                    value: 2,
                    label: '南山区公司'

                }],
                carOptions: [{
                    id: 0,
                    plateNumber:"苏A.QX306",
                    driverName: "小张",
                    mobile: 18888888888,
                    burden: "10t",
                    label: '芍药居公司'
                }, {
                    id: 1,
                    plateNumber:"苏D.FB345",
                    driverName: "王小明2",
                    mobile: 18888888888,
                    burden: "10t",
                    label: '西二旗公司'
                }, {
                    id: 2,
                    plateNumber:"苏C.33346",
                    driverName: "老李",
                    mobile: 18888888888,
                    burden: "10t",
                    label: '南山区公司'
                }],
                rules: {
                    companyName: [
                        {required: true, message: '请输入公司名称', trigger: 'blur'},
                        {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
                    ]

                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            hideCar(){
                this.carDetailShow=false;
            },
            //选择切换车辆信息
            changeCar(it){
                this.carTemp=it;
                this.carDetailShow=true;
                // setTimeout(()=>this.carDetailShow=false,3000);
            },
            //切换公司
            changeComp(id){
                this.temp=this.list[id];
            },
            //搜索
            handleFilter() {
                this.listQuery.page = 1
                this.getList()
            },
            getList() {
                this.listLoading = true
                var items = [
                    {
                        "id": 1,
                        "companyName": '芍药居公司',
                        "plateNumber": "苏A.12346",
                        "driverName": "王小明2",
                        "address": '朝阳区世纪大道',
                        "weighty": "2t",
                        "burden": "10t",
                        "length": "5m",
                        "witch": "2m",
                        "height": "2.5m",
                        "identityCard": '320481123456782202',
                        "drivingLicence": 18888888888,
                        "mobile": 18888888888,
                        "date": '',
                        "haveMoney":'111',
                        "remark": 18
                    },
                    {
                        "id": 2,
                        "companyName": '西二旗公司',
                        "driverName": "张小刚",
                        "linkman": "张小刚2",
                        "address": '北京市海淀区西二旗',
                        "weighty": "2t",
                        "burden": "10t",
                        "length": "5m",
                        "witch": "2m",
                        "height": "2.5m",
                        "identityCard": '320481123456782202',
                        "drivingLicence": 18888888888,
                        "mobile": 18888888888,
                        "date": '2017-9-18',
                        "haveMoney":'2222',
                        "remark": 18
                    },
                    {
                        "id": 3,
                        "companyName": '南山区公司',
                        "driverName": "李小红",
                        "linkman": "李小红3",
                        "address": '上海市浦东新区世纪大道',
                        "weighty": "2t",
                        "burden": "10t",
                        "length": "5m",
                        "witch": "2m",
                        "height": "2.5m",
                        "identityCard": '320481123456782202',
                        "drivingLicence": 18888888888,
                        "mobile": 18888888888,
                        "date": '2017-9-18',
                        "haveMoney":'333',
                        "remark": 18
                    }
                ];
                this.list = items;
                this.temp=this.list[0];
                this.listLoading = false
            },

            resetTemp() {
                this.temp = {
                    id: '',
                    companyName: '南山区公司',
                    driverName: "李小红",
                    linkman: "李小红3",
                    address: '上海市浦东新区世纪大道',
                    weighty: "2t",
                    burden: "0t",
                    length: "5m",
                    witch: "2m",
                    height: "2.5m",
                    identityCard: '320481123456782202',
                    drivingLicence: 18888888888,
                    mobile: 18888888888,
                    date: '2017-9-18',
                    haveMoney:'2222',
                    remark: 18
                }
            },
            handleCreate() {
                this.resetTemp();
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            //添加提交
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
                        // createArticle(this.temp).then(() => {
                        console.log(this.temp)
                        this.list.unshift(this.temp)
                        this.dialogFormVisible = false
                        this.$notify({
                            title: '成功',
                            message: '创建成功',
                            type: 'success',
                            duration: 2000
                        })
                        // })
                    }
                })
            },

        }
    }
</script>

<style scoped>
    .edit-input {
        padding-right: 100px;
    }

    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 13px;
    }
    .car_detail{

    }
</style>
