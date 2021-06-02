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

//点赞
export function saveCollection(postId, userId) {
  return request({
    url: `collection/save`,
    method: 'get',
    params: {
      postId,
      userId
    }
  })
}
//取消收藏
export function removeCollection(postId, userId) {
  return request({
    url: `collection/remove`,
    method: 'get',
    params: {
      postId,
      userId
    }
  })
}
//点赞
export function saveSupport(targetId, targetType, targetUserId, userId) {
  return request({
    url: `parse-item/save`,
    method: 'get',
    params: {
      targetId,
      targetType,
      targetUserId,
      userId
    }
  })
}
//取消点赞
export function remove(targetId, targetType, targetUserId, userId) {
  return request({
    url: `parse-item/remove`,
    method: 'get',
    params: {
      targetId,
      targetType,
      targetUserId,
      userId
    }
  })
}
