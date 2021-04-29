import request from './request'

// 浏览
export function getTopic(id) {
  return request({
    url: `post/getById/` + id,
    method: 'get',
    // params: {
    //   id: id
    // }
  })
}


// 获取评论
export function getCommentList(id) {
  return request({
    url: `comment/listbypostid/`,
    method: 'get',
    params: {
      postid: id
    }
  })
}
