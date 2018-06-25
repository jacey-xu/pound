<template>
    <div class="content-wrapper" style="margin-left:0px;">
    <!-- Main content 111-->
        <section class="content">
        <!-- Small boxes (Stat box) -->
            <div class="row">
                <div class="col-xs-12">

                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">设置客户公司 客户公司添加</h3>
                        </div>
                        <!-- /.box-header -->
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="公司名称" prop="company">
                                <el-input v-model="ruleForm.company"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="手机" prop="tel">
                                <el-input v-model="ruleForm.tel"></el-input>
                            </el-form-item>
                            <el-form-item label="地址" prop="address">
                                <el-input v-model="ruleForm.address"></el-input>
                            </el-form-item>

                            <el-form-item label="经营范围" prop="scope">
                                <el-input v-model="ruleForm.scope"></el-input>
                            </el-form-item>

                            <el-form-item label="备注" prop="other">
                                <el-input v-model="ruleForm.other"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
            </div>
            <!-- /.row -->


        <!-- /.row (main row) -->
    </section>
    <!-- /.content -->
    </div>
</template>
<script>
    /* eslint-disable */
    export default {
        name: 'custom',
        //初始化加载数据
        created() {
/*            //this.$store.commit('changeCI','custom');

            var params = new URLSearchParams();
            params.append('username', 'admin');
            params.append('password', '123456');
            this.$http.post("/gp/wbapi/authentication/form",params,{
                headers:{
                    Authorization:'Basic Y2hvbWUzNjA6Y2hvbWUzNjBzZWNyZXQ='
                }
            }).then(res=>{
                this.msg2 = res.data;
            }).catch(err=>{
                console.log("error1:"+err);
            });*/

        },
        data () {
            return {
                pwdid:'公司名',
                pwdshow:true,
                ruleForm: {
                    company:'',
                    name: '',
                    tel: '',
                    address:'',
                    scope:'',
                    other:''
                },
                rules: {
                    company: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                        { min: 2, max: 50, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入联系人', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' }
                    ]
                }
            }
        },

        methods: {
            //修改密码
            changepwd(item){
                this.pwdid=item.cp;
                console.log(this.pwdid);
                this.pwdshow=true;
            },
            cancel(){
                this.pwdshow=false;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        components:{ }
    }
</script>

<style scoped>
    .el-form{
        padding:5px;
    }
</style>
