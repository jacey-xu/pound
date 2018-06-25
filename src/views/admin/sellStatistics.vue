<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="4">
                    <div style="color:white;">1</div>
                </el-col>
                <el-col :span="20">
                    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="商品" v-model="listQuery.commodityName">
                    </el-input>
                    <el-date-picker
                            v-model="datetimes"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
                        搜索
                    </el-button>
                </el-col>

<!--                <el-col :span="2">
                    <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-edit">添加</el-button>
                </el-col>-->
            </el-row>

        </div>
        <!--summary-method 合计-->
        <el-table id="tbid" :data="list"  :summary-method="getSummaries" show-summary v-loading.body="listLoading" border fit highlight-current-row style="width: 98%">
            <el-table-column align="center" label="序号" prop="id">
                <template slot-scope="scope"><span>{{scope.row.id}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="提货企业" prop="companyName">
                <template slot-scope="scope"><span>{{scope.row.companyName}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="提货时间" prop="time">
                <template slot-scope="scope"><span>{{scope.row.time}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="货品名称" prop="commodityName">
                <template slot-scope="scope"><span>{{scope.row.commodityName}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="货品数量" prop="num">
                <template slot-scope="scope"><span>{{scope.row.num}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="货品金额(元)" prop="salesPrice">
                <template slot-scope="scope"><span>{{scope.row.salesPrice}}</span></template>
            </el-table-column>

        <!--    <el-table-column align="center" label="操作" >
                <template slot-scope="scope">
                    <el-button type="success" plain @click="handleUpdate(scope.row)" size="small" >
                        修改
                    </el-button>

                    <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>-->
        </el-table>
        <!--分页-->
        <div v-show="!listLoading" class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" layout="total,  prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>



    </div>
</template>

<script>
    /* eslint-disable */
    import waves from '@/directive/waves' // 水波纹指令
    import { fetchList} from '@/api/admin/sellStatistics'
    export default {
        name: 'sellStatistics',
        directives: {waves},directives: {waves},
        data() {
            return {
                list: null, //数据
                total: null,
                px: null, //最大序号
                listLoading: true,
                listQuery: {
                    page: 1,
                    size: 10, //每页几条
                    number: 0, //当前页为第0页
                    commodityName:undefined,
                    fromTime:'',
                    toTime:'',
                    sort: '+id'
                },
                //弹出层
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '修改货种',
                    create: '添加货种'
                },
                temp: {
                    id: undefined,
                    commodityName:'',
                    salesPrice:'',
                    remark: ''
                },
                datetimes:[new Date().setMonth((new Date().getMonth()-1)),new Date()],
                rules: {
                    commodityName: [
                        {required: true, message: '请商品名称', trigger: 'blur'},
                        {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
                    ],
                    /*companyFullName: [
                        {required: true, message: '请输入公司名称', trigger: 'blur'},
                        {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
                    ],
                    linkman: [
                        {required: true, message: '请输入联系人', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    identityCard: [
                        {required: true, message: '请输入身份证', trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '请输入联系电话', trigger: 'blur'}
                    ]*/
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        // sums[index] += ' 元';
                    } else {
                        sums[index] = '-';
                    }
                });

                return sums;
            },
            //搜索
            handleFilter() {
                this.listQuery.page = 1
                this.getList()
            },
            getList() {
                this.listLoading = true
/*                fetchList(this.listQuery).then(response => {
                    let dat=response.data;
                    this.total = dat.totalElements;
                    this.list = dat.content;
                    //添加 列px // .map ( 数组元素, 索引)
                    //set给v对象添加px属性=值 https://vuejs.org/v2/guide/reactivity.html
                    this.list = this.list.map((v,index) => {
                        this.$set(v, 'px', index+1);
                        this.px=index+1;
                        return v
                    });
                    console.log(this.list);

                    this.listLoading = false
                });*/
                          let items = [
                              {
                                  "id": 1,
                                  "companyName":'石门测试有限公司',
                                  "commodityName":'石灰石',
                                  "time":'2018-01-18',
                                  "num":2,
                                  "salesPrice":1500
                              },
                              {
                                  "id": 2,
                                  "companyName":'南北测试有限公司',
                                  "commodityName":'石灰石',
                                  "time":'2018-01-18',
                                  "num":3,
                                  "salesPrice":1500
                              },
                              {
                                  "id": 3,
                                  "companyName":'三和有限公司',
                                  "commodityName":'石灰石',
                                  "time":'2018-01-18',
                                  "num":4,
                                  "salesPrice":1500
                              }
                          ];
                this.list =items;
                this.listLoading = false

            },

            cancelEdit(row) {
                row.cashDeposit = row.originalTitle
                row.edit = false
                this.$message({
                    message: 'The title has been restored to the original value',
                    type: 'warning'
                })
            },
            confirmEdit(row) {
                row.edit = false
                row.originalTitle = row.cashDeposit
                this.$message({
                    message: 'The title has been edited',
                    type: 'success'
                })
            },
            resetTemp() {
                this.temp = {
                    id: undefined,
                    commodityName:'',
                    remark: ''
                }
            },
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
                        // 3d615ce8-5a6b-4c59-9e27-e6be2d144bc3
                        createList(this.temp).then(response => {
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
            handleModifyStatus(row, status) {
                // var ind=this.list.indexOf(row);
                // this.list.splice(ind,1);
                deleteList({id:row.id}).then(response => {
                    console.log(response);
                    this.$notify({
                        title: '成功',
                        message: '更新成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    })
                })

                //todo 异步传删除 id
            },
            //详情修改
            handleUpdate(row) {
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
                        // const tempData = Object.assign({}, this.temp)
                        const tempData={
                            id: this.temp.id,
                            commodityName:this.temp.commodityName,
                            salesPrice:this.temp.salesPrice,
                            remark: this.temp.remark
                        };
                        console.log(tempData);
                        // delete tempData.createdTime;
                        updateList(tempData).then(response => {
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
</style>
