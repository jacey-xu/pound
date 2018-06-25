/* eslint-disable */
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function fetchList(params) {
    return request({
        url: 'commodities',
        method: 'get',
        params
    })
}