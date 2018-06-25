<template>

  <!--startprint-->
  <div class="app-container calendar-list-container" style=" width: 50%;margin-left: 25%;">
    <div class="box box-info">
      <div class="box-header with-border" style="text-align: center">
        <h3 class="box-title">地磅无人值守系统出库单</h3>
      </div>
      <div class="box-body">
        <div class="table-responsive">
          <table class="table no-margin" >
            <tbody>
            <tr>
              <td width="120px">提货企业</td>
              <td>{{$route.params.companyName}}</td>
            </tr>
            <tr>
              <td width="100px">驾驶员</td>
              <td>{{$route.params.carUser}}</td>
            </tr>
            <tr>
              <td width="100px">车牌号</td>
              <td>{{$route.params.carNum}}</td>
            </tr>
            <tr>
              <td width="100px">进厂时间</td>
              <td>{{$route.params.inTime}}</td>
            </tr>
            <tr>
              <td width="100px">出厂时间</td>
              <td>{{$route.params.outTime}}</td>
            </tr>
            <tr>
              <td width="100px">货品名称</td>
              <td>{{$route.params.commodityName}}</td>
            </tr>
            <tr>
              <td width="100px">空重</td>
              <td>{{$route.params.nullWeight}}</td>
            </tr>

            <tr>
              <td width="100px">总重</td>
              <td>{{$route.params.totalWeight}}</td>
            </tr>
            <tr>
              <td width="100px">净重</td>
              <td>{{$route.params.weight}}</td>
            </tr>
            <tr>
              <td width="100px">总金额</td>
              <td>{{$route.params.salesPrice}}</td>
            </tr>
            <tr>
              <td width="100px">账户余额</td>
              <td>{{$route.params.haveMoney}}</td>
            </tr>
            <tr>
              <td width="100px">备注</td>
              <td>{{$route.params.remark}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.table-responsive -->
      </div>
    </div>
    <!--endprint-->
    <div class="box-footer clearfix">
      <el-button type="success" class="" @click="doPrint">打印</el-button>
      <!--<a href="javascript:void(0)" class="btn btn-sm btn-info btn-flat pull-left noprint" @click="doPrint" class=""></a>-->
    </div>
  </div>

</template>
<!--
  <el-form  ref="dataForm" :model="temp" label-position="right" label-width="15%" style='width: 80%; margin-left:10%;'>
    <el-form-item label="提货企业" prop="companyName">
      {{$route.params.companyName}}
    </el-form-item>
    <el-form-item label="驾驶员" prop="carUser">
      {{$route.params.carUser}}
    </el-form-item>
    <el-form-item label="车牌号" prop="carNum">
      {{$route.params.carNum}}
    </el-form-item>
    <el-form-item label="进厂时间" prop="inTime">
      {{$route.params.inTime}}
    </el-form-item>
    <el-form-item label="出厂时间" prop="outTime">
      {{$route.params.outTime}}
    </el-form-item>
    <el-form-item label="货品名称" prop="commodityName">
      {{$route.params.commodityName}}
    </el-form-item>
    <el-form-item label="空重" prop="nullWeight">
      {{$route.params.nullWeight}}
    </el-form-item>
    <el-form-item label="总重" prop="totalWeight">
      {{$route.params.totalWeight}}
    </el-form-item>
    <el-form-item label="净重" prop="weight">
      {{$route.params.weight}}
    </el-form-item>
    <el-form-item label="总金额" prop="salesPrice">
      {{$route.params.salesPrice}}
    </el-form-item>
    <el-form-item label="账户余额" prop="haveMoney">
      {{$route.params.haveMoney}}
    </el-form-item>
  </el-form>-->
<script>
    /* eslint-disable */
import img_404 from '@/assets/404_images/404.png'
import img_404_cloud from '@/assets/404_images/404_cloud.png'

export default {
  data() {
    return {
        temp: {
            id: '',
            companyName:'石门354',
            carUser:'张小三',
            carNum:'111333',
            inTime:'2018-01-18 11:33',
            outTime:'2018-01-18 12:56',
            commodityName:'石灰石',
            nullWeight:'0',
            weight:'0',
            totalWeight:'0',
            salesPrice:'0',
            haveMoney:'0',
            remark:''
        }
    }
  },
  methods: {
      doPrint() {
          let bdhtml=window.document.body.innerHTML;
          let sprnstr="<!--startprint-->";
          let eprnstr="<!--endprint-->";
          let prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);
          prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));
          window.document.body.innerHTML=bdhtml;
          window.print();
      },
      show:function(ev){
          if(ev.keyCode == 13){
              alert('你按回车键了');
          }
      },
  },
  computed: {
    message() {
      return '特朗普说这个页面你不能进......'
    }
  }
}
</script>

  <style type="text/css">
    @media print {
      .noprint {
        display: none;
      }
    }
</style>

