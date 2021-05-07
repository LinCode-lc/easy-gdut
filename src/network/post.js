import request from './request'

// 发布
export function post(topic) {
    return request({
        url: '/post/release',
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
