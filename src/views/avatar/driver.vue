<template>
<div class="app-container calendar-list-container">
    <div class="filter-container">
        <el-row>
            <el-col :span="4">
                <div style="color:white;">1</div>
            </el-col>
            <el-col :span="14">
                <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="公司/车牌/手机号" v-model="listQuery.searchText">
                </el-input>
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
                    搜索
                </el-button>
            </el-col>
            <el-col :span="2">
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-circle-plus-outline">添加车辆
                </el-button>
            </el-col>
        </el-row>
    </div>

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="序号" >
            <template slot-scope="scope"><span>{{scope.row.px}}</span></template>
        </el-table-column>
        <el-table-column align="center" label="公司简称">
            <template slot-scope="scope"><span>{{scope.row.company.companyName}}</span></template>
        </el-table-column>
        <el-table-column align="center" label="车牌号">
            <template slot-scope="scope"><span>{{scope.row.plateNumber}}</span></template>
        </el-table-column>
        <el-table-column align="center" label="驾驶员">
            <template slot-scope="scope"><span>{{scope.row.driverName}}</span></template>
        </el-table-column>
        <el-table-column align="center" label="载重">
            <template slot-scope="scope"><span>{{scope.row.weighty}}</span></template>
        </el-table-column>
        <!--      <el-table-column width="180px" align="center" label="时间">
                <template slot-scope="scope">
                  <span>{{scope.row.date | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
              </el-table-column>-->
        <el-table-column  align="center" label="手机">
            <template slot-scope="scope"><span>{{scope.row.telephone}}</span></template>
        </el-table-column>


        <el-table-column align="center" label="操作" >
            <template slot-scope="scope">
                <el-button type="success" plain @click="handleUpdate(scope.row)" size="small" icon="el-icon-share">
                    详情
                </el-button>
            </template>
        </el-table-column>
    </el-table>
<!--分页-->
        <div v-show="!listLoading" class="pagination-container">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="listQuery.size"
                    layout="prev, pager, next,total"
                    :total="total">
            </el-pagination>
        </div>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="100px" style='width: 450px; margin-left:50px;'>
            <el-form-item label="公司" prop="companyId">
                <el-select clearable filterable v-model="temp.companyId"  style="width: 250px" class="filter-item" placeholder="请选择">
                    <el-option v-for="item in compOptions" :key="item.id" :value="item.id"  :label="item.companyName">
                    </el-option>
                </el-select>
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
            <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" id="cfmbtm1">确定</el-button>
            <el-button v-else type="primary" @click="updateData" id="cfmbtm2">确定</el-button>
        </div>
    </el-dialog>


</div>
</template>

<script>

/* eslint-disable */
import waves from '@/directive/waves' // 水波纹指令
import { fetchList,createOne,updateOne,deleteOne,getOne } from '@/api/avatar/driver'
import { companyAll,commodityAll} from '@/api/common'
import {disableBtn} from '@/utils'
export default {
    name: 'driver',
    directives: {waves},
    data() {
        return {
            list: null,
            total: null,
            px: null, //最大序号
            listLoading: true,
            listQuery: {
                page: 1,
                size: 10, //每页几条
                number: 0, //当前页为第1页,从0计算
                searchText:undefined,
                sort: 'id'
            },
            //弹出层
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
                update: '编辑客户车辆',
                create: '添加客户车辆'
            },
            chkCompany:'',
            compOptions: [],
            template: {
                id: undefined, //driverId
                address: '',
                burden: 0, //核载T(T)
                companyId: '',
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
            }, //模板
            temp: {},   //保存添加,编辑后提交的信息

            rules: {
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
            this.initInfo();
    },
    methods: {
        //搜索
        handleFilter() {
            this.listQuery.page = 1
            this.getList()
        },
        getList() {
            this.listLoading = true;
            fetchList(this.listQuery).then(response => {
                    let dat=response.data;
                    console.log(dat);
                    this.listQuery.size = dat.size; //每页几条
                    this.listQuery.number = dat.number; //当前页为第1页,从0计算
                    this.total = dat.totalElements; //共多少页
                    this.list = dat.content;
                    let insIndex=dat.number*dat.size;
                    this.list = this.list.map((v,index) => {
                        this.$set(v, 'px',insIndex+index+1);
                        this.px=insIndex+index+1; //最大序号
                        return v
                    });

                    this.$nextTick(function(){
                        console.log('v-for渲染已经完成')
                        // this.temp.companyId=response.data[0].company.id;
                    })
                    this.listLoading = false
                }).catch(response=> {
                    console.log('response error!');
                    this.listLoading = false
                });
            },

        //加载公司下拉列表信息
        initInfo(){
            companyAll().then(response => {
                this.compOptions=response.data;
                this.temp.companyId=response.data[0].id;

            });
        },
        resetTemp() {
            this.temp = this.template;
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
                    disableBtn('cfmbtm1');
                    createOne(this.temp).then(response => {
                        this.getList();
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
        //详情修改
        handleUpdate(row) {
            this.temp = {
                id: row.id, //driverId
                address: row.address,
                axesNumber: row.axesNumber,
                burden: row.burden, //核载T(T)
                companyId: row.company.id,
                driverName: row.driverName,
                drivingLicence: row.drivingLicence, //驾驶证
                identityCard: row.identityCard, //驾驶员身份证
                length: row.length, //长(M)
                witch: row.witch,  //宽(M)
                height: row.height, //高(M)
                weighty: row.weighty,//重(T)
                plateNumber: row.plateNumber, //车牌
                telephone: row.telephone,
                remark: row.remark
            };
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        //修改提交
        updateData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    disableBtn('cfmbtm2');
                    let tempData = Object.assign({}, this.temp)
                    // delete tempData.createdTime;
                    updateOne(tempData).then(response => {
                        this.getList();
                        this.dialogFormVisible = false
                    })
                }
            })
        },

        //删除
        handleDelete(row, status) {
            this.$msgbox({
                // title: '删除',
                message: '确定要删除吗?',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(action => {
                deleteOne({id:row.id}).then(response => {
                    for (const v of this.list) {
                        if (v.id === row.id) {
                            const index = this.list.indexOf(v)
                            this.list.splice(index, 1) //删除
                            break
                        }
                    }
                    this.dialogFormVisible = false
                    this.$notify({
                        message: '删除成功',
                        type: 'success',
                        duration: 1000
                    })
                })
            });
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
</style>
