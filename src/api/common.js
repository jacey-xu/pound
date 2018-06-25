/* eslint-disable */
import request from '@/utils/request'
// 列表
export function fetchList(url,params) {
    return request({
        url: url,
        method: 'get',
        params
    })
}
// 添加
export function createOne(url,data) {
    return request({
        url: url,
        method: 'post',
        data
    })
}
// 修改
export function updateOne(url,data) {
    return request({
        url: url+'/'+data.id,
        method: 'put',
        data
    })
}
// 修改局部 /wallets/recharge
export function updatePatch(url,data) {
    return request({
        url: url,
        method: 'patch',
        data
    })
}
// 删除
export function deleteOne(url,data) {
    return request({
        url: url+'/'+data.id,
        method: 'delete'
    })
}
// 获取详细
export function getOne(url,data) {
    return request({
        url: url+'/'+data.id,
        method: 'get',
        data
    })
}
/*
获取详细信息
 */
export function getInfo(url,id) {
    return request({
        url: url+'/'+id+'/info',
        method: 'get',
    })
}
//所有公司
export function companyAll() {
    return request({
        url: 'companies/all',
        method: 'get'
    })
}
//所有货品
export function commodityAll() {
    return request({
        url: 'commodities/all',
        method: 'get'
    })
}//所有公司车辆
export function companyCar(params) {
    return request({
        url: 'drivers',
        method: 'get',
        params
    })
}

export function uploadImg(uploadUrl,file) {
    //todo
    return request({
        // url: 'commodities/all',
        // method: 'get'
    })
}