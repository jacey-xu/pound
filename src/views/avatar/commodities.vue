<template>
    <div class="app-container calendar-list-container ">
        <div class="filter-container">
            <el-row>
                <el-col :span="4">
                    <div style="color:white;">1</div>
                </el-col>
                <el-col :span="14">
<!--                    <el-select clearable filterable style="width: 250px" class="filter-item" v-model="listQuery.companyId" placeholder="企业">
                        <el-option v-for="item in compOptions" :key="item.key" :label="item" :value="item">
                        </el-option>
                    </el-select>-->
                    <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="公司/货品" v-model="listQuery.searchText">
                    </el-input>
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
                        搜索
                    </el-button>
                </el-col>
                <el-col :span="2">
                    <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-edit">添加</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row>
            <el-table-column align="center" label="序号">
                <template slot-scope="scope"><span>{{scope.row.px}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="企业">
                <template slot-scope="scope"><span>{{scope.row.company.companyName}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="货种">
                <template slot-scope="scope"><span>{{scope.row.commodity.commodityName}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="单价(元/吨)">
                <template slot-scope="scope"><span>{{scope.row.salesPrice}}</span></template>
            </el-table-column>

            <el-table-column align="center" label="操作" >
                <template slot-scope="scope">
                    <el-button type="success" plain @click="handleUpdate(scope.row)" size="small">
                        修改
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
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

                <el-form-item label="企业" >
                    <el-select clearable filterable style="width: 250px" class="filter-item" v-model="chkCompany" placeholder="企业">
                        <el-option v-for="item in compOptions" :key="item.id" :label="item.companyName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="货种" prop="commodityName">
                    <el-select clearable filterable style="width: 250px" class="filter-item" v-model="chkCommodity" placeholder="货种">
                        <el-option v-for="item in commodityOptions" :key="item.id" :label="item.commodityName" :value="item.id" :id="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单价(元)" prop="salesPrice">
                    <el-input v-model="temp.salesPrice"></el-input>
                </el-form-item>
                <el-form-item label="有效期" prop="cashDeposit">
                    <el-date-picker
                            v-model="datetimes"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                              v-model="temp.remark">
                    </el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="createData"  id="cfmbtm1">确 定</el-button>
                <el-button v-else type="primary" @click="updateData"  id="cfmbtm2">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    /* eslint-disable */
    import waves from '@/directive/waves' // 水波纹指令
    import { fetchList,createOne,updateOne,deleteOne,getOne } from '@/api/avatar/companyCommodities'
    import { companyAll,commodityAll} from '@/api/common'
    import {disableBtn} from '@/utils'
    export default {
        name: 'customList',
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
                    update: '修改企业-货种',
                    create: '添加企业-货种'
                },
                chkCompany:'',
                chkCommodity:'',
                compOptions: [],
                commodityOptions: [],
                temp: {
                    id: undefined,
                    companyId :'',
                    commodityId:'',
                    salesPrice: 0,
                    formTime: new Date(),
                    toTime: new Date(),
                    remark: ''
                },
                datetimes:[new Date(),new Date()],
                opt:{   //修改,客户公司,货品下拉列表默认选中
                    companyId:undefined,
                    commodityId:undefined,
                },
                rules: {
                    companyName: [
                        {required: true, message: '请输入公司名称', trigger: 'blur'},
                        {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
                    ],
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
                this.getList()
            },
            getList() {
                this.listLoading = true
                fetchList(this.listQuery).then(response => {
                    let dat=response.data;
                    this.listQuery.size = dat.size; //每页几条
                    this.listQuery.number = dat.number; //当前页为第1页,从0计算
                    this.total = dat.totalElements; //共多少页
                    this.list = dat.content;

                    let insIndex=dat.number*dat.size;
                    //添加 列px // .map ( 数组元素, 索引)
                    //set给v对象添加px属性=值 https://vuejs.org/v2/guide/reactivity.html
                    this.list = this.list.map((v,index) => {
                        this.$set(v, 'px',insIndex+index+1);
                        this.px=insIndex+index+1; //最大序号
                        return v
                    });

                    this.listLoading = false
                });
            },
            //加载公司下拉列表信息
            initInfo(){
                companyAll().then(response => {
                    this.compOptions=response.data;
                    this.temp.companyId=response.data[0].id;

                });
                //加载货品下拉列表信息
                commodityAll().then(response => {
                    this.commodityOptions=response.data;
                    this.temp.commodityId=response.data[0].id;
                    console.log(this.temp);
                })
            },
            checkClean() {

                this.chkCommodity='';
                this.chkCompany='';
            },
            checkInit() {
                this.chkCommodity=this.temp.commodityId;
                this.chkCompany=this.temp.companyId;
            },

            resetTemp() {
                this.temp = {
                    id: undefined,
                    companyId :'',
                    commodityId:'',
                    salesPrice: 0,
                    formTime: new Date(),
                    toTime: new Date(),
                    remark: ''
                };
                this.checkClean();
            },
            //添加事件
            handleCreate() {
                this.resetTemp();
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                //$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
                this.$nextTick(() => {
                    //ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。
                    this.$refs['dataForm'].clearValidate()
                })
            },
            //添加提交
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        disableBtn('cfmbtm1');
                        // 3d615ce8-5a6b-4c59-9e27-e6be2d144bc3
                        createOne(this.temp).then(response => {
                            let dat=response.data;
                            this.temp.id=dat.id;
                            this.temp.px=this.px+1;
                            this.px++;
                            this.list.unshift(this.temp)
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
            //详情修改
            handleUpdate(row) {
                this.temp.companyId=row.company.id;
                this.temp.commodityId=row.commodity.id;
                this.checkInit();
                this.temp = Object.assign({}, row) // copy obj
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
                            for (const v of this.list) {
                                if (v.id === this.temp.id) {
                                    const index = this.list.indexOf(v)
                                    this.list.splice(index, 1, this.temp) //替换
                                    break
                                }
                            }
                            this.dialogFormVisible = false
                            this.$notify({
                                title: '成功',
                                message: '更新成功',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
            },
            //分页
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
    .edit-input {
        padding-right: 100px;
    }
    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 13px;
    }
</style>
