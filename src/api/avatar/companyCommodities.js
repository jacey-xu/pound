/* eslint-disable */
import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: 'companyCommodities',
        method: 'get',
        params
    })
}
export function createOne(data) {
    return request({
        url: 'companyCommodities',
        method: 'post',
        data
    })
}
export function updateOne(data) {
    return request({
        url: 'companyCommodities/'+data.id,
        method: 'put',
        data
    })
}
export function deleteOne(data) {
    return request({
        url: 'companyCommodities/'+data.id,
        method: 'delete'
    })
}
export function getOne(data) {
    return request({
        url: 'companyCommodities/'+data.id,
        method: 'get',
        data
    })
}

