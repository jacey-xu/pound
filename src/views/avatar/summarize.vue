<template>
    <div class="app-container box box-info">
        <h4 class="box-title ">货种设置</h4>

                        <!-- /.box-header -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="时间区间">
                <el-date-picker
                        v-model="date1"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="box-body">
            <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>公司</th>
                    <th>人员</th>
                    <th>电话</th>
                    <th>地址</th>
                    <th>经营范围</th>
                    <th>添加日期</th>
                    <th>其它</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>


                <tr v-for="item in oftenGoods">
                    <td>{{item.id}}</td>
                    <td>{{item.cp}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.tel}}</td>
                    <td>{{item.address}}</td>
                    <td>{{item.scope}}</td>
                    <td>{{item.date}}</td>
                    <td>{{item.remark}}</td>
                    <td>
                        <button type="button" class="btn btn-sm btn-primary" @click="changepwd(item)">详情</button>
                        <button type="button" class="btn btn-sm btn-success" @click="addmoney(item)">充值</button>
                    </td>
                </tr>


                </tbody>
<!--                                <tfoot>
                <tr>
                    <th>Rendering engine</th>
                    <th>Browser</th>
                    <th>Platform(s)</th>
                </tr>
                </tfoot>-->
            </table>
        </div>


        <div class="box box-info">

            <div class="box-header with-border" >
                <h3 class="box-title">{{pwdid}}提货详情</h3>
            </div>
            <!-- Horizontal Form -->

            <div class="box-body">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="序号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="日期"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="车牌号"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="num"
                            label="载货量/吨"
                            width="300">
                    </el-table-column>
                </el-table>
            </div>
            <!-- /.box -->
        </div>

    <!-- /.content -->
    </div>
</template>
<script>
    /* eslint-disable */
    export default {
        name: 'summarize',
        //初始化加载数据
        created() {
            //this.$store.commit('changeCI','summarize');

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
                pwdid:'XX公司',
                pwdshow:true,
                date1: [],
                formInline: {
                    date1: ''
                },
                oftenGoods:[
                    { "id":1, "name":"王小明", "cp":'芍药居公司', "tel":18888888888, "address":'北京市朝阳区芍药居', "scope":'朝阳区世纪大道', "date":'2017-9-18' , "remark":18 },
                    { "id":2, "name":"张小刚", "cp":'西二旗公司', "tel":18333333333, "address":'北京市海淀区西二旗', "scope":'海淀区西二旗', "date":'2017-9-18' , "remark":18 },
                    { "id":3, "name":"李小红", "cp":'南山区公司', "tel":18432134567, "address":'上海市浦东新区世纪大道', "scope":'浦东新区世纪大道', "date":'2017-9-18' , "remark":18 }
                ],
                tableData: [{
                    id:1,
                    date: '2016-05-02',
                    name: '王小明',
                    address: '苏D 23456',
                    num:'2吨'
                }, {
                    id:2,
                    date: '2016-05-04',
                    name: '王小明',
                    address: '苏B xdg56',
                    num:'1吨'
                }, {
                    id:3,
                    date: '2016-05-01',
                    name: '张小刚',
                    address: '苏A 2fd456',
                    num:'2吨'
                }, {
                    id:4,
                    date: '2016-05-03',
                    name: '李小红',
                    address: '苏C gh456',
                    num:'3吨'
                }],
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
            onSubmit() {
                console.log('submit!');
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