/* eslint-disable */
import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: 'companies',
        method: 'get',
        params
    })
}
export function createOne(data) {
    return request({
        url: 'companies',
        method: 'post',
        data
    })
}
export function updateOne(data) {
    return request({
        url: 'companies/'+data.id,
        method: 'put',
        data
    })
}
export function deleteOne(data) {
    return request({
        url: 'companies/'+data.id,
        method: 'delete'
    })
}
export function getOne(data) {
    return request({
        url: 'companies/'+data.id,
        method: 'get',
        data
    })
}

