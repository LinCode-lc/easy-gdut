import request from './request'

export function getList(pageNo, size, tab) {
    return request(({
      url: '/post/list',
      method: 'get',
      params: { pageNo: pageNo, size: size, tab: tab }
    }))
  }

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