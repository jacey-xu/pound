/* eslint-disable */
import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: 'commodities',
        method: 'get',
        params
    })
}
export function createOne(data) {
    return request({
        url: 'commodities',
        method: 'post',
        data
    })
}
export function updateOne(data) {
    return request({
        url: 'commodities/'+data.id,
        method: 'put',
        data
    })
}
export function deleteOne(data) {
    return request({
        url: 'commodities/'+data.id,
        method: 'delete',
        data
    })
}
export function getOne(data) {
    return request({
        url: 'commodities/'+data.id,
        method: 'get',
        data
    })
}

