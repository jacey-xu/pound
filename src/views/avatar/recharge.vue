<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="4">
                    <div style="color:white;">1</div>
                </el-col>
                <el-col :span="14">
                 <!--   <el-select clearable filterable style="width: 250px" class="filter-item" v-model="listQuery.companyName" placeholder="企业">
                        <el-option v-for="item in compOptions" :key="item.id" :label="item.companyName" :value="item.id">
                        </el-option>
                    </el-select>-->
                    <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="客户公司" v-model="listQuery.searchText">
                    </el-input>
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
                        搜索
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 98%">
            <el-table-column align="center" label="序号">
                <template slot-scope="scope"><span>{{scope.row.px}}</span></template>
            </el-table-column>
            <el-table-column  align="center" label="公司简称">
                <template slot-scope="scope"><span>{{scope.row.company.companyName}}</span></template>
            </el-table-column>


            <el-table-column  align="center" label="金额(元)">
                <template slot-scope="scope">{{ scope.row.balance }}</template>
            </el-table-column>

            <el-table-column align="center" label="操作" >
                <template slot-scope="scope">
                    <el-button type="success" plain @click="handleUpdate(scope.row)" size="small" icon="el-icon-share">
                        充值
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="100px" style='width: 450px; margin-left:50px;'>

                <el-form-item label="公司" prop="companyId">
                    <el-select clearable filterable disabled v-model="temp.companyId"  style="width: 250px" class="filter-item" placeholder="请选择">
                        <el-option v-for="item in compOptions" :key="item.id" :kid="item.id" :value="item.id"  :label="item.companyName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="充值金额(元)" prop="money">
                    <el-input v-model.number="temp.money"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                              v-model="temp.remark">
                    </el-input>
                </el-form-item>
<!--                <el-form-item label="充值凭证" prop="img">
                    <el-upload
                        class="avatar-uploader"
                        :class="{disabled:uploadDisabled}"
                        action="/gp/wbapi/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                </el-form-item>-->


            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="createData" id="cfmbtm1">确 定</el-button>
                <el-button v-else type="primary" id="cfmbtm2" @click="updateData">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    /* eslint-disable */
    import waves from '@/directive/waves' // 水波纹指令
    import {fetchList,updatePatch,companyAll} from '@/api/common'
    import {disableBtn} from '@/utils'
    import _ from 'lodash';
    export default {
        name: 'customList',
        directives: {waves},
        data() {
            return {
                url:'wallets',
                imageUrl: '',
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
                    update: '企业充值',
                    create: '添加'
                },
                chkCompany:'',
                compOptions: [],
                template: {
                    id: undefined,
                    companyId:undefined,
                    money: 0,
                    remark: ''
                }, //模板
                temp: {},
                rules: {
                    companyId: [
                        { required: true, message: '请选择公司', trigger: 'change' }
                    ],
                    money: [
                        {required: true, message: '请输入金额'},
                        { type: 'number', message: '金额必须为数字'}
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
                this.listQuery.page = 1
                this.getList()
            },
            getList() {
                this.listLoading = true;
                fetchList(this.url,this.listQuery).then(response => {
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
                        createOne(this.url,this.temp).then(response => {
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
                    id: row.id,
                    companyId:row.company.id,
                    money: 0,
                    remark: ''
                }; // copy obj
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
                        let tempData =_.omit(this.temp,['id','remark']);//移出属性
                        // console.log(tempData)
                        updatePatch(this.url+'/recharge',tempData).then(response => {
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
                    deleteOne(this.url,{id:row.id}).then(response => {
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

            //分页
            handleSizeChange(val) {
                this.listQuery.size = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            //上传
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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
    /*upload*/
    .el-upload{
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: 148px;
        height: 148px;
        cursor: pointer;
        line-height: 146px;
        vertical-align: top;
    }
    .disabled .el-upload--picture-card {
        display: none;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
