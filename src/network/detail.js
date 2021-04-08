import request from './request'

// 浏览
export function getTopic(id) {
    return request({
      url: `/post`,
      method: 'get',
      params: {
        id: id
      }
    })
  }