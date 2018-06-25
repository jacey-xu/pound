/* eslint-disable */
import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: 'sellCommodityRecords',
        method: 'get',
        params
    })
}
