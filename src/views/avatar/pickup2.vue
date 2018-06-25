<template>
    <div class="content-wrapper" style="margin-left:0px;">
    <!-- Main content 111-->
        <section class="content">
        <!-- Small boxes (Stat box) -->
            <div class="row">
                <div class="col-xs-12">

                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">提货设置 -提货选择</h3>
                        </div>
                        <!-- /.box-header -->
                        <el-form   label-width="100px" class="demo-ruleForm">

                            <el-form-item label="公司名称">
                                <el-select placeholder="请选择公司名称" value="">
                                    <el-option label="公司一" value="shanghai"></el-option>
                                    <el-option label="公司二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="剩余金额">
                                <el-input  :disabled="true" ></el-input>
                            </el-form-item>

                            <el-form-item label="备注" prop="other">
                                <el-input  :disabled="true" ></el-input>
                            </el-form-item>
                        </el-form>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
            </div>
            <!-- /.row -->

            <div class="row">
                <div class="col-xs-12">
                    <div class="box"  style="padding:5px">

                        <div style="margin-bottom: 20px;">
                            <el-button
                                    size="small"
                                    @click="addTab()"
                            >
                                增加提货车辆
                            </el-button>
                        </div>

                        <div class="col-xs-12" id="addhtml">

                            <div class="col-md-3">
                                <div class="box box-info">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">车辆信息</h3>
                                    </div>
                                    <div class="box-body">
                                        <div class="form-group">
                                            <label>车牌号</label>
                                            <input type="text" class="form-control" placeholder="Enter ...">
                                        </div>
                                        <div class="form-group">
                                            <label>身份证</label>
                                            <input type="text" class="form-control" placeholder="Enter ...">
                                        </div>
                                        <div class="form-group">
                                            <label>手机</label>
                                            <input type="text" class="form-control" placeholder="Enter ...">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="box box-info">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">车辆信息</h3>
                                    </div>
                                    <div class="box-body">
                                        <div class="form-group">
                                            <label>车牌号</label>
                                            <input type="text" class="form-control" placeholder="Enter ...">
                                        </div>
                                        <div class="form-group">
                                            <label>身份证</label>
                                            <input type="text" class="form-control" placeholder="Enter ...">
                                        </div>
                                        <div class="form-group">
                                            <label>手机</label>
                                            <input type="text" class="form-control" placeholder="Enter ...">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <p style="clear:both;"></p>
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
    var pickupTmp =`
        <div class="col-md-3">
            <div class="box box-info">
                <div class="box-header with-border">
                    <h3 class="box-title">车辆信息</h3>
                </div>
                <div class="box-body">
                    <div class="form-group">
                      <label>车牌号</label>
                      <input type="text" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                      <label>身份证</label>
                      <input type="text" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                      <label>手机</label>
                      <input type="text" class="form-control" placeholder="Enter ...">
                    </div>
                  </div>
            </div>
        </div>
    `;

    export default {
        name: 'pickup',
        //初始化加载数据
        created() {
            //this.$store.commit('changeCI','recharge');
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
            });

        },
        data () {
            return {
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                rules: {
                    company: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                        { min: 2, max: 50, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    money: [
                        { required: true, message: '请输入联系人', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ]
                },
                value:'',
                editableTabsValue2: '2',
                editableTabs2: [{
                    title: '车辆 1',
                    name: '1',
                    content: pickupTmp
                }, {
                    title: '车辆 2',
                    name: '2',
                    content: pickupTmp
                }],
                tabIndex: 2
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
            },
            addTab() {
                console.log(111)
                document.getElementById("addhtml").innerHTML += pickupTmp;
/*                let newTabName = ++this.tabIndex + '';
                this.editableTabs2.push({
                    title: 'New Tab',
                    name: newTabName,
                    content: 'New Tab content'
                });
                this.editableTabsValue2 = newTabName;*/
            },
            removeTab() {
/*                let tabs = this.editableTabs2;
                let activeName = this.editableTabsValue2;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }*/

/*                this.editableTabsValue2 = activeName;
                this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);*/
            }
        },
        components:{

        }
    }
</script>

<style scoped>
    .el-form{
        padding:5px;
    }
</style>
