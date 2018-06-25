<template>
    <div class="app-container calendar-list-container">

        <h3 class="box-title">财务人员列表</h3>


        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="财务">
                <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" class-name="small-padding">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click.native="dialogFormFenLeiVisible = true">修改密码</el-button>
                    <!--<el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除</el-button>-->

                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改密码" :visible.sync="dialogFormFenLeiVisible" width="50%" >

            <el-form :model="dialogFormFenLei" label-width="100px" >
                <el-form-item label="修改密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="password"></el-input>
                </el-form-item>
                <!--
                                <el-form :model="dialogFormFenLei" label-position="left" >
                                        <span class="svg-container">
                                          <svg-icon icon-class="password"></svg-icon>
                                        </span>-->
                <el-form-item prop="password2" label="再次输入密码">
                    <!--<span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>-->
                    <el-input  type="password" v-model="ruleForm.password2" placeholder="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click.native="dialogFormFenLeiVisible = false">取 消</el-button>
                    <el-button type="primary"  @click.native="pwdchange">添加</el-button>
                </span>
        </el-dialog>
    </div>
</template>
<script>
    /* eslint-disable */
    import axios from 'axios'
    export default {
        name: 'user',
        //初始化加载数据
        created() {

            this.getList()
            // //this.$store.commit('changeCI','user');
       /*     console.log($('#sub33').html());
            var params = new URLSearchParams();
            params.append('username', 'admin');
            params.append('password', '123456');
            axios.post("/gp/wbapi/authentication/form",params,{
                headers:{
                    Authorization:'Basic Y2hvbWUzNjA6Y2hvbWUzNjBzZWNyZXQ='
                }
            }).then(res=>{
                let re=res.data;
                if(re.success===true){
                    this.$store.state.ACCESS_TOKEN=re.data.access_token;
                    setToken(re.data.access_token);

                    this.$Message.success('登录成功');
                    this.loading = false;
                    this.$router.push({ path: '/' });
                }else{
                    console.log(res);
                    console.log(err);
                    this.$Message.error(res.message);
                    this.loading = false;
                }
            }).catch(err=>{
                console.log("error1:"+err);
                this.$message.error('用户名或密码不正确!');
                this.loading = false;
            });*/
            //读取常用商品列表
/*            axios.get('http://jspang.com/DemoApi/oftenGoods.php').then(response => {     //成功
                console.log(response.data);
                this.oftenGoods = response.data;
            }).catch(error => {   //出错
                console.log(error);
                alert('网络错误，不能访问');
            });*/

/*            axios.get("http://192.168.0.2:8090/wbapi/companys",{
                params:{ page: "1"}, //get要加params
                headers:{
                    Authorization: "bearer "
                }
            }).then(res=>{
                console.log("上产成功");
                this.msg = res.data;
            }).catch(err=>{
                console.log("error:"+err);
            });*/

/*
            console.log("123");
            this.$http.post("/gp/companys",{
                params:{ page: "1"}, //get要加params
                headers:{
                    Authorization: "bearer "
                }
            }).then(res=>{
                console.log("上产成功");
                this.msg = res.data;
            }).catch(err=>{
                console.log("error:"+err);
            });
*/
            var params = new URLSearchParams();
            params.append('username', 'admin');
            params.append('password', '123456');
/*            this.$http.post(this.$store.state.APIURL+"authentication/form",params,{
                headers:{
                    Authorization:'Basic Y2hvbWUzNjA6Y2hvbWUzNjBzZWNyZXQ='
                }
            }).then(res=>{
                this.msg2 = res.data;
            }).catch(err=>{
                console.log("error1:"+err);
            });*/

        },

        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'gray',
                    deleted: 'danger'
                }
                return statusMap[status]
            }
        },
        data () {
            return {
                pwdshow: true,
                pwdid: '',
                dialogFormFenLei:{name:''},
                dialogFormFenLeiVisible:false,
                tableKey: 0,

                msg2: [],
                oftenGoods:[
                    { "goodsId":1, "goodsName":"财务1", "price":18 },
                    { "goodsId":10, "goodsName":"财务2", "price":99 }
                ],
                ruleForm: {
                    name: '',
                    password:'',
                    password2:'',
                    fenLeis:[
                        {name: '未发布'},
                        {name: '测试活动'},
                        {name: '精彩活动'}
                    ],
                },
                data1: [{
                    name: '王小明',
                    user: 18,
                    address: '北京市朝阳区芍药居'
                }, {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                }, {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道'
                }, {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }],
            }
        },

        methods: {
            getList() {
                this.listLoading = true
                // setTimeout(()=>{
                    this.list = [
                        {
                            auditor: "胡磊",
                            author: "董勇",
                            display_time: "1989-05-05 20:52:54",
                            id: 1,
                            pageviews: 2549,
                            status: "published",
                            timestamp: 341609238420,
                            title:"元各性并备政往往受产办算单月群自",
                            type:"CN"
                        },
                        {
                            auditor: "董勇",
                            author: "胡磊",
                            display_time: "1989-05-05 20:52:54",
                            id: 1,
                            pageviews: 2549,
                            status: "published",
                            timestamp: 341609238420,
                            title: "往受产办算单月群自元各性并备政往",
                            type:"CN"
                        }
                    ];
                    console.log(this.list);
                // },2000);

                this.listLoading = false
            },

            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            //修改密码
            changepwd(item){
                this.pwdid=item.goodsId;
                console.log(this.pwdid);
                this.pwdshow=true;
            },
            cancel(){
                this.pwdshow=false;
            },
            pwdchange: function () {
               let p1 = this.ruleForm.password.trim();
               let p2 = this.ruleForm.password2.trim();
                if(p1.length !== 0){
                    if(p1 !== p2){
                        this.$message({
                            message: '两次输入密码不一致!',
                            type: 'danger'
                        });
                    }else{
                        this.dialogFormFenLeiVisible = false;

                        this.$message({
                            message: 'ok!',
                            type: 'success'
                        });
                    }
                }else{
                    this.$message({
                        message: '密码不能为空!',
                        type: 'warning'
                    });
                }
            },
            handleCloseFenLei: function (fenLei){
                var index = this.ruleForm.fenLeis.indexOf(fenLei);
                this.ruleForm.fenLeis.splice(index,1);
            },

        },
        components:{ }
    }
</script>