<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="4">
                    <div style="color:white;">1</div>
                </el-col>
                <el-col :span="14">
                    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="商品" v-model="listQuery.commodityName">
                    </el-input>
                    <!--                  <el-select clearable filterable class="filter-item" style="width: 250px" v-model="listQuery.type" placeholder="类型">
                                          <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
                                          </el-option>
                                      </el-select>-->
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
                        搜索
                    </el-button>
                </el-col>
                <el-col :span="2">
                    <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-edit">添加</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table id="tbid" :data="list" v-loading.body="listLoading" border fit highlight-current-row>
            <el-table-column align="center" label="序号">
                <template slot-scope="scope"><span>{{scope.row.px}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="货种">
                <template slot-scope="scope"><span>{{scope.row.commodityName}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="价格(元)">
                <template slot-scope="scope"><span>{{scope.row.salesPrice}}</span></template>
            </el-table-column>

            <el-table-column align="center" label="操作" >
                <template slot-scope="scope">
                    <el-button type="success" plain @click="handleUpdate(scope.row)" size="small" >
                        修改
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
<!--分页-->
        <div v-show="!listLoading" class="pagination-container">
            <!-- http://element-cn.eleme.io/#/zh-CN/component/pagination#pagination-fen-ye -->
<!--            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage.page1"
                    :page-sizes="[2,20,30,50]"
                    :page-size="listQuery.size"
                    layout=" prev, pager, next,total, sizes, jumper"
                    :total="total">
            </el-pagination>-->
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
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="15%" style='width: 80%; margin-left:10%;'>

                <el-form-item label="货种" prop="commodityName">
                    <el-input v-model="temp.commodityName"></el-input>
                </el-form-item>

                <el-form-item label="价格" prop="salesPrice">
                    <el-input v-model="temp.salesPrice"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                              v-model="temp.remark">
                    </el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
                <el-button v-else type="primary" @click="updateData">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    /* eslint-disable */
    import waves from '@/directive/waves' // 水波纹指令
    import { fetchList,createOne,updateOne,deleteOne,getOne } from '@/api/admin/commodity'
    import { disableBtn } from '@/utils'
    export default {
        name: 'customList',
        directives: {waves},
        data() {
            return {
                list: null, //数据
                total: null,
                px: null, //最大序号
                listLoading: true,
                listQuery: {
                    page: 1,
                    size: 10, //每页几条
                    number: 0, //当前页为第1页,从0计算
                    commodityName:undefined,
                    sort: 'id'
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
                datetimes:[new Date(),new Date()],
                rules: {
                    commodityName: [
                        {required: true, message: '请商品名称', trigger: 'blur'},
                        {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
                    ],
                    /*companyFullName: [
                        {required: true, message: '请输入公司名称', trigger: 'blur'},
                        {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
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
                    this.listQuery.keyword = dat.keyword;
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
/*            rownum(){
                //首先拿到table中tr的数量 得到一共多少条数据
                var len = $("#tbid table tbody tr").length;
                //使用循环给每条数据加上序号
                for(var i = 1;i<len+1;i++){
                    $('#tableId table tr:eq('+i+') span:first').text(i);
                }
            }，*/
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
                // var ind=this.list.indexOf(row);
                // this.list.splice(ind,1);

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
                        // const tempData = Object.assign({}, this.temp)
                        let tempData={
                            id: this.temp.id,
                            commodityName:this.temp.commodityName,
                            salesPrice:this.temp.salesPrice,
                            remark: this.temp.remark
                        };
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
