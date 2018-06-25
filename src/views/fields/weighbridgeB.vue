<template>
    <div class="app-container calendar-list-container">


        <el-form :rules="rules2" ref="dataForm2" :model="temp" label-position="right" label-width="100px" style='width: 60%; margin-left:50px;float: left;'>
            <el-form-item label="公司" prop="companyName">
                <span>{{formTemp.companyName}}</span>
                <el-button type="primary" :loading="loadin" @click="poundIn" style="margin-left: 20%;" round>入磅读卡</el-button>
                <el-button class="filter-item" :loading="loadout" style="margin-left: 10px;" @click="poundOut" type="danger" round>
                    出磅读卡</el-button>
            </el-form-item>

            <el-form-item label="余额">
                <span> {{formTemp.balance}}元</span>
                <span v-if="cashAlert" style="font-weight: bold;color:red;"> 低于最低限额 {{formTemp.cashDeposit}} 元</span>
            </el-form-item>
            <el-form-item label="车辆" prop="car">
                <el-select  v-model="formTemp.plateNums" placeholder="请选择" >
                    <el-option v-for="item2 in carSelects" :key="item2.id" @click.native="changeCar(item2)" :label="item2.plateNumber" :value="item2.plateNumber">
                    </el-option>
                    <el-button class="filter-item" style="margin-left: 10px;" @click.native="handleCreate" type="success" icon="el-icon-circle-plus-outline">
                        添加车辆</el-button>
                </el-select>
            </el-form-item>
            <el-form-item label="货品" prop="commodityId">
                <el-select  v-model="formTemp.commodityId" placeholder="请选择" >
                    <el-option v-for="item3 in storeSelects" :key="item3.id" @change="changeStore(item3)" :label="item3.plateNumber" :value="item3.plateNumber">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库" prop="store">
                <el-select  v-model="formTemp.store" placeholder="请选择" >
                    <el-option v-for="item4 in storeSelects" :key="item4.id" :label="item4.plateNumber" :value="item4.plateNumber">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="皮重" prop="tare">
                <span> {{formTemp.tare}}</span>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.remark">
                </el-input>
            </el-form-item>
            <section v-if="loadout">
                <el-form-item label="毛重" prop="tare">
                    <span> {{formTemp.gross}}</span>
                </el-form-item>
                <el-form-item label="净重" prop="tare">
                    <span> {{formTemp.net}}</span>
                </el-form-item>
                <el-form-item label="单价" prop="tare">
                    <span> {{formTemp.net}}</span>
                </el-form-item>
                <el-form-item label="总价" prop="total">
                    <span> {{formTemp.total}}</span>
                </el-form-item>
                <el-form-item label="剩余金额" prop="accountBalance">
                    <span> {{formTemp.accountBalance}}</span>
                </el-form-item>
            </section>
        </el-form>
        <!--车辆信息展示-->
        <div id="showCar" style="border:0px solid red; width:20%;height: 80%;float:left;margin: 5% 0  0 -25%;" v-show="carDetailShow" >
            <div class="col-md-12">
                <div class="box box-info">
                    <div class="box-body" @click="hideCar">
                        <div class="form-group">
                            <label>车牌号:</label>
                            <span>{{carTemp.plateNumber}}</span>
                        </div>
                        <div class="form-group">
                            <label>司机:</label>
                            <span>{{carTemp.driverName}}</span>
                        </div>
                        <div class="form-group">
                            <label>手机:</label>
                            <span>{{carTemp.telephone}}</span>
                        </div>
                        <div class="form-group">
                            <label>载重:</label>
                            <span>{{carTemp.burden}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p style="clear:both;"></p>
        <div slot="footer" class="dialog-footer">
            <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
            <el-button  type="primary" @click="createData"  style="margin-left: 20%"  id="cfmbtm2">确 定</el-button>
        </div>


        <el-dialog title="添加客户车辆" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="100px" style='width: 450px; margin-left:50px;'>
                <el-form-item label="公司" prop="companyId">
                    <el-input v-model="temp.companyName"></el-input>
                    <el-input v-model="temp.companyId"></el-input>
                </el-form-item>
                <el-form-item label="车牌" prop="plateNumber">
                    <el-input v-model="temp.plateNumber"></el-input>
                </el-form-item>
                <el-form-item label="司机" prop="driverName">
                    <el-input v-model="temp.driverName"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="telephone">
                    <el-input v-model="temp.telephone"></el-input>
                </el-form-item>
                <el-form-item label="通讯地址" prop="address">
                    <el-input v-model="temp.address"></el-input>
                </el-form-item>
                <el-form-item label="身份证" prop="legalPerson">
                    <el-input v-model="temp.identityCard"></el-input>
                </el-form-item>
                <el-form-item label="驾驶证" prop="drivingLicence">
                    <el-input v-model="temp.drivingLicence"></el-input>
                </el-form-item>
                <el-form-item label="车长" prop="length">
                    <el-input v-model="temp.length"></el-input>
                </el-form-item>
                <el-form-item label="车宽" prop="witch">
                    <el-input v-model="temp.witch"></el-input>
                </el-form-item>
                <el-form-item label="车高" prop="height">
                    <el-input v-model="temp.height"></el-input>
                </el-form-item>
                <el-form-item label="车重" prop="weighty">
                    <el-input v-model="temp.weighty"></el-input>
                </el-form-item>
                <el-form-item label="载重" prop="burden">
                    <el-input v-model="temp.burden"></el-input>
                </el-form-item>
                <el-form-item label="轴数" prop="axesNumber">
                    <el-input v-model="temp.axesNumber"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                              v-model="temp.remark">
                    </el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button  type="primary" @click="createCar" id="cfmbtm1">确定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    /* eslint-disable */
    import waves from '@/directive/waves' // 水波纹指令
    import { companyAll,commodityAll,companyCar,fetchList,createOne,getOne,getInfo} from '@/api/common'
    import { disableBtn } from '@/utils'
    export default {
        name: 'pickup',
        directives: {waves},
        data() {
            return {
                companyId:'40288fea63cef44c0163cef49ce40033',
                list: {},
                listLoading: true,
                timeRange: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
                carDetailShow:false,
                dialogFormVisible: false,                //弹出层
                cashAlert: false,                //余额警示
                loadin: false,                //入磅读取状态
                loadout: false,
                formTemp: {},   //地磅称重提交信息
                temp: {
                    id: undefined, //driverId
                    address: '',
                    burden: 0, //核载T(T)
                    companyId: '',
                    companyName: '',
                    driverName: '',
                    drivingLicence: '', //驾驶证
                    identityCard: '', //驾驶员身份证
                    length: '', //长(M)
                    witch: '',  //宽(M)
                    height: '', //高(M)
                    weighty: '',//重(T)
                    axesNumber: '', //轴数
                    plateNumber: '', //车牌
                    telephone: '',
                    remark: ''
                }, //添加车辆提交的信息
                storeTemp: {},      //选车后展示的信息
                carTemp: {      //选车后展示的信息
                    id: 0,
                    plateNumber:"苏A.QX306",
                    driverName: "小张",
                    mobile: 18888888888,
                    burden: "10t",
                    label: '芍药居公司'
                },

                carSelects:[],      //公司车辆
                // companySelects: [],
                commoditySelects: [],
                storeSelects: [],
                rules: {
                    companyName: [
                        { required: true, message: '请选择公司', trigger: 'blur' }
                    ],
                    plateNumber: [
                        {required: true, message: '请输入车牌', trigger: 'blur'},
                        {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
                    ],
                    driverName: [
                        {required: true, message: '请输入司机', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    // identityCard: [
                    //     {required: true, message: '请输入身份证', trigger: 'blur'}
                    // ],
                    telephone: [
                        {required: true, message: '请输入联系电话', trigger: 'blur'}
                    ]
                },
                rules2: {
                    companyId: [
                        { required: true, message: '请选择公司', trigger: 'change' }
                    ],
                    plateNumber: [
                        {required: true, message: '请输入车牌', trigger: 'blur'},
                        {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
                    ],
                    driverName: [
                        {required: true, message: '请输入司机', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    // identityCard: [
                    //     {required: true, message: '请输入身份证', trigger: 'blur'}
                    // ],
                    telephone: [
                        {required: true, message: '请输入联系电话', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getList();
            // this.initInfo();
        },
        methods: {
            //加载公司下拉列表信息
/*            initInfo(){
                companyAll().then(response => {
                    this.companySelects=response.data;
                    this.temp.companyId=response.data[0].id;
                });
            },*/
            poundIn(){
                this.loadin=true;
                this.loadout=false;
            },
            poundOut(){
                this.loadout=true;
                this.loadin=false;
            },
            hideCar(){
                this.carDetailShow=false;
            },
            //选择切换车辆信息
            changeCar(it){
                console.log(it);
                this.carTemp=it;
                this.carDetailShow=true;
                // setTimeout(()=>this.carDetailShow=false,3000);
            },
            //二级联动 货品->仓库
            changeStore(){

            },
            //搜索
            handleFilter() {
                this.listQuery.page = 1
                this.getList()
            },
            getList() {
            this.listLoading = true;
                getInfo('companies',this.companyId).then(response => {
                    let dat=response.data;
                    this.list=dat;
                    this.formTemp={
                        id:dat.company.id,
                        companyName:dat.company.companyName,
                        cashDeposit:dat.company.cashDeposit, //最低限额
                        balance:dat.walletList[0].balance,
                        plateNums:undefined,    //车辆
                        commodityId:undefined,
                        commodityName:undefined, //货品
                        salesPrice:undefined, //货品
                        storeId:undefined,
                        store:undefined,        //仓库
                        tare:undefined, //皮重
                        net:undefined, //净重
                        gross:undefined, //毛重
                        total:undefined,
                        accountBalance:undefined
                    }
                    this.carSelectLoad();
                    this.cashAlert = this.formTemp.cashDeposit >= this.formTemp.balance;
                    let insIndex=dat.number*dat.size;
                    this.list = this.list.map((v,index) => {
                        this.$set(v, 'px',insIndex+index+1);
                        this.px=insIndex+index+1; //最大序号
                        return v
                    });

                this.listLoading = false
                }).catch(response=> {
                    console.log('response error!');
                    this.listLoading = false
                });
            },
            //车辆数据接口
            carSelectLoad(){
                // companyCar(this.formTemp.id).then(response => {
                companyCar({page:1,searchText:''}).then(response => {
                    this.carSelects=response.data.content;
                });

            },

            //添加车辆
            handleCreate() {
                console.log(this.formTemp);
                this.temp.companyId = this.formTemp.id;
                this.temp.companyName = this.formTemp.companyName;
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
                console.log(this.temp);
            },
            //添加车辆
            createCar() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        disableBtn('cfmbtm1');
                        this.carSelectLoad();
                        createOne('drivers',this.temp).then(response => {
                            this.dialogFormVisible = false
                            this.$notify({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 1000
                            })
                        })
                    }
                })
            },
            //提货提交
            createData() {
                this.$refs['dataForm2'].validate((valid) => {
                    if (valid) {
                        disableBtn('cfmbtm2');
                        createOne('driver',this.temp).then(response => {
                            this.dialogFormVisible = false
                            this.$notify({
                                title: '成功',
                                message: '添加成功',
                                type: 'success',
                                duration: 1000
                            })
                        })
                    }
                })
            },

        }
    }
</script>

<style scoped>
    .box-body{border: 1px solid gainsboro;}
</style>
