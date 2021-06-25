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



//取消收藏
export function hasCollection(postId, userId) {
  return request({
    url: `collection/isexist`,
    method: 'get',
    params: {
      postId,
      userId
    }
  })
}
//收藏
export function saveCollection(postId, userId) {
  return request({
    url: `collection/save`,
    method: 'post',
    data: {
      postId,
      userId
    }
  })
}
//取消收藏
export function removeCollection(postId, userId) {
  return request({
    url: `collection/remove`,
    method: 'post',
    data: {
      postId,
      userId
    }
  })
}
//是否已经点过赞
export function hasSupport(targetId, userId) {
  return request({
    url: `/parse-item/isexist`,
    method: 'get',
    params: {
      targetId,
      userId,
    }
  })
}
//点赞
export function saveSupport(targetId, targetType, targetUserId, userId) {
  return request({
    url: `parse-item/save`,
    method: 'post',
    data: {
      targetId,
      targetType,
      targetUserId,
      userId
    }
  })
}

//取消点赞
export function removeSupport(targetId, targetType, targetUserId, userId) {
  return request({
    url: `parse-item/remove`,
    method: 'post',
    data: {
      targetId,
      targetType,
      targetUserId,
      userId
    }
  })
}

//是否已关注
export function hasFollow(targetuserId, relationFlag) {
  return request({
    url: `user/queryRelation`,
    method: 'get',
    params: {
      targetuserId,
      relationFlag
    }
  })
}
//取消关注
export function removeFollow(targetuserId, relationFlag) {
  return request({
    url: `user/deleteRelation`,
    method: 'post',
    params: {
      targetuserId,
      relationFlag
    }
  })
}

//关注
export function saveFollow(targetuserId, relationFlag) {
  return request({
    url: `user/setRelation`,
    method: 'post',
    params: {
      targetuserId,
      relationFlag
    }
  })
}