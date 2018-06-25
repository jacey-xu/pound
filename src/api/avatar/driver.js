/* eslint-disable */
import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: 'drivers',
        method: 'get',
        params
    })
}
export function createOne(data) {
    return request({
        url: 'drivers',
        method: 'post',
        data
    })
}
export function updateOne(data) {
    return request({
        url: 'drivers/'+data.id,
        method: 'put',
        data
    })
}
export function deleteOne(data) {
    return request({
        url: 'drivers/'+data.id,
        method: 'delete'
    })
}
export function getOne(data) {
    return request({
        url: 'drivers/'+data.id,
        method: 'get',
        data
    })
}

