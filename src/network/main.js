import request from './request'
//主页获取帖子
export function getList(pageNo, size, tab) {
  return request(({
    url: '/post/page',
    method: 'get',
    params: {
      size: 10
    }
  }))
}
//获取指定板块的帖子
export function getPostList(plate) {
  return request(({
    url: '/post/page',
    method: 'get',
    params: { plate }
  }))
}

//获取帖子详情
export function getTopciDetail(id) {
  return request(({
    url: `/post/getDetailById/${id}`,
    method: 'get',
  }))
}
// getTopciDetail
// export class Goods {
// 	constructor(itemInfo, columns, services) {
// 		this.title = itemInfo.title
// 		this.desc = itemInfo.desc
// 		this.newPrice = itemInfo.price
// 		this.oldPrice = itemInfo.oldPrice
// 		this.discount = itemInfo.discountDesc
// 		this.columns = columns
// 		this.services = services
// 		this.realPrice = itemInfo.lowNowPrice
// 	}
// }

//获取学习资料列表
export function getmaterialList() {
  return request(({
    url: `/post/materialList`,
    method: 'get',
  }))
}
