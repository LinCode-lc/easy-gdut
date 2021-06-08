import request from './request'

// 发布
export function post(topic) {
    return request({
        url: '/post/markdown/release',
        method: 'post',
        // params: {
        //     userId: topic.userId,
        //     postTitle: topic.postTitle,
        //     postContents: topic.postContents
        // }
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
        // params: {
        //     commentContents,
        //     postId,
        //     replyId,
        //     replyReplyId,
        //     userId

        // }
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

//发布
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
