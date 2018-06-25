/* eslint-disable */
import request from '@/utils/request'

export function login(username, password) {
  console.log(username);
  console.log(password);
  let params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  console.log(params);
  let ret = request({
    // url: '/user/login',
    url: 'authentication/form',
    method: 'post',
    data: params
  });
  return ret
}
export function getInfo2() {
    return request({
        url: 'users/me',
        method: 'get',
    })
}

export function getInfo(token) {
  let params = new URLSearchParams();
  params.append('commodityName', "123");
  params.append('id', "40288fea63cef44c0163cef48b2c0005");
  params.append('remark', "333");
  params.append('salesPrice', 12);
    console.log(params);
  return request({
    url: 'commodities/'+params.id,
    method: 'put',
    params:params
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
