<template>
    <div class="content-wrapper" style="margin-left:0px;">
<!--        <nav-bread>
            <span slot="bread1">设置LED提示内容</span>
            <span slot="bread2"></span>
            <span slot="dashboard">设置LED提示内容</span>
            <span slot="panel"></span>
        </nav-bread>-->
        <!-- Main content 111-->
        <section class="content">
            <!-- Small boxes (Stat box) -->
            <div class="row">
                <div class="col-xs-12">

                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">LED提示列表</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>LED</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr v-for="item in oftenGoods">
                                    <td>{{item.id}}</td>
                                    <td>{{item.name}}</td>
                                    <td><button type="button" class="btn btn-sm btn-primary" @click="changepwd(item)">修改内容</button></td>
                                </tr>


                                </tbody>
                            </table>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
            </div>
            <!-- /.row -->

            <div class="row" v-show="pwdshow">
                <div class="col-md-8">
                    <div class="box box-info">

                        <div class="box-header with-border" >
                            <h3 class="box-title">{{pwdid}}</h3>
                        </div>
                        <!-- Horizontal Form -->
                        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="语音内容" prop="name">
                                <el-input type=""  v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">设定</el-button>
                                <el-button @click="cancel">取消</el-button>
                            </el-form-item>
                        </el-form>
                        <!-- /.box -->
                    </div>
                </div>
            </div>
            <!-- /.row (main row) -->
        </section>
        <!-- /.content -->
    </div>
</template>
<script>
    /* eslint-disable */
    // import NavBread from '@/components/common/NavBread' //引入面包屑
    export default {
        name: 'ledcontent',

        //初始化加载数据
        created() {
            //this.$store.commit('changeCI','ledcontent');

            var params = new URLSearchParams();
            params.append('username', 'admin');
            params.append('password', '123456');
/*            this.$http.post("/gp/wbapi/authentication/form",params,{
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
                checkIndex:'ledcontent',
                msg: 'index!!!',
                pwdshow: true,
                pwdid: '',
                msg2: [],
                oftenGoods:[
                    { "id":1, "name":"LED1", "price":18 },
                    { "id":2, "name":"LED2", "price":99 }
                ]
                , ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
            }
        },

        methods: {
            //修改密码
            changepwd(item){
                this.pwdid=item.name;
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
    .demo-ruleForm{
        padding:5px;
    }
</style>
