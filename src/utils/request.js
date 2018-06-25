'use strict'
/* eslint-disable */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
console.log(process.env.BASE_API);
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Basic Y2hvbWUzNjA6Y2hvbWUzNjBzZWNyZXQ='
  if (store.getters.token) {
    config.headers['Authorization'] = 'bearer '+ getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  console.log('=====url: '+config.url);
  console.log(config);
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器 接收返回的消息
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
      /*        }).then(res=>{
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
    const res = response.data
      console.log('======接口调用返回=======');
    // if (res.success !== true) {
    if (res.code !== 0) {
      Message({
        message: res.message,
        type: 'error',
        duration: 2 * 1000
      });

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
/*      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }*/
      return Promise.reject('error')
    } else {
      // console.log('登录成功!');
/*        Message({
            message: '登录成功!',
            type: 'success',
            duration: 2 * 1000
        });*/
      return response.data //成功,返回参数
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
