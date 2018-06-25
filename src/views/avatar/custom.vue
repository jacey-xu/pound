<template>
<div class="app-container calendar-list-container">
    <div class="filter-container">
        <el-row>
            <el-col :span="4">
                <div style="color:white;">1</div>
            </el-col>
            <el-col :span="14">
  <!--              <el-select clearable filterable style="width: 250px" class="filter-item" v-model="listQuery.companyName" placeholder="企业">
                    <el-option v-for="item in compOptions" :key="item.id" :label="item.value" :value="item.value">
                    </el-option>
                </el-select>-->
                <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="公司/联系人/手机" v-model="listQuery.searchText">
                </el-input>
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
                    搜索
                </el-button>
            </el-col>
            <el-col :span="2">
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="success" icon="el-icon-edit">添加
                </el-button>
            </el-col>
        </el-row>
    </div>
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row>
        <el-table-column align="center" label="序号" >
            <template slot-scope="scope"><span>{{scope.row.px}}</span></template>
        </el-table-column>
        <el-table-column align="center" label="公司简称">
            <template slot-scope="scope"><span>{{scope.row.companyName}}</span></template>
        </el-table-column>
        <el-table-column align="center" label="地址">
            <template slot-scope="scope"><span>{{scope.row.companyAddress}}</span></template>
        </el-table-column>

        <el-table-column  align="center" label="联系人">
            <template slot-scope="scope"><span>{{scope.row.linkman}}</span></template>
        </el-table-column>
        <el-table-column  align="center" label="手机">
            <template slot-scope="scope"><span>{{scope.row.mobile}}</span></template>
        </el-table-column>

        <el-table-column align="center" width="200px"  label="最低限额(元)">
            <template slot-scope="scope">
                <template v-if="scope.row.edit">
                    <el-input class="edit-input" size="mini" v-model="scope.row.cashDeposit"></el-input>
                    <el-button class='cancel-btn' size="mini"  type="warning" @click="cancelEdit(scope.row)">取消
                    </el-button>
                </template>
                <span v-else>{{ scope.row.cashDeposit }}</span>
                <!--</el-col>-->
<!--                <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="mini"
                           icon="el-icon-circle-check-outline">完成
                </el-button>
                <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="mini" plain
                           icon="el-icon-edit">编辑
                </el-button>-->
            </template>
        </el-table-column>
        <el-table-column  align="center" label="预存金额">
            <template slot-scope="scope"><span>{{scope.row.money}}</span></template>
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
            <!--        <el-form-item label="类型" prop="type">
                      <el-select class="filter-item" v-model="temp.type" placeholder="请选择">
                        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
                        </el-option>
                      </el-select>
                    </el-form-item>-->

            <el-form-item label="公司简称" prop="companyName">
                <el-input v-model="temp.companyName"></el-input>
            </el-form-item>
            <el-form-item label="公司全称" prop="companyFullName">
                <el-input v-model="temp.companyFullName"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="linkman">
                <el-input v-model="temp.linkman"></el-input>
            </el-form-item>
            <el-form-item label="联系手机" prop="mobile">
                <el-input v-model="temp.mobile"></el-input>
            </el-form-item>
            <el-form-item label="最低限额(元)" prop="cashDeposit">
                <el-input v-model="temp.cashDeposit"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="companyAddress">
                <el-input v-model="temp.companyAddress"></el-input>
            </el-form-item>
            <el-form-item label="法人" prop="legalPerson">
                <el-input v-model="temp.legalPerson"></el-input>
            </el-form-item>
            <el-form-item label="身份证" prop="legalPerson">
                <el-input v-model="temp.identityCard"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="telephone">
                <el-input v-model="temp.telephone"></el-input>
            </el-form-item>
            <el-form-item label="经营范围" prop="businessScope">
                <el-input v-model="temp.businessScope"></el-input>
            </el-form-item>
            <el-form-item label="其它" prop="remark">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                          v-model="temp.remark">
                </el-input>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" id="cfmbtm1">确 定</el-button>
            <el-button v-else type="primary" @click="updateData" id="cfmbtm2">确 定</el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>

/* eslint-disable */
import waves from '@/directive/waves' // 水波纹指令
import { fetchList,createOne,updateOne,deleteOne,getOne } from '@/api/avatar/custom'
import { disableBtn } from '@/utils'
export default {
    name: 'customList',
    directives: {waves},
    data() {
        return {
            list: null,
            total: null,
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
                update: '编辑客户公司',
                create: '添加客户公司'
            },
            temp: {
                id: undefined,
                companyName: '',
                companyFullName: '',
                companyAddress: '',
                legalPerson: '',
                linkman: '',
                identityCard: '',
                telephone: '',
                mobile: '',
                businessScope: '',
                cashDeposit: 0,
                remark: ''
            },
            compOptions: [{
                value: '芍药居公司',
                label: '黄金糕'
            }, {
                value: '西二旗公司',
                label: '双皮奶'
            }, {
                value: '南山区公司',
                label: '蚵仔煎'

            }],
            rules: {
                companyName: [
                    {required: true, message: '请输入公司名称', trigger: 'blur'},
                    {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
                ],
                companyFullName: [
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
                this.list = this.list.map((v,index) => {
                    this.$set(v, 'px',insIndex+index+1);
                    this.px=insIndex+index+1; //最大序号
                    return v
                });

                this.listLoading = false
            });
        },
/*        cancelEdit(row) {
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
        },*/
        resetTemp() {
            this.temp = {
                id: undefined,
                companyName: '',
                companyFullName: '',
                companyAddress: '',
                legalPerson: '',
                linkman: '',
                identityCard: '',
                telephone: '',
                mobile: '',
                businessScope: '',
                cashDeposit: 0,
                money: 0,
                remark: ''
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
