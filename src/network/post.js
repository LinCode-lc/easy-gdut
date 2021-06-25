import request from './request'
import qs from 'qs'
// markdown发布
export function post(topic) {
    return request({
        url: '/post/markdown/release',
        method: 'post',
        data: {
            userId: topic.userId,
            postTitle: topic.postTitle,
            postContents: topic.postContents
        }
    })
}

//发布评论
export function postComment(commentContents, postId, replyId, replyReplyId, userId) {
    return request({
        url: '/comment/save',
        method: 'post',
        data: {
            commentContents,
            postId,
            replyId,
            replyReplyId,
            userId

        }

    })
}

//获取标签列表
export function getTagList() {
    return request({
        url: '/post/edit/topicList',
        method: 'get',

    })
}

//普通发布
export function postTopic(topic) {
    return request({
        url: '/post/edit/release',
        method: 'post',
        data: topic

    })
}
//删除照片墙的照片
export function removeImg(imgUrl) {
    return request({
        url: `/post/edit/resource-delete/${imgUrl}`,
        method: 'get',
    })
}

//获取关注列表
export function getFocusList() {
    return request({
        url: '/user/myFollowList',
        method: 'get',
    })
}

//关注
export function addfocus(targetuserId, relationFlag) {
    let data = qs.stringify({
        targetuserId: targetuserId,
        relationFlag: relationFlag
    })
    return request({
        url: '/user/setRelation',
        method: 'post',
        data: data
    })
}

//取消关注
export function cancelfocus(targetuserId) {
    let data = qs.stringify({
        targetuserId: targetuserId
    })
    return request({
        url: '/user/deleteRelation',
        method: 'post',
        data: data
    })
}
//获取用户最近浏览记录
export function getrecentlyviewed(userId) {
    return request({
        url: '/user/getMyPost',
        method: 'get',
        params: {
            userId
        }
    })
}