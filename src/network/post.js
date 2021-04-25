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
