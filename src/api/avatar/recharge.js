/* eslint-disable */
import request from '@/utils/request'

export function updatePatch(url,data) {
    return request({
        url: url,
        method: 'putch',
        data
    })
}

